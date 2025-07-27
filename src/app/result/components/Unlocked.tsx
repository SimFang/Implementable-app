import { AnalysisData, Recommendation } from '../../../../types/analysisType';
import { useRouter } from 'next/navigation';

interface Props {
  analysisData: AnalysisData;
}

export default function Unlocked({ analysisData }: Props) {
  const router = useRouter();

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
    }).toString();
    router.push(`/result/implementation?${query}`);
  };

  return (
    <div>
      {analysisData.output?.strategicImpactAreas.map((area, areaIndex) => (
        <div key={areaIndex} className="result-impact-area">
          <h2 className="result-impact-title">{area.impactArea}</h2>
          <p className="result-impact-summary">{area.summary}</p>
          <div className="result-recommendations">
            {area.recommendations.map((rec, recIndex) => (
              <div
                key={recIndex}
                className="result-slider-item"
                onClick={() => handleRecommendationClick(areaIndex, recIndex, rec)}
              >
                <h5 className="result-slider-item-title">{rec.title}</h5>
                <p className="result-slider-item-description">
                  {rec.description.length > 100
                    ? `${rec.description.substring(0, 100)}...`
                    : rec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}