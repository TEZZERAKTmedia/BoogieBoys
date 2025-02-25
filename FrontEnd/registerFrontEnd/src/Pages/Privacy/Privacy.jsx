import React from "react";
import './PrivacyPolicy.css'; // Import the custom CSS file

const PrivacyPolicy = () => {
  return (
    <div className="bb-privacy-container">
      <h1 className="bb-privacy-title">Privacy Policy</h1>
      <p className="bb-privacy-subtitle"><strong>Effective Date:</strong> August 17, 2024</p>

      <p className="bb-privacy-text">
        Your privacy is important to us. This Privacy Policy explains how we collect,
        use, and protect your personal information when you visit our website or use our services.
      </p>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">1. Information We Collect</h2>
        <p className="bb-privacy-text">
          We may collect the following types of personal information:
        </p>
        <ul className="bb-privacy-list">
          <li><strong>Contact Information:</strong> Name, email address, and phone number.</li>
          <li><strong>Appointment Details:</strong> Preferred appointment dates and times.</li>
          <li><strong>Browsing Information:</strong> Information about your visit, including IP address, browser type, and pages viewed.</li>
        </ul>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">2. How We Use Your Information</h2>
        <ul className="bb-privacy-list">
          <li><strong>Schedule Appointments:</strong> Process and manage your appointments.</li>
          <li><strong>Improve Services:</strong> Enhance your experience based on feedback.</li>
          <li><strong>Send Notifications:</strong> Updates related to your appointments or services.</li>
        </ul>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">3. How We Protect Your Information</h2>
        <p className="bb-privacy-text">
          We implement security measures, including encrypted servers and restricted access, to keep your personal information safe.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">4. Sharing Your Information</h2>
        <p className="bb-privacy-text">
          We don’t sell or trade your information. We may share data with trusted third parties who help operate our services under strict confidentiality.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">5. Third-Party Services</h2>
        <p className="bb-privacy-text">
          We use <strong>Spring Shop</strong> for transactions. Please review the{" "}
          <a href="https://spring.shop/privacy" target="_blank" rel="noopener noreferrer" className="bb-privacy-link">
            Spring Shop Privacy Policy
          </a> for how they handle your data.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">6. Your Choices</h2>
        <ul className="bb-privacy-list">
          <li><strong>Access Information:</strong> Request access to your data.</li>
          <li><strong>Correct Information:</strong> Request corrections for inaccuracies.</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from promotional communications anytime.</li>
        </ul>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">7. Changes to This Privacy Policy</h2>
        <p className="bb-privacy-text">
          We may update this policy periodically. Check back for any changes.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">8. Contact Us</h2>
        <p className="bb-privacy-text">
          Questions or concerns? Contact us at:{" "}
          <a href="mailto:Hello@boogieboys.one" className="bb-privacy-link">
            Hello@boogieboys.one
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
