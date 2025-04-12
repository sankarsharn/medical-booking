"use client";
import React, { useState, FormEvent } from 'react';
import { useAuthStore } from '@/store/authStore';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInProps {
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onSocialSignIn?: (provider: 'google' | 'facebook' | 'apple') => void;
}

const SignIn: React.FC<SignInProps> = ({
  onSignUp,
  onForgotPassword,
  onSocialSignIn
}) => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      login(data.user);
  
      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }
  
      // No need to handle token here - it's in HTTP-only cookie
      router.push('/');
  
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in. Please try again.');
      console.error('SignIn Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: 'google' | 'facebook' | 'apple') => {
    if (onSocialSignIn) {
      onSocialSignIn(provider);
    } else {
      console.log(`Sign in with ${provider} attempted`);
      // Implement actual social sign-in logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form section */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Sign in to your account</h2>
              <p className="text-gray-500 text-sm mt-1">Please enter your credentials to continue</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition" 
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaLock className="text-sm" />
                  </div>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition" 
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <button 
                  type="button" 
                  className="text-blue-600 text-xs font-medium hover:text-blue-800 hover:underline transition"
                  onClick={onForgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium text-sm flex justify-center items-center shadow hover:shadow-md transition duration-300 disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight className="ml-2 text-xs" />
                  </>
                )}
              </button>
              
              <div className="mt-6 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <button 
                  type="button" 
                  title="Sign in with Google"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-red-500 hover:bg-gray-50 hover:shadow-sm transition"
                  onClick={() => handleSocialSignIn('google')}
                >
                  <FaGoogle className="text-sm" />
                </button>
                <button 
                  type="button" 
                  title="Sign in with Facebook"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-blue-600 hover:bg-gray-50 hover:shadow-sm transition"
                  onClick={() => handleSocialSignIn('facebook')}
                >
                  <FaFacebookF className="text-sm" />
                </button>
                <button 
                  type="button" 
                  title="Sign in with Apple"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:shadow-sm transition"
                  onClick={() => handleSocialSignIn('apple')}
                >
                  <FaApple className="text-sm" />
                </button>
              </div>
              
             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;