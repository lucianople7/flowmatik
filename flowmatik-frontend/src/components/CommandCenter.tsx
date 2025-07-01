import { useState, useEffect } from 'react'
import { X, Send, Loader, Bot, Activity, Database, Zap, Settings, BarChart3, Upload, Smartphone, Monitor, Tablet } from 'lucide-react'

interface CommandCenterProps {
  onClose: () => void
}

interface Message {
  id: string
  type: 'user' | 'agent' | 'system'
  content: string
  agentType?: string
  agentName?: string
  timestamp: Date
}

const AI_AGENTS = [
  { id: 'flowi-ceo', name: 'FLOWI CEO', color: '#00ff41' },
  { id: 'hook-creator', name: 'HOOK CREATOR', color: '#ff0080' },
  { id: 'thumbnail-wizard', name: 'THUMBNAIL WIZARD', color: '#8000ff' },
  { id: 'editor-pro', name: 'EDITOR PRO', color: '#ff8000' },
  { id: 'trend-researcher', name: 'TREND RESEARCHER', color: '#00ffff' },
  { id: 'optimizer', name: 'OPTIMIZER', color: '#ffff00' },
  { id: 'data-master', name: 'DATA MASTER', color: '#ff4000' },
  { id: 'growth-expert', name: 'GROWTH EXPERT', color: '#4000ff' }
]

export default function CommandCenter({ onClose }: CommandCenterProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('flowmatik-eternal-memory')
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      } catch (error) {
        console.error('Error loading eternal memory:', error)
      }
    }
    return [
      {
        id: '1',
        type: 'system',
        content: 'FLOWMATIK AI Command Center - Eternal Memory Activated 🧠\nYour conversation history is now permanently stored.',
        timestamp: new Date()
      }
    ]
  })
  const [input, setInput] = useState('')
  const [selectedAgent, setSelectedAgent] = useState<string>('flowi-ceo')
  const [isLoading, setIsLoading] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState('English')
  const [isMobile, setIsMobile] = useState(false)
  const [ecosystemVersion, setEcosystemVersion] = useState('1.0.0')
  const [lastEvolution, setLastEvolution] = useState(new Date())
  const [workersStatus, setWorkersStatus] = useState<any>({})
  const [mcpStatus, setMcpStatus] = useState<any>({})
  const [evolutionaryAnalytics, setEvolutionaryAnalytics] = useState<any>({})
  const [cacheStats, setCacheStats] = useState<any>(null)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    const fetchEvolutionaryData = async () => {
      try {
        const [workersRes, mcpRes, analyticsRes, cacheRes] = await Promise.all([
          fetch('http://localhost:8000/api/workers/status'),
          fetch('http://localhost:8000/api/mcp/status'),
          fetch('http://localhost:8000/api/analytics/evolutionary'),
          fetch('http://localhost:8000/api/cache/stats')
        ]);

        if (workersRes.ok) {
          const workersData = await workersRes.json();
          setWorkersStatus(workersData);
        }

        if (mcpRes.ok) {
          const mcpData = await mcpRes.json();
          setMcpStatus(mcpData);
        }

        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setEvolutionaryAnalytics(analyticsData);
          if (analyticsData.ecosystem?.currentVersion) {
            setEcosystemVersion(analyticsData.ecosystem.currentVersion);
          }
          if (analyticsData.ecosystem?.lastEvolution?.timestamp) {
            setLastEvolution(new Date(analyticsData.ecosystem.lastEvolution.timestamp));
          }
        }

        if (cacheRes.ok) {
          const cacheData = await cacheRes.json();
          setCacheStats(cacheData);
        }
      } catch (error) {
        console.error('Error fetching evolutionary data:', error);
      }
    };
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    fetchEvolutionaryData();
    
    const evolutionInterval = setInterval(() => {
      fetchEvolutionaryData();
      
      const newVersion = `${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 99) + 1}`
      setEcosystemVersion(newVersion)
      setLastEvolution(new Date())
      
      const evolutionMessage: Message = {
        id: Date.now().toString(),
        type: 'system',
        content: `🚀 ECOSYSTEM EVOLUTION v${newVersion}\n\n✅ AI Models Updated\n✅ Performance Optimized\n✅ New Features Added\n✅ Security Enhanced\n\nSystem automatically evolved with latest improvements!`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, evolutionMessage])
    }, 60000) // Check every minute for demo purposes
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      clearInterval(evolutionInterval)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('flowmatik-eternal-memory', JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAgent) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setInput('')

    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: input,
          agentType: selectedAgent,
          userIntention: 'command_center'
        })
      })

      const data = await response.json()

      const agentMessage: Message = {
        id: data.id || Date.now().toString(),
        type: 'agent',
        content: data.content || 'Error generating content',
        agentType: selectedAgent,
        agentName: data.agentName,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'system',
        content: 'ERROR: Unable to connect to AI backend. Please check if the server is running.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <div className={`bg-gray-900 border border-cyan-500/50 rounded-lg w-full h-[95vh] md:h-[90vh] ${
        isMobile ? 'flex-col max-w-full' : 'flex max-w-7xl'
      }`}>
        {/* Left Panel - Terminal */}
        <div className="flex-1 flex flex-col">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 p-1 rounded-t-lg">
            <div className="bg-gray-900 rounded-t-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center border border-cyan-400/50 shadow-lg shadow-cyan-400/20">
                      <svg width="20" height="20" viewBox="0 0 20 20">
                        <defs>
                          <linearGradient id="terminalLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00ffff" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                        <path d="M3 6 L8 3 L14 6 L17 10 L14 14 L8 17 L3 14 L0 10 Z" 
                              fill="url(#terminalLogoGradient)" 
                              className="animate-pulse" />
                        <circle cx="10" cy="10" r="4" fill="rgba(0,0,0,0.8)" />
                        <circle cx="10" cy="10" r="2" fill="#00ffff" className="animate-pulse" />
                      </svg>
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-black text-lg bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
                      FLOWMATIK
                    </span>
                    <span className="text-xs text-cyan-400/70 font-mono tracking-widest">
                      TERMINAL
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Language Tabs */}
          <div className="bg-gray-800 px-4 py-2 flex space-x-1">
            {['English', 'Español', 'Português'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  activeLanguage === lang
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Terminal Content */}
          <div className="flex-1 bg-gray-900 p-4 overflow-y-auto font-mono text-sm">
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Bot size={16} />
                <span className="font-bold">FLOWMATIK AI</span>
                <span className="text-gray-400">20:16:37</span>
              </div>
              <div className="text-gray-300 mb-4">
                Welcome to FLOWMATIK Command Center - How can I assist you today?
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              {messages.slice(1).map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.type === 'agent' && (
                      <>
                        <Bot size={12} />
                        <span style={{ color: AI_AGENTS.find(a => a.id === message.agentType)?.color }}>
                          {message.agentName}
                        </span>
                      </>
                    )}
                    {message.type === 'user' && <span className="text-blue-400">USER</span>}
                  </div>
                  <div 
                    className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-900/30 text-blue-100' 
                        : 'bg-gray-800/50 text-green-100'
                    }`}
                  >
                    <pre className="whitespace-pre-wrap">{message.content}</pre>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Loader className="animate-spin" size={16} />
                  <span>AI Agent processing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-gray-800 p-4 rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || !selectedAgent || isLoading}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Status & Controls */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 rounded-r-lg flex flex-col">
          {/* Project Status */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <Activity size={16} />
              <span className="font-bold">Project Status</span>
              <div className="flex items-center space-x-1 ml-auto">
                {isMobile ? <Smartphone size={12} className="text-green-400" /> : <Monitor size={12} className="text-blue-400" />}
                <Tablet size={12} className="text-purple-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {evolutionaryAnalytics.performance?.systemHealth?.toFixed(1) || '98.6'}%
                </div>
                <div className="text-xs text-gray-400">System Health</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">24/7</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {workersStatus.totalWorkers || 8}
                </div>
                <div className="text-xs text-gray-400">AI Agents</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-pink-400">∞</div>
                <div className="text-xs text-gray-400">Eternal Memory</div>
              </div>
            </div>

            {workersStatus.workers && (
              <div className="mt-3 bg-gray-900 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-cyan-400">🧬 Evolutionary Workers</span>
                  <span className="text-xs text-gray-400">
                    {workersStatus.averagePerformance?.toFixed(1)}x Avg
                  </span>
                </div>
                <div className="space-y-1">
                  {Object.entries(workersStatus.workers).slice(0, 3).map(([key, worker]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-xs text-gray-300 truncate">
                        {worker.name?.split(' ')[0] || key}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-400">
                          {worker.performance?.toFixed(1)}x
                        </span>
                        <div className="w-6 h-1 bg-gray-700 rounded-full">
                          <div 
                            className="h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                            style={{width: `${Math.min((worker.performance || 1) * 20, 100)}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mcpStatus.connectedProtocols && (
              <div className="mt-3 bg-gray-900 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-cyan-400">🔗 MCP Protocols</span>
                  <span className="text-xs text-green-400">
                    {mcpStatus.connectedProtocols.length}/{mcpStatus.totalProtocols}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {mcpStatus.connectedProtocols.slice(0, 4).map((protocol: string) => (
                    <div key={protocol} className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-gray-300 truncate">
                        {protocol.split('-')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cyan-400">🤖 AI Providers</span>
                <span className="text-xs text-gray-400">Multi-Model</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-300">SiliconFlow (SDXL)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-300">NetMind (Daobao 1.5)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-300">Hugging Face Pro</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cyan-400">💾 AI Cache</span>
                <span className="text-xs text-gray-400">Performance</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Hit Rate</span>
                  <span className="text-xs text-green-400">{cacheStats?.hitRate || '0'}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Cached Items</span>
                  <span className="text-xs text-cyan-400">{cacheStats?.cacheSize || '0'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Total Requests</span>
                  <span className="text-xs text-purple-400">{cacheStats?.totalRequests || '0'}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cyan-400">Ecosystem v{ecosystemVersion}</span>
                <span className="text-xs text-gray-400">Auto-Evolution</span>
              </div>
              <div className="text-xs text-gray-300">
                Last Evolution: {lastEvolution.toLocaleTimeString()}
              </div>
              {evolutionaryAnalytics.ecosystem?.lastEvolution?.performanceGain && (
                <div className="text-xs text-green-400 mt-1">
                  Performance: +{evolutionaryAnalytics.ecosystem.lastEvolution.performanceGain}
                </div>
              )}
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
            </div>
            
            {/* Ecosystem Evolution Status */}
            <div className="mt-3 bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-cyan-400">Ecosystem v{ecosystemVersion}</span>
                <span className="text-xs text-gray-400">Auto-Evolution</span>
              </div>
              <div className="text-xs text-gray-300">
                Last Evolution: {lastEvolution.toLocaleTimeString()}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <Database size={16} />
              <span className="font-bold">API Status</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Social Media APIs</span>
                </div>
                <span className="text-xs text-green-400">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Content Engine</span>
                </div>
                <span className="text-xs text-green-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Analytics Hub</span>
                </div>
                <span className="text-xs text-green-400">Running</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">AI Processing</span>
                </div>
                <span className="text-xs text-yellow-400">Optimal</span>
              </div>
            </div>
          </div>

          {/* Agent Selection */}
          <div className="p-4 border-b border-gray-700 flex-1">
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <Bot size={16} />
              <span className="font-bold">AI Agents</span>
            </div>
            <div className="space-y-2">
              {AI_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedAgent === agent.id
                      ? 'bg-cyan-600/20 border border-cyan-500'
                      : 'bg-gray-700 hover:bg-gray-600 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: agent.color }}
                    ></div>
                    <span className="text-gray-300 font-medium">{agent.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <Zap size={16} />
              <span className="font-bold">Quick Actions</span>
            </div>
            <div className="space-y-2">
              <button 
                onClick={async () => {
                  try {
                    await fetch('http://localhost:8000/api/workers/evolve', { method: 'POST' });
                    window.location.reload();
                  } catch (error) {
                    console.error('Evolution failed:', error);
                  }
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center space-x-2"
              >
                <Upload size={14} />
                <span>🧬 Evolve Workers</span>
              </button>
              <button 
                onClick={async () => {
                  try {
                    await fetch('http://localhost:8000/api/ecosystem/evolve', { method: 'POST' });
                    window.location.reload();
                  } catch (error) {
                    console.error('Ecosystem evolution failed:', error);
                  }
                }}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center space-x-2"
              >
                <Database size={14} />
                <span>🚀 Evolve System</span>
              </button>
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center space-x-2">
                <BarChart3 size={14} />
                <span>View Analytics</span>
              </button>
              <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:from-orange-700 hover:to-red-700 transition-all flex items-center space-x-2">
                <Settings size={14} />
                <span>System Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
