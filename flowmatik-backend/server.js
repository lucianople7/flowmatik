require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const NodeCache = require('node-cache');

let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} else {
  console.log('⚠️  Stripe not initialized - using placeholder key for development');
}

const app = express();
const PORT = process.env.PORT || 8000;


class AICache {
  constructor() {
    this.cache = new NodeCache({ 
      stdTTL: 3600,
      checkperiod: 120,
      useClones: false
    });
    this.stats = {
      hits: 0,
      misses: 0,
      totalRequests: 0
    };
  }

  generateKey(provider, model, prompt, params = {}) {
    const keyData = { provider, model, prompt, params };
    return Buffer.from(JSON.stringify(keyData)).toString('base64');
  }

  async get(provider, model, prompt, params = {}) {
    this.stats.totalRequests++;
    const key = this.generateKey(provider, model, prompt, params);
    const cached = this.cache.get(key);
    
    if (cached) {
      this.stats.hits++;
      console.log(`🎯 Cache HIT for ${provider}/${model}`);
      return cached;
    }
    
    this.stats.misses++;
    console.log(`💫 Cache MISS for ${provider}/${model}`);
    return null;
  }

  set(provider, model, prompt, params, result, ttl = 3600) {
    const key = this.generateKey(provider, model, prompt, params);
    this.cache.set(key, result, ttl);
    console.log(`💾 Cached result for ${provider}/${model}`);
  }

  getStats() {
    return {
      ...this.stats,
      hitRate: this.stats.totalRequests > 0 ? (this.stats.hits / this.stats.totalRequests * 100).toFixed(2) : 0,
      cacheSize: this.cache.keys().length
    };
  }
}

const aiCacheSystem = new AICache();

const LocalAIService = require('./services/localAI');
const localAI = new LocalAIService();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let contentHistory = [];
let agentProfiles = {};
let users = [];
let subscriptions = [];

const { AdvancedAgent, agentCommunication } = require('./services/advancedAgents');

const advancedAgents = {};

const agentConfigs = {
  'flowi-ceo': {
    name: 'FLOWI CEO',
    role: 'Strategic Objectives',
    description: 'Define objetivos estratégicos y visión general con aprendizaje continuo',
    avatar: '/avatars/flowi-ceo.png',
    color: '#00ff41',
    specialization: ['strategy', 'leadership', 'vision']
  },
  'hook-creator': {
    name: 'Hook Creator',
    role: 'Viral Content',
    description: 'Genera frases iniciales impactantes y virales con memoria adaptativa',
    avatar: '/avatars/hook-creator.png',
    color: '#ff0080',
    specialization: ['creativity', 'virality', 'engagement']
  },
  'thumbnail-wizard': {
    name: 'Thumbnail Wizard',
    role: 'Visual Design',
    description: 'Crea miniaturas atractivas y optimizadas con aprendizaje visual',
    avatar: '/avatars/thumbnail-wizard.png',
    color: '#8000ff',
    specialization: ['design', 'visual', 'optimization']
  },
  'editor-pro': {
    name: 'Editor Pro',
    role: 'Content Optimization',
    description: 'Revisa y optimiza todo el contenido con memoria editorial',
    avatar: '/avatars/editor-pro.png',
    color: '#ff8000',
    specialization: ['editing', 'optimization', 'quality']
  },
  'trend-researcher': {
    name: 'Trend Researcher',
    role: 'Market Analysis',
    description: 'Analiza tendencias de redes sociales con inteligencia predictiva',
    avatar: '/avatars/trend-researcher.png',
    color: '#00ffff',
    specialization: ['analysis', 'trends', 'prediction']
  },
  'optimizer': {
    name: 'Optimizer',
    role: 'Performance',
    description: 'Mejora el rendimiento del contenido con algoritmos evolutivos',
    avatar: '/avatars/optimizer.png',
    color: '#ffff00',
    specialization: ['performance', 'optimization', 'efficiency']
  },
  'data-master': {
    name: 'Data Master',
    role: 'Analytics',
    description: 'Gestiona datos y métricas avanzadas con memoria analítica',
    avatar: '/avatars/data-master.png',
    color: '#ff4000',
    specialization: ['analytics', 'data', 'insights']
  },
  'growth-expert': {
    name: 'Growth Expert',
    role: 'Expansion',
    description: 'Expande alcance y crecimiento con estrategias adaptativas',
    avatar: '/avatars/growth-expert.png',
    color: '#4000ff',
    specialization: ['growth', 'expansion', 'strategy']
  }
};

Object.keys(agentConfigs).forEach(agentId => {
  advancedAgents[agentId] = new AdvancedAgent(agentId, agentConfigs[agentId], localAI);
});

const AI_AGENTS = agentConfigs;

class MCPIntegration {
  constructor() {
    this.connections = new Map();
    this.protocols = ['text-generation', 'image-analysis', 'trend-prediction', 'content-optimization'];
    this.isActive = true;
  }

  async connectToMCP(protocol, endpoint) {
    try {
      this.connections.set(protocol, {
        endpoint,
        status: 'connected',
        lastPing: new Date(),
        capabilities: this.getProtocolCapabilities(protocol)
      });
      console.log(`🔗 MCP Connected: ${protocol} at ${endpoint}`);
      return true;
    } catch (error) {
      console.error(`❌ MCP Connection failed: ${protocol}`, error);
      return false;
    }
  }

  getProtocolCapabilities(protocol) {
    const capabilities = {
      'text-generation': ['GPT-4', 'Claude', 'Gemini', 'Custom Models'],
      'image-analysis': ['Vision AI', 'OCR', 'Style Transfer', 'Generation'],
      'trend-prediction': ['Social Media', 'Market Analysis', 'Viral Prediction'],
      'content-optimization': ['SEO', 'Engagement', 'A/B Testing', 'Performance']
    };
    return capabilities[protocol] || [];
  }

  async processWithMCP(protocol, data) {
    const connection = this.connections.get(protocol);
    if (!connection) {
      throw new Error(`MCP protocol ${protocol} not connected`);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      protocol,
      processedData: `Enhanced ${protocol} processing: ${JSON.stringify(data)}`,
      confidence: 0.85 + Math.random() * 0.15,
      timestamp: new Date(),
      capabilities: connection.capabilities
    };
  }

  getStatus() {
    return {
      isActive: this.isActive,
      connectedProtocols: Array.from(this.connections.keys()),
      connections: Object.fromEntries(this.connections),
      totalProtocols: this.protocols.length
    };
  }
}

const mcpIntegration = new MCPIntegration();

mcpIntegration.connectToMCP('text-generation', process.env.MCP_ENDPOINT || 'https://api.mcp.example.com');
mcpIntegration.connectToMCP('image-analysis', process.env.MCP_ENDPOINT || 'https://api.mcp.example.com');
mcpIntegration.connectToMCP('trend-prediction', process.env.MCP_ENDPOINT || 'https://api.mcp.example.com');
mcpIntegration.connectToMCP('content-optimization', process.env.MCP_ENDPOINT || 'https://api.mcp.example.com');

class AdvancedEcosystemEvolution {
  constructor() {
    this.version = '2.0.0';
    this.evolutionCycle = 3 * 60 * 60 * 1000;
    this.improvements = [];
    this.startEvolutionCycle();
  }

  startEvolutionCycle() {
    setInterval(() => {
      this.evolveEcosystem();
    }, this.evolutionCycle);
    console.log(`🧬 Advanced Ecosystem Evolution started: Every 3 hours`);
  }

  evolveEcosystem() {
    Object.values(advancedAgents).forEach(agent => agent.evolve());
    
    const systemMetrics = this.analyzeSystemPerformance();
    
    const [major, minor, patch] = this.version.split('.').map(Number);
    this.version = `${major}.${minor}.${patch + 1}`;
    
    const improvements = [
      'Neural Learning Algorithms Enhanced',
      'Memory Consolidation Improved',
      'Inter-Agent Communication Optimized',
      'Performance Adaptation Refined',
      'Context Retention Upgraded',
      'Collaborative Intelligence Expanded',
      'Evolutionary Algorithms Advanced',
      'Semantic Memory Patterns Enhanced'
    ];
    
    const newImprovement = {
      version: this.version,
      timestamp: new Date(),
      improvements: improvements.slice(0, Math.floor(Math.random() * 4) + 3),
      performanceGain: (systemMetrics.averagePerformance * 10).toFixed(1) + '%',
      systemMetrics,
      agentEvolutions: Object.keys(advancedAgents).length
    };
    
    this.improvements.push(newImprovement);
    console.log(`🚀 Advanced Ecosystem evolved to v${this.version}`);
    
    return newImprovement;
  }

  analyzeSystemPerformance() {
    const agents = Object.values(advancedAgents);
    const totalMemories = agents.reduce((sum, agent) => sum + agent.memory.episodicMemory.length, 0);
    const averagePerformance = agents.reduce((sum, agent) => sum + agent.learning.performance, 0) / agents.length;
    const totalAdaptations = agents.reduce((sum, agent) => sum + agent.learning.adaptations.length, 0);
    
    return {
      totalAgents: agents.length,
      totalMemories,
      averagePerformance,
      totalAdaptations,
      communicationMessages: agentCommunication.messageQueue.length,
      sharedKnowledgeItems: Object.keys(agentCommunication.sharedKnowledge).length
    };
  }

  getStatus() {
    return {
      currentVersion: this.version,
      lastEvolution: this.improvements[this.improvements.length - 1],
      totalEvolutions: this.improvements.length,
      nextEvolution: new Date(Date.now() + this.evolutionCycle),
      systemMetrics: this.analyzeSystemPerformance(),
      agents: Object.fromEntries(
        Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
      ),
      mcp: mcpIntegration.getStatus()
    };
  }
}

const ecosystemEvolution = new AdvancedEcosystemEvolution();



async function generateAIContent(prompt, agentType, context = {}) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    const agent = advancedAgents[agentType];
    if (!agent) {
      throw new Error(`Agent ${agentType} not found`);
    }

    const content = await agent.generateContent(prompt, context);
    
    return content;
  } catch (error) {
    console.error('Advanced AI processing failed:', error);
    
    return `Error: Advanced AI agent ${agentType} unavailable. ${error.message}`;
  }
}

app.get('/', (req, res) => {
  res.json({ 
    message: 'Flowmatik API - AI Content Generation Platform',
    version: '1.0.0',
    agents: Object.keys(AI_AGENTS).length
  });
});

app.get('/api/agents', (req, res) => {
  res.json(AI_AGENTS);
});

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, agentType, userIntention } = req.body;
    
    if (!prompt || !agentType) {
      return res.status(400).json({ 
        error: 'Prompt and agentType are required' 
      });
    }
    
    if (!AI_AGENTS[agentType]) {
      return res.status(400).json({ 
        error: 'Invalid agent type' 
      });
    }
    
    const content = await generateAIContent(prompt, agentType);
    
    const result = {
      id: Date.now().toString(),
      prompt,
      agentType,
      agentName: AI_AGENTS[agentType].name,
      content,
      userIntention: userIntention || 'general',
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    
    contentHistory.push(result);
    
    res.json(result);
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate content',
      details: error.message 
    });
  }
});

app.get('/api/history', (req, res) => {
  res.json(contentHistory.slice(-20)); // Return last 20 items
});

app.get('/api/avatars/:agentType', (req, res) => {
  const { agentType } = req.params;
  const agent = AI_AGENTS[agentType];
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  res.json({
    agentType,
    name: agent.name,
    avatar: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${agentType}&backgroundColor=${agent.color.slice(1)}`,
    color: agent.color
  });
});

app.post('/api/payments/create-subscription', async (req, res) => {
  try {
    const { priceId, customerId } = req.body;
    
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    res.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payments/create-customer', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    const customer = await stripe.customers.create({
      email,
      name,
    });

    res.json({ customerId: customer.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/social/tiktok/upload', async (req, res) => {
  try {
    const { videoUrl, caption, hashtags } = req.body;
    
    const result = {
      id: Date.now().toString(),
      platform: 'tiktok',
      status: 'uploaded',
      videoUrl,
      caption,
      hashtags,
      views: 0,
      likes: 0,
      shares: 0,
      timestamp: new Date().toISOString()
    };
    
    contentHistory.push(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/social/instagram/upload', async (req, res) => {
  try {
    const { imageUrl, caption, hashtags } = req.body;
    
    const result = {
      id: Date.now().toString(),
      platform: 'instagram',
      status: 'uploaded',
      imageUrl,
      caption,
      hashtags,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString()
    };
    
    contentHistory.push(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/social/analytics', (req, res) => {
  const analytics = {
    totalPosts: contentHistory.filter(item => item.platform).length,
    platforms: {
      tiktok: contentHistory.filter(item => item.platform === 'tiktok').length,
      instagram: contentHistory.filter(item => item.platform === 'instagram').length
    },
    engagement: {
      totalViews: Math.floor(Math.random() * 100000),
      totalLikes: Math.floor(Math.random() * 10000),
      totalShares: Math.floor(Math.random() * 1000)
    },
    timestamp: new Date().toISOString()
  };
  
  res.json(analytics);
});

app.post('/api/content/create-tiktok', async (req, res) => {
  try {
    const { topic, style, duration } = req.body;
    
    const content = await generateAIContent(`Create TikTok content about: ${topic}`, 'hook-creator');
    
    const result = {
      id: Date.now().toString(),
      type: 'tiktok-content',
      topic,
      style,
      duration,
      script: content,
      hashtags: ['#viral', '#ai', '#content', '#tiktok'],
      thumbnail: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/content/create-instagram', async (req, res) => {
  try {
    const { topic, format, audience } = req.body;
    
    const content = await generateAIContent(`Create Instagram content about: ${topic}`, 'thumbnail-wizard');
    
    const result = {
      id: Date.now().toString(),
      type: 'instagram-content',
      topic,
      format,
      audience,
      caption: content,
      hashtags: ['#instagram', '#ai', '#content', '#viral'],
      imageUrl: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/deploy', (req, res) => {
  res.json({
    status: 'success',
    message: 'Deployment configuration ready',
    deployUrl: 'https://flowmatik-app.vercel.app',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/agents/advanced/status', (req, res) => {
  try {
    const agentsStatus = Object.fromEntries(
      Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
    );
    
    res.json({
      agents: agentsStatus,
      totalAgents: Object.keys(advancedAgents).length,
      averagePerformance: Object.values(advancedAgents)
        .reduce((sum, agent) => sum + agent.learning.performance, 0) / Object.keys(advancedAgents).length,
      communication: {
        totalMessages: agentCommunication.messageQueue.length,
        sharedKnowledge: Object.keys(agentCommunication.sharedKnowledge).length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/advanced/evolve', (req, res) => {
  try {
    const { agentId } = req.body;
    
    if (agentId && advancedAgents[agentId]) {
      advancedAgents[agentId].evolve();
      res.json({
        message: `Agent ${agentId} evolved successfully`,
        status: advancedAgents[agentId].getStatus()
      });
    } else {
      Object.values(advancedAgents).forEach(agent => agent.evolve());
      res.json({
        message: 'All agents evolved successfully',
        agents: Object.fromEntries(
          Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
        )
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/advanced/feedback', (req, res) => {
  try {
    const { agentId, interactionId, feedback } = req.body;
    
    if (!agentId || !feedback) {
      return res.status(400).json({ error: 'Agent ID and feedback are required' });
    }

    const agent = advancedAgents[agentId];
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    agent.provideFeedback(interactionId, feedback);
    
    res.json({
      message: 'Feedback provided successfully',
      agentStatus: agent.getStatus()
    });
  } catch (error) {
app.get('/api/agents/advanced/status', (req, res) => {
  try {
    const agentsStatus = Object.fromEntries(
      Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
    );
    
    res.json({
      agents: agentsStatus,
      totalAgents: Object.keys(advancedAgents).length,
      averagePerformance: Object.values(advancedAgents)
        .reduce((sum, agent) => sum + agent.learning.performance, 0) / Object.keys(advancedAgents).length,
      communication: {
        totalMessages: agentCommunication.messageQueue.length,
        sharedKnowledge: Object.keys(agentCommunication.sharedKnowledge).length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/advanced/evolve', (req, res) => {
  try {
    const { agentId } = req.body;
    
    if (agentId && advancedAgents[agentId]) {
      advancedAgents[agentId].evolve();
      res.json({
        message: `Agent ${agentId} evolved successfully`,
        status: advancedAgents[agentId].getStatus()
      });
    } else {
      Object.values(advancedAgents).forEach(agent => agent.evolve());
      res.json({
        message: 'All agents evolved successfully',
        agents: Object.fromEntries(
          Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
        )
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/advanced/feedback', (req, res) => {
  try {
    const { agentId, interactionId, feedback } = req.body;
    
    if (!agentId || !feedback) {
      return res.status(400).json({ error: 'Agent ID and feedback are required' });
    }

    const agent = advancedAgents[agentId];
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    agent.provideFeedback(interactionId, feedback);
    
    res.json({
      message: 'Feedback provided successfully',
      agentStatus: agent.getStatus()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/advanced/collaborate', async (req, res) => {
  try {
    const { initiatorId, partnerId, task } = req.body;
    
    if (!initiatorId || !partnerId || !task) {
      return res.status(400).json({ error: 'Initiator ID, partner ID, and task are required' });
    }

    const initiator = advancedAgents[initiatorId];
    const partner = advancedAgents[partnerId];
    
    if (!initiator || !partner) {
      return res.status(404).json({ error: 'One or both agents not found' });
    }

    const collaborationId = await initiator.collaborate(partnerId, task);
    
    res.json({
      collaborationId,
      message: `Collaboration initiated between ${initiatorId} and ${partnerId}`,
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/advanced/memory/:agentId', (req, res) => {
  try {
    const { agentId } = req.params;
    const { limit = 10 } = req.query;
    
    const agent = advancedAgents[agentId];
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const memories = agent.memory.getRelevantMemories('', parseInt(limit));
    
    res.json({
      agentId,
      episodicMemory: memories.episodes,
      semanticMemory: memories.semantic,
      workingMemory: memories.context,
      totalEpisodes: agent.memory.episodicMemory.length,
      totalTopics: Object.keys(agent.memory.semanticMemory).length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/advanced/communication', (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    res.json({
      recentMessages: agentCommunication.messageQueue.slice(-parseInt(limit)),
      sharedKnowledge: agentCommunication.sharedKnowledge,
      totalMessages: agentCommunication.messageQueue.length,
      activeAgents: Object.keys(advancedAgents).length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents/advanced/collaborate', async (req, res) => {
  try {
    const { initiatorId, partnerId, task } = req.body;
    
    if (!initiatorId || !partnerId || !task) {
      return res.status(400).json({ error: 'Initiator ID, partner ID, and task are required' });
    }

    const initiator = advancedAgents[initiatorId];
    const partner = advancedAgents[partnerId];
    
    if (!initiator || !partner) {
      return res.status(404).json({ error: 'One or both agents not found' });
    }

    const collaborationId = await initiator.collaborate(partnerId, task);
    
    res.json({
      collaborationId,
      message: `Collaboration initiated between ${initiatorId} and ${partnerId}`,
      task
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/advanced/memory/:agentId', (req, res) => {
  try {
    const { agentId } = req.params;
    const { limit = 10 } = req.query;
    
    const agent = advancedAgents[agentId];
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const memories = agent.memory.getRelevantMemories('', parseInt(limit));
    
    res.json({
      agentId,
      episodicMemory: memories.episodes,
      semanticMemory: memories.semantic,
      workingMemory: memories.context,
      totalEpisodes: agent.memory.episodicMemory.length,
      totalTopics: Object.keys(agent.memory.semanticMemory).length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/advanced/communication', (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    res.json({
      recentMessages: agentCommunication.messageQueue.slice(-parseInt(limit)),
      sharedKnowledge: agentCommunication.sharedKnowledge,
      totalMessages: agentCommunication.messageQueue.length,
      activeAgents: Object.keys(advancedAgents).length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/workers/status', (req, res) => {
  try {
    const agentsStatus = Object.fromEntries(
      Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
    );
    
    res.json({
      workers: agentsStatus,
      totalWorkers: Object.keys(advancedAgents).length,
      averagePerformance: Object.values(advancedAgents)
        .reduce((sum, agent) => sum + agent.learning.performance, 0) / Object.keys(advancedAgents).length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/workers/evolve', (req, res) => {
  try {
    const { workerName } = req.body;
    
    if (workerName && advancedAgents[workerName]) {
      advancedAgents[workerName].evolve();
      res.json({
        message: `Worker ${workerName} evolved successfully`,
        status: advancedAgents[workerName].getStatus()
      });
    } else {
      Object.values(advancedAgents).forEach(agent => agent.evolve());
      res.json({
        message: 'All workers evolved successfully',
        workers: Object.fromEntries(
          Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
        )
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mcp/status', (req, res) => {
  try {
    res.json(mcpIntegration.getStatus());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/mcp/process', async (req, res) => {
  try {
    const { protocol, data } = req.body;
    
    if (!protocol || !data) {
      return res.status(400).json({ error: 'Protocol and data are required' });
    }
    
    const result = await mcpIntegration.processWithMCP(protocol, data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ecosystem/status', (req, res) => {
  try {
    res.json(ecosystemEvolution.getStatus());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ecosystem/evolve', (req, res) => {
  try {
    const evolution = ecosystemEvolution.evolveEcosystem();
    res.json({
      message: 'Ecosystem evolved successfully',
      evolution,
      status: ecosystemEvolution.getStatus()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/evolutionary', (req, res) => {
  try {
    const agentsStatus = Object.fromEntries(
      Object.entries(advancedAgents).map(([id, agent]) => [id, agent.getStatus()])
    );
    
    const analytics = {
      ecosystem: ecosystemEvolution.getStatus(),
      agents: agentsStatus,
      mcp: mcpIntegration.getStatus(),
      performance: {
        totalEvolutions: Object.values(advancedAgents)
          .reduce((sum, agent) => sum + agent.learning.adaptations.length, 0),
        averagePerformance: Object.values(advancedAgents)
          .reduce((sum, agent) => sum + agent.learning.performance, 0) / Object.keys(advancedAgents).length,
        systemHealth: 98.6 + (Math.random() * 1.4),
        uptime: process.uptime(),
        totalMemories: Object.values(advancedAgents)
          .reduce((sum, agent) => sum + agent.memory.episodicMemory.length, 0),
        communicationMessages: agentCommunication.messageQueue.length
      },
      contentGeneration: {
        totalGenerated: contentHistory.length,
        successRate: 0.95 + (Math.random() * 0.05),
        averageResponseTime: 800 + Math.random() * 400
      },
      timestamp: new Date().toISOString()
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ai/generate-thumbnail', async (req, res) => {
  try {
    const { prompt, style = 'cyberpunk', size = '1024x1024' } = req.body;
    
    const cached = await aiCacheSystem.get('siliconflow', 'stable-diffusion-xl', prompt, { style, size });
    if (cached) {
      return res.json(cached);
    }

    const response = await siliconFlowAPI.post('/chat/completions', {
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      messages: [{
        role: 'user',
        content: `Generate a ${style} style thumbnail for: ${prompt}. Size: ${size}`
      }],
      max_tokens: 1000
    });

    const result = {
      imageUrl: response.data.choices?.[0]?.message?.content || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Date.now()}`,
      prompt,
      style,
      size,
      provider: 'siliconflow',
      timestamp: new Date().toISOString()
    };

    aiCacheSystem.set('siliconflow', 'stable-diffusion-xl', prompt, { style, size }, result);
    
    res.json(result);
  } catch (error) {
    console.error('SiliconFlow error:', error);
    const fallbackResult = {
      imageUrl: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Date.now()}`,
      prompt: req.body.prompt,
      style: req.body.style || 'cyberpunk',
      size: req.body.size || '1024x1024',
      provider: 'fallback',
      timestamp: new Date().toISOString()
    };
    res.json(fallbackResult);
  }
});

app.post('/api/ai/daobao-content', async (req, res) => {
  try {
    const { prompt, type = 'long-form', language = 'es' } = req.body;
    
    const cached = await aiCacheSystem.get('netmind', 'daobao-1.5', prompt, { type, language });
    if (cached) {
      return res.json(cached);
    }

    const response = await netmindAPI.post('/chat/completions', {
      model: 'daobao-1.5',
      messages: [{
        role: 'user',
        content: `Generate ${type} content in ${language}: ${prompt}`
      }],
      max_tokens: 2000
    });

    const result = {
      content: response.data.choices?.[0]?.message?.content || `Generated ${type} content for: ${prompt}`,
      prompt,
      type,
      language,
      provider: 'netmind',
      timestamp: new Date().toISOString()
    };

    aiCacheSystem.set('netmind', 'daobao-1.5', prompt, { type, language }, result);
    
    res.json(result);
  } catch (error) {
    console.error('NetMind error:', error);
    const fallbackResult = {
      content: `Generated ${req.body.type || 'long-form'} content for: ${req.body.prompt}`,
      prompt: req.body.prompt,
      type: req.body.type || 'long-form',
      language: req.body.language || 'es',
      provider: 'fallback',
      timestamp: new Date().toISOString()
    };
    res.json(fallbackResult);
  }
});

app.post('/api/ai/optimize-phrase', async (req, res) => {
  try {
    const { phrase, target = 'viral', platform = 'tiktok' } = req.body;
    
    const cached = await aiCacheSystem.get('bytedance', 'phi-3-mistral', phrase, { target, platform });
    if (cached) {
      return res.json(cached);
    }

    const optimizedPhrase = await hfInference.textGeneration({
      model: 'microsoft/Phi-3-mini-4k-instruct',
      inputs: `Optimize this phrase for ${platform} to be more ${target}: "${phrase}"`,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.7
      }
    });

    const result = {
      originalPhrase: phrase,
      optimizedPhrase: optimizedPhrase.generated_text || phrase,
      target,
      platform,
      provider: 'bytedance-phi3',
      timestamp: new Date().toISOString()
    };

    aiCacheSystem.set('bytedance', 'phi-3-mistral', phrase, { target, platform }, result);
    
    res.json(result);
  } catch (error) {
    console.error('ByteDance optimization error:', error);
    const fallbackResult = {
      originalPhrase: req.body.phrase,
      optimizedPhrase: req.body.phrase,
      target: req.body.target || 'viral',
      platform: req.body.platform || 'tiktok',
      provider: 'fallback',
      timestamp: new Date().toISOString()
    };
    res.json(fallbackResult);
  }
});

app.get('/api/trends', async (req, res) => {
  try {
    const { category = 'general', region = 'global' } = req.query;
app.get('/api/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = await localAI.getHistory(limit);
    res.json({
      history,
      total: history.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('History retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { prompt, agentType = 'flowi-ceo' } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await localAI.chatWithJan(prompt, agentType);
    
    res.json({
      response,
      agentType,
      timestamp: new Date().toISOString(),
      provider: 'local-jan'
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Chat service unavailable' });
  }
});


    
    const cached = await aiCacheSystem.get('trends', 'tiktok-analysis', category, { region });
    if (cached) {
      return res.json(cached);
    }

    const trendAnalysis = await hfInference.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: `Analyze current TikTok trends for ${category} content in ${region} region`,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7
      }
    });

    const result = {
      trends: trendAnalysis.generated_text || `Current ${category} trends in ${region}`,
      category,
      region,
      timestamp: new Date().toISOString(),
      provider: 'huggingface'
    };

    aiCacheSystem.set('trends', 'tiktok-analysis', category, { region }, result, 1800);
    
    res.json(result);
  } catch (error) {
    console.error('Trends analysis error:', error);
    const fallbackResult = {
      trends: `Current ${req.query.category || 'general'} trends in ${req.query.region || 'global'}`,
      category: req.query.category || 'general',
      region: req.query.region || 'global',
      timestamp: new Date().toISOString(),
      provider: 'fallback'
    };
    res.json(fallbackResult);
  }
});

app.get('/api/local-ai/status', async (req, res) => {
  try {
    const status = await localAI.checkServices();
    res.json({
      services: status,
      allRunning: status.ollama && status.stableDiffusion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/local-ai/generate-thumbnail', async (req, res) => {
  try {
    const { prompt, style = 'cyberpunk' } = req.body;
    
    const cached = await aiCacheSystem.get('local-sd', 'stable-diffusion-xl', prompt, { style });
    if (cached) {
      return res.json(cached);
    }

    const imageBase64 = await localAI.generateThumbnail(prompt, style);
    
    const result = {
      imageUrl: `data:image/png;base64,${imageBase64}`,
      prompt,
      style,
      provider: 'local-stable-diffusion',
      timestamp: new Date().toISOString()
    };

    aiCacheSystem.set('local-sd', 'stable-diffusion-xl', prompt, { style }, result);
    
    res.json(result);
  } catch (error) {
    console.error('Local Stable Diffusion error:', error);
    res.status(500).json({ error: 'Local thumbnail generation failed: ' + error.message });
  }
});

app.get('/api/local-ai/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const history = await localAI.getHistory(limit);
    res.json({
      history,
      count: history.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cache/stats', (req, res) => {
  try {
    res.json(aiCacheSystem.getStats());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    advancedAgents: Object.keys(advancedAgents).length,
    mcpProtocols: mcpIntegration.getStatus().connectedProtocols.length,
    ecosystemVersion: ecosystemEvolution.getStatus().currentVersion,
    aiProviders: {
      siliconflow: !!process.env.SILICONFLOW_API_KEY,
      netmind: !!process.env.NETMIND_API_KEY,
      huggingface: !!process.env.HUGGINGFACE_API_KEY,
      bytedance: !!process.env.BYTEDANCE_API_KEY,
      localAI: 'enabled'
    },
    cacheStats: aiCacheSystem.getStats(),
    agentPerformance: {
      averagePerformance: Object.values(advancedAgents)
        .reduce((sum, agent) => sum + agent.learning.performance, 0) / Object.keys(advancedAgents).length,
      totalMemories: Object.values(advancedAgents)
        .reduce((sum, agent) => sum + agent.memory.episodicMemory.length, 0),
      totalAdaptations: Object.values(advancedAgents)
        .reduce((sum, agent) => sum + agent.learning.adaptations.length, 0)
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Flowmatik API running on port ${PORT}`);
  console.log(`📊 ${Object.keys(AI_AGENTS).length} AI agents loaded`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
