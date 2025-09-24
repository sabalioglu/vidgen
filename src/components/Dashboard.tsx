import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Video, 
  Coins, 
  MessageCircle, 
  Copy, 
  CheckCircle2, 
  CreditCard,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { STRIPE_PRODUCTS } from '../stripe-config'

interface DashboardProps {
  onNavigate: (page: string) => void
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { profile, refreshProfile, session } = useAuth()
  const [copiedKey, setCopiedKey] = useState(false)
  const [processingPayment, setProcessingPayment] = useState<string | null>(null)

  const copyTelegramKey = () => {
    if (profile?.telegram_connection_key) {
      navigator.clipboard.writeText(profile.telegram_connection_key)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
    }
  }

  const handlePurchase = async (priceId: string, productName: string) => {
    setProcessingPayment(priceId)
    
    console.log('Starting purchase process...')
    console.log('Price ID:', priceId)
    console.log('Session exists:', !!session)
    console.log('Access token exists:', !!session?.access_token)
    
    if (!session?.access_token) {
      alert('You must be logged in to make a purchase.')
      setProcessingPayment(null)
      return
    }

    try {
      const requestBody = {
        price_id: priceId,
        success_url: `${window.location.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}?canceled=true`,
        mode: 'payment'
      }
      
      console.log('Request URL:', `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`)
      console.log('Request body:', requestBody)
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })
      
      console.log('Response status:', response.status)
      console.log('Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error text:', errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }
      
      const responseData = await response.json()
      console.log('Response data:', responseData)
      
      const { url, error } = responseData
      
      if (error) {
        console.error('Checkout error from response:', error)
        throw new Error(error)
      }
      
      if (url) {
        console.log('Redirecting to:', url)
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(`Failed to start checkout for ${productName}. Error: ${error.message}. Please check the console for more details.`)
    } finally {
      setProcessingPayment(null)
    }
  }

  const handleCreateVideo = () => {
    alert('Video creation feature will be integrated with your Telegram bot workflow!')
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Ready to create some amazing video ads?
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credit Balance & Create Video */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credits Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Credits</h2>
                    <p className="text-gray-600">Use credits to generate videos</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">{profile.credits}</div>
                  <p className="text-sm text-gray-500">credits remaining</p>
                </div>
              </div>
              
              {/* Create Video Button */}
              <button
                onClick={handleCreateVideo}
                disabled={profile.credits <= 0}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
              >
                <Video className="w-6 h-6" />
                <span className="text-lg">Create New Video</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              {profile.credits <= 0 && (
                <p className="text-center text-red-600 text-sm mt-3">
                  You need credits to create videos. Purchase more below! 👇
                </p>
              )}
            </div>

            {/* Purchase Credits */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Purchase Credits</h2>
                  <p className="text-gray-600">Choose the perfect package for your needs</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STRIPE_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className={`relative p-4 border-2 rounded-xl transition-all duration-200 hover:shadow-md ${
                      product.popular 
                        ? 'border-purple-200 bg-purple-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {product.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-1 px-3 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Popular</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {product.name}
                      </div>
                      <div className="text-3xl font-bold text-purple-600">
                        ${product.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.description}
                      </div>
                    </div>

                    <button
                      onClick={() => handlePurchase(product.priceId, product.name)}
                      disabled={processingPayment === product.priceId}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        product.popular
                          ? 'bg-purple-500 text-white hover:bg-purple-600 hover:shadow-lg'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      } disabled:opacity-50`}
                    >
                      {processingPayment === product.priceId ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>Buy Now</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Telegram Connection Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-600 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Telegram Bot</h2>
                  <p className="text-sm text-gray-600">Connect your account</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 mb-4 ${
                profile.telegram_connected 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-orange-200 bg-orange-50'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    profile.telegram_connected ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <span className={`font-medium ${
                    profile.telegram_connected ? 'text-green-700' : 'text-orange-700'
                  }`}>
                    {profile.telegram_connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <p className={`text-sm ${
                  profile.telegram_connected ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {profile.telegram_connected 
                    ? 'Your Telegram account is linked and ready to use!'
                    : 'Connect your Telegram to create videos via chat'
                  }
                </p>
              </div>

              {!profile.telegram_connected && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Connection Instructions:</h3>
                  <ol className="space-y-2 text-sm text-gray-600 mb-4">
                    <li className="flex space-x-2">
                      <span className="font-medium text-purple-600">1.</span>
                      <span>Find our bot @YourBotName on Telegram</span>
                    </li>
                    <li className="flex space-x-2">
                      <span className="font-medium text-purple-600">2.</span>
                      <span>Send this command to the bot:</span>
                    </li>
                  </ol>

                  <div className="bg-gray-100 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-800 break-all">
                        /start {profile.telegram_connection_key}
                      </code>
                      <button
                        onClick={copyTelegramKey}
                        className="ml-2 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedKey ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    This key is unique to your account and can only be used once.
                  </p>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{profile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account ID:</span>
                  <span className="font-medium font-mono text-xs">
                    {profile.id.slice(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}