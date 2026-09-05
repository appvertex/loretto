import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Lightbox.css';

const SWIPE_THRESHOLD = 60;

const Lightbox = ({ isOpen, image, onClose, onPrev, onNext, index, total }) => {
  const pointerStart = useRef(null);
  const lastX = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !image) return null;

  const handlePointerDown = (e) => {
    pointerStart.current = e.clientX;
    lastX.current = e.clientX;
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (pointerStart.current == null) return;
    lastX.current = e.clientX;
    setDragX(e.clientX - pointerStart.current);
  };

  // Handles both pointerup and pointercancel (some webviews cancel mid-swipe
  // and report coordinates as 0, so we fall back to the last tracked position)
  const handlePointerEnd = (e) => {
    if (pointerStart.current == null) return;
    const endX = e.clientX || lastX.current;
    const dx = endX - pointerStart.current;
    pointerStart.current = null;
    lastX.current = null;
    setDragging(false);
    setDragX(0);
    if (dx < -SWIPE_THRESHOLD) onNext();
    if (dx > SWIPE_THRESHOLD) onPrev();
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image View">
      <div className="lightbox__backdrop" onClick={onClose} />

      <div
        className="lightbox__container"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        {index != null && total != null && (
          <span className="lightbox__counter">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}

        <button className="lightbox__close-btn" onClick={onClose} aria-label="Close image">
          <X size={24} />
        </button>

        <button className="lightbox__nav-btn lightbox__nav-btn--prev" onClick={onPrev} aria-label="Previous image">
          <ChevronLeft size={28} />
        </button>

        <div
          className="lightbox__content"
          style={{
            transform: dragging ? `translateX(${dragX}px)` : 'translateX(0px)',
            transition: dragging ? 'none' : undefined,
          }}
        >
          <img src={image.src} alt={image.alt} className="lightbox__image" draggable="false" />
          <div className="lightbox__caption">
            <h3>{image.title}</h3>
            <span>{image.category}</span>
          </div>
        </div>

        <button className="lightbox__nav-btn lightbox__nav-btn--next" onClick={onNext} aria-label="Next image">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
