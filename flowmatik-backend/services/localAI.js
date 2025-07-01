const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class LocalAIService {
  constructor() {
    this.ollamaAPI = axios.create({ 
      baseURL: 'http://localhost:11434',
      timeout: 30000
    });
    this.sdAPI = axios.create({ 
      baseURL: 'http://localhost:7860',
      timeout: 60000
    });
    this.janAPI = axios.create({ 
      baseURL: 'http://localhost:1337',
      timeout: 30000
    });
    this.historyPath = path.join(__dirname, '../data/prompt_history.json');
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    try {
      const dataDir = path.dirname(this.historyPath);
      await fs.mkdir(dataDir, { recursive: true });
      
      try {
        await fs.access(this.historyPath);
      } catch (error) {
        await fs.writeFile(this.historyPath, '[]');
      }
    } catch (error) {
      console.error('Error ensuring data directory:', error);
    }
  }

  async generateWithLlama3(prompt, agentType) {
    try {
      const response = await this.ollamaAPI.post('/api/generate', {
        model: 'llama3.1:8b',
        prompt: `You are ${agentType}. ${prompt}`,
        stream: false
      });
      
      const result = response.data.response;
      await this.saveToHistory(prompt, agentType, result);
      return result;
    } catch (error) {
      console.error('Llama3 generation error:', error);
      throw new Error('Llama3 model unavailable. Please ensure Ollama is running with llama3.1:8b model.');
    }
  }

  async generateWithPhi3(prompt, agentType) {
    try {
      const response = await this.ollamaAPI.post('/api/generate', {
        model: 'phi3:3.8b',
        prompt: `You are ${agentType}. ${prompt}`,
        stream: false
      });
      
      const result = response.data.response;
      await this.saveToHistory(prompt, agentType, result);
      return result;
    } catch (error) {
      console.error('Phi3 generation error:', error);
      throw new Error('Phi3 model unavailable. Please ensure Ollama is running with phi3:3.8b model.');
    }
  }

  async generateThumbnail(prompt, style = 'cyberpunk') {
    try {
      const response = await this.sdAPI.post('/sdapi/v1/txt2img', {
        prompt: `${style} style, ${prompt}, high quality, detailed, professional`,
        negative_prompt: 'blurry, low quality, distorted',
        width: 1024,
        height: 1024,
        steps: 20,
        cfg_scale: 7,
        sampler_name: 'DPM++ 2M Karras'
      });
      
      return response.data.images[0];
    } catch (error) {
      console.error('Stable Diffusion generation error:', error);
      throw new Error('Stable Diffusion unavailable. Please ensure AUTOMATIC1111 WebUI is running on port 7860.');
    }
  }

  async chatWithJan(prompt, agentType) {
    try {
      const response = await this.janAPI.post('/v1/chat/completions', {
        model: 'llama3.1:8b',
        messages: [
          {
            role: 'system',
            content: `You are ${agentType}, an AI agent specialized in content creation for TikTok and Instagram.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });
      
      const result = response.data.choices[0].message.content;
      await this.saveToHistory(prompt, agentType, result);
      return result;
    } catch (error) {
      console.error('Jan chat error:', error);
      return await this.generateWithLlama3(prompt, agentType);
    }
  }

  async saveToHistory(prompt, agentType, response) {
    try {
      let history = [];
      try {
        const data = await fs.readFile(this.historyPath, 'utf8');
        history = JSON.parse(data);
      } catch (error) {
        history = [];
      }
      
      history.push({
        timestamp: new Date().toISOString(),
        prompt,
        agentType,
        response,
        provider: 'local',
        id: Date.now().toString()
      });
      
      if (history.length > 1000) {
        history = history.slice(-1000);
      }
      
      await fs.writeFile(this.historyPath, JSON.stringify(history, null, 2));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  }

  async getHistory(limit = 50) {
    try {
      const data = await fs.readFile(this.historyPath, 'utf8');
      const history = JSON.parse(data);
      return history.slice(-limit);
    } catch (error) {
      console.error('Error reading history:', error);
      return [];
    }
  }

  async checkServices() {
    const status = {
      ollama: false,
      stableDiffusion: false,
      jan: false
    };

    try {
      await this.ollamaAPI.get('/api/tags');
      status.ollama = true;
    } catch (error) {
      console.log('Ollama not available');
    }

    try {
      await this.sdAPI.get('/sdapi/v1/options');
      status.stableDiffusion = true;
    } catch (error) {
      console.log('Stable Diffusion not available');
    }

    try {
      await this.janAPI.get('/v1/models');
      status.jan = true;
    } catch (error) {
      console.log('Jan not available');
    }

    return status;
  }
}

module.exports = LocalAIService;
