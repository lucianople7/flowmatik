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
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-300 to-purple-400 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              FLOWMATIK
            </span>
            <span className="text-xs text-cyan-400/70 font-mono tracking-widest">
              AI CONTENT ENGINE
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
