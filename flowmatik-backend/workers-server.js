
import { HfInference } from '@huggingface/inference';

const siliconFlowAPI = {
  baseURL: 'https://api.siliconflow.cn/v1',
  headers: {
    'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
    'Content-Type': 'application/json'
  }
};

const netmindAPI = {
  baseURL: 'https://api.netmind.ai/v1',
  headers: {
    'Authorization': `Bearer ${NETMIND_API_KEY}`,
    'Content-Type': 'application/json'
  }
};

class WorkersCache {
  constructor() {
    this.stats = {
      hits: 0,
      misses: 0,
      totalRequests: 0
    };
  }

  generateKey(provider, model, prompt, params = {}) {
    const keyData = { provider, model, prompt, params };
    return btoa(JSON.stringify(keyData));
  }

  async get(provider, model, prompt, params = {}) {
    this.stats.totalRequests++;
    const key = this.generateKey(provider, model, prompt, params);
    
    try {
      const cached = await FLOWMATIK_CACHE.get(key, 'json');
      if (cached) {
        this.stats.hits++;
        console.log(`🎯 Cache HIT for ${provider}/${model}`);
        return cached;
      }
    } catch (error) {
      console.error('Cache get error:', error);
    }
    
    this.stats.misses++;
    console.log(`💫 Cache MISS for ${provider}/${model}`);
    return null;
  }

  async set(provider, model, prompt, params, result, ttl = 3600) {
    const key = this.generateKey(provider, model, prompt, params);
    try {
      await FLOWMATIK_CACHE.put(key, JSON.stringify(result), { expirationTtl: ttl });
      console.log(`💾 Cached result for ${provider}/${model}`);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  getStats() {
    return {
      ...this.stats,
      hitRate: this.stats.totalRequests > 0 ? (this.stats.hits / this.stats.totalRequests * 100).toFixed(2) : 0
    };
  }
}

const workersCache = new WorkersCache();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}

function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}

async function generateThumbnail(request) {
  try {
    const { prompt, style = 'cyberpunk', size = '1024x1024' } = await request.json();
    
    const cached = await workersCache.get('siliconflow', 'stable-diffusion-xl', prompt, { style, size });
    if (cached) {
      return jsonResponse(cached);
    }

    const response = await fetch(`${siliconFlowAPI.baseURL}/chat/completions`, {
      method: 'POST',
      headers: siliconFlowAPI.headers,
      body: JSON.stringify({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        messages: [{
          role: 'user',
          content: `Generate a ${style} style thumbnail for: ${prompt}. Size: ${size}`
        }],
        max_tokens: 1000
      })
    });

    const data = await response.json();
    const result = {
      imageUrl: data.choices[0].message.content,
      prompt,
      style,
      size,
      provider: 'siliconflow',
      timestamp: new Date().toISOString()
    };

    await workersCache.set('siliconflow', 'stable-diffusion-xl', prompt, { style, size }, result);
    
    return jsonResponse(result);
  } catch (error) {
    console.error('SiliconFlow error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
}

async function generateDaobaoContent(request) {
  try {
    const { prompt, type = 'long-form', language = 'es' } = await request.json();
    
    const cached = await workersCache.get('netmind', 'daobao-1.5', prompt, { type, language });
    if (cached) {
      return jsonResponse(cached);
    }

    const response = await fetch(`${netmindAPI.baseURL}/chat/completions`, {
      method: 'POST',
      headers: netmindAPI.headers,
      body: JSON.stringify({
        model: 'daobao-1.5',
        messages: [{
          role: 'user',
          content: `Generate ${type} content in ${language}: ${prompt}`
        }],
        max_tokens: 2000
      })
    });

    const data = await response.json();
    const result = {
      content: data.choices[0].message.content,
      prompt,
      type,
      language,
      provider: 'netmind',
      timestamp: new Date().toISOString()
    };

    await workersCache.set('netmind', 'daobao-1.5', prompt, { type, language }, result);
    
    return jsonResponse(result);
  } catch (error) {
    console.error('NetMind error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
}

async function analyzeTrends(request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') || 'general';
    const region = url.searchParams.get('region') || 'global';
    
    const cached = await workersCache.get('trends', 'tiktok-analysis', category, { region });
    if (cached) {
      return jsonResponse(cached);
    }

    const hfInference = new HfInference(HUGGINGFACE_API_KEY);
    const trendAnalysis = await hfInference.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: `Analyze current TikTok trends for ${category} content in ${region} region`,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7
      }
    });

    const result = {
      trends: trendAnalysis.generated_text,
      category,
      region,
      timestamp: new Date().toISOString(),
      provider: 'huggingface'
    };

    await workersCache.set('trends', 'tiktok-analysis', category, { region }, result, 1800); // 30 min cache
    
    return jsonResponse(result);
  } catch (error) {
    console.error('Trends analysis error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
}

async function getCacheStats() {
  const stats = workersCache.getStats();
  return jsonResponse({
    cache: stats,
    timestamp: new Date().toISOString(),
    status: 'active'
  });
}

async function healthCheck() {
  return jsonResponse({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: 'cloudflare-workers',
    features: [
      'siliconflow-integration',
      'netmind-integration',
      'huggingface-integration',
      'workers-cache',
      'cors-enabled'
    ]
  });
}

export default {
  async fetch(request, env, ctx) {
    globalThis.SILICONFLOW_API_KEY = env.SILICONFLOW_API_KEY;
    globalThis.NETMIND_API_KEY = env.NETMIND_API_KEY;
    globalThis.HUGGINGFACE_API_KEY = env.HUGGINGFACE_API_KEY;
    globalThis.FLOWMATIK_CACHE = env.FLOWMATIK_CACHE;

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === 'OPTIONS') {
      return handleCORS();
    }

    try {
      if (path === '/api/health') {
        return await healthCheck();
      }
      
      if (path === '/api/cache/stats') {
        return await getCacheStats();
      }
      
      if (path === '/api/ai/generate-thumbnail' && method === 'POST') {
        return await generateThumbnail(request);
      }
      
      if (path === '/api/ai/daobao-content' && method === 'POST') {
        return await generateDaobaoContent(request);
      }
      
      if (path === '/api/trends' && method === 'GET') {
        return await analyzeTrends(request);
      }

      return jsonResponse({ error: 'Not Found' }, 404);
      
    } catch (error) {
      console.error('Request error:', error);
      return jsonResponse({ error: 'Internal Server Error' }, 500);
    }
  }
};
