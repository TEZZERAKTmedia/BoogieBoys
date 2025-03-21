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

  // File Upload Handling with image compression and WebP conversion
  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Filter for image files
      const validImages = acceptedFiles.filter((file) =>
        file.type.startsWith('image/')
      );

      // Calculate remaining slots (max 5 images allowed)
      const remainingSlots = 5 - files.length;
      if (remainingSlots <= 0) {
        alert("You can only upload a maximum of 5 images.");
        return;
      }

      const filesToProcess = validImages.slice(0, remainingSlots);

      // Options for image compression and conversion to WebP
      const options = {
        maxSizeMB: 1, // Compress each image to be at most ~1 MB (adjust as needed)
        maxWidthOrHeight: 1920, // Resize if larger than 1920px
        useWebWorker: true,
        fileType: 'image/webp', // Convert to WebP
      };

      try {
        const processedFiles = await Promise.all(
          filesToProcess.map(async (file) => {
            try {
              const compressedFile = await imageCompression(file, options);
              // Create a preview URL for the compressed image
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
        const total =
          newFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
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
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024, // 500MB total limit
    accept: { 'image/*': [] },
  });

  // Check if an image was passed from the Home component and convert it to a File object.
  useEffect(() => {
    if (location.state?.attachedImage) {
      const imageURL = location.state.attachedImage;
      // Avoid duplicate addition if the file is already added
      if (!files.find((f) => f.preview === imageURL)) {
        fetch(imageURL)
          .then((res) => res.blob())
          .then(async (blob) => {
            // Create a File object from the blob
            const filename = imageURL.split('/').pop();
            const file = new File([blob], filename, { type: blob.type });
            // Compress and convert the attached image as well
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
              fileType: 'image/webp',
            };
            try {
              const compressedFile = await imageCompression(file, options);
              compressedFile.preview = imageURL; // Use original URL for preview if desired
              const updatedFiles = [...files, compressedFile];
              setFiles(updatedFiles);
              const total =
                updatedFiles.reduce((sum, f) => sum + f.size, 0) /
                (1024 * 1024);
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

  // Clean up preview URLs to avoid memory leaks
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  // Remove a file from the preview list
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    const total =
      updatedFiles.reduce((sum, file) => sum + file.size, 0) /
      (1024 * 1024);
    setTotalSize(total.toFixed(2));
  };

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
      Object.entries(formData).forEach(([key, value]) =>
        formDataToSend.append(key, value)
      );
      files.forEach((file) =>
        formDataToSend.append('files', file, file.name)
      );

      const response = await registerApi.post('/register-contact', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message);

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
              <label>Reference Images (Max 5 files, Total 500MB)</label>
              <div
                {...getRootProps()}
                className={`file-dropzone-modern ${
                  isDragActive ? 'active' : ''
                }`}
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
                                  e.stopPropagation(); // Prevent dropzone click
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
                            <p>
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Optionally, include a progress bar or size info here */}
                  </>
                ) : (
                  <p>Click or drag up to 5 images here to upload.</p>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-button" disabled={loading}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Contact;
