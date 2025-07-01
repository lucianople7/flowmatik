import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">F</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                FLOWMATIK
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transform your content strategy using advanced AI technology. 
              Create viral content that converts in seconds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Features</a></li>
              <li><a href="#ai-team" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">AI Agents</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Status</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Flowmatik. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Ready to Transform CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Content Strategy?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of content creators already using FLOWMATIK to generate viral content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border border-gray-600 rounded-lg font-semibold hover:border-cyan-400 transition-all">
              Book Demo
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
