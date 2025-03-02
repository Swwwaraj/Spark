import React, { useState, useEffect, useRef } from "react";
import { PlusCircle, Trash2, GripVertical, ExternalLink, Share2, Edit } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../styles/Links.css";

const LinksTab = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [activeTab, setActiveTab] = useState("link");
  const [bannerColor, setBannerColor] = useState("#3B3731");
  const [customColor, setCustomColor] = useState("#000000");
  const [bio, setBio] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const { user, updateBanner, updateProfile } = useAuth();
  
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/links", {
          headers: {
            "x-auth-token": token,
          },
        });
        setLinks(response.data);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
    
    // Set banner color from user profile if available
    if (user && user.bannerColor) {
      setBannerColor(user.bannerColor);
    }
    
    // Set bio from user profile if available
    if (user && user.bio) {
      setBio(user.bio);
    }
  }, [user]);

  const handleAddLink = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.post(
        "http://localhost:5000/api/links",
        newLink,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setLinks([...links, response.data]);
      setNewLink({ title: "", url: "" });
      setIsAddingLink(false);
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://localhost:5000/api/links/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      setLinks(links.filter((link) => link._id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleToggleActive = async (id, active) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `http://localhost:5000/api/links/${id}`,
        { active: !active },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setLinks(
        links.map((link) =>
          link._id === id ? { ...link, active: !active } : link
        )
      );
    } catch (error) {
      console.error("Error toggling link status:", error);
    }
  };

  const handleColorChange = (color) => {
    setBannerColor(color);
  };

  const handleCustomColorChange = (e) => {
    setCustomColor(e.target.value);
  };
  
  const handleBioChange = (e) => {
    const value = e.target.value;
    if (value.length <= 80) {
      setBio(value);
    }
  };
  
  const handleSaveBanner = async () => {
    try {
      await updateBanner(bannerColor);
    } catch (error) {
      console.error("Error saving banner color:", error);
    }
  };
  
  const handleSaveBio = async () => {
    try {
      await updateProfile({ bio });
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };
  
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    setIsDragging(true);
    setDraggedItem(links[index]);
    e.dataTransfer.effectAllowed = "move";
  };
  
  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
    e.preventDefault();
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = async (e) => {
    e.preventDefault();
    const copyLinks = [...links];
    const draggedItemContent = copyLinks[dragItem.current];
    
    // Remove the dragged item
    copyLinks.splice(dragItem.current, 1);
    
    // Add it at the new position
    copyLinks.splice(dragOverItem.current, 0, draggedItemContent);
    
    // Update the order property for each link
    const reorderedLinks = copyLinks.map((link, index) => ({
      ...link,
      order: index
    }));
    
    setLinks(reorderedLinks);
    setIsDragging(false);
    setDraggedItem(null);
    
    // Save the new order to the backend
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      await axios.put(
        "http://localhost:5000/api/links/reorder",
        { links: reorderedLinks },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    } catch (error) {
      console.error("Error reordering links:", error);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="links-tab">
      <div className="links-header">
        <div className="welcome-section">
          <h1>Hi, {user?.firstName || "Jenny"} {user?.lastName || "Wilson"}!</h1>
          <p>Congratulations. You got a great response today.</p>
        </div>
        <div className="share-button">
          <button>
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>

      <div className="links-container">
        <div className="phone-preview">
          <div className="phone-frame">
            <div className="phone-header" style={{ backgroundColor: bannerColor }}>
              <div className="edit-button">
                <Edit size={18} color="white" />
              </div>
              <div className="profile-section">
                <img
                  src={user?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny"}
                  alt="Profile"
                  className="profile-image"
                />
                <div className="profile-handle">@{user?.username || "opopo_08"}</div>
                {bio && <div className="profile-bio">{bio}</div>}
              </div>
            </div>
            <div className="phone-content">
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === "link" ? "active" : ""}`}
                  onClick={() => setActiveTab("link")}
                >
                  link
                </button>
                <button 
                  className={`tab ${activeTab === "shop" ? "active" : ""}`}
                  onClick={() => setActiveTab("shop")}
                >
                  Shop
                </button>
              </div>
              <div className="preview-links">
                {links.filter((link) => link.active).map((link) => (
                  <a
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="preview-link"
                    onClick={async (e) => {
                      e.preventDefault();
                      // Increment click count
                      try {
                        await axios.put(`http://localhost:5000/api/links/${link._id}/click`);
                        window.open(link.url, '_blank');
                      } catch (error) {
                        console.error("Error incrementing click count:", error);
                        window.open(link.url, '_blank');
                      }
                    }}
                  >
                    {link.title.includes("YouTube") && (
                      <span className="icon youtube-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="red">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                      </span>
                    )}
                    {link.title.includes("Instagram") && (
                      <span className="icon instagram-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FFDC80" />
                            <stop offset="50%" stopColor="#F56040" />
                            <stop offset="100%" stopColor="#833AB4" />
                          </linearGradient>
                          <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </span>
                    )}
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="get-connected">
                <button>Get Connected</button>
              </div>
              <div className="powered-by">
                <span className="spark-logo">SPARK</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="profile-section-panel">
            <h2>Profile</h2>
            <div className="profile-edit-container">
              <div className="profile-image-container">
                <img
                  src={user?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny"}
                  alt="Profile"
                  className="profile-edit-image"
                />
              </div>
              <button className="pick-image-button">Pick an image</button>
              <button className="remove-button">Remove</button>
              
              <div className="profile-fields">
                <div className="profile-field">
                  <label>Profile Title</label>
                  <input 
                    type="text" 
                    value={user?.username || "@opopo_08"} 
                    readOnly 
                  />
                </div>
                
                <div className="profile-field">
                  <label>Bio</label>
                  <textarea 
                    placeholder="Bio" 
                    rows="3"
                    value={bio}
                    onChange={handleBioChange}
                    onBlur={handleSaveBio}
                  ></textarea>
                  <div className="char-count">{bio.length} / 80</div>
                </div>
              </div>
            </div>

            <div className="links-editor">
              <div className="links-actions">
                <button 
                  className="action-button add-link"
                  onClick={() => setIsAddingLink(true)}
                >
                  <PlusCircle size={16} />
                  Add Link
                </button>
                <button className="action-button add-shop">
                  <PlusCircle size={16} />
                  Add Shop
                </button>
              </div>
              
              <button 
                className="add-button" 
                onClick={() => setIsAddingLink(true)}
              >
                <span>+</span> Add
              </button>

              {isAddingLink && (
                <div className="add-link-form">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  />
                  <div className="form-buttons">
                    <button
                      className="cancel-button"
                      onClick={() => {
                        setIsAddingLink(false);
                        setNewLink({ title: "", url: "" });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="save-button"
                      onClick={handleAddLink}
                      disabled={!newLink.title || !newLink.url}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div className="links-list">
                {links.length === 0 ? (
                  <div className="no-links">
                    <p>You don't have any links yet. Add your first link above!</p>
                  </div>
                ) : (
                  links.map((link, index) => (
                    <div 
                      key={link._id} 
                      className={`link-item ${isDragging && draggedItem?._id === link._id ? 'dragging' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                    >
                      <div className="link-drag">
                        <GripVertical size={20} />
                      </div>
                      <div className="link-toggle">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={link.active}
                            onChange={() => handleToggleActive(link._id, link.active)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                      <div className="link-info">
                        <div className="link-title">{link.title}</div>
                        <div className="link-url">
                          <ExternalLink size={14} />
                          {link.url}
                        </div>
                        <div className="link-stats">
                          {link.clicks} clicks
                        </div>
                      </div>
                      <div className="link-actions">
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteLink(link._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="banner-section">
              <h2>Banner</h2>
              <div className="banner-preview" style={{ backgroundColor: bannerColor }}>
                <div className="banner-profile">
                  <img
                    src={user?.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny"}
                    alt="Profile"
                    className="banner-profile-image"
                  />
                  <div className="banner-username">@{user?.username || "opopo_08"}</div>
                  <div className="banner-handle">/{user?.username || "opopo_08"}</div>
                </div>
              </div>
              
              <div className="color-selection">
                <p>Custom Background Color</p>
                <div className="color-options">
                  <button 
                    className={`color-circle brown ${bannerColor === "#3B3731" ? "selected" : ""}`}
                    onClick={() => handleColorChange("#3B3731")}
                  ></button>
                  <button 
                    className={`color-circle white ${bannerColor === "#FFFFFF" ? "selected" : ""}`}
                    onClick={() => handleColorChange("#FFFFFF")}
                  ></button>
                  <button 
                    className={`color-circle black ${bannerColor === "#000000" ? "selected" : ""}`}
                    onClick={() => handleColorChange("#000000")}
                  ></button>
                  <div className="custom-color">
                    <input 
                      type="color" 
                      value={customColor}
                      onChange={handleCustomColorChange}
                      onBlur={() => handleColorChange(customColor)}
                    />
                    <span className="color-hex">{customColor}</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="save-button"
                onClick={handleSaveBanner}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksTab;