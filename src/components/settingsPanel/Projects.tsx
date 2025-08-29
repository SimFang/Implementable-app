import React, { useEffect, useState } from 'react';
import { getUserAnalyses } from '../../../helpers/analysis/getUserAnalyses';
import './projects.css';
import { Globe, Lock, Unlock, Grid, ArrowRight } from 'lucide-react';

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

type FilterType = 'All' | 'Locked' | 'Unlocked';

export function getShortURL(fullUrl: string): string {
  try {
    const url = new URL(fullUrl.startsWith('http') ? fullUrl : `https://${fullUrl}`);
    return url.hostname.replace(/^www\./, '');
  } catch (e) {
    // If fullUrl is not a valid URL, try to extract domain manually
    const cleaned = fullUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    return cleaned;
  }
}

export default function Projects() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const data = await getUserAnalyses();
        setAnalyses(data || []);
        console.log(data)
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
      return new Date(isoDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return isoDate;
    }
  };

  const filteredAnalyses = analyses.filter(analysis => {
    if (filter === 'All') return true;
    return filter === 'Locked' ? !analysis.unlocked : analysis.unlocked;
  });


  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2>Projects</h2>
        <div className="projects-tabs">
          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>
            <Grid size={16} /> All
          </button>
          <button className={filter === 'Locked' ? 'active' : ''} onClick={() => setFilter('Locked')}>
            <Lock size={16} /> Locked
          </button>
          <button className={filter === 'Unlocked' ? 'active' : ''} onClick={() => setFilter('Unlocked')}>
            <Unlock size={16} /> Unlocked
          </button>
        </div>
      </div>

      {filteredAnalyses.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="projects-scroll-container">
          <div className="projects-grid-horizontal">
            {filteredAnalyses.map((analysis) => {
              const cp = analysis.companyProfile || {};
              return (
                <div
                        key={analysis.analysisId}
                        className={`project-card ${analysis.unlocked ? 'unlocked' : 'locked'}`}
                        onClick={() => handleClick(analysis.analysisId)}
                        tabIndex={0}
                        role="button"
                        onKeyDown={e => { if (e.key === 'Enter') handleClick(analysis.analysisId); }}
                        style={{
                          backgroundImage: `linear-gradient(to bottom, rgba(245,245,245,1), rgba(245,245,245,1),rgba(245,245,245,0.0)), url(${analysis.illustration || '/images/default-project.jpg'})`,
                          backgroundPosition: 'bottom',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat'
                        }}
                      >
                        
                        <div className="project-content">
                        <div className={`${analysis.unlocked ? 'project-nolocker' : 'project-locker'}`}>
                            <Lock size={16} />
                          </div>
                          <h3>{cp.companyName || 'Unnamed Company'}</h3>
                          
                            {cp.websiteURL ? (
                              <div className="project-website">
                              <Globe size={14} /> 
                              <a
                                href={cp.websiteURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                
                                onClick={(e) => e.stopPropagation()}
                              >
                                {getShortURL(cp.websiteURL)}
                              </a>
                              </div>
                            ) : (
                              'No Website'
                            )}
                          

                          <p className="company-type">{cp.companyType || 'Unknown Type'}</p>
                          <div className='redirection-button-container'>
                          <div className='redirection-button'>
                            <ArrowRight size={14}/>
                          </div>
                          </div>
                         

                        </div>
                      </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}