import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export function LogIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="mb-12">
          <Link to="/" className="logo">
                      <img 
                        src = "https://i.postimg.cc/j21rGsM0/Screenshot-2025-03-01-223449-removebg-preview.png" style={{
                          height:50 
                        }}
                      />
                      <span className="logo-text">
                        <strong> SPARK™</strong> 
                      </span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Sign in to your Spark</h1>

        {error && <div className="error-message">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="primary-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-[#00C464] hover:underline">
              Forgot password?
            </Link>
          </div>

          <div className="text-center mt-4">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="text-[#00C464] hover:underline">
              Sign up
            </Link>
          </div>

          <div className="text-center text-sm text-gray-500 mt-8">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#" className="text-[#00C464] hover:underline">Privacy Policy</a> and{' '}
            <a href="#" className="text-[#00C464] hover:underline">Terms of Service</a> apply.
          </div>
        </form>
      </div>
      <div className="auth-image" />
    </div>
  );
}
