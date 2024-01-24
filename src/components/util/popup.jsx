import React from 'react';
import './popup.css';

function Popup({ isOpen, closePopup, children }) {
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <span className="close-button" onClick={closePopup}>
          &times;
        </span>
        <div className="popup-content-children">{children}</div>
        
      </div>
    </div>
  );
}

export default Popup;
