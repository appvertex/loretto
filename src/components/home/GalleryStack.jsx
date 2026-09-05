import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { galleryCategories } from '../../data/gallery';
import './GalleryStack.css';

const SWIPE_THRESHOLD = 60;
const TAP_SLOP = 10;
const EXIT_ANIMATION_MS = 480;

// Depth transforms for the cards behind the front photo (position 0 = front)
const STACK_POSE = [
  null,
  'rotate(2.5deg) translate(12px, -10px) scale(0.955)',
  'rotate(-3.5deg) translate(-12px, -18px) scale(0.91)',
  'rotate(5deg) translate(6px, -26px) scale(0.865)',
];

const GalleryStack = ({ images }) => {
  const [category, setCategory] = useState('All');
  const [order, setOrder] = useState(() => images.map((_, i) => i));
  const [exiting, setExiting] = useState(null); // { index, dir }
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pointerStart = useRef(null);
  const movedRef = useRef(false);

  const filtered = useMemo(
    () => (category === 'All' ? images : images.filter((img) => img.category === category)),
    [category, images]
  );

  const categories = useMemo(
    () => galleryCategories.filter((c) => c === 'All' || images.some((img) => img.category === c)),
    [images]
  );

  // Rebuild the stack whenever the active filter changes
  useEffect(() => {
    setOrder(filtered.map((_, i) => i));
    setExiting(null);
    setDragX(0);
    setDragging(false);
  }, [filtered]);

  // Retire the flown-out card after its exit animation
  useEffect(() => {
    if (!exiting) return undefined;
    const t = setTimeout(() => setExiting(null), EXIT_ANIMATION_MS);
    return () => clearTimeout(t);
  }, [exiting]);

  const selectCategory = (c) => {
    const next = c === 'All' ? images : images.filter((img) => img.category === c);
    setCategory(c);
    setOrder(next.map((_, i) => i));
    setExiting(null);
    setDragX(0);
    setDragging(false);
  };

  const flipCard = (direction = -1) => {
    if (exiting || order.length < 2) return;
    setExiting({ index: order[0], dir: direction });
    setOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  const handlePointerDown = (e) => {
    if (exiting) return;
    pointerStart.current = { x: e.clientX, y: e.clientY };
    movedRef.current = false;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    if (Math.abs(dx) > TAP_SLOP) movedRef.current = true;
    setDragX(dx);
  };

  const handlePointerUp = (e) => {
    if (!pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    pointerStart.current = null;
    setDragging(false);
    if (Math.abs(dx) > SWIPE_THRESHOLD && order.length > 1) {
      flipCard(dx > 0 ? 1 : -1);
    } else if (!movedRef.current) {
      flipCard();
    }
    setDragX(0);
  };

  // A touch can be cancelled when the visitor starts scrolling. Reset the card
  // without treating that cancelled gesture as a swipe to the next photo.
  const handlePointerCancel = () => {
    pointerStart.current = null;
    movedRef.current = false;
    setDragging(false);
    setDragX(0);
  };

  const exitingImage = exiting ? filtered[exiting.index] : null;

  const cardPose = (pos) => STACK_POSE[Math.min(pos, STACK_POSE.length - 1)] || '';

  return (
    <div className="gstack">
      {/* Mobile gallery header */}
      <div className="gstack__heading">
        <h2 className="gstack__title-heading">Gallery</h2>
        <p className="gstack__subtitle">Moments of faith, prayer &amp; community</p>
      </div>

      {/* Minimal category filter, horizontally scrollable */}
      <div className="gstack__filters" aria-label="Gallery categories">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`gstack__chip${c === category ? ' gstack__chip--active' : ''}`}
            onClick={() => selectCategory(c)}
            aria-pressed={c === category}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Stacked photo deck */}
      <div
        className="gstack__stack-area"
        aria-label={`Photo stack, ${filtered.length} photos. Swipe or tap to flip through.`}
      >
        {order
          .slice()
          .reverse()
          .map((idx) => {
            const pos = order.indexOf(idx);
            const img = filtered[idx];
            if (!img) return null;
            const isFront = pos === 0;
            const style = {};
            if (isFront) {
              style.transform = dragging
                ? `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`
                : 'translateX(0px) rotate(0deg) scale(1)';
              style.transition = dragging ? 'none' : undefined;
            } else if (pos === 1 && dragging) {
              style.transform = `translateX(${dragX * 0.18}px) ${cardPose(1)}`;
              style.transition = 'none';
            }
            return (
              <figure
                key={idx}
                className={`gstack__card gstack__card--pos${Math.min(pos, 3)}`}
                style={{ ...style, zIndex: order.length - pos }}
                {...(isFront
                  ? {
                      onPointerDown: handlePointerDown,
                      onPointerMove: handlePointerMove,
                      onPointerUp: handlePointerUp,
                      onPointerCancel: handlePointerCancel,
                    }
                  : {})}
              >
                <img
                  src={img.src}
                  alt={isFront ? img.alt : ''}
                  draggable="false"
                  loading={isFront ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </figure>
            );
          })}

        {exitingImage && (
          <figure
            className={`gstack__card gstack__card--exiting ${
              exiting.dir > 0 ? 'gstack__card--exit-right' : 'gstack__card--exit-left'
            }`}
            style={{ zIndex: order.length + 2 }}
          >
            <img src={exitingImage.src} alt="" draggable="false" />
          </figure>
        )}
      </div>

      {/* CTA */}
      <div className="gstack__cta">
        <Link to="/media/gallery" className="gstack__cta-btn">
          Explore Full Gallery
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default GalleryStack;
