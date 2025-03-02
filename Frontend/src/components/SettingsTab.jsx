import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const SettingsTab = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "Jenny",
    lastName: user?.lastName || "Wilson",
    email: user?.email || "JennyWilson08@gmail.com",
    password: "••••••••••••",
    confirmPassword: "••••••••••••"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const dataToUpdate = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        ...(formData.password !== "••••••••••••" && { password: formData.password })
      };
      
      await axios.put('http://localhost:5000/api/users/profile', dataToUpdate, {
        headers: {
          'x-auth-token': token
        }
      });
      
      setMessage("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="settings-tab">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h2>Edit Profile</h2>
          
          {message && (
            <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="form-actions">
              {!isEditing ? (
                <button 
                  type="button" 
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: user?.firstName || "Jenny",
                        lastName: user?.lastName || "Wilson",
                        email: user?.email || "JennyWilson08@gmail.com",
                        password: "••••••••••••",
                        confirmPassword: "••••••••••••"
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="save-button"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;