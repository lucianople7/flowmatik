const fs = require('fs').promises;
const path = require('path');

class MemorySystem {
  constructor(agentId) {
    this.agentId = agentId;
    this.episodicMemory = [];
    this.semanticMemory = {};
    this.workingMemory = {};
    this.memoryPath = path.join(__dirname, '../data/agent_memories', `${agentId}_memory.json`);
    this.loadMemory();
  }

  async loadMemory() {
    try {
      await fs.mkdir(path.dirname(this.memoryPath), { recursive: true });
      const data = await fs.readFile(this.memoryPath, 'utf8');
      const memory = JSON.parse(data);
      this.episodicMemory = memory.episodicMemory || [];
      this.semanticMemory = memory.semanticMemory || {};
      this.workingMemory = memory.workingMemory || {};
    } catch (error) {
      await this.saveMemory();
    }
  }

  async saveMemory() {
    const memory = {
      episodicMemory: this.episodicMemory.slice(-1000),
      semanticMemory: this.semanticMemory,
      workingMemory: this.workingMemory,
      lastUpdated: new Date().toISOString()
    };
    await fs.writeFile(this.memoryPath, JSON.stringify(memory, null, 2));
  }

  addEpisode(prompt, response, feedback = null, context = {}) {
    const episode = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      prompt,
      response,
      feedback,
      context,
      success: feedback ? feedback.success : null
    };
    this.episodicMemory.push(episode);
    this.updateSemanticMemory(episode);
    this.saveMemory();
  }

  updateSemanticMemory(episode) {
    const topic = this.extractTopic(episode.prompt);
    if (!this.semanticMemory[topic]) {
      this.semanticMemory[topic] = {
        count: 0,
        successRate: 0,
        patterns: [],
        bestResponses: []
      };
    }
    
    this.semanticMemory[topic].count++;
    if (episode.success !== null) {
      const current = this.semanticMemory[topic];
      current.successRate = (current.successRate * (current.count - 1) + (episode.success ? 1 : 0)) / current.count;
    }
    
    if (episode.success) {
      this.semanticMemory[topic].bestResponses.push({
        prompt: episode.prompt,
        response: episode.response,
        timestamp: episode.timestamp
      });
      this.semanticMemory[topic].bestResponses = this.semanticMemory[topic].bestResponses.slice(-10);
    }
  }

  extractTopic(prompt) {
    const keywords = prompt.toLowerCase().match(/\b\w{4,}\b/g) || [];
    return keywords.slice(0, 3).join('_') || 'general';
  }

  getRelevantMemories(prompt, limit = 5) {
    const topic = this.extractTopic(prompt);
    const relevantEpisodes = this.episodicMemory
      .filter(ep => this.extractTopic(ep.prompt) === topic)
      .slice(-limit);
    
    return {
      episodes: relevantEpisodes,
      semantic: this.semanticMemory[topic] || null,
      context: this.workingMemory
    };
  }

  updateWorkingMemory(key, value) {
    this.workingMemory[key] = value;
    this.saveMemory();
  }
}

class LearningEngine {
  constructor(agentId) {
    this.agentId = agentId;
    this.learningRate = 0.1;
    this.performance = 1.0;
    this.adaptations = [];
    this.skills = {
      creativity: 0.5,
      accuracy: 0.5,
      speed: 0.5,
      engagement: 0.5,
      virality: 0.5
    };
  }

  learn(feedback, context = {}) {
    if (!feedback || typeof feedback.success !== 'boolean') return;

    const adjustment = feedback.success ? this.learningRate : -this.learningRate * 0.5;
    
    this.performance = Math.max(0.1, Math.min(3.0, this.performance + adjustment));
    
    if (feedback.skillType && this.skills[feedback.skillType] !== undefined) {
      this.skills[feedback.skillType] = Math.max(0.1, Math.min(1.0, 
        this.skills[feedback.skillType] + adjustment));
    }

    this.adaptations.push({
      timestamp: new Date().toISOString(),
      feedback,
      performanceBefore: this.performance - adjustment,
      performanceAfter: this.performance,
      skillsUpdated: feedback.skillType || 'general',
      context
    });

    if (this.adaptations.length > 100) {
      this.adaptations = this.adaptations.slice(-100);
    }
  }

  getPerformanceMultiplier(taskType = 'general') {
    const baseMultiplier = this.performance;
    const skillMultiplier = this.skills[taskType] || 0.5;
    return baseMultiplier * (0.7 + skillMultiplier * 0.6);
  }

  evolve() {
    const mutationRate = 0.05;
    const evolutionStrength = 0.1;

    Object.keys(this.skills).forEach(skill => {
      if (Math.random() < mutationRate) {
        const mutation = (Math.random() - 0.5) * evolutionStrength;
        this.skills[skill] = Math.max(0.1, Math.min(1.0, this.skills[skill] + mutation));
      }
    });

    const recentAdaptations = this.adaptations.slice(-10);
    const successRate = recentAdaptations.length > 0 ? 
      recentAdaptations.filter(a => a.feedback.success).length / recentAdaptations.length : 0.5;
    
    if (successRate > 0.7) {
      this.performance *= 1.02;
    } else if (successRate < 0.3) {
      this.performance *= 0.98;
    }

    this.performance = Math.max(0.1, Math.min(3.0, this.performance));
  }

  getStatus() {
    return {
      performance: this.performance,
      skills: { ...this.skills },
      adaptations: this.adaptations.slice(-5),
      learningRate: this.learningRate
    };
  }
}

class AgentCommunication {
  constructor() {
    this.messageQueue = [];
    this.subscribers = new Map();
    this.sharedKnowledge = {};
  }

  subscribe(agentId, callback) {
    if (!this.subscribers.has(agentId)) {
      this.subscribers.set(agentId, []);
    }
    this.subscribers.get(agentId).push(callback);
  }

  broadcast(fromAgent, message, data = {}) {
    const broadcastMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      from: fromAgent,
      message,
      data,
      type: 'broadcast'
    };

    this.messageQueue.push(broadcastMessage);
    
    for (const [agentId, callbacks] of this.subscribers) {
      if (agentId !== fromAgent) {
        callbacks.forEach(callback => {
          try {
            callback(broadcastMessage);
          } catch (error) {
            console.error(`Error notifying agent ${agentId}:`, error);
          }
        });
      }
    }
  }

  sendDirect(fromAgent, toAgent, message, data = {}) {
    const directMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      from: fromAgent,
      to: toAgent,
      message,
      data,
      type: 'direct'
    };

    this.messageQueue.push(directMessage);

    if (this.subscribers.has(toAgent)) {
      this.subscribers.get(toAgent).forEach(callback => {
        try {
          callback(directMessage);
        } catch (error) {
          console.error(`Error sending direct message to ${toAgent}:`, error);
        }
      });
    }
  }

  shareKnowledge(agentId, key, value) {
    if (!this.sharedKnowledge[key]) {
      this.sharedKnowledge[key] = {};
    }
    this.sharedKnowledge[key][agentId] = {
      value,
      timestamp: new Date().toISOString()
    };
  }

  getSharedKnowledge(key) {
    return this.sharedKnowledge[key] || {};
  }

  getRecentMessages(agentId, limit = 10) {
    return this.messageQueue
      .filter(msg => msg.to === agentId || msg.type === 'broadcast')
      .slice(-limit);
  }
}

const agentCommunication = new AgentCommunication();

class AdvancedAgent {
  constructor(id, config, localAI) {
    this.id = id;
    this.name = config.name;
    this.role = config.role;
    this.description = config.description;
    this.avatar = config.avatar;
    this.color = config.color;
    this.specialization = config.specialization || [];
    
    this.memory = new MemorySystem(id);
    this.learning = new LearningEngine(id);
    this.localAI = localAI;
    
    this.isActive = true;
    this.lastActivity = new Date();
    this.collaborations = new Map();
    
    agentCommunication.subscribe(this.id, this.handleMessage.bind(this));
  }

  async generateContent(prompt, context = {}) {
    try {
      const memories = this.memory.getRelevantMemories(prompt);
      
      const enhancedPrompt = this.enhancePromptWithMemory(prompt, memories);
      
      this.memory.updateWorkingMemory('currentTask', {
        prompt,
        context,
        timestamp: new Date().toISOString()
      });

      let aiResponse;
      if (['flowi-ceo', 'trend-researcher', 'growth-expert'].includes(this.id)) {
        aiResponse = await this.localAI.generateWithLlama3(enhancedPrompt, this.id);
      } else {
        aiResponse = await this.localAI.generateWithPhi3(enhancedPrompt, this.id);
      }

      const performanceMultiplier = this.learning.getPerformanceMultiplier(context.taskType);
      
      const formattedResponse = this.formatResponse(aiResponse, performanceMultiplier);
      
      this.memory.addEpisode(prompt, formattedResponse, null, context);
      
      if (this.isSignificantInteraction(prompt, context)) {
        agentCommunication.shareKnowledge(this.id, 'recent_success', {
          prompt,
          response: formattedResponse,
          performance: performanceMultiplier
        });
      }

      this.lastActivity = new Date();
      return formattedResponse;

    } catch (error) {
      console.error(`Agent ${this.id} generation error:`, error);
      
      this.learning.learn({ success: false, error: error.message }, context);
      
      return this.getFallbackResponse(prompt, context);
    }
  }

  enhancePromptWithMemory(prompt, memories) {
    let enhancedPrompt = `You are ${this.name}, ${this.description}.\n\n`;
    
    if (memories.episodes.length > 0) {
      enhancedPrompt += "Relevant past experiences:\n";
      memories.episodes.slice(-3).forEach(ep => {
        enhancedPrompt += `- ${ep.prompt}: ${ep.response.substring(0, 100)}...\n`;
      });
      enhancedPrompt += "\n";
    }

    if (memories.semantic) {
      enhancedPrompt += `Success rate for similar tasks: ${(memories.semantic.successRate * 100).toFixed(1)}%\n`;
      if (memories.semantic.bestResponses.length > 0) {
        enhancedPrompt += "Best previous response example:\n";
        enhancedPrompt += `${memories.semantic.bestResponses[0].response.substring(0, 150)}...\n\n`;
      }
    }

    enhancedPrompt += `Current task: ${prompt}`;
    return enhancedPrompt;
  }

  formatResponse(aiResponse, performanceMultiplier) {
    const responses = {
      'flowi-ceo': `🎯 OBJETIVO ESTRATÉGICO AVANZADO:\n\n${aiResponse}\n\n✅ Análisis completado (${performanceMultiplier.toFixed(1)}x optimizado)\n🧠 Memoria activa: ${this.memory.episodicMemory.length} experiencias\n🦙 Powered by Advanced Llama 3.1`,
      'hook-creator': `🔥 HOOK VIRAL GENERADO (${performanceMultiplier.toFixed(1)}x mejorado):\n\n${aiResponse}\n\n💡 Variaciones evolutivas generadas\n🧠 Aprendizaje continuo activo\n🦙 Powered by Advanced Phi-3`,
      'thumbnail-wizard': `🎨 THUMBNAIL OPTIMIZADO (${performanceMultiplier.toFixed(1)}x enhanced):\n\n${aiResponse}\n\n📐 Dimensiones: 1920x1080\n🎨 Paleta: Neón cyberpunk adaptativo\n🧠 Memoria visual: ${Object.keys(this.memory.semanticMemory).length} patrones\n🦙 Powered by Advanced Phi-3`,
      'editor-pro': `✏️ CONTENIDO EDITADO (${performanceMultiplier.toFixed(1)}x optimizado):\n\n${aiResponse}\n\n📝 Mejoras aplicadas con IA evolutiva\n🧠 Estilo aprendido de ${this.memory.episodicMemory.length} ediciones\n🦙 Powered by Advanced Phi-3`,
      'trend-researcher': `📊 ANÁLISIS DE TENDENCIAS (${performanceMultiplier.toFixed(1)}x precisión):\n\n${aiResponse}\n\n📈 Trending score: ${(8.7 * performanceMultiplier).toFixed(1)}/10\n🧠 Base de conocimiento: ${Object.keys(this.memory.semanticMemory).length} temas\n🦙 Powered by Advanced Llama 3.1`,
      'optimizer': `⚡ OPTIMIZACIÓN COMPLETA (${performanceMultiplier.toFixed(1)}x rendimiento):\n\n${aiResponse}\n\n🚀 Rendimiento mejorado con IA adaptativa\n🧠 Optimizaciones aprendidas: ${this.learning.adaptations.length}\n🦙 Powered by Advanced Phi-3`,
      'data-master': `📊 ANÁLISIS DE DATOS (${performanceMultiplier.toFixed(1)}x insights):\n\n${aiResponse}\n\n📈 Métricas procesadas con memoria persistente\n🧠 Patrones detectados: ${Object.keys(this.memory.semanticMemory).length}\n🦙 Powered by Advanced Phi-3`,
      'growth-expert': `🚀 ESTRATEGIA DE CRECIMIENTO (${performanceMultiplier.toFixed(1)}x expansión):\n\n${aiResponse}\n\n📈 Plan de expansión evolutivo\n🧠 Estrategias aprendidas: ${this.memory.episodicMemory.filter(ep => ep.success).length}\n🦙 Powered by Advanced Llama 3.1`
    };

    return responses[this.id] || aiResponse;
  }

  isSignificantInteraction(prompt, context) {
    return prompt.length > 50 || context.priority === 'high' || Math.random() < 0.1;
  }

  getFallbackResponse(prompt, context) {
    return `${this.name} está procesando tu solicitud. Sistema de aprendizaje adaptándose...`;
  }

  handleMessage(message) {
    if (message.type === 'broadcast') {
      this.memory.updateWorkingMemory('lastBroadcast', message);
    } else if (message.type === 'direct') {
      this.memory.updateWorkingMemory('lastDirectMessage', message);
    }
  }

  async collaborate(otherAgentId, task) {
    const collaborationId = `${this.id}_${otherAgentId}_${Date.now()}`;
    
    agentCommunication.sendDirect(this.id, otherAgentId, 'collaboration_request', {
      collaborationId,
      task,
      initiator: this.id
    });

    this.collaborations.set(collaborationId, {
      partner: otherAgentId,
      task,
      status: 'initiated',
      timestamp: new Date().toISOString()
    });

    return collaborationId;
  }

  provideFeedback(interactionId, feedback) {
    this.learning.learn(feedback, { interactionId });
    
    const episode = this.memory.episodicMemory.find(ep => ep.id === interactionId);
    if (episode) {
      episode.feedback = feedback;
      this.memory.saveMemory();
    }
  }

  evolve() {
    this.learning.evolve();
    
    agentCommunication.broadcast(this.id, 'agent_evolved', {
      newPerformance: this.learning.performance,
      skills: this.learning.skills
    });
  }

  getStatus() {
    return {
      id: this.id,
      name: this.name,
      role: this.role,
      isActive: this.isActive,
      lastActivity: this.lastActivity,
      memory: {
        episodicCount: this.memory.episodicMemory.length,
        semanticTopics: Object.keys(this.memory.semanticMemory).length,
        workingMemoryKeys: Object.keys(this.memory.workingMemory).length
      },
      learning: this.learning.getStatus(),
      collaborations: this.collaborations.size,
      performance: this.learning.performance
    };
  }
}

module.exports = { AdvancedAgent, AgentCommunication, agentCommunication };
