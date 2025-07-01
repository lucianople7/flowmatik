
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
  const createProfessionalAvatarSVG = (uniqueFeatures: JSX.Element, headShape: string = "round") => (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      <defs>
        <radialGradient id={`mainGradient-${avatarType}`} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="20%" stopColor={color} stopOpacity="1"/>
          <stop offset="60%" stopColor={color} stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6"/>
        </radialGradient>
        <linearGradient id={`metalGradient-${avatarType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a4a4a"/>
          <stop offset="25%" stopColor="#3a3a3a"/>
          <stop offset="50%" stopColor="#2a2a2a"/>
          <stop offset="75%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </linearGradient>
        <linearGradient id={`glowGradient-${avatarType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1"/>
          <stop offset="30%" stopColor="#00ffff" stopOpacity="0.8"/>
          <stop offset="70%" stopColor={color} stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id={`armorGradient-${avatarType}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6a6a6a"/>
          <stop offset="30%" stopColor="#5a5a5a"/>
          <stop offset="70%" stopColor="#3a3a3a"/>
          <stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
        <filter id={`professionalGlow-${avatarType}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id={`innerShadow-${avatarType}`}>
          <feOffset dx="3" dy="3"/>
          <feGaussianBlur stdDeviation="3" result="offset-blur"/>
          <feFlood floodColor="#000000" floodOpacity="0.8"/>
          <feComposite in2="offset-blur" operator="in"/>
          <feMerge>
            <feMergeNode in="SourceGraphic"/>
            <feMergeNode in="offset-blur"/>
          </feMerge>
        </filter>
        <pattern id={`circuitPattern-${avatarType}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
          <rect width="15" height="15" fill="transparent"/>
          <path d="M0,7.5 L15,7.5 M7.5,0 L7.5,15 M3,3 L12,12 M12,3 L3,12" stroke={color} strokeWidth="0.8" opacity="0.4"/>
          <circle cx="7.5" cy="7.5" r="1.5" fill={color} opacity="0.6"/>
          <circle cx="3" cy="3" r="0.8" fill="#00ffff" opacity="0.8"/>
          <circle cx="12" cy="12" r="0.8" fill="#00ffff" opacity="0.8"/>
        </pattern>
        <pattern id={`hexPattern-${avatarType}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <polygon points="6,1 10,4 10,8 6,11 2,8 2,4" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
          <circle cx="6" cy="6" r="1" fill={color} opacity="0.5"/>
        </pattern>
      </defs>
      
      {/* Background Energy Field */}
      <circle cx="60" cy="60" r="58" fill={`url(#glowGradient-${avatarType})`} opacity="0.15" filter={`url(#professionalGlow-${avatarType})`}/>
      <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="5,5">
        <animateTransform attributeName="transform" type="rotate" values="0 60 60;360 60 60" dur="20s" repeatCount="indefinite"/>
      </circle>
      
      {/* Advanced Torso Armor */}
      <ellipse cx="60" cy="85" rx="32" ry="25" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2" filter={`url(#innerShadow-${avatarType})`}/>
      <ellipse cx="60" cy="83" rx="28" ry="21" fill={`url(#mainGradient-${avatarType})`} filter={`url(#professionalGlow-${avatarType})`}/>
      <ellipse cx="60" cy="83" rx="24" ry="17" fill={`url(#circuitPattern-${avatarType})`} opacity="0.7"/>
      
      {/* Chest Panel */}
      <rect x="50" y="75" width="20" height="16" rx="4" fill={`url(#metalGradient-${avatarType})`} stroke={color} strokeWidth="2"/>
      <rect x="52" y="77" width="16" height="12" rx="2" fill={color} opacity="0.3"/>
      <rect x="54" y="79" width="12" height="2" rx="1" fill="#00ffff" opacity="0.8"/>
      <rect x="54" y="82" width="8" height="2" rx="1" fill="#00ffff" opacity="0.6"/>
      <rect x="54" y="85" width="10" height="2" rx="1" fill="#00ffff" opacity="0.4"/>
      
      {/* Professional Head Design */}
      {headShape === "square" ? (
        <>
          <rect x="35" y="20" width="50" height="45" rx="15" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="3" filter={`url(#innerShadow-${avatarType})`}/>
          <rect x="38" y="23" width="44" height="39" rx="12" fill={`url(#mainGradient-${avatarType})`} filter={`url(#professionalGlow-${avatarType})`}/>
          <rect x="40" y="25" width="40" height="35" rx="10" fill={`url(#hexPattern-${avatarType})`} opacity="0.5"/>
        </>
      ) : headShape === "hexagon" ? (
        <>
          <polygon points="60,15 80,25 80,55 60,65 40,55 40,25" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="3" filter={`url(#innerShadow-${avatarType})`}/>
          <polygon points="60,18 77,27 77,53 60,62 43,53 43,27" fill={`url(#mainGradient-${avatarType})`} filter={`url(#professionalGlow-${avatarType})`}/>
          <polygon points="60,20 75,29 75,51 60,60 45,51 45,29" fill={`url(#hexPattern-${avatarType})`} opacity="0.5"/>
        </>
      ) : (
        <>
          <ellipse cx="60" cy="42" rx="28" ry="30" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="3" filter={`url(#innerShadow-${avatarType})`}/>
          <ellipse cx="60" cy="42" rx="24" ry="26" fill={`url(#mainGradient-${avatarType})`} filter={`url(#professionalGlow-${avatarType})`}/>
          <ellipse cx="60" cy="42" rx="20" ry="22" fill={`url(#circuitPattern-${avatarType})`} opacity="0.5"/>
        </>
      )}
      
      {/* Advanced Visor System */}
      <ellipse cx="60" cy="38" rx="20" ry="10" fill="#000000" stroke="#00ffff" strokeWidth="3" opacity="0.95" filter={`url(#professionalGlow-${avatarType})`}/>
      <ellipse cx="60" cy="38" rx="18" ry="8" fill={`url(#glowGradient-${avatarType})`} opacity="0.8"/>
      <ellipse cx="60" cy="38" rx="16" ry="6" fill="#000000" opacity="0.6"/>
      
      {/* Sophisticated Eyes */}
      <circle cx="50" cy="38" r="6" fill="#00ffff" filter={`url(#professionalGlow-${avatarType})`}>
        <animate attributeName="fill" values="#00ffff;${color};#ffffff;${color};#00ffff" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="70" cy="38" r="6" fill="#00ffff" filter={`url(#professionalGlow-${avatarType})`}>
        <animate attributeName="fill" values="#00ffff;${color};#ffffff;${color};#00ffff" dur="4s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      
      {/* Eye Details */}
      <circle cx="50" cy="38" r="4" fill="#ffffff" opacity="0.9"/>
      <circle cx="70" cy="38" r="4" fill="#ffffff" opacity="0.9"/>
      <circle cx="50" cy="38" r="2" fill="#000000"/>
      <circle cx="70" cy="38" r="2" fill="#000000"/>
      <circle cx="50" cy="37" r="1" fill="#ffffff" opacity="0.8"/>
      <circle cx="70" cy="37" r="1" fill="#ffffff" opacity="0.8"/>
      
      {/* HUD Interface Elements */}
      <rect x="45" y="48" width="30" height="6" rx="3" fill={color} opacity="0.4"/>
      <rect x="47" y="50" width="6" height="1" fill="#00ffff" opacity="0.9"/>
      <rect x="55" y="50" width="8" height="1" fill="#00ffff" opacity="0.7"/>
      <rect x="65" y="50" width="6" height="1" fill="#00ffff" opacity="0.5"/>
      <circle cx="73" cy="50.5" r="1" fill="#00ff00" className="animate-pulse"/>
      
      {/* Advanced Shoulder Armor */}
      <ellipse cx="30" cy="68" rx="12" ry="20" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2" transform="rotate(-25 30 68)" filter={`url(#innerShadow-${avatarType})`}/>
      <ellipse cx="90" cy="68" rx="12" ry="20" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2" transform="rotate(25 90 68)" filter={`url(#innerShadow-${avatarType})`}/>
      <ellipse cx="30" cy="68" rx="8" ry="16" fill={`url(#mainGradient-${avatarType})`} transform="rotate(-25 30 68)"/>
      <ellipse cx="90" cy="68" rx="8" ry="16" fill={`url(#mainGradient-${avatarType})`} transform="rotate(25 90 68)"/>
      
      {/* Articulated Arms */}
      <ellipse cx="25" cy="80" rx="8" ry="22" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2" transform="rotate(-15 25 80)"/>
      <ellipse cx="95" cy="80" rx="8" ry="22" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2" transform="rotate(15 95 80)"/>
      <ellipse cx="25" cy="80" rx="6" ry="18" fill={`url(#mainGradient-${avatarType})`} transform="rotate(-15 25 80)"/>
      <ellipse cx="95" cy="80" rx="6" ry="18" fill={`url(#mainGradient-${avatarType})`} transform="rotate(15 95 80)"/>
      
      {/* Advanced Hands */}
      <circle cx="20" cy="100" r="8" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2"/>
      <circle cx="100" cy="100" r="8" fill={`url(#armorGradient-${avatarType})`} stroke={color} strokeWidth="2"/>
      <circle cx="20" cy="100" r="6" fill={`url(#mainGradient-${avatarType})`}/>
      <circle cx="100" cy="100" r="6" fill={`url(#mainGradient-${avatarType})`}/>
      <circle cx="20" cy="100" r="3" fill={color} opacity="0.8"/>
      <circle cx="100" cy="100" r="3" fill={color} opacity="0.8"/>
      
      {/* Status Indicators */}
      <circle cx="40" cy="28" r="2.5" fill="#00ff00" className="animate-pulse" filter={`url(#professionalGlow-${avatarType})`}/>
      <circle cx="80" cy="28" r="2.5" fill="#ffff00" className="animate-pulse" filter={`url(#professionalGlow-${avatarType})`}/>
      <circle cx="60" cy="22" r="2.5" fill={color} className="animate-pulse" filter={`url(#professionalGlow-${avatarType})`}/>
      
      {/* Power Core */}
      <circle cx="60" cy="83" r="8" fill={color} opacity="0.9" filter={`url(#professionalGlow-${avatarType})`}>
        <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="83" r="5" fill="#ffffff" opacity="0.9"/>
      <circle cx="60" cy="83" r="3" fill={color} opacity="0.8">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/>
      </circle>
      
      {uniqueFeatures}
    </svg>
  )
  
  switch (avatarType) {
    case 'ceo':
      return createProfessionalAvatarSVG(
        <>
          {/* CEO Crown and Authority Symbols */}
          <polygon points="60,15 55,20 65,20" fill="#ffd700" stroke={color} strokeWidth="2"/>
          <circle cx="60" cy="12" r="3" fill="#ffd700" className="animate-pulse"/>
          <rect x="55" y="25" width="10" height="3" rx="1" fill="#ffd700" opacity="0.8"/>
          
          {/* Strategic Interface */}
          <rect x="45" y="55" width="30" height="8" rx="2" fill={color} opacity="0.3"/>
          <rect x="47" y="57" width="6" height="1" fill="#00ffff"/>
          <rect x="55" y="57" width="8" height="1" fill="#00ffff"/>
          <rect x="65" y="57" width="6" height="1" fill="#00ffff"/>
          <rect x="47" y="59" width="4" height="1" fill="#ffd700"/>
          <rect x="53" y="59" width="10" height="1" fill="#ffd700"/>
          <rect x="65" y="59" width="8" height="1" fill="#ffd700"/>
          
          {/* Authority Indicators */}
          <circle cx="45" cy="45" r="2" fill="#ffd700" className="animate-pulse"/>
          <circle cx="75" cy="45" r="2" fill="#ffd700" className="animate-pulse"/>
        </>, "round"
      )
    case 'hook':
      return createProfessionalAvatarSVG(
        <>
          {/* Hook Symbol */}
          <path d="M45 25 Q60 15 75 25" stroke={color} strokeWidth="3" fill="none"/>
          <circle cx="60" cy="18" r="3" fill={color} className="animate-pulse"/>
          
          {/* Viral Content Indicators */}
          <path d="M40 55 L50 50 L60 55 L70 50 L80 55" stroke={color} strokeWidth="2" fill="none"/>
          <circle cx="50" cy="50" r="2" fill="#ff1493" className="animate-pulse"/>
          <circle cx="60" cy="55" r="2" fill="#ff1493" className="animate-pulse"/>
          <circle cx="70" cy="50" r="2" fill="#ff1493" className="animate-pulse"/>
          
          {/* Engagement Metrics */}
          <rect x="45" y="60" width="30" height="6" rx="3" fill={color} opacity="0.4"/>
          <rect x="47" y="62" width="8" height="1" fill="#ff1493"/>
          <rect x="57" y="62" width="12" height="1" fill="#ff1493"/>
          <rect x="71" y="62" width="6" height="1" fill="#ff1493"/>
        </>, "round"
      )
    case 'wizard':
      return createProfessionalAvatarSVG(
        <>
          {/* Wizard Hat */}
          <polygon points="60,10 50,25 70,25" fill="#8a2be2" stroke="#ffd700" strokeWidth="2"/>
          <circle cx="60" cy="8" r="3" fill="#ffd700" className="animate-pulse"/>
          <polygon points="58,18 60,12 62,18" fill="#ffd700"/>
          
          {/* Magic Wand */}
          <line x1="35" y1="70" x2="45" y2="60" stroke="#ffd700" strokeWidth="3"/>
          <circle cx="33" cy="72" r="3" fill="#8a2be2" className="animate-pulse"/>
          <circle cx="47" cy="58" r="2" fill="#ffd700" className="animate-pulse"/>
          
          {/* Magical Effects */}
          <circle cx="40" cy="55" r="1.5" fill="#8a2be2" className="animate-pulse"/>
          <circle cx="80" cy="60" r="1.5" fill="#8a2be2" className="animate-pulse"/>
          <circle cx="75" cy="50" r="1" fill="#ffd700" className="animate-pulse"/>
          
          {/* Design Interface */}
          <rect x="50" y="55" width="20" height="8" rx="2" fill="#8a2be2" opacity="0.3"/>
          <rect x="52" y="57" width="4" height="4" rx="1" fill="#ffd700" opacity="0.8"/>
          <rect x="58" y="57" width="4" height="4" rx="1" fill="#8a2be2" opacity="0.8"/>
          <rect x="64" y="57" width="4" height="4" rx="1" fill="#00ffff" opacity="0.8"/>
        </>, "hexagon"
      )
    case 'editor':
      return createProfessionalAvatarSVG(
        <>
          {/* Editor Interface */}
          <rect x="40" y="55" width="40" height="12" rx="3" fill={color} opacity="0.3"/>
          <rect x="42" y="57" width="36" height="1" fill="#00ffff"/>
          <rect x="42" y="59" width="28" height="1" fill="#00ffff" opacity="0.8"/>
          <rect x="42" y="61" width="32" height="1" fill="#00ffff" opacity="0.6"/>
          <rect x="42" y="63" width="24" height="1" fill="#00ffff" opacity="0.4"/>
          
          {/* Editing Tools */}
          <circle cx="45" cy="45" r="2" fill="#ff8c00" className="animate-pulse"/>
          <circle cx="75" cy="45" r="2" fill="#ff8c00" className="animate-pulse"/>
          <rect x="55" y="25" width="10" height="2" rx="1" fill="#00ffff"/>
          
          {/* Correction Marks */}
          <path d="M50 30 L55 35 L65 25" stroke="#ff8c00" strokeWidth="2" fill="none"/>
        </>, "square"
      )
    case 'researcher':
      return createProfessionalAvatarSVG(
        <>
          {/* Data Visualization */}
          <rect x="40" y="55" width="3" height="8" fill={color}/>
          <rect x="45" y="52" width="3" height="11" fill={color}/>
          <rect x="50" y="48" width="3" height="15" fill={color}/>
          <rect x="55" y="50" width="3" height="13" fill={color}/>
          <rect x="60" y="53" width="3" height="10" fill={color}/>
          <rect x="65" y="56" width="3" height="7" fill={color}/>
          <rect x="70" y="58" width="3" height="5" fill={color}/>
          <rect x="75" y="60" width="3" height="3" fill={color}/>
          
          {/* Research Tools */}
          <circle cx="45" cy="45" r="2" fill="#00ff7f" className="animate-pulse"/>
          <circle cx="75" cy="45" r="2" fill="#00ff7f" className="animate-pulse"/>
          
          {/* Trend Lines */}
          <path d="M40 65 Q50 55 60 60 Q70 50 80 55" stroke="#00ff7f" strokeWidth="2" fill="none"/>
          <circle cx="50" cy="58" r="1.5" fill="#00ff7f" className="animate-pulse"/>
          <circle cx="70" cy="52" r="1.5" fill="#00ff7f" className="animate-pulse"/>
        </>, "square"
      )
    case 'optimizer':
      return createProfessionalAvatarSVG(
        <>
          {/* Optimization Target */}
          <circle cx="60" cy="50" r="12" fill="none" stroke={color} strokeWidth="3"/>
          <circle cx="60" cy="50" r="8" fill="none" stroke={color} strokeWidth="2"/>
          <circle cx="60" cy="50" r="4" fill="none" stroke={color} strokeWidth="1"/>
          <circle cx="60" cy="50" r="2" fill={color} className="animate-pulse"/>
          
          {/* Performance Arrows */}
          <polygon points="60,38 63,45 57,45" fill={color} className="animate-pulse"/>
          <polygon points="72,50 65,53 65,47" fill={color} className="animate-pulse"/>
          <polygon points="60,62 57,55 63,55" fill={color} className="animate-pulse"/>
          <polygon points="48,50 55,47 55,53" fill={color} className="animate-pulse"/>
          
          {/* Optimization Indicators */}
          <circle cx="45" cy="45" r="2" fill="#ffd700" className="animate-pulse"/>
          <circle cx="75" cy="45" r="2" fill="#ffd700" className="animate-pulse"/>
          
          {/* Performance Metrics */}
          <rect x="45" y="65" width="30" height="6" rx="3" fill={color} opacity="0.3"/>
          <rect x="47" y="67" width="26" height="1" fill="#ffd700"/>
        </>, "round"
      )
    case 'data':
      return createProfessionalAvatarSVG(
        <>
          {/* Data Bars */}
          <rect x="40" y="58" width="2" height="6" fill={color}/>
          <rect x="44" y="55" width="2" height="9" fill={color}/>
          <rect x="48" y="52" width="2" height="12" fill={color}/>
          <rect x="52" y="54" width="2" height="10" fill={color}/>
          <rect x="56" y="56" width="2" height="8" fill={color}/>
          <rect x="60" y="59" width="2" height="5" fill={color}/>
          <rect x="64" y="57" width="2" height="7" fill={color}/>
          <rect x="68" y="60" width="2" height="4" fill={color}/>
          <rect x="72" y="61" width="2" height="3" fill={color}/>
          <rect x="76" y="62" width="2" height="2" fill={color}/>
          
          {/* Database Symbol */}
          <ellipse cx="60" cy="25" rx="8" ry="3" fill={color} opacity="0.8"/>
          <ellipse cx="60" cy="30" rx="8" ry="3" fill={color} opacity="0.6"/>
          <ellipse cx="60" cy="35" rx="8" ry="3" fill={color} opacity="0.4"/>
          
          {/* Data Flow */}
          <circle cx="45" cy="45" r="2" fill="#ff4500" className="animate-pulse"/>
          <circle cx="75" cy="45" r="2" fill="#ff4500" className="animate-pulse"/>
          
          {/* Analytics Interface */}
          <rect x="45" y="68" width="30" height="4" rx="2" fill={color} opacity="0.3"/>
          <rect x="47" y="69" width="8" height="1" fill="#ff4500"/>
          <rect x="57" y="69" width="12" height="1" fill="#ff4500"/>
          <rect x="71" y="69" width="6" height="1" fill="#ff4500"/>
        </>, "square"
      )
    case 'growth':
      return createProfessionalAvatarSVG(
        <>
          {/* Growth Arrow */}
          <path d="M35 65 L45 55 L55 60 L65 50 L75 55 L85 45" stroke={color} strokeWidth="4" fill="none"/>
          <polygon points="83,45 85,42 87,47 85,48" fill={color}/>
          
          {/* Growth Points */}
          <circle cx="45" cy="55" r="2" fill={color} className="animate-pulse"/>
          <circle cx="55" cy="60" r="2" fill={color} className="animate-pulse"/>
          <circle cx="65" cy="50" r="2" fill={color} className="animate-pulse"/>
          <circle cx="75" cy="55" r="2" fill={color} className="animate-pulse"/>
          
          {/* Expansion Indicators */}
          <circle cx="40" cy="40" r="3" fill="none" stroke="#9370db" strokeWidth="1">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="80" cy="35" r="3" fill="none" stroke="#9370db" strokeWidth="1">
            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" begin="1s"/>
          </circle>
          
          {/* Growth Metrics */}
          <circle cx="45" cy="45" r="2" fill="#9370db" className="animate-pulse"/>
          <circle cx="75" cy="45" r="2" fill="#9370db" className="animate-pulse"/>
          
          {/* Expansion Interface */}
          <rect x="45" y="70" width="30" height="6" rx="3" fill={color} opacity="0.3"/>
          <rect x="47" y="72" width="6" height="1" fill="#9370db"/>
          <rect x="55" y="72" width="10" height="1" fill="#9370db"/>
          <rect x="67" y="72" width="8" height="1" fill="#9370db"/>
        </>, "hexagon"
      )
    default:
      return createProfessionalAvatarSVG(<></>, "round")
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
