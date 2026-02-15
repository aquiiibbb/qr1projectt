import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateFeedback = () => {
  const navigate = useNavigate();

  // LIVE BACKEND URL (Merged with your path logic)
  const BACKEND_URL = process.env.REACT_APP_API_URL || 'https://backend-munday-vercel-gsn8.vercel.app/munapi/user';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    feedback: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRating = (star) => {
    setFormData(prev => ({
      ...prev,
      rating: star
    }));
  };

  const handleSubmit = async () => {
    // Validations (Keep your original logic)
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!formData.contact.trim()) {
      alert('Please enter your contact number');
      return;
    }
    if (!formData.message.trim() && !formData.feedback.trim()) {
      alert('Please enter your message or feedback');
      return;
    }

    setIsSubmitting(true);

    try {
      // Merged Fetch logic with your live Vercel URL
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: parseInt(formData.contact),
          message: formData.message || formData.feedback
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        alert('Thank you for your feedback! We will work on improving.');
        navigate('/');
      } else {
        const error = await response.json();
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>

        {/* Sad Icon */}
        <div style={{
          textAlign: 'center',
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          😔
        </div>

        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>
          We're sorry to hear that!
        </h2>

        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          Your feedback helps us improve. Please tell us what went wrong.
        </p>

        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              opacity: isSubmitting ? 0.6 : 1
            }}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              opacity: isSubmitting ? 0.6 : 1
            }}
          />
        </div>

        {/* Contact No Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Contact No *
          </label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter your contact number"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box',
              opacity: isSubmitting ? 0.6 : 1
            }}
          />
        </div>

        {/* Message Textarea */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your experience..."
            disabled={isSubmitting}
            style={{
              width: '100%',
              height: '100px',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box',
              opacity: isSubmitting ? 0.6 : 1
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '15px',
            background: isSubmitting
              ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
              : 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
            transition: 'transform 0.2s ease',
            opacity: isSubmitting ? 0.8 : 1
          }}
          onMouseOver={(e) => !isSubmitting && (e.target.style.transform = 'scale(1.02)')}
          onMouseOut={(e) => !isSubmitting && (e.target.style.transform = 'scale(1)')}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#27ae60',
          background: '#d5f4e6',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          🔒 Your feedback is private and will only be seen by our management team.
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px' }}>
          Powered by <span style={{ color: '#e74c3c' }}>American StarInn</span>
        </div>
      </div>
    </div>
  );
};

export default PrivateFeedback;