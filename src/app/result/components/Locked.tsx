import { AnalysisData } from '../../../../types/analysisType';
import { useRouter } from 'next/navigation';
import './locked.css';

interface Props {
  analysisData: AnalysisData;
}

export default function Locked({ analysisData }: Props) {
  const router = useRouter();

  const handleUnlockClick = () => {
    router.push(`/result/unlocking?analysisId=${analysisData.analysisId}`);
  };

  return (
    <div className="locked-container">
      {analysisData.output?.strategicImpactAreas.map((area:any, areaIndex:any) => (
        <div key={areaIndex} className="result-impact-area">
          <h2 className="result-impact-title">{area.impactArea}</h2>

          {areaIndex === 0 && <p className="result-impact-summary">{area.summary}</p>}

          <div className="result-recommendations">
            {area.recommendations.map((rec:any, recIndex:any) => {
              if (areaIndex === 0 && recIndex === 0) {
                return (
                  <div key={recIndex} className="result-slider-item locked-highlight">
                    <h5 className="result-slider-item-title">{rec.title}</h5>
                    <p className="result-slider-item-description">
                      {rec.description.length > 100
                        ? `${rec.description.substring(0, 100)}...`
                        : rec.description}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={recIndex} className="result-slider-item locked-placeholder">
                    <h5 className="result-slider-item-title">Locked Recommendation</h5>
                    <p className="result-slider-item-description">Unlock to view this recommendation.</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}

      <div className="locked-gradient">
        <div className="locked-cta">
          <div className="locked-icon">🔒</div>
          <div className="locked-text">
            <h3>Unlock Your Full AI Strategy Report</h3>
          </div>
          <button className="unlock-button" onClick={handleUnlockClick}>Unlock Now</button>
        </div>
      </div>
    </div>
  );
}