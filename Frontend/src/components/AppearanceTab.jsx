import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import React from "react";


const AppearanceTab = () => {
  const navigate = useNavigate();

  const [activeLayout, setActiveLayout] = useState("list")
  const [activeTheme, setActiveTheme] = useState("air-know")
  const [activeButtonStyle, setActiveButtonStyle] = useState("fill")
  const [buttonColor, setButtonColor] = useState("#FFFFFF")
  const [buttonFontColor, setButtonFontColor] = useState("#888888")
  const [fontFamily, setFontFamily] = useState("DM Sans")
  const [fontColor, setFontColor] = useState("#FFFFFF")
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleGetConnectedClick = () => {
    router.push("/")
  }

  const layouts = [
    { id: "list", name: "List" },
    { id: "grid", name: "Grid" },
    { id: "full-width", name: "Full width" },
  ]

  const buttonStyles = [
    { id: "fill", name: "Fill" },
    { id: "outline", name: "Outline" },
    { id: "hard-shadow", name: "Hard shadow" },
    { id: "soft-shadow", name: "Soft shadow" },
    { id: "special", name: "Special" },
  ]

  const themes = [
    { id: "air-know", name: "Air Know", bgColor: "#ffffff", textColor: "#000000" },
    { id: "air-gray", name: "Air Gray", bgColor: "#f5f5f5", textColor: "#333333" },
    { id: "air-stroke", name: "Air Stroke", bgColor: "#333333", textColor: "#ffffff" },
    { id: "air-black", name: "Air Black", bgColor: "#121212", textColor: "#ffffff" },
    { id: "mineral-blue", name: "Mineral Blue", bgColor: "#e6f7ff", textColor: "#0066cc" },
    { id: "mineral-green", name: "Mineral Green", bgColor: "#e6fff0", textColor: "#00994d" },
    { id: "mineral-orange", name: "Mineral Orange", bgColor: "#fff5e6", textColor: "#cc6600" },
  ]

  const fontOptions = [
    "DM Sans",
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Comic Sans MS",
    "Impact",
  ]

  const getButtonStyle = (style) => {
    switch (style) {
      case "fill":
        return {
          backgroundColor: buttonColor,
          color: buttonFontColor,
          border: "none",
          borderRadius: "8px",
        }
      case "outline":
        return {
          backgroundColor: "transparent",
          color: buttonFontColor,
          border: `1px solid ${buttonColor}`,
          borderRadius: "8px",
        }
      case "hard-shadow":
        return {
          backgroundColor: buttonColor,
          color: buttonFontColor,
          border: "none",
          borderRadius: "8px",
          boxShadow: "4px 4px 0px #000000",
        }
      case "soft-shadow":
        return {
          backgroundColor: buttonColor,
          color: buttonFontColor,
          border: "none",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }
      case "special":
        return {
          backgroundColor: buttonColor,
          color: buttonFontColor,
          border: "none",
          borderRadius: "8px",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 70%, 90% 100%, 70% 70%, 50% 100%, 30% 70%, 10% 100%, 0% 70%)",
        }
      default:
        return {
          backgroundColor: buttonColor,
          color: buttonFontColor,
          border: "none",
          borderRadius: "8px",
        }
    }
  }

  return (
    <div className="appearance-tab">
      <div className="appearance-header">
        <h1>Appearance</h1>
        <p>No questions? Change your appearance here.</p>
      </div>

      <div className="appearance-container">
        {!isMobile && (
          <div className="phone-preview">
            <div className="phone-frame">
              <div
                className="phone-content"
                style={{
                  backgroundColor: themes.find((t) => t.id === activeTheme)?.bgColor,
                  color: themes.find((t) => t.id === activeTheme)?.textColor,
                  fontFamily: fontFamily,
                }}
              >
                <div className="profile-section">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny"
                    alt="Profile"
                    className="profile-image"
                  />
                  <div className="profile-handle">@popopo_08</div>
                </div>
                <div className={`preview-links ${activeLayout}`}>
                  <a href="#" className="preview-link" style={getButtonStyle(activeButtonStyle)}>
                    <div className="link-content">
                      <div className="link-icon youtube-icon"></div>
                      <span>Latest YouTube Video</span>
                    </div>
                  </a>
                  <a href="#" className="preview-link" style={getButtonStyle(activeButtonStyle)}>
                    <div className="link-content">
                      <div className="link-icon instagram-icon"></div>
                      <span>Latest Instagram reel</span>
                    </div>
                  </a>
                </div>
                <div className="get-connected">
                  <button
                    onClick={handleGetConnectedClick}
                    style={{
                      ...getButtonStyle(activeButtonStyle),
                      backgroundColor: "#00C464",
                    }}
                  >
                    Get Connected
                  </button>
                </div>
                <div className="powered-by">
                  <span>SPARK</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="appearance-editor">
          <div className="appearance-section">
            <h3>Layout</h3>
            <div className="layout-options">
              {layouts.map((layout) => (
                <div
                  key={layout.id}
                  className={`layout-option ${activeLayout === layout.id ? "active" : ""}`}
                  onClick={() => setActiveLayout(layout.id)}
                >
                  <div className="layout-preview">
                    {layout.id === "list" && (
                      <div className="layout-list">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                      </div>
                    )}
                    {layout.id === "grid" && (
                      <div className="layout-grid">
                        <div className="grid-item"></div>
                        <div className="grid-item"></div>
                        <div className="grid-item"></div>
                        <div className="grid-item"></div>
                      </div>
                    )}
                    {layout.id === "full-width" && (
                      <div className="layout-full-width">
                        <div className="full-width-item"></div>
                        <div className="full-width-item"></div>
                      </div>
                    )}
                  </div>
                  <div className="layout-name">{layout.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="appearance-section">
            <h3>Buttons</h3>
            <div className="button-styles-section">
              <div className="button-style-label">Fill</div>
              <div className="button-style-options">
                <div
                  className={`button-style-option ${activeButtonStyle === "fill" ? "active" : ""}`}
                  onClick={() => setActiveButtonStyle("fill")}
                  style={{ backgroundColor: "#000000", borderRadius: "8px" }}
                ></div>
                <div className="button-style-option" style={{ backgroundColor: "#444444", borderRadius: "8px" }}></div>
                <div className="button-style-option" style={{ backgroundColor: "#888888", borderRadius: "8px" }}></div>
              </div>

              <div className="button-style-label">Outline</div>
              <div className="button-style-options">
                <div
                  className={`button-style-option ${activeButtonStyle === "outline" ? "active" : ""}`}
                  onClick={() => setActiveButtonStyle("outline")}
                  style={{ backgroundColor: "transparent", border: "1px solid #000000", borderRadius: "8px" }}
                ></div>
                <div
                  className="button-style-option"
                  style={{ backgroundColor: "transparent", border: "1px solid #444444", borderRadius: "8px" }}
                ></div>
                <div
                  className="button-style-option"
                  style={{ backgroundColor: "transparent", border: "1px solid #888888", borderRadius: "8px" }}
                ></div>
              </div>

              <div className="button-style-label">Hard shadow</div>
              <div className="button-style-options">
                <div
                  className={`button-style-option ${activeButtonStyle === "hard-shadow" ? "active" : ""}`}
                  onClick={() => setActiveButtonStyle("hard-shadow")}
                  style={{ backgroundColor: "#000000", borderRadius: "8px", boxShadow: "2px 2px 0px #000000" }}
                ></div>
                <div
                  className="button-style-option"
                  style={{ backgroundColor: "#444444", borderRadius: "8px", boxShadow: "2px 2px 0px #444444" }}
                ></div>
                <div
                  className="button-style-option"
                  style={{ backgroundColor: "#888888", borderRadius: "8px", boxShadow: "2px 2px 0px #888888" }}
                ></div>
              </div>

              <div className="button-style-label">Soft shadow</div>
              <div className="button-style-options">
                <div
                  className={`button-style-option ${activeButtonStyle === "soft-shadow" ? "active" : ""}`}
                  onClick={() => setActiveButtonStyle("soft-shadow")}
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                ></div>
                <div
                  className="button-style-option"
                  style={{
                    backgroundColor: "#444444",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                ></div>
                <div
                  className="button-style-option"
                  style={{
                    backgroundColor: "#888888",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                ></div>
              </div>

              <div className="button-style-label">Special</div>
              <div className="button-style-options">
                <div
                  className={`button-style-option ${activeButtonStyle === "special" ? "active" : ""}`}
                  onClick={() => setActiveButtonStyle("special")}
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "8px",
                    borderTop: "2px solid #000000",
                    borderBottom: "2px solid #000000",
                    borderLeft: "2px solid #000000",
                    borderRight: "2px solid #000000",
                    borderStyle: "wavy",
                  }}
                ></div>
                <div
                  className="button-style-option"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #000000",
                    borderRadius: "8px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "5px",
                      background: "repeating-linear-gradient(90deg, #000, #000 5px, transparent 5px, transparent 10px)",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "5px",
                      background: "repeating-linear-gradient(90deg, #000, #000 5px, transparent 5px, transparent 10px)",
                    }}
                  ></div>
                </div>
                <div
                  className="button-style-option"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #000000",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                ></div>
              </div>

              <div className="button-color-section">
                <div className="button-color-row">
                  <label>Button color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="text"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="color-input"
                    />
                  </div>
                </div>
                <div className="button-color-row">
                  <label>Button font color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="text"
                      value={buttonFontColor}
                      onChange={(e) => setButtonFontColor(e.target.value)}
                      className="color-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="appearance-section">
            <h3>Fonts</h3>
            <div className="fonts-options">
              <div className="font-row">
                <label>Font</label>
                <div className="font-selector">
                  <div className="font-preview">
                    <span className="font-icon">Aa</span>
                    <span className="font-name">{fontFamily}</span>
                  </div>
                  <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="font-select">
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="font-row">
                <label>Color</label>
                <div className="color-input-wrapper">
                  <input
                    type="text"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="color-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="appearance-section">
            <h3>Themes</h3>
            <div className="themes-grid">
              <div className="themes-row">
                {themes.slice(0, 4).map((theme) => (
                  <div
                    key={theme.id}
                    className={`theme-option ${activeTheme === theme.id ? "active" : ""}`}
                    onClick={() => setActiveTheme(theme.id)}
                  >
                    <div className="theme-preview" style={{ backgroundColor: theme.bgColor, color: theme.textColor }}>
                      <div className="theme-lines">
                        <div className="theme-line"></div>
                        <div className="theme-line"></div>
                        <div className="theme-line"></div>
                      </div>
                    </div>
                    <div className="theme-name">{theme.name}</div>
                  </div>
                ))}
              </div>
              <div className="themes-row">
                {themes.slice(4, 7).map((theme) => (
                  <div
                    key={theme.id}
                    className={`theme-option ${activeTheme === theme.id ? "active" : ""}`}
                    onClick={() => setActiveTheme(theme.id)}
                  >
                    <div className="theme-preview" style={{ backgroundColor: theme.bgColor, color: theme.textColor }}>
                      <div className="theme-lines">
                        <div className="theme-line"></div>
                        <div className="theme-line"></div>
                        <div className="theme-line"></div>
                      </div>
                    </div>
                    <div className="theme-name">{theme.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="save-appearance">
            <button className="save-button">Save</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .appearance-tab {
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }
        
        .appearance-header {
          margin-bottom: 20px;
        }
        
        .appearance-header h1 {
          font-size: 24px;
          margin: 0;
        }
        
        .appearance-header p {
          color: #666;
          margin: 5px 0 0;
        }
        
        .appearance-container {
          display: flex;
          gap: 30px;
        }
        
        .phone-preview {
          flex: 0 0 auto;
          width: 280px;
        }
        
        .phone-frame {
          border: 5px solid #000;
          border-radius: 30px;
          overflow: hidden;
          height: 550px;
          position: relative;
        }
        
        .phone-content {
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          overflow-y: auto;
          background-color: white;
        }
        
        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        
        .profile-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .profile-handle {
          font-weight: bold;
        }
        
        .preview-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 20px;
        }
        
        .preview-links.grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        
        .preview-links.full-width {
          display: flex;
          flex-direction: column;
        }
        
        .preview-link {
          padding: 12px;
          text-decoration: none;
          color: white;
          text-align: center;
          display: block;
          background-color: #ccc;
          border-radius: 8px;
        }
        
        .link-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .link-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: red;
        }
        
        .youtube-icon {
          background-color: red;
        }
        
        .instagram-icon {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        
        .get-connected {
          margin-top: auto;
          text-align: center;
        }
        
        .get-connected button {
          padding: 10px 20px;
          border: none;
          color: white;
          cursor: pointer;
          font-weight: bold;
          background-color: #00C464;
        }
        
        .powered-by {
          text-align: center;
          margin-top: 10px;
          font-size: 12px;
          opacity: 0.7;
        }
        
        .appearance-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .appearance-section {
          background: #fff;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .appearance-section h3 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 16px;
        }
        
        .layout-options {
          display: flex;
          gap: 15px;
        }
        
        .layout-option {
          flex: 1;
          cursor: pointer;
          text-align: center;
        }
        
        .layout-preview {
          border: 1px solid #ddd;
          border-radius: 8px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          padding: 10px;
        }
        
        .layout-option.active .layout-preview {
          border-color: #000;
        }
        
        .layout-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .layout-list .line {
          height: 8px;
          background: #000;
          width: 100%;
          border-radius: 4px;
        }
        
        .layout-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 5px;
        }
        
        .layout-grid .grid-item {
          background: #000;
          border-radius: 4px;
          height: 20px;
        }
        
        .layout-full-width {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .layout-full-width .full-width-item {
          height: 20px;
          background: #000;
          border-radius: 4px;
        }
        
        .button-styles-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .button-style-label {
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .button-style-options {
          display: flex;
          gap: 10px;
        }
        
        .button-style-option {
          width: 100px;
          height: 36px;
          cursor: pointer;
          position: relative;
        }
        
        .button-style-option.active::after {
          content: '';
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #00C464;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }
        
        .button-color-section {
          margin-top: 15px;
        }
        
        .button-color-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .color-input-wrapper {
          width: 120px;
        }
        
        .color-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #f5f5f5;
        }
        
        .fonts-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .font-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .font-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .font-preview {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 120px;
        }
        
        .font-icon {
          font-size: 16px;
          font-weight: bold;
        }
        
        .font-name {
          font-size: 14px;
        }
        
        .font-select {
          position: absolute;
          opacity: 0;
          width: 120px;
          height: 36px;
          cursor: pointer;
        }
        
        .themes-grid {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .themes-row {
          display: flex;
          gap: 15px;
        }
        
        .theme-option {
          flex: 1;
          cursor: pointer;
          text-align: center;
          position: relative;
        }
        
        .theme-preview {
          border: 1px solid #ddd;
          border-radius: 8px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          padding: 10px;
          overflow: hidden;
        }
        
        .theme-option.active .theme-preview {
          border-color: #000;
        }
        
        .theme-lines {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .theme-line {
          height: 6px;
          background: currentColor;
          width: 100%;
          border-radius: 3px;
          opacity: 0.7;
        }
        
        .theme-name {
          font-size: 12px;
          margin-top: 5px;
        }
        
        .save-appearance {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
        
        .save-button {
          background: #00C464;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }
        
        @media (max-width: 767px) {
          .appearance-container {
            flex-direction: column;
          }
          
          .appearance-editor {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default AppearanceTab

