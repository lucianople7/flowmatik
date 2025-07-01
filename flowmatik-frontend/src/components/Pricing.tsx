import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '$19',
    period: '/month',
    description: 'Perfect for individuals and small creators',
    features: [
      '50 videos per month',
      'Basic AI templates',
      'Standard support',
      'Basic AI templates',
      'Email support',
      'Basic analytics'
    ],
    popular: false,
    color: 'from-gray-600 to-gray-700'
  },
  {
    name: 'Pro',
    price: '$39',
    period: '/month',
    description: 'Best for growing content creators',
    features: [
      'Unlimited videos',
      'Advanced AI models',
      'Priority support',
      'Custom templates',
      'Advanced analytics',
      'Team collaboration',
      'API access',
      'Custom branding'
    ],
    popular: true,
    color: 'from-purple-600 to-cyan-600'
  },
  {
    name: 'Business',
    price: '$79',
    period: '/month',
    description: 'For agencies and large teams',
    features: [
      'Unlimited everything',
      'White-label solution',
      'Dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'Team management',
      'Priority processing',
      'Custom AI training'
    ],
    popular: false,
    color: 'from-cyan-600 to-blue-600'
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Growth Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start creating quality content today. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-500/50 shadow-lg shadow-cyan-500/20' 
                  : 'border-gray-700/50 hover:border-cyan-500/30'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star size={14} />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Check className="text-green-400" size={16} />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button 
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Get Started
              </button>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">
                  {plan.popular ? '14-day free trial' : 'No setup fees'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-4">
            All plans include our core AI features and 24/7 support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:border-cyan-400 transition-all">
              Book Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
