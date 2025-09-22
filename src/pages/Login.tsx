import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetIdentifier, setResetIdentifier] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(identifier, password, loginMethod);
      const user = useAuthStore.getState().user;
      
      if (user?.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
      
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetIdentifier) {
      toast.error('Please enter your email or mobile number');
      return;
    }

    try {
      // In a real application, this would call an API to send a reset link
      toast.success('Password reset instructions have been sent to your email/mobile');
      setShowForgotPassword(false);
    } catch (error) {
      toast.error('Failed to process password reset request');
    }
  };

  const toggleLoginMethod = () => {
    setLoginMethod(prev => prev === 'email' ? 'mobile' : 'email');
    setIdentifier('');
  };

  if (showForgotPassword) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Reset Password</h2>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-3">
                    <label className="form-label">Email or Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={resetIdentifier}
                      onChange={(e) => setResetIdentifier(e.target.value)}
                      required
                      placeholder="Enter email or mobile number"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Send Reset Instructions
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-link w-100"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>
              <div className="btn-group w-100 mb-4">
                <button
                  className={`btn ${loginMethod === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLoginMethod('email')}
                >
                  Email
                </button>
                <button
                  className={`btn ${loginMethod === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setLoginMethod('mobile')}
                >
                  Mobile
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="identifier" className="form-label">
                    {loginMethod === 'email' ? 'Email address' : 'Mobile Number'}
                  </label>
                  <input
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    className="form-control"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    pattern={loginMethod === 'mobile' ? '[0-9]{10}' : undefined}
                    placeholder={loginMethod === 'email' ? 'Enter email' : 'Enter 10-digit mobile number'}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 text-end">
                  <button 
                    type="button" 
                    className="btn btn-link p-0"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="text-center">
                  Don't have an account? <Link to="/register">Register here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;