import React, { useEffect, useState } from 'react'
import { CheckCircle2, Video, ArrowRight, Coins } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getProductByPriceId } from '../stripe-config'

interface SuccessPageProps {
  onNavigate: (page: string) => void
  sessionId?: string
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigate, sessionId }) => {
  const { refreshProfile, profile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [purchasedProduct, setPurchasedProduct] = useState<string>('')

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Refresh profile to get updated credits
        await refreshProfile()
        
        // In a real implementation, you would fetch the session details
        // to determine which product was purchased
        setPurchasedProduct('VideoGen')
        
        setLoading(false)
      } catch (error) {
        console.error('Error handling success:', error)
        setLoading(false)
      }
    }

    handleSuccess()
  }, [refreshProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your purchase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Purchase Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              You've purchased {purchasedProduct}
            </h2>
            <p className="text-gray-600">
              Your account has been updated with AI video generation capabilities
            </p>
          </div>

          {/* Updated Credits */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Current Credits</p>
                  <p className="text-sm text-gray-600">Ready to use</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {profile?.credits || 0}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-3 mb-6">
            <h3 className="font-medium text-gray-900">What's next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Access your dashboard to start creating videos</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Connect your Telegram bot for easy video creation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Start generating AI-powered video advertisements</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}