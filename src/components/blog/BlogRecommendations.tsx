'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecommendations } from '../../../helpers/blog/getArticles';
import './recommendations.css'; // optional: your styles

type Article = {
  slug: string;
  title: string;
  mainIllustration: string;
  author: {
    name: string;
    title?: string;
  };
  publishedAt?: string;
  theme?: string;
  content?: any; // optional for now — depends on what's returned
};

type Props = {
  currentSlug: string;
};

export default function BlogRecommendations({ currentSlug }: Props) {
  const [recommendations, setRecommendations] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const recs = await getRecommendations(currentSlug);
        setRecommendations(recs);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [currentSlug]);

  const handleClick = (article: Article) => {
    router.push(`/blog/${article.slug}?data=${encodeURIComponent(JSON.stringify(article))}`);
  };

  return (
    <div className="recommendations-container">
      <div className='line'></div>

      <h2 className="recommendations-title">Related articles</h2>

      {loading ? (
        <div className="recommendations-spinner">Loading recommendations...</div>
      ) : (

        <div className="recommendations-slider">
          {recommendations?.map((article) => (
            <div
              key={article.slug}
              className="recommendation-card"
              onClick={() => handleClick(article)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(article)}
            >
              <img
                src={article.mainIllustration}
                alt={article.title}
                className="recommendation-image"
              />
              <h3 className="recommendation-title">{article.title}</h3>
              <p className="recommendation-author">By {article.author.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}