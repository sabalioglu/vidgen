import React, { useState } from 'react';
import { Video, Plus, Coins, User, LogOut, Play, Download, Calendar, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface VideoProject {
  id: string;
  title: string;
  description: string;
  status: 'generating' | 'completed' | 'failed';
  createdAt: Date;
  thumbnailUrl?: string;
}

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [videoDescription, setVideoDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Mock video projects
  const [projects, setProjects] = useState<VideoProject[]>([
    {
      id: '1',
      title: 'Product Launch Video',
      description: 'Introducing our new AI-powered video creation tool',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Marketing Campaign',
      description: 'Summer sale promotion video for social media',
      status: 'generating',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    }
  ]);

  const handleLogout = () => {
    logout().then(() => {
      navigate('/');
    });
  };

  const handleCreateVideo = async () => {
    if (!videoDescription.trim()) return;
    
    setLoading(true);
    
    // Simulate video generation
    const newProject: VideoProject = {
      id: Date.now().toString(),
      title: `Video ${projects.length + 1}`,
      description: videoDescription,
      status: 'generating',
      createdAt: new Date()
    };
    
    setProjects(prev => [newProject, ...prev]);
    setVideoDescription('');
    setShowCreateModal(false);
    
    // Simulate completion after 5 seconds
    setTimeout(() => {
      setProjects(prev => 
        prev.map(p => 
          p.id === newProject.id 
            ? { ...p, status: 'completed' as const, thumbnailUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' }
            : p
        )
      );
    }, 5000);
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI VideoGen
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-purple-50 rounded-lg">
                <Coins className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">{user?.credits} credits</span>
              </div>
              
              {user?.telegramConnected ? (
                <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Telegram Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-3 py-2 bg-yellow-50 rounded-lg">
                  <MessageCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-700">Connect Telegram</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Videos</h1>
            <p className="text-gray-600 mt-1">Create and manage your AI-generated video content</p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Create Video</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                {project.thumbnailUrl ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {project.status === 'generating' ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-500">Generating...</span>
                      </div>
                    ) : (
                      <Video className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                )}
                
                {project.status === 'completed' && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-200 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : project.status === 'generating'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{project.createdAt.toLocaleDateString()}</span>
                  </div>
                  
                  {project.status === 'completed' && (
                    <button className="flex items-center space-x-1 px-2 py-1 text-xs text-purple-600 hover:bg-purple-50 rounded transition-colors">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Video className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
              <p className="text-gray-500 text-center mb-4">
                Create your first AI-generated video to get started
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Your First Video
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Video Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Video</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your video
                </label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Describe what kind of video you want to create..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateVideo}
                  disabled={!videoDescription.trim() || loading}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Creating...' : 'Create Video'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};