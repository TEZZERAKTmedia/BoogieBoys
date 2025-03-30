import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { registerApi } from '../../config/axios';
import LoadingPage from '../../components/Loading/loading';
import './contact.css';

const MAX_FILE_SIZE_MB = 500; // 500MB total limit

const sanitizeInput = (input) => {
  return input.replace(/[^\w\s@.-]/gi, '');
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
  const location = useLocation(); // Retrieve passed state from Home
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
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Manage input focusing
  const inputRefs = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
    description: useRef(),
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const sanitizedValue = id === 'phone' ? formatPhoneNumber(sanitizeInput(value)) : sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [id]: sanitizedValue }));
    setFormErrors((prev) => ({ ...prev, [id]: false }));
  };

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

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const validImages = acceptedFiles.filter((file) =>
        file.type.startsWith('image/')
      );

      const remainingSlots = 5 - files.length;
      if (remainingSlots <= 0) {
        alert("You can only upload a maximum of 5 images.");
        return;
      }

      const filesToProcess = validImages.slice(0, remainingSlots);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp',
      };

      try {
        const processedFiles = await Promise.all(
          filesToProcess.map(async (file) => {
            try {
              const compressedFile = await imageCompression(file, options);
              compressedFile.preview = URL.createObjectURL(compressedFile);
              return compressedFile;
            } catch (error) {
              console.error("Compression error:", error);
              return null;
            }
          })
        );
        const validProcessedFiles = processedFiles.filter((file) => file !== null);
        if (validProcessedFiles.length < filesToProcess.length) {
          alert("Some images could not be compressed.");
        }
        const newFiles = [...files, ...validProcessedFiles];
        const total = newFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
        setFiles(newFiles);
        setTotalSize(total.toFixed(2));
      } catch (err) {
        console.error("Error processing images:", err);
      }
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    accept: { 'image/*': [] },
  });

  useEffect(() => {
    if (location.state?.attachedImage) {
      const imageURL = location.state.attachedImage;
      if (!files.find((f) => f.preview === imageURL)) {
        fetch(imageURL)
          .then((res) => res.blob())
          .then(async (blob) => {
            const filename = imageURL.split('/').pop();
            const file = new File([blob], filename, { type: blob.type });
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
              fileType: 'image/webp',
            };
            try {
              const compressedFile = await imageCompression(file, options);
              compressedFile.preview = imageURL;
              const updatedFiles = [...files, compressedFile];
              setFiles(updatedFiles);
              const total = updatedFiles.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
              setTotalSize(total.toFixed(2));
            } catch (error) {
              console.error("Failed to compress attached image:", error);
            }
          })
          .catch((err) => console.error("Failed to attach image:", err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.attachedImage]);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    const total = updatedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
    setTotalSize(total.toFixed(2));
  };

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
      Object.entries(formData).forEach(([key, value]) =>
        formDataToSend.append(key, value)
      );
      files.forEach((file) =>
        formDataToSend.append('files', file, file.name)
      );

      const response = await registerApi.post('/register-contact', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Save the email before clearing formData
      setSubmittedEmail(formData.email);

      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        description: '',
      });
      setFiles([]);
      setTotalSize(0);
      setFormErrors({});

      // Show confirmation modal
      setShowConfirmationModal(true);
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
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <h2 className="form-title">Schedule Appointment</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                ref={inputRefs.name}
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
              />

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

              <label>Phone Number</label>
              <div className="phone-container">
                <select
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
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

              <label>Description of Tattoo</label>
              <textarea
                ref={inputRefs.description}
                id="description"
                placeholder="Describe your tattoo idea"
                value={formData.description}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, 'description')}
              />

              <label>Reference Images (Max 5 files, Total 500MB)</label>
              <div
                {...getRootProps()}
                className={`file-dropzone-modern ${isDragActive ? 'active' : ''}`}
              >
                <input {...getInputProps()} />
                {files.length > 0 ? (
                  <>
                    <div className="preview-grid">
                      {files.map((file, index) => (
                        <div key={index} className="preview-item">
                          <div className="image-overlay-container">
                            <img
                              src={file.preview}
                              alt={`Preview ${index + 1}`}
                              className="preview-image"
                            />
                            <div className="overlay">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile(index);
                                }}
                                className="remove-image-btn"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          <div className="preview-info">
                            <p>{file.name}</p>
                            <p>{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>Click or drag up to 5 images here to upload.</p>
                )}
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>

      {showConfirmationModal && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h2>Confirmation Email Sent</h2>
            <p>
              A confirmation email has been sent to <strong>{submittedEmail}</strong><br />
              If you do not receive the email within 5 minutes, please try again.
            </p>
            <button className="verify-email-btn" onClick={() => setShowConfirmationModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
