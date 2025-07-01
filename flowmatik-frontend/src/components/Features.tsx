import { Zap, Target, BarChart3, Users, Cog, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI Content Generation',
    description: 'Generate high-quality scripts, thumbnails and content ideas using advanced AI technology.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Target,
    title: 'Social Media Integration',
    description: 'Seamlessly integrate with all major social media platforms for instant publishing.',
    color: 'from-pink-400 to-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Real-time analytics and insights to track your content performance and ROI calculations.',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Users,
    title: 'Bulk Content Creation',
    description: 'Generate hundreds of pieces of content in minutes. Batch processing for maximum efficiency.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Cog,
    title: 'Automation Workflows',
    description: 'Set up automated workflows to streamline your content creation and publishing process.',
    color: 'from-purple-400 to-indigo-500'
  },
  {
    icon: TrendingUp,
    title: 'Team Collaboration',
    description: 'Collaborate with your team members and share resources for maximum productivity.',
    color: 'from-cyan-400 to-blue-500'
  }
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to Dominate Social Media
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Powered by advanced AI technology and seamless integrations
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-full h-full text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center space-x-2 text-cyan-400 text-sm">
                  <span>Learn more</span>
                  <div className="w-4 h-4 border border-cyan-400 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
