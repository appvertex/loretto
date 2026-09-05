import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';
import { useParishData } from '../../context/ParishContext';
import AccordionGallery from '../common/AccordionGallery';
import GalleryStack from './GalleryStack';
import './GallerySection.css';

const GallerySection = () => {
  const { galleryImages } = useParishData();

  // Take top 6 images for the interactive accordion
  const previewImages = galleryImages.slice(0, 6);

  const accordionItems = previewImages.map((img) => ({
    image: img.src,
    label: img.title,
    alt: img.alt,
  }));

  return (
    <section className="gallery-section section section--white" aria-label="Photo Gallery">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">Photo Gallery</h2>
          <p className="section-heading__subtitle">
            Capturing sacred moments of prayer, liturgical celebrations, and community fellowship
          </p>
        </div>

        {/* Mobile-only stacked photo gallery (hidden on desktop via CSS) */}
        <GalleryStack images={previewImages} />

        {/* Interactive Accordion Gallery */}
        <div className="gallery-section__accordion-wrap">
          <AccordionGallery
            items={accordionItems}
            defaultIndex={2}
            accentColor="#C6A15B"
            overlayColor="#35151B"
            textColor="#FAF7F0"
            height={500}
            gap={14}
            radius={18}
            expandRatio={0.48}
            trigger="hover"
            grayscale={true}
            showLabels={true}
            parallax={0.6}
            tilt={6}
            duration={0.65}
          />
        </div>

        <div className="gallery-section__cta">
          <Link to="/media/gallery" className="btn btn--outline">
            <Camera size={16} /> View Complete Gallery
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
