'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import './implementation.css';
import Partners from '@/components/Partners';

export default function ImplementationPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const title = searchParams.get('title');
  const description = searchParams.get('description');
  const impactLevel = searchParams.get('impactLevel');
  const businessFunction = searchParams.get('businessFunction');
  const outcomes = searchParams.get('outcomes');
  const roi = searchParams.get('roi');
  const implementationConditions = searchParams.get('implementationConditions');
  const businessValue = searchParams.get('businessValue');
  const maturityFit = searchParams.get('maturityFit');
  const companyName = searchParams.get('companyName');
  const illustration = searchParams.get('illustration');

  const safeTitle = title ?? '';
  const titleWords = safeTitle.split(' ');
  const mainTitle = titleWords.slice(0, 2).join(' ');
  const subTitle = titleWords.slice(2).join(' ');
  const router= useRouter()


  return (
    <div className="result-container">
      <div id='backbutton' onClick={()=>{
        router.back()
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M13 7.828V20h-2V7.828l-5.364 5.364l-1.414-1.414L12 4l7.778 7.778l-1.414 1.414z"/></svg>
      </div>
      <div className='banner-container'>
        <img
        className='banner'
          src={illustration || "https://images.unsplash.com/photo-1742403949587-42a767b9ea5b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D"}
          alt={"implementation-illustration"}
        />
        <h1 className='banner-title'>{mainTitle + " " + subTitle}</h1>
        <h3 className='banner-subtitle'>at {companyName}'s</h3> 
      </div>


      {title ? (
        <div className="result-recommendation">
          <div className='result-recommendation-header'>
          {companyName && <h2 className="result-application-title">Application to <strong>{companyName}</strong></h2>}
          {description && <p className="result-description">{description}</p>}
          </div>
          <div className="result-metrics-container">
            {outcomes && (
              <div className="result-metric">
                <h3 className="result-metric-title">Expected Outcomes</h3>
                <p className="result-metric-content">{outcomes}</p>
              </div>
            )}
            {outcomes && <div className='result-metrics-line'></div>}
            {roi && (
              <div className="result-metric">
                <h3 className="result-metric-title">Expected ROI</h3>
                <p className="result-metric-content">
                  <span className="result-roi-highlight">{roi.split(' ')[0]}</span>{' '}
                  {roi.split(' ').slice(1).join(' ')}
                </p>
              </div>
            )}
          </div>

          <div className="result-grid">
            {impactLevel && (
              <div className='result-grid-item'>
                <p className="result-grid-item-title">Impact Level</p>
                <p className="result-grid-item-value">{impactLevel}</p>
              </div>
            )}
            {businessFunction && (
              <div className='result-grid-item'>
                <p className="result-grid-item-title">Business Function</p>
                <p className="result-grid-item-value">{businessFunction}</p>
              </div>
            )}
            {maturityFit && (
              <div className='result-grid-item'>
                <p className="result-grid-item-title">Maturity Fit</p>
                <p className="result-grid-item-value">{maturityFit}</p>
              </div>
            )}
          </div>

          <div className="result-qa-section">
            {implementationConditions && (
              <div className="result-qa">
                <p className="result-qa-question">What are the implementation conditions?</p>
                <p className="result-qa-answer">{implementationConditions}</p>
              </div>
            )}
            {businessValue && (
              <div className="result-qa">
                <p className="result-qa-question">What is the business value?</p>
                <p className="result-qa-answer">{businessValue}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="result-error">Error: No recommendation data provided.</p>
      )}
      <Partners/>
    </div>
  );
}