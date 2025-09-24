import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Video, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface NavbarProps {
  onNavigate: (page: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { user, profile, signOut } = useAuth()
  const [subscription, setSubscription] = React.useState<any>(null)

  // Fetch subscription status for authenticated users
  React.useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return
      
      try {
        console.log('🔍 Fetching subscription for user:', user.id)
        const { data } = await supabase
          .from('stripe_customers')
          .select(`
            customer_id,
            stripe_subscriptions (
              status,
              price_id
            )
          `)
          .eq('user_id', user.id)
          .maybeSingle()
        
        console.log('📊 Subscription query result:', data)
        
        if (data?.stripe_subscriptions && Array.isArray(data.stripe_subscriptions)) {
          // Get the first active subscription
          const activeSubscription = data.stripe_subscriptions.find(sub => sub.status === 'active')
          setSubscription(activeSubscription || data.stripe_subscriptions[0])
        } else if (data?.stripe_subscriptions && !Array.isArray(data.stripe_subscriptions)) {
          setSubscription(data.stripe_subscriptions)
        } else {
          console.log('ℹ️ No subscription data found for user')
          setSubscription(null)
        }
      } catch (error) {
        console.error('❌ Error fetching subscription:', error)
        // Don't show error to user, just continue without subscription info
        setSubscription(null)
      }
    }

    fetchSubscription()
  }, [user])

  const handleSignOut = async () => {
    console.log('🔄 Navbar: Starting sign out...')
    try {
      await signOut()
      console.log('✅ Navbar: Sign out completed, navigating to home...')
      onNavigate('home')
      console.log('✅ Navbar: Navigation to home completed')
    } catch (error) {
      console.error('❌ Navbar: Sign out failed:', error)
    }
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI VideoGen
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{profile?.email}</span>
                  {subscription?.status === 'active' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      VideoGen Active
                    </span>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}