"use client"
import React, { useState, FormEvent } from 'react';
import { FaShieldAlt, FaEnvelope, FaLock, FaUser, FaArrowRight, FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

interface SignUpProps {
  onSignIn?: () => void;
  onSocialSignUp?: (provider: 'google' | 'facebook' | 'apple') => void;
}

const SignUp: React.FC<SignUpProps> = ({
  onSignIn,
  onSocialSignUp
}) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

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
    setSuccess(null);
    
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setSuccess('Signup successful! Redirecting...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/authentication');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: 'google' | 'facebook' | 'apple') => {
    if (onSocialSignUp) {
      onSocialSignUp(provider);
    } else {
      console.log(`Sign up with ${provider} attempted`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form section */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Create your account</h2>
              <p className="text-gray-500 text-sm mt-1">Get started with your free account</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded text-sm">
                  {success}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaUser className="text-sm" />
                  </div>
                  <input 
                    type="text" 
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition" 
                    placeholder="cooluser123"
                    required
                  />
                </div>
              </div>
              
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
              
              <div className="mb-6">
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
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Use 8 or more characters with a mix of letters, numbers & symbols</p>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Sign Up
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
                      Or sign up with
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-3">
                <button 
                  type="button" 
                  title="Sign up with Google"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-red-500 hover:bg-gray-50 hover:shadow-sm transition"
                  onClick={() => handleSocialSignUp('google')}
                >
                  <FaGoogle className="text-sm" />
                </button>
                <button 
                  type="button" 
                  title="Sign up with Facebook"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-blue-600 hover:bg-gray-50 hover:shadow-sm transition"
                  onClick={() => handleSocialSignUp('facebook')}
                >
                  <FaFacebookF className="text-sm" />
                </button>
                <button 
                  type="button" 
                  title="Sign up with Apple"
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:shadow-sm transition"
                  onClick={() => handleSocialSignUp('apple')}
                >
                  <FaApple className="text-sm" />
                </button>
              </div>
              
              <div className="mt-6 text-center text-xs text-gray-500">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;