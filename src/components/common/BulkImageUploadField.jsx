import React, { useRef, useState } from 'react';
import { AlertCircle, ImagePlus, Loader2, Upload, X } from 'lucide-react';
import { api } from '../../api/client';

const BulkImageUploadField = ({ images = [], onChange }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;

    setUploading(true);
    setError('');
    try {
      const results = await Promise.all(files.map((file) => api.uploadImage(file)));
      const uploadedUrls = results.filter((result) => result.success && result.url).map((result) => result.url);
      const failedCount = results.length - uploadedUrls.length;

      if (uploadedUrls.length) onChange([...images, ...uploadedUrls]);
      if (failedCount) {
        setError(`${failedCount} image${failedCount === 1 ? '' : 's'} could not be uploaded. Please try again.`);
      }
    } catch {
      setError('Image upload failed. Please check your connection and try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-bulk-image-field">
      <div className="admin-bulk-image-field__header">
        <div>
          <label>Additional News Images</label>
          <small>Select multiple images to display inside the full news article.</small>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn--secondary"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : 'Upload Sub Images'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleUpload}
          hidden
        />
      </div>

      {images.length > 0 ? (
        <div className="admin-bulk-image-field__grid">
          {images.map((image, index) => (
            <div className="admin-bulk-image-field__preview" key={`${image}-${index}`}>
              <img src={image} alt={`News sub-image ${index + 1}`} />
              <button
                type="button"
                onClick={() => onChange(images.filter((_, imageIndex) => imageIndex !== index))}
                title="Remove sub-image"
                aria-label={`Remove news sub-image ${index + 1}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-bulk-image-field__empty">
          <ImagePlus size={18} />
          <span>No sub-images uploaded yet.</span>
        </div>
      )}

      {error && (
        <small className="admin-image-upload-field__error" role="alert">
          <AlertCircle size={14} /> {error}
        </small>
      )}
    </div>
  );
};

export default BulkImageUploadField;
