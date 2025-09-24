import React, { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { Navbar } from './components/Navbar'
import { HomePage } from './components/HomePage'
import { SignUpPage } from './components/SignUpPage'
import { LoginPage } from './components/LoginPage'
import { Dashboard } from './components/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SuccessPage } from './components/SuccessPage'

type Page = 'home' | 'signup' | 'login' | 'dashboard' | 'success'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [sessionId, setSessionId] = useState<string>('')

  // Check for success/cancel parameters on mount
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const canceled = urlParams.get('canceled')
    const session_id = urlParams.get('session_id')
    
    if (success === 'true' && session_id) {
      setSessionId(session_id)
      setCurrentPage('success')
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    } else if (canceled === 'true') {
      // Handle canceled payment
      setCurrentPage('dashboard')
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])
  const navigate = (page: Page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />
      case 'signup':
        return <SignUpPage onNavigate={navigate} />
      case 'login':
        return <LoginPage onNavigate={navigate} />
      case 'dashboard':
        return (
          <ProtectedRoute fallback={<LoginPage onNavigate={navigate} />}>
            <Dashboard onNavigate={navigate} />
          </ProtectedRoute>
        )
      case 'success':
        return (
          <ProtectedRoute fallback={<LoginPage onNavigate={navigate} />}>
            <SuccessPage onNavigate={navigate} sessionId={sessionId} />
          </ProtectedRoute>
        )
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={navigate} />
        {renderPage()}
      </div>
    </AuthProvider>
  )
}

export default App