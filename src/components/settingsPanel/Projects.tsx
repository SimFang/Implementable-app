import React, { useEffect, useState } from 'react';
import { getUserAnalyses } from '../../../helpers/analysis/getUserAnalyses';
import './projects.css';
import { Globe, Lock } from 'lucide-react'; // Install via `npm install lucide-react`

interface CompanyProfile {
  companyName?: string;
  websiteURL?: string;
  companyType?: string;
}

interface Analysis {
  analysisId: string;
  unlocked: boolean;
  createdAt: string;
  illustration?: string;
  companyProfile?: CompanyProfile;
}

export default function Projects() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const data = await getUserAnalyses();
        setAnalyses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load analyses");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, []);

  const handleClick = (analysisId: string) => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/result?analysisId=${encodeURIComponent(analysisId)}`;
  };

  const formatDate = (isoDate: string) => {
    try {
      return new Date(isoDate).toLocaleString();
    } catch {
      return isoDate;
    }
  };

  const renderProjectCard = (analysis: Analysis) => {
    const cp = analysis.companyProfile || {};
    return (
      <div
        key={analysis.analysisId}
        className={`project-card ${analysis.unlocked ? 'unlocked' : 'locked'}`}
        onClick={() => handleClick(analysis.analysisId)}
        tabIndex={0}
        role="button"
        onKeyDown={e => { if (e.key === 'Enter') handleClick(analysis.analysisId); }}
      >
        {analysis.illustration && (
          <img
            className="project-illustration"
            src={analysis.illustration}
            alt={`${cp.companyName || 'Company'} illustration`}
          />
        )}
        <div className="project-info">
          <h3 className="company-name">{cp.companyName || "Unnamed Company"}</h3>
          <p className="company-type"><strong>Type:</strong> {cp.companyType || "N/A"}</p>
          <p className="company-website">
            <strong>Website:</strong>
            {cp.websiteURL ? (
              <a
                href={cp.websiteURL}
                target="_blank"
                rel="noopener noreferrer"
                className="website-icon"
                onClick={e => e.stopPropagation()}
              >
                <Globe size={16} />
              </a>
            ) : ' N/A'}
          </p>
          <p className="analysis-date"><strong>Date:</strong> {formatDate(analysis.createdAt)}</p>
          {!analysis.unlocked && (
            <div className="lock-icon" title="Locked">
              <Lock size={16} />
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="projects-loading">Loading projects...</div>;
  if (error) return <div className="projects-error">Error: {error}</div>;

  const unlocked = analyses.filter(a => a.unlocked);
  const locked = analyses.filter(a => !a.unlocked);

  return (
    <div className="projects-container">
      <h1>Your Projects</h1>

      {unlocked.length > 0 && (
        <>
          <h2>Unlocked Projects</h2>
          <div className="projects-list">
            {unlocked.map(renderProjectCard)}
          </div>
        </>
      )}

      {locked.length > 0 && (
        <>
          <h2>Locked Projects</h2>
          <div className="projects-list">
            {locked.map(renderProjectCard)}
          </div>
        </>
      )}

      {analyses.length === 0 && <p>No projects found.</p>}
    </div>
  );
}