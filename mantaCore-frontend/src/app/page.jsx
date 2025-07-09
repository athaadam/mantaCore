'use client'
import { useState, useEffect } from 'react';
import AuthForm from '@/components/form/AuthForm';

export default function Page() {
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col lg:flex-row">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side: Hero Section */}
      <div className="flex-1 lg:w-3/5 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), 
                             radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Overlay Background Image */}
        <div
          className="absolute inset-0 opacity-20 bg-blend-overlay"
          style={{
            backgroundImage: 'url(/assets/common/erp.gif)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white">
          {/* Header */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Trusted by 1000+ businesses</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block">Empowering</span>
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Your Business
                </span>
                <span className="block">Workflow</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-md leading-relaxed">
                Streamline operations, boost productivity, and accelerate growth with our comprehensive business management platform.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: '⚡', title: 'Real-time Analytics', desc: 'Instant insights' },
                { icon: '🔒', title: 'Secure & Reliable', desc: 'Enterprise-grade' },
                { icon: '📊', title: 'Smart Reports', desc: 'AI-powered data' },
                { icon: '🚀', title: 'Rapid Deployment', desc: 'Setup in minutes' }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <div className="font-semibold text-sm">{feature.title}</div>
                    <div className="text-xs text-white/70">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/assets/common/logo.png"
                  alt="MantaCore Logo"
                  className="w-32 sm:w-40 lg:w-48 h-auto filter drop-shadow-lg"
                />
                <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-bold">MantaCore</div>
                <div className="text-sm text-white/70">Business Management Suite</div>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex flex-col text-right space-y-2">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-white/70">Uptime</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-40 w-2 h-2 bg-orange-300 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-indigo-300 rounded-full animate-pulse"></div>
      </div>

      {/* Right Side: Authentication Form */}
      <div className="flex-1 lg:w-2/5 min-h-screen lg:min-h-0 flex items-center justify-center p-4 lg:p-8 relative">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

        {/* Form Container */}
        <div className="relative z-10 w-full max-w-md">
          {/* Mode Switch Pills */}
          <div className="mb-8 flex bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-white/30 shadow-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${isLogin
                  ? 'bg-white text-violet-600 shadow-md transform scale-[1.02]'
                  : 'text-slate-600 hover:text-violet-600'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${!isLogin
                  ? 'bg-white text-violet-600 shadow-md transform scale-[1.02]'
                  : 'text-slate-600 hover:text-violet-600'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Auth Form */}
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/30 transition-all duration-500 hover:shadow-3xl">
            <AuthForm
              mode={isLogin ? 'login' : 'register'}
              onSwitch={() => setIsLogin(!isLogin)}
            />
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
