import { useState } from 'react'
import { Menu, X, Terminal } from 'lucide-react'

interface HeaderProps {
  onOpenCommandCenter: () => void
}

export default function Header({ onOpenCommandCenter }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 px-4 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center border-2 border-cyan-400/50 shadow-2xl shadow-cyan-400/30 transform group-hover:scale-105 transition-all duration-300">
              <svg width="28" height="28" viewBox="0 0 28 28" className="relative z-10">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00ffff" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M4 8 L12 4 L20 8 L24 14 L20 20 L12 24 L4 20 L0 14 Z" 
                      fill="url(#logoGradient)" 
                      filter="url(#glow)"
                      className="animate-pulse" />
                <circle cx="14" cy="14" r="6" fill="rgba(0,0,0,0.8)" />
                <circle cx="14" cy="14" r="3" fill="#00ffff" className="animate-pulse" />
                <path d="M8 14 L14 8 L20 14 L14 20 Z" fill="rgba(139,92,246,0.6)" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider filter drop-shadow-lg">
                FLOWMATIK
              </span>
              <div className="absolute inset-0 text-3xl font-black bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 bg-clip-text text-transparent tracking-wider blur-sm"></div>
            </div>
            <span className="text-xs text-cyan-400/80 font-mono tracking-[0.2em] uppercase">
              ⚡ AI CONTENT ENGINE ⚡
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#ai-team" className="text-gray-300 hover:text-cyan-400 transition-colors">
            AI Team
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Pricing
          </a>
          <button
            onClick={onOpenCommandCenter}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all"
          >
            <Terminal size={16} />
            <span>Command Center</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700">
          <nav className="px-4 py-6 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-cyan-400 transition-colors">
              Features
            </a>
            <a href="#ai-team" className="block text-gray-300 hover:text-cyan-400 transition-colors">
              AI Team
            </a>
            <a href="#pricing" className="block text-gray-300 hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <button
              onClick={onOpenCommandCenter}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all"
            >
              <Terminal size={16} />
              <span>Command Center</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
