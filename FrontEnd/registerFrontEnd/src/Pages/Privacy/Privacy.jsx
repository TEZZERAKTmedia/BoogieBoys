import React from "react";
import './PrivacyPolicy.css'; // Ensure this file contains responsive styles

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
        <p className="bb-privacy-text"><strong>Contact Information:</strong> Name, email address, and phone number.</p>
        <p className="bb-privacy-text"><strong>Appointment Details:</strong> Preferred appointment dates and times.</p>
        <p className="bb-privacy-text"><strong>Browsing Information:</strong> IP address, browser type, and pages viewed.</p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">2. HIPAA Compliance & Data Protection</h2>
        <p className="bb-privacy-text">
          Boogie Boys follows <strong>HIPAA (Health Insurance Portability and Accountability Act)</strong> compliance
          to ensure the protection of personal and medical data submitted through intake forms.  
        </p>
        <p className="bb-privacy-text">
          We use **HIPAA-compliant services** for storing and processing personal data. 
          All sensitive health-related information is encrypted and stored on **secured, access-restricted servers**.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">3. How We Use Your Information</h2>
        <p className="bb-privacy-text"><strong>Schedule Appointments:</strong> Process and manage your bookings securely.</p>
        <p className="bb-privacy-text"><strong>Improve Services:</strong> Enhance user experience based on feedback.</p>
        <p className="bb-privacy-text"><strong>Send Notifications:</strong> Updates related to appointments, services, or important changes.</p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">4. How We Protect Your Information</h2>
        <p className="bb-privacy-text">
          We take extensive security measures to protect your data, including:
        </p>
        <p className="bb-privacy-text"><strong>Encryption:</strong> All user data is encrypted both in transit and at rest.</p>
        <p className="bb-privacy-text"><strong>Access Controls:</strong> Only authorized personnel can access sensitive data.</p>
        <p className="bb-privacy-text"><strong>Secure Servers:</strong> Information is stored on protected, HIPAA-compliant servers.</p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">5. Sharing Your Information</h2>
        <p className="bb-privacy-text">
          We do not sell or trade your information. We may share data with **trusted third-party services** under strict confidentiality, including:
        </p>
        <p className="bb-privacy-text"><strong>Payment Processing:</strong> Transactions are handled securely by <strong>Stripe</strong>.</p>
        <p className="bb-privacy-text"><strong>HIPAA-Compliant Data Storage:</strong> Intake forms and sensitive data are stored securely.</p>
        <p className="bb-privacy-text"><strong>Appointment Scheduling:</strong> Integrated scheduling services assist with bookings.</p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">6. Third-Party Services</h2>
        <p className="bb-privacy-text">
          We use <strong>Spring Shop</strong> for transactions. Please review the{" "}
          <a href="https://spring.shop/privacy" target="_blank" rel="noopener noreferrer" className="bb-privacy-link">
            Spring Shop Privacy Policy
          </a> for how they handle your data.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">7. Your Rights & Choices</h2>
        <p className="bb-privacy-text"><strong>Access Your Data:</strong> You can request a copy of your personal data.</p>
        <p className="bb-privacy-text"><strong>Update Your Data:</strong> If any information is incorrect, you may request corrections.</p>
        <p className="bb-privacy-text"><strong>Opt-Out:</strong> You may opt-out of promotional communications anytime.</p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">8. Changes to This Privacy Policy</h2>
        <p className="bb-privacy-text">
          We may update this policy periodically. Any major changes will be announced via email or on our website.
        </p>
      </section>

      <section className="bb-privacy-section">
        <h2 className="bb-privacy-heading">9. Contact Us</h2>
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
