import React from 'react';
import './contact.css';
import logo_nav from "../../assets/cfw_index.png"

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <img className="logo_contact" src={logo_nav} />
        <h1>Contact Us</h1>
        {/* <p className="supportUs">
          CareForWe is still in its early stages, and we are looking for early supporters and testers! If you are interested in supporting us, please drop us an email at the address below.
        </p> */}
        <p>If you have any questions or need assistance, feel free to reach out to us at:</p>
        <a href="mailto:support@care4we.com" className="contact-email">
            support@care4we.com
        </a>
      </div>
    </div>
  );
}

export default Contact;
