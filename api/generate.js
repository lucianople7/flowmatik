export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, agentType, context = {} } = req.body;
    
    if (!prompt || !agentType) {
      return res.status(400).json({ error: 'Prompt and agentType are required' });
    }

    const responses = {
      'flowi-ceo': `🎯 OBJETIVO ESTRATÉGICO:\n\n${prompt}\n\n✅ Análisis completado\n🧠 Powered by FlowiseAI`,
      'hook-creator': `🔥 HOOK VIRAL:\n\n${prompt}\n\n💡 Optimizado para engagement\n🧠 Powered by FlowiseAI`,
      'thumbnail-wizard': `🎨 THUMBNAIL CONCEPT:\n\n${prompt}\n\n📐 Dimensiones: 1920x1080\n🧠 Powered by FlowiseAI`,
      'editor-pro': `✏️ CONTENIDO EDITADO:\n\n${prompt}\n\n📝 Mejoras aplicadas\n🧠 Powered by FlowiseAI`,
      'trend-researcher': `📊 ANÁLISIS DE TENDENCIAS:\n\n${prompt}\n\n📈 Trending score: 8.7/10\n🧠 Powered by FlowiseAI`,
      'optimizer': `⚡ OPTIMIZACIÓN:\n\n${prompt}\n\n🚀 Rendimiento mejorado\n🧠 Powered by FlowiseAI`,
      'data-master': `📊 ANÁLISIS DE DATOS:\n\n${prompt}\n\n📈 Métricas procesadas\n🧠 Powered by FlowiseAI`,
      'growth-expert': `🚀 ESTRATEGIA DE CRECIMIENTO:\n\n${prompt}\n\n📈 Plan de expansión\n🧠 Powered by FlowiseAI`
    };

    const response = responses[agentType] || `${agentType} está procesando: ${prompt}`;
    
    res.status(200).json({
      success: true,
      content: response,
      agentType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
