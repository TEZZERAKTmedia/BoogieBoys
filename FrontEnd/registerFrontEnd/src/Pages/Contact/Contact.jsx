import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { registerApi } from '../../config/axios';
import './contact.css';

const MAX_FILE_SIZE_MB = 500; // 500MB limit

const sanitizeInput = (input) => {
  return input.replace(/[^\w\s@.-]/gi, '').trim(); // Removes harmful characters
};

const countryCodes = [
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
];

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10); // Allow only 10 digits
  const phoneNumber = digits.replace(/(\d{3})(\d{3})(\d{0,4})/, '($1)-$2-$3');
  return phoneNumber.trim();
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1',
    phone: '',
    description: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [files, setFiles] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  // Manage input focusing
  const inputRefs = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
    description: useRef(),
  };

  // Handle form field changes with sanitization
  const handleChange = (e) => {
    const { id, value } = e.target;
    let sanitizedValue = sanitizeInput(value);

    if (id === 'phone') {
      sanitizedValue = formatPhoneNumber(sanitizedValue);
    }

    setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
    setFormErrors((prev) => ({ ...prev, [id]: false }));
  };

  // Handle "Enter" key for input focus
  const handleKeyDown = (e, currentField) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const fieldKeys = Object.keys(inputRefs);
      const currentIndex = fieldKeys.indexOf(currentField);
      if (currentIndex < fieldKeys.length - 1) {
        inputRefs[fieldKeys[currentIndex + 1]].current.focus();
      }
    }
  };

  // File Upload Handling
  // File Upload Handling (Accept only 5 image files)
  const onDrop = useCallback(
    (acceptedFiles) => {
      const validImages = acceptedFiles.filter((file) => file.type.startsWith('image/'));
      
      // Calculate how many slots are left
      const remainingSlots = 5 - files.length;
  
      if (remainingSlots <= 0) {
        alert("You can only upload a maximum of 5 images.");
        return;
      }
  
      // Only add images up to the limit
      const filesToAdd = validImages.slice(0, remainingSlots);
  
      if (filesToAdd.length < validImages.length) {
        alert("You've reached the maximum upload limit of 5 images.");
      }
  
      const newFiles = [...files, ...filesToAdd];
      const total = newFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024); // Calculate size in MB
  
      setFiles(newFiles);
      setTotalSize(total.toFixed(2));
    },
    [files]
  );
  
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  multiple: true,
  maxSize: MAX_FILE_SIZE_MB * 1024 * 1024, // 500MB total limit
  accept: { 'image/*': [] }, // Only allow images
});


  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) errors[key] = true;
    });
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
      files.forEach((file) => formDataToSend.append('files', file, file.name));

      const response = await registerApi.post('/register-contact', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('There was an error sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="form-title">Schedule Appointment</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Name Input */}
          <label>Name</label>
          <input
            ref={inputRefs.name}
            id="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'name')}
          />

          {/* Email Input */}
          <label>Email</label>
          <input
            ref={inputRefs.email}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'email')}
          />

          {/* Phone Input with Country Code */}
          <label>Phone Number</label>
          <div className="phone-container">
            <select
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.country} ({country.code})
                </option>
              ))}
            </select>
            <input
              ref={inputRefs.phone}
              id="phone"
              placeholder="(000)-000-0000"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, 'phone')}
              maxLength="14"
            />
          </div>

          {/* Description Input */}
          <label>Description of Tattoo</label>
          <textarea
            ref={inputRefs.description}
            id="description"
            placeholder="Describe your tattoo idea"
            value={formData.description}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'description')}
          />

          {/* File Upload Section */}
          {/* File Upload Section */}
<label>Reference Images (Max 5 files, Total 500MB)</label>
<div {...getRootProps()} className={`file-dropzone-modern ${isDragActive ? 'active' : ''}`}>
  <input {...getInputProps()} />
  {files.length > 0 ? (
    <>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
          </li>
        ))}
      </ul>
      <div className="file-progress-bar">
        <div
          className="file-progress"
          style={{ width: `${(totalSize / MAX_FILE_SIZE_MB) * 100}%` }}
        />
      </div>
      <p>{totalSize} MB of {MAX_FILE_SIZE_MB} MB used</p>
    </>
  ) : (
    <p>Click or drag up to 5 images here to upload.</p>
  )}
</div>


          {/* Submit Button */}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
