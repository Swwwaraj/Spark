import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart2,
  Share2,
  Zap,
  ChevronRight,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Gift,
  Book,
  MessageCircle,
  Phone,
  Music,
  Calendar,
  ShoppingBag,
  Users,
  Mail,
  Leaf
} from "lucide-react";
import "../styles/Home.css";

export function Home() {
  const integrations = [
    { name: "Audiomack", icon: <Music />, color: "#FFA500", description: "Add an Audiomack player to your Linktree" },
    { name: "Bandsintown", icon: <Calendar />, color: "#00B4B3", description: "Drive ticket sales by listing your events" },
    { name: "Bonfire", icon: <ShoppingBag />, color: "#FF5C35", description: "Display and sell your custom merch" },
    { name: "Books", icon: <Book />, color: "#8B4513", description: "Promote books on your Linktree" },
    { name: "Buy Me A Gift", icon: <Gift />, color: "#FF69B4", description: "Let visitors support you with a small gift" },
    { name: "Cameo", icon: <Users />, color: "#1DA1F2", description: "Make impossible fan connections possible" },
    { name: "Clubhouse", icon: <MessageCircle />, color: "#F1C40F", description: "Let your community in on the conversation" },
    { name: "Community", icon: <Users />, color: "#9B59B6", description: "Build an SMS subscriber list" },
    { name: "Contact Details", icon: <Phone />, color: "#3498DB", description: "Easily share downloadable contact details" }
  ];

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          {/* Logo Section */}
          <Link to="/" className="logo">
            <img 
              src = "https://i.postimg.cc/j21rGsM0/Screenshot-2025-03-01-223449-removebg-preview.png" style={{
                height:50 
              }}
            />
            <span className="logo-text">
              <strong> SPARK™</strong> 
            </span>
            | Marketplace
          </Link>

          {/* Navigation Buttons */}
          <div className="nav-links">
            <Link to="/login" className="login-button">
              Log in
            </Link>
            <Link to="/signup" className="signup-button">
              Sign up free
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>The easiest place to update and share your Connection</h1>
          <p>
            Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!
          </p>
          <Link to="/signup" className="primary-button">
            Get your free Spark
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://i.postimg.cc/vHqWhqdJ/Analytics-1.png" 
            alt="Dashboard preview" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-left">
          <img 
          src = "https://i.postimg.cc/yN8xNfzY/Whats-App-Image-2025-02-27-at-9-26-30-PM-removebg-preview.png"
          alt="Dollar Chart"/>
         
          
        </div>
        
        <div className="feature-right">
          <div className="feature-heading">
            <h2>Analyze your audience and keep your followers engaged</h2>
            <p>Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.</p>
          </div>
        </div>
      </section>

      {/* Content Sharing Section */}
      <section className="content-sharing-section">
        <div className="content-left">
          <h2>Share limitless content in limitless ways</h2>
          <p>Connect your content in all its forms and help followers find more of what they're looking for. Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more… It all comes together in one powerful place.</p>
        </div>
        <div className="content-right">
        <img 
            src="https://i.postimg.cc/C5kNV7Nh/Screenshot-2025-03-01-221808-removebg-preview.png" 
            alt="Music preview" 
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-header">
          <h2>Here's what our <span className="highlight">customer</span> has to say</h2>
          <p>Real stories from real users who have transformed their online presence with Spark.</p>
          <Link to="/stories" className="secondary-button">Read customer stories</Link>
        </div>
        <div className="testimonials">
          <div className="testimonial-column">
            <div className="testimonial-card">
              <h4>Amazing tool! Saved me months</h4>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="John Master" />
                </div>
                <div className="author-info">
                  <span className="author-name">John Master</span>
                  <span className="author-title">Director, Spark.com</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <h4>Boosted my online presence</h4>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Sarah Johnson" />
                </div>
                <div className="author-info">
                  <span className="author-name">Sarah Johnson</span>
                  <span className="author-title">Content Creator</span>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-column">
            <div className="testimonial-card">
              <h4>Perfect for my business</h4>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="David Chen" />
                </div>
                <div className="author-info">
                  <span className="author-name">David Chen</span>
                  <span className="author-title">Entrepreneur</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <h4>Simplified my online presence</h4>
              <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" alt="Emily Taylor" />
                </div>
                <div className="author-info">
                  <span className="author-name">Emily Taylor</span>
                  <span className="author-title">Digital Marketer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="integrations-section">
        <h2>All Link Apps and Integrations</h2>
        <div className="integrations">
          {integrations.map((integration) => (
            <div key={integration.name} className="integration-card">
              <div className="integration-icon" style={{ color: integration.color }}>{integration.icon}</div>
              <div className="integration-details">
                <span className="integration-name">{integration.name}</span>
                <span className="integration-description">{integration.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
      <div className="footer-column footer-cta">
          <div className="footer-buttons">
              <Link to="/login" className="footer-button login">Log in</Link>
              <Link to="/signup" className="footer-button signup">Sign up free</Link>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h4>About Spark</h4>
            <ul>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Social Good</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Blog</h4>
            <ul>
              <li><a href="#">Getting Started</a></li>
              <li><a href="#">Features and How-Tos</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Report a Violation</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Terms and Conditions</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Notice</a></li>
              <li><a href="#">Trust Center</a></li>
            </ul>
          </div>
         
        </div>
        <div className="footer-bottom">
          <p>We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.</p>
          <div className="social-icons">
            <Instagram size={20} />
            <Youtube size={20} />
            <Twitter size={20} />
            <Facebook size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;