import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import AITeam from './components/AITeam'
import MiniaturaGeneradas from './components/MiniaturaGeneradas'
import CommandCenter from './components/CommandCenter'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  const [showCommandCenter, setShowCommandCenter] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-cyan-900/20"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <Header onOpenCommandCenter={() => setShowCommandCenter(true)} />
          <Hero />
          <Features />
          <AITeam />
          <MiniaturaGeneradas />
          <Pricing />
          <Footer />
        </div>

        {/* Command Center Modal */}
        {showCommandCenter && (
          <CommandCenter onClose={() => setShowCommandCenter(false)} />
        )}
      </div>
    </div>
  )
}

export default App
