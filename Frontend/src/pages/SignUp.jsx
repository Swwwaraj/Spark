import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export function SignUp() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    category: ''
  });
  
  const { register, error, loading } = useAuth(); // ✅ Fixed `signup` → `register`
  const navigate = useNavigate();

  const categories = [
    { id: 'business', label: 'Business', icon: '💼' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { id: 'fashion', label: 'Fashion & Beauty', icon: '👗' },
    { id: 'food', label: 'Food & Beverage', icon: '🍽' },
    { id: 'health', label: 'Health & Wellness', icon: '🧘‍♀️' },
    { id: 'nonprofit', label: 'Non-Profit', icon: '🤝' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'travel', label: 'Travel & Tourism', icon: '✈️' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySelect = (e, categoryId) => {
    e.preventDefault(); // ✅ Prevent page refresh
    setCategory(categoryId);
    setFormData({ ...formData, category: categoryId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (!formData.username) {
      alert("Please enter a username");
      return;
    }

    try {
      await register(formData); // ✅ Use `register` instead of `signup`
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  const moveToNextStep = () => {
    if (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword)) {
      alert('Please fill in all fields');
      return;
    }
    
    setStep(step + 1);
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

        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold mb-4">Sign up to your Spark</h1>
            <p className="text-[#00C464] mb-8">Welcome to Spark</p>
            <button className="secondary-button mb-4">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
            <button className="primary-button" onClick={() => setStep(2)}>
              Continue with email
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-3xl font-bold mb-8">Create an account</h1>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="firstName" placeholder="First name" className="input-field" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last name" className="input-field" value={formData.lastName} onChange={handleChange} required />
              </div>
              <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" className="input-field" value={formData.confirmPassword} onChange={handleChange} required />
              <button type="button" className="primary-button" onClick={moveToNextStep}>Create an account</button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-3xl font-bold mb-4">Tell us about yourself</h1>
            <input type="text" name="username" placeholder="Tell us your username" className="input-field mb-8" value={formData.username} onChange={handleChange} required />
            <p className="text-sm font-medium mb-4">Select one category that best describes your Linktree:</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button key={cat.id} className={`category-tag ${category === cat.id ? 'selected' : ''}`} onClick={(e) => handleCategorySelect(e, cat.id)} type="button">
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
            <button className="primary-button flex items-center justify-center gap-2" onClick={handleSubmit} disabled={loading || !formData.username || !category}>
              {loading ? 'Creating account...' : 'Continue'}
              <ChevronRight size={20} />
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        )}
      </div>
      <div className="auth-image" />
    </div>
  );
}
