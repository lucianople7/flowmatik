import { Play, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="px-4 py-20 text-center">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          The content{' '}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            revolution
          </span>{' '}
          is here
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
          Transform your content into engaging content. Generate viral scripts, videos and eye-catching 
          tools that convert in seconds using advanced AI technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight size={20} />
          </button>
          <button className="px-8 py-4 border border-gray-600 rounded-lg font-semibold text-lg hover:border-cyan-400 transition-all flex items-center space-x-2">
            <Play size={20} />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* AI Robot Illustration */}
        <div className="relative max-w-md mx-auto">
          <div className="bg-gradient-to-br from-purple-900/60 to-cyan-900/60 rounded-3xl p-8 border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 backdrop-blur-sm">
            {/* FLOWI CEO Avatar */}
            <div className="relative w-56 h-56 mx-auto mb-6">
              <svg viewBox="0 0 240 280" className="w-full h-full">
                <defs>
                  <linearGradient id="flowiBotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff1493" />
                    <stop offset="30%" stopColor="#ff69b4" />
                    <stop offset="70%" stopColor="#ff1493" />
                    <stop offset="100%" stopColor="#c71585" />
                  </linearGradient>
                  <linearGradient id="bodyGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4a1a4a" />
                    <stop offset="50%" stopColor="#2a0a2a" />
                    <stop offset="100%" stopColor="#1a051a" />
                  </linearGradient>
                  <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#666" />
                    <stop offset="50%" stopColor="#333" />
                    <stop offset="100%" stopColor="#111" />
                  </linearGradient>
                  <filter id="glow3D">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="innerShadow">
                    <feOffset dx="2" dy="2"/>
                    <feGaussianBlur stdDeviation="2" result="offset-blur"/>
                    <feFlood floodColor="#000000" floodOpacity="0.3"/>
                    <feComposite in2="offset-blur" operator="in"/>
                  </filter>
                </defs>
                
                {/* Robot Sitting Base */}
                <ellipse cx="120" cy="250" rx="60" ry="25" fill="url(#bodyGradient3D)" stroke="#ff1493" strokeWidth="2" opacity="0.8"/>
                
                {/* Robot Main Body - Sitting Position */}
                <ellipse cx="120" cy="180" rx="50" ry="45" fill="url(#bodyGradient3D)" stroke="#ff1493" strokeWidth="2"/>
                <ellipse cx="120" cy="175" rx="45" ry="40" fill="url(#flowiBotGradient)" stroke="#ff69b4" strokeWidth="1" filter="url(#glow3D)"/>
                
                {/* Body Panel Details */}
                <rect x="100" y="160" width="40" height="30" rx="8" fill="#1a051a" stroke="#ff1493" strokeWidth="1"/>
                <rect x="105" y="165" width="30" height="20" rx="4" fill="#ff1493" opacity="0.3"/>
                
                {/* Chest Light */}
                <circle cx="120" cy="175" r="6" fill="#00ffff" className="animate-pulse">
                  <animate attributeName="fill" values="#00ffff;#ff1493;#00ffff" dur="3s" repeatCount="indefinite"/>
                </circle>
                
                {/* Robot Head - 3D Style */}
                <ellipse cx="120" cy="100" rx="35" ry="40" fill="url(#flowiBotGradient)" stroke="#ff69b4" strokeWidth="3" filter="url(#glow3D)"/>
                <ellipse cx="120" cy="95" rx="30" ry="35" fill="#2a0a2a" stroke="#ff1493" strokeWidth="1"/>
                
                {/* Head Visor */}
                <ellipse cx="120" cy="90" rx="25" ry="15" fill="#000" stroke="#00ffff" strokeWidth="2" opacity="0.8"/>
                
                {/* Eyes - Large and Glowing */}
                <circle cx="108" cy="90" r="8" fill="#00ffff" className="animate-pulse">
                  <animate attributeName="fill" values="#00ffff;#ff1493;#00ffff" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="132" cy="90" r="8" fill="#00ffff" className="animate-pulse">
                  <animate attributeName="fill" values="#00ffff;#ff1493;#00ffff" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                </circle>
                
                {/* Eye Glow Effects */}
                <circle cx="108" cy="90" r="12" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.4"/>
                <circle cx="132" cy="90" r="12" fill="none" stroke="#00ffff" strokeWidth="1" opacity="0.4"/>
                
                {/* Mouth/Speaker Array */}
                <rect x="110" y="105" width="20" height="8" rx="4" fill="#ff1493"/>
                <line x1="112" y1="107" x2="112" y2="111" stroke="#ff69b4" strokeWidth="1"/>
                <line x1="116" y1="107" x2="116" y2="111" stroke="#ff69b4" strokeWidth="1"/>
                <line x1="120" y1="107" x2="120" y2="111" stroke="#ff69b4" strokeWidth="1"/>
                <line x1="124" y1="107" x2="124" y2="111" stroke="#ff69b4" strokeWidth="1"/>
                <line x1="128" y1="107" x2="128" y2="111" stroke="#ff69b4" strokeWidth="1"/>
                
                {/* Head Antenna Array */}
                <line x1="120" y1="60" x2="120" y2="40" stroke="#ff1493" strokeWidth="4"/>
                <circle cx="120" cy="35" r="5" fill="#00ffff" className="animate-pulse"/>
                <line x1="110" y1="65" x2="110" y2="50" stroke="#ff1493" strokeWidth="2"/>
                <circle cx="110" cy="47" r="3" fill="#ff69b4" className="animate-pulse"/>
                <line x1="130" y1="65" x2="130" y2="50" stroke="#ff1493" strokeWidth="2"/>
                <circle cx="130" cy="47" r="3" fill="#ff69b4" className="animate-pulse"/>
                
                {/* Arms - 3D Positioned */}
                <ellipse cx="70" cy="150" rx="15" ry="25" fill="url(#flowiBotGradient)" stroke="#ff1493" strokeWidth="2" transform="rotate(-20 70 150)"/>
                <ellipse cx="170" cy="150" rx="15" ry="25" fill="url(#flowiBotGradient)" stroke="#ff1493" strokeWidth="2" transform="rotate(20 170 150)"/>
                
                {/* Hands - 3D Style */}
                <circle cx="55" cy="170" r="12" fill="url(#flowiBotGradient)" stroke="#ff69b4" strokeWidth="2"/>
                <circle cx="185" cy="170" r="12" fill="url(#flowiBotGradient)" stroke="#ff69b4" strokeWidth="2"/>
                
                {/* Hand Details */}
                <circle cx="55" cy="170" r="8" fill="#ff1493"/>
                <circle cx="185" cy="170" r="8" fill="#ff1493"/>
                
                {/* Legs - Sitting Position */}
                <ellipse cx="100" cy="220" rx="12" ry="30" fill="url(#flowiBotGradient)" stroke="#ff1493" strokeWidth="2"/>
                <ellipse cx="140" cy="220" rx="12" ry="30" fill="url(#flowiBotGradient)" stroke="#ff1493" strokeWidth="2"/>
                
                {/* Feet - 3D Style */}
                <ellipse cx="95" cy="250" rx="18" ry="8" fill="url(#flowiBotGradient)" stroke="#ff69b4" strokeWidth="2"/>
                <ellipse cx="145" cy="250" rx="18" ry="8" fill="url(#flowiBotGradient)" stroke="#ff69b4" strokeWidth="2"/>
                
                {/* Circuit Patterns - More Complex */}
                <path d="M85 85 L100 85 L100 95 L105 95" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7"/>
                <path d="M155 85 L140 85 L140 95 L135 95" stroke="#00ffff" strokeWidth="2" fill="none" opacity="0.7"/>
                <circle cx="105" cy="95" r="2" fill="#00ffff"/>
                <circle cx="135" cy="95" r="2" fill="#00ffff"/>
                
                {/* Additional Circuit Lines */}
                <path d="M90 170 L110 170 L110 180" stroke="#ff1493" strokeWidth="1" fill="none" opacity="0.6"/>
                <path d="M150 170 L130 170 L130 180" stroke="#ff1493" strokeWidth="1" fill="none" opacity="0.6"/>
                
                {/* Status Lights */}
                <circle cx="95" cy="95" r="3" fill="#00ff00" className="animate-pulse"/>
                <circle cx="145" cy="95" r="3" fill="#ffff00" className="animate-pulse"/>
                <circle cx="120" cy="120" r="2" fill="#ff0080" className="animate-pulse"/>
                
                {/* Body Segments */}
                <line x1="85" y1="160" x2="155" y2="160" stroke="#ff1493" strokeWidth="1" opacity="0.5"/>
                <line x1="85" y1="180" x2="155" y2="180" stroke="#ff1493" strokeWidth="1" opacity="0.5"/>
                <line x1="85" y1="200" x2="155" y2="200" stroke="#ff1493" strokeWidth="1" opacity="0.5"/>
              </svg>
              
              {/* Status Indicators */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-gray-900"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-cyan-400 mb-3 text-center tracking-wider">FLOWI CEO</h3>
            <div className="text-center mb-4">
              <span className="text-xs text-purple-400 font-mono bg-purple-400/10 px-2 py-1 rounded-full border border-purple-400/30">
                STRATEGIC AI DIRECTOR
              </span>
            </div>
            <p className="text-gray-300 text-sm text-center leading-relaxed">
              "Welcome to the future of content creation. 
              I'm FLOWI and I'll help make your content viral 
              and profitable in record time."
            </p>
          </div>

          {/* Enhanced Floating Elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full animate-pulse delay-1000 opacity-60"></div>
          <div className="absolute top-1/2 -right-10 w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-pulse delay-500 opacity-60"></div>
          <div className="absolute top-1/4 -left-8 w-4 h-4 bg-cyan-400 rounded-full animate-pulse delay-700 opacity-60"></div>
        </div>
      </div>
    </section>
  )
}
