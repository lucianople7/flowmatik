
const aiAgents = [
  {
    id: 'flowi-ceo',
    name: 'FLOWI CEO',
    role: 'Strategic Objectives',
    description: 'Define objetivos estratégicos y visión general',
    color: '#ff1493',
    avatar: 'ceo'
  },
  {
    id: 'hook-creator',
    name: 'HOOK CREATOR',
    role: 'Viral Content',
    description: 'Genera frases iniciales impactantes y virales',
    color: '#00ffff',
    avatar: 'hook'
  },
  {
    id: 'thumbnail-wizard',
    name: 'THUMBNAIL WIZARD',
    role: 'Visual Design',
    description: 'Crea miniaturas atractivas y optimizadas',
    color: '#8a2be2',
    avatar: 'wizard'
  },
  {
    id: 'editor-pro',
    name: 'EDITOR PRO',
    role: 'Content Optimization',
    description: 'Revisa y optimiza todo el contenido',
    color: '#ff8c00',
    avatar: 'editor'
  },
  {
    id: 'trend-researcher',
    name: 'TREND RESEARCHER',
    role: 'Market Analysis',
    description: 'Analiza tendencias de redes sociales',
    color: '#00ff7f',
    avatar: 'researcher'
  },
  {
    id: 'optimizer',
    name: 'OPTIMIZER',
    role: 'Performance',
    description: 'Mejora el rendimiento del contenido',
    color: '#ffd700',
    avatar: 'optimizer'
  },
  {
    id: 'data-master',
    name: 'DATA MASTER',
    role: 'Analytics',
    description: 'Gestiona datos y métricas avanzadas',
    color: '#ff4500',
    avatar: 'data'
  },
  {
    id: 'growth-expert',
    name: 'GROWTH EXPERT',
    role: 'Expansion',
    description: 'Expande alcance y crecimiento',
    color: '#9370db',
    avatar: 'growth'
  }
]

const getAvatarComponent = (avatarType: string, color: string) => {
  const create3DRobotSVG = (uniqueFeatures: JSX.Element, headShape: string = "round") => (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id={`robotGradient3D-${avatarType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="30%" stopColor={`${color}cc`} />
          <stop offset="70%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}88`} />
        </linearGradient>
        <linearGradient id={`bodyGradient3D-${avatarType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a1a3a" />
          <stop offset="50%" stopColor="#2a0a2a" />
          <stop offset="100%" stopColor="#1a051a" />
        </linearGradient>
        <linearGradient id={`metalGradient-${avatarType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="50%" stopColor="#333" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <filter id={`glow3D-${avatarType}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`innerShadow-${avatarType}`}>
          <feOffset dx="1" dy="1"/>
          <feGaussianBlur stdDeviation="1" result="offset-blur"/>
          <feFlood floodColor="#000000" floodOpacity="0.4"/>
          <feComposite in2="offset-blur" operator="in"/>
        </filter>
      </defs>
      
      {/* Robot Body - 3D Style */}
      <ellipse cx="50" cy="70" rx="22" ry="18" fill={`url(#bodyGradient3D-${avatarType})`} stroke={color} strokeWidth="1.5"/>
      <ellipse cx="50" cy="68" rx="18" ry="15" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1" filter={`url(#glow3D-${avatarType})`}/>
      
      {/* Body Panel */}
      <rect x="42" y="62" width="16" height="12" rx="3" fill="#1a051a" stroke={color} strokeWidth="0.5"/>
      <rect x="44" y="64" width="12" height="8" rx="2" fill={color} opacity="0.3"/>
      
      {/* Robot Head - Different Shapes */}
      {headShape === "square" ? (
        <rect x="35" y="25" width="30" height="25" rx="8" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="2" filter={`url(#glow3D-${avatarType})`}/>
      ) : headShape === "hexagon" ? (
        <polygon points="50,25 60,30 60,45 50,50 40,45 40,30" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="2" filter={`url(#glow3D-${avatarType})`}/>
      ) : (
        <ellipse cx="50" cy="37" rx="18" ry="20" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="2" filter={`url(#glow3D-${avatarType})`}/>
      )}
      
      {/* Head Inner Panel */}
      {headShape === "square" ? (
        <rect x="38" y="28" width="24" height="19" rx="5" fill="#1a051a" stroke={color} strokeWidth="0.5"/>
      ) : headShape === "hexagon" ? (
        <polygon points="50,28 57,32 57,42 50,46 43,42 43,32" fill="#1a051a" stroke={color} strokeWidth="0.5"/>
      ) : (
        <ellipse cx="50" cy="37" rx="14" ry="16" fill="#1a051a" stroke={color} strokeWidth="0.5"/>
      )}
      
      {/* Visor/Eye Area */}
      <ellipse cx="50" cy="35" rx="12" ry="6" fill="#000" stroke="#00ffff" strokeWidth="1" opacity="0.8"/>
      
      {/* Eyes - Large and Glowing */}
      <circle cx="44" cy="35" r="4" fill="#00ffff" className="animate-pulse">
        <animate attributeName="fill" values="#00ffff;{color};#00ffff" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="56" cy="35" r="4" fill="#00ffff" className="animate-pulse">
        <animate attributeName="fill" values="#00ffff;{color};#00ffff" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      
      {/* Eye Glow */}
      <circle cx="44" cy="35" r="6" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="56" cy="35" r="6" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.4"/>
      
      {/* Mouth/Speaker */}
      <rect x="46" y="42" width="8" height="3" rx="1.5" fill={color}/>
      <line x1="47" y1="43" x2="47" y2="44" stroke={`${color}cc`} strokeWidth="0.5"/>
      <line x1="49" y1="43" x2="49" y2="44" stroke={`${color}cc`} strokeWidth="0.5"/>
      <line x1="51" y1="43" x2="51" y2="44" stroke={`${color}cc`} strokeWidth="0.5"/>
      <line x1="53" y1="43" x2="53" y2="44" stroke={`${color}cc`} strokeWidth="0.5"/>
      
      {/* Arms - 3D Positioned */}
      <ellipse cx="28" cy="60" rx="6" ry="12" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1" transform="rotate(-15 28 60)"/>
      <ellipse cx="72" cy="60" rx="6" ry="12" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1" transform="rotate(15 72 60)"/>
      
      {/* Hands */}
      <circle cx="22" cy="70" r="5" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1"/>
      <circle cx="78" cy="70" r="5" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1"/>
      
      {/* Legs */}
      <rect x="42" y="85" width="6" height="12" rx="3" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1"/>
      <rect x="52" y="85" width="6" height="12" rx="3" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1"/>
      
      {/* Feet */}
      <ellipse cx="45" cy="99" rx="7" ry="3" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1"/>
      <ellipse cx="55" cy="99" rx="7" ry="3" fill={`url(#robotGradient3D-${avatarType})`} stroke={color} strokeWidth="1"/>
      
      {/* Status Lights */}
      <circle cx="40" cy="38" r="1.5" fill="#00ff00" className="animate-pulse"/>
      <circle cx="60" cy="38" r="1.5" fill="#ffff00" className="animate-pulse"/>
      
      {uniqueFeatures}
    </svg>
  )
  
  switch (avatarType) {
    case 'ceo':
      return create3DRobotSVG(
        <>
          <line x1="50" y1="25" x2="50" y2="15" stroke={color} strokeWidth="3"/>
          <circle cx="50" cy="12" r="3" fill="#00ffff" className="animate-pulse"/>
          <line x1="45" y1="27" x2="45" y2="20" stroke={color} strokeWidth="2"/>
          <circle cx="45" cy="18" r="2" fill={color} className="animate-pulse"/>
          <line x1="55" y1="27" x2="55" y2="20" stroke={color} strokeWidth="2"/>
          <circle cx="55" cy="18" r="2" fill={color} className="animate-pulse"/>
          <rect x="48" y="30" width="4" height="2" fill="#ffd700"/>
          <circle cx="50" cy="68" r="3" fill="#00ffff" className="animate-pulse"/>
        </>, "round"
      )
    case 'hook':
      return create3DRobotSVG(
        <>
          <path d="M44 25 Q50 18 56 25" stroke={color} strokeWidth="3" fill="none"/>
          <circle cx="50" cy="16" r="2.5" fill={color} className="animate-pulse"/>
          <rect x="42" y="47" width="2" height="4" fill={color}/>
          <rect x="46" y="47" width="2" height="4" fill={color}/>
          <rect x="50" y="47" width="2" height="4" fill={color}/>
          <rect x="54" y="47" width="2" height="4" fill={color}/>
          <rect x="58" y="47" width="2" height="4" fill={color}/>
          <circle cx="50" cy="68" r="2" fill={color} className="animate-pulse"/>
        </>, "round"
      )
    case 'wizard':
      return create3DRobotSVG(
        <>
          <polygon points="50,15 46,25 54,25" fill={color} stroke="#ffd700" strokeWidth="2"/>
          <circle cx="50" cy="12" r="3" fill="#ffd700" className="animate-pulse"/>
          <polygon points="48,20 50,15 52,20" fill="#8a2be2"/>
          <rect x="38" y="32" width="4" height="1" fill={color}/>
          <rect x="58" y="32" width="4" height="1" fill={color}/>
          <circle cx="42" cy="40" r="1" fill="#8a2be2" className="animate-pulse"/>
          <circle cx="58" cy="40" r="1" fill="#8a2be2" className="animate-pulse"/>
          <circle cx="50" cy="68" r="2" fill="#8a2be2" className="animate-pulse"/>
        </>, "hexagon"
      )
    case 'editor':
      return create3DRobotSVG(
        <>
          <rect x="40" y="47" width="20" height="1" fill={color}/>
          <rect x="40" y="49" width="16" height="1" fill={color} opacity="0.7"/>
          <rect x="40" y="51" width="18" height="1" fill={color} opacity="0.5"/>
          <rect x="40" y="53" width="14" height="1" fill={color} opacity="0.3"/>
          <circle cx="38" cy="32" r="1" fill="#ff8c00" className="animate-pulse"/>
          <circle cx="62" cy="32" r="1" fill="#ff8c00" className="animate-pulse"/>
          <rect x="47" y="28" width="6" height="1" fill="#00ffff"/>
          <circle cx="50" cy="68" r="2" fill="#ff8c00" className="animate-pulse"/>
        </>, "square"
      )
    case 'researcher':
      return create3DRobotSVG(
        <>
          <rect x="40" y="47" width="2" height="5" fill={color}/>
          <rect x="44" y="45" width="2" height="7" fill={color}/>
          <rect x="48" y="43" width="2" height="9" fill={color}/>
          <rect x="52" y="44" width="2" height="8" fill={color}/>
          <rect x="56" y="46" width="2" height="6" fill={color}/>
          <rect x="60" y="48" width="2" height="4" fill={color}/>
          <circle cx="38" cy="32" r="1" fill="#00ff7f" className="animate-pulse"/>
          <circle cx="62" cy="32" r="1" fill="#00ff7f" className="animate-pulse"/>
          <circle cx="50" cy="68" r="2" fill="#00ff7f" className="animate-pulse"/>
        </>, "square"
      )
    case 'optimizer':
      return create3DRobotSVG(
        <>
          <circle cx="50" cy="40" r="8" fill="none" stroke={color} strokeWidth="2"/>
          <polygon points="50,35 53,40 50,45 47,40" fill={color} className="animate-pulse"/>
          <line x1="42" y1="40" x2="58" y2="40" stroke={color} strokeWidth="2"/>
          <line x1="50" y1="32" x2="50" y2="48" stroke={color} strokeWidth="2"/>
          <circle cx="38" cy="32" r="1" fill="#ffd700" className="animate-pulse"/>
          <circle cx="62" cy="32" r="1" fill="#ffd700" className="animate-pulse"/>
          <circle cx="50" cy="68" r="2" fill="#ffd700" className="animate-pulse"/>
        </>, "round"
      )
    case 'data':
      return create3DRobotSVG(
        <>
          <rect x="40" y="49" width="1.5" height="4" fill={color}/>
          <rect x="43" y="47" width="1.5" height="6" fill={color}/>
          <rect x="46" y="45" width="1.5" height="8" fill={color}/>
          <rect x="49" y="46" width="1.5" height="7" fill={color}/>
          <rect x="52" y="48" width="1.5" height="5" fill={color}/>
          <rect x="55" y="50" width="1.5" height="3" fill={color}/>
          <rect x="58" y="51" width="1.5" height="2" fill={color}/>
          <circle cx="38" cy="32" r="1" fill="#ff4500" className="animate-pulse"/>
          <circle cx="62" cy="32" r="1" fill="#ff4500" className="animate-pulse"/>
          <circle cx="50" cy="68" r="2" fill="#ff4500" className="animate-pulse"/>
        </>, "square"
      )
    case 'growth':
      return create3DRobotSVG(
        <>
          <path d="M40 50 L44 46 L48 48 L52 44 L56 46 L60 42" stroke={color} strokeWidth="3" fill="none"/>
          <polygon points="58,42 60,40 62,44 60,46" fill={color}/>
          <circle cx="40" cy="50" r="1.5" fill={color}/>
          <circle cx="44" cy="46" r="1.5" fill={color}/>
          <circle cx="48" cy="48" r="1.5" fill={color}/>
          <circle cx="52" cy="44" r="1.5" fill={color}/>
          <circle cx="56" cy="46" r="1.5" fill={color}/>
          <circle cx="38" cy="32" r="1" fill="#9370db" className="animate-pulse"/>
          <circle cx="62" cy="32" r="1" fill="#9370db" className="animate-pulse"/>
          <circle cx="50" cy="68" r="2" fill="#9370db" className="animate-pulse"/>
        </>, "hexagon"
      )
    default:
      return create3DRobotSVG(<></>, "round")
  }
}

export default function AITeam() {
  return (
    <section id="ai-team" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your AI Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            8 specialized AI agents working 24/7 to create viral content
          </p>
        </div>

        {/* AI Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group cursor-pointer"
              style={{
                boxShadow: `0 0 20px ${agent.color}20`
              }}
            >
              {/* Avatar */}
              <div className="relative mb-4">
                <div 
                  className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto border-2 group-hover:scale-110 transition-all duration-300 shadow-lg"
                  style={{
                    borderColor: agent.color,
                    backgroundColor: `${agent.color}15`,
                    boxShadow: `0 0 20px ${agent.color}30`
                  }}
                >
                  <div className="w-20 h-20" style={{ color: agent.color }}>
                    {getAvatarComponent(agent.avatar, agent.color)}
                  </div>
                </div>
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse border-2 border-gray-900"
                  style={{ backgroundColor: agent.color }}
                ></div>
                <div 
                  className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full animate-pulse delay-1000 border border-gray-900"
                  style={{ backgroundColor: agent.color, opacity: 0.6 }}
                ></div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 
                  className="text-lg font-bold mb-1"
                  style={{ color: agent.color }}
                >
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3">{agent.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {agent.description}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: agent.color }}
                ></div>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105">
            Activate AI Team
          </button>
        </div>
      </div>
    </section>
  )
}
