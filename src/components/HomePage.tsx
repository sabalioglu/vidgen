import React from 'react'
import { ArrowRight, Video, Zap, Download, Star, Users, Clock, CheckCircle2, Sparkles } from 'lucide-react'

export const HomePage: React.FC = () => {
  const handleGetStarted = () => {
    alert('Get started functionality will be implemented here!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create Viral{' '}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                Video Ads
              </span>
              <br />
              in Seconds with AI
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your product descriptions into engaging video advertisements using cutting-edge AI technology. 
              No video editing skills required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleGetStarted}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>No credit card required • Start creating instantly</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
                <div className="text-gray-600">Happy Creators</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
                <div className="text-gray-600">Videos Generated</div>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-full shadow-lg">
                    <Clock className="w-8 h-8 text-teal-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">30s</div>
                <div className="text-gray-600">Average Creation Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Create professional video ads in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">1</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Describe Your Product</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply tell us about your product, target audience, and key message. Our AI understands context and creates relevant content.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Creates Scenes</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI generates compelling visuals, writes engaging scripts, and creates dynamic scenes tailored to your brand.
              </p>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Download className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get Your Video</h3>
              <p className="text-gray-600 leading-relaxed">
                Download your professional video ad in high quality, ready to use across all your marketing channels and social media.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create stunning video advertisements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Generation</h3>
              <p className="text-gray-600">Advanced machine learning algorithms create compelling video content that resonates with your audience.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Generate professional-quality videos in under 30 seconds. No more waiting hours for rendering.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">High Quality Output</h3>
              <p className="text-gray-600">Export in multiple formats and resolutions, optimized for different social media platforms.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Start for free, upgrade when you need more
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pay Per Video</h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">$9.99</div>
              <p className="text-gray-600">Per video generated</p>
            </div>
            
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">High-quality AI video generation</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Multiple export formats</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Commercial usage rights</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">No monthly commitments</span>
              </li>
            </ul>
            
            <button
              onClick={handleGetStarted}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Try It Free
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Your First Video?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of creators who are already making stunning video ads with AI
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-white text-purple-600 text-lg font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Creating for Free
          </button>
        </div>
      </div>
    </div>
  )
}