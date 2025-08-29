

'use client';

import { AnalysisData, Recommendation } from '../../../../types/analysisType';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "../result.css";
import { motion } from 'framer-motion';
import { ExpandableText } from '@/components/style/ExpandableText';
import { useRef } from 'react';
import ShareAnalysis from '@/components/ShareAnalysis';


interface Props {
  analysisData: AnalysisData;
}

export default function Locked({ analysisData }: Props) {
  const router = useRouter();
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.";

  const scroll = (direction: number, index: number) => {
    const carousel = carouselRefs.current[index];
    if (carousel) {
      const width = carousel.offsetWidth;
      carousel.scrollBy({ left: direction * (width / 1.5), behavior: 'smooth' });
    }
  };

  const handleUnlockClick = () => {
    router.push(`/result/unlocking?analysisId=${analysisData.analysisId}`);
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
      // you have to pass illustration
    }).toString();
    router.push(`/result/implementation?${query}`);
  };

  return (
    <div className='global-container'>
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
        <p className="hero-description">
          Windflow is a next-generation green energy company harnessing the full potential of wind to
          power a cleaner future. Design, build, and operate high-efficiency wind systems that deliver
          sustainable energy to communities, businesses, and utility providers around the world.
        </p>
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
      {/* Unlock CTA */}
      <div className="locked-gradient">
          <div className="locked-cta">
         
            <div className="locked-text">
              <h3>Unlock Your Full AI Strategy Report</h3>
              <p>Get personalized recommendations, ROI insights, and full implementation details.</p>
            </div>

            <div className="locked-icon">
            <button className="unlock-button" onClick={handleUnlockClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/></svg>
            </button>
            </div>
          

            
          </div>
        </div>
      
    </div>
  );
}
