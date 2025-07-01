import { useState, useEffect } from 'react'
import { Image, Sparkles, Download, RefreshCw } from 'lucide-react'

interface Thumbnail {
  id: string
  imageUrl: string
  prompt: string
  style: string
  timestamp: string
}

export default function MiniaturaGeneradas() {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk')

  const styles = [
    { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-cyan-400 to-purple-500' },
    { id: 'neon', name: 'Neon', color: 'from-pink-400 to-cyan-400' },
    { id: 'futuristic', name: 'Futuristic', color: 'from-purple-400 to-blue-500' },
    { id: 'viral', name: 'Viral', color: 'from-yellow-400 to-red-500' }
  ]

  const samplePrompts = [
    'AI robot creating content',
    'Viral TikTok moment',
    'Instagram influencer setup',
    'Social media explosion',
    'Content creator workspace',
    'Digital marketing success'
  ]

  const generateThumbnail = async (prompt: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: selectedStyle })
      })
      
      const result = await response.json()
      const newThumbnail: Thumbnail = {
        id: Date.now().toString(),
        imageUrl: result.imageUrl || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${Date.now()}`,
        prompt,
        style: selectedStyle,
        timestamp: new Date().toISOString()
      }
      
      setThumbnails(prev => [newThumbnail, ...prev.slice(0, 7)])
    } catch (error) {
      console.error('Error generating thumbnail:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const initialPrompts = samplePrompts.slice(0, 4)
    initialPrompts.forEach((prompt, index) => {
      setTimeout(() => generateThumbnail(prompt), index * 1000)
    })
  }, [])

  return (
    <section id="miniaturas" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center border border-cyan-400/30 shadow-lg shadow-cyan-400/20">
              <Image size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              FLOWMATIK
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Miniaturas Generadas
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Thumbnails creados con <span className="text-cyan-400 font-semibold">Stable Diffusion XL</span> y 
            optimizados por nuestros workers evolutivos para máximo engagement
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`px-6 py-3 rounded-lg border transition-all ${
                selectedStyle === style.id
                  ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                  : 'border-gray-600 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${style.color} inline-block mr-2`}></div>
              {style.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {thumbnails.map((thumbnail) => (
            <div key={thumbnail.id} className="group relative bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-cyan-400/50 transition-all">
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <img 
                  src={thumbnail.imageUrl} 
                  alt={thumbnail.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-300 mb-2 line-clamp-2">{thumbnail.prompt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyan-400">{thumbnail.style}</span>
                  <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => generateThumbnail(samplePrompts[Math.floor(Math.random() * samplePrompts.length)])}
            disabled={loading}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw size={20} className="animate-spin" /> : <Sparkles size={20} />}
            <span className="font-semibold">
              {loading ? 'Generando...' : 'Generar Nueva Miniatura'}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
