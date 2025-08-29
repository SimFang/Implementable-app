'use client';

import { AnalysisData, Recommendation } from '../../../../types/analysisType';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "../result.css";
import { motion, AnimatePresence } from 'framer-motion';
import { ExpandableText } from '@/components/style/ExpandableText';
import { useRef, useState, useEffect } from 'react';
import ShareAnalysis from '@/components/ShareAnalysis';

interface Props {
  analysisData: AnalysisData;
}

export default function Unlocked({ analysisData }: Props) {
  const router = useRouter();
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showOverlay, setShowOverlay] = useState(true);
  const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.";

  useEffect(() => {
    // trigger exit after a delay
    const timeout = setTimeout(() => setShowOverlay(false), 500); 
    return () => clearTimeout(timeout);
  }, []);

  const scroll = (direction: number, index: number) => {
    const carousel = carouselRefs.current[index];
    if (carousel) {
      const width = carousel.offsetWidth;
      carousel.scrollBy({ left: direction * (width / 1.5), behavior: 'smooth' });
    }
  };

  const handleRecommendationClick = (areaIndex: number, recIndex: number, recommendation: Recommendation) => {
    const query = new URLSearchParams({
      analysisId: analysisData.analysisId,
      areaIndex: areaIndex.toString(),
      recIndex: recIndex.toString(),
      title: recommendation.title,
      description: recommendation.description,
      impactLevel: recommendation.impactLevel,
      businessFunction: recommendation.businessFunction,
      outcomes: recommendation.outcomes,
      roi: recommendation.ROI,
      implementationConditions: recommendation.implementationConditions,
      businessValue: recommendation.businessValue,
      maturityFit: recommendation.maturityFit,
      companyName : analysisData.input.companyProfile.companyName,
    }).toString();
    router.push(`/result/implementation?${query}`);
  };

  return (
    <>

    <div className='global-container'>
      {/* Full-screen white overlay */}

      <section className="hero-section">
        <Image
          src={analysisData.illustration ?? '/fallback.jpg'}
          alt="Mountain and sky"
          fill
          className="hero-background"
          style={{ objectFit: 'cover' }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-top-right-label">Implementable</p>
          <div className="hero-headlines">
            {(() => {
              const headline = analysisData.input.companyProfile.headline || '';
              const words = headline.trim().split(' ');
              const title = words.slice(0, 2).join(' ');
              const subtitle = words.slice(2).join(' ');

              return (
                <>
                  <h1 className="hero-title"><span className="bold">{title}</span></h1>
                  {subtitle && <h1 className="hero-subtitle">{subtitle}</h1>}
                </>
              );
            })()}
          </div>
          <p className="hero-company">{analysisData.input.companyProfile.companyName}</p>
        </div>
      </section>

      <div className='companydescription-container'>
        <p className="hero-description">{loremipsum}</p>
        <p className="hero-ai-note">
          AI can change your business. <br />
          <strong>We’re here to make sure it does — the right way.</strong>
        </p>
      </div>

      <div className="summary-container">
        <h1 className="summary-title">Our Solutions</h1>
        {analysisData.output?.strategicImpactAreas.map((area, areaIndex) => (
          <div key={areaIndex} className="summary-element">
            <p>0.{areaIndex + 1}</p>
            <h3>{area.impactArea}</h3>
            <p><ExpandableText text={loremipsum} limit={100} /></p>
          </div>
        ))}
      </div>

      {analysisData.output?.strategicImpactAreas.map((area, areaIndex) => (
        <div key={areaIndex} className="result-impact-area">
          <p className="hero-company">{String(areaIndex + 1).padStart(2, '0')}.</p>
          <h2 className="result-impact-title">{area.impactArea}</h2>
          <p className="result-impact-summary">
            {area.summary.length > 300 ? `${area.summary.substring(0, 100)}...` : area.summary}
          </p>

          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div className="carousel-fade left" />
              <div className="carousel-fade right" />
              
              <motion.div
                className="result-recommendations"
                ref={(el) => { carouselRefs.current[areaIndex] = el; }}
                drag="x"
                dragConstraints={{ left: -1000, right: 0 }}
                whileTap={{ cursor: "grabbing" }}
              >
                {area.recommendations.map((rec, recIndex) => (
                  <motion.div
                    key={recIndex}
                    className="result-slider-item"
                    whileHover={{ translateY: 1.03 }}
                    onClick={() => handleRecommendationClick(areaIndex, recIndex, rec)}
                  >
                    <img
                      src={rec.illustration || "https://images.unsplash.com/photo-1742403949587-42a767b9ea5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D"}
                      alt={rec.title}
                    />
                    <h5 className="result-slider-item-title">{rec.title}</h5>
                    <div className="result-slider-item-description">
                      <ExpandableText text={rec.description} limit={100} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <button className="carousel-btn left" onClick={() => scroll(-1, areaIndex)}>←</button>
              <button className="carousel-btn right" onClick={() => scroll(1, areaIndex)}>→</button>
            </div>
          </div>
        </div>
      ))}
      <ShareAnalysis analysisId={analysisData.analysisId}/>
    </div>
    </>

  );
}