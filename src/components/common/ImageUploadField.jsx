import React, { useRef, useState } from 'react';
import { AlertCircle, Loader2, Upload } from 'lucide-react';
import { api } from '../../api/client';

const ImageUploadField = ({
  label,
  value,
  onChange,
  id,
  placeholder = 'Paste an image URL or upload a file',
  required = false,
  accept = 'image/jpeg,image/png,image/webp',
  helpText,
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const result = await api.uploadImage(file);
      if (!result.success || !result.url) {
        setError(result.error || 'Image upload failed. Check your admin session and Cloudinary settings.');
        return;
      }
      onChange(result.url);
    } catch {
      setError('Image upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-image-upload-field">
      <label htmlFor={id}>{label}</label>
      <div className="admin-image-upload-field__controls">
        <input
          id={id}
          type="text"
          className="admin-form-control"
          placeholder={placeholder}
          value={value || ''}
          onChange={(event) => {
            setError('');
            onChange(event.target.value);
          }}
          required={required}
        />
        <button
          type="button"
          className="admin-btn admin-btn--secondary admin-image-upload-field__button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          hidden
        />
      </div>
      {helpText && !error && <small className="admin-image-upload-field__help">{helpText}</small>}
      {error && (
        <small className="admin-image-upload-field__error" role="alert">
          <AlertCircle size={14} /> {error}
        </small>
      )}
    </div>
  );
};

export default ImageUploadField;
