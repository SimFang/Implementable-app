'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchLatestArticles, fetchOlderArticles } from '../../../helpers/blog/getArticles';
import './blog.css';
import { BlogArticle } from '../../../types/blogType';



export default function Blog() {
  const router = useRouter();
  const [featured, setFeatured] = useState<BlogArticle | null>(null);
const [articles, setArticles] = useState<BlogArticle[]>([]);
const [olderArticles, setOlderArticles] = useState<BlogArticle[]>([]);
  const [showMore, setShowMore] = useState(false);

  // Load initial articles
  useEffect(() => {
    const loadArticles = async () => {
      const latest = await fetchLatestArticles();
      if (latest.length > 0) {
        setFeatured(latest[0]);
        setArticles(latest.slice(1));
      }
    };
    loadArticles();
  }, []);

  const handleArticleClick = (post: any) => {
    router.push(`/blog/${post.slug}?data=${encodeURIComponent(JSON.stringify(post))}`);
  };

  const handleSeeMore = async () => {
    const older = await fetchOlderArticles();
    setOlderArticles(older);
    setShowMore(true);
  };

  return (
    <div className="blog-container">
      <div className="blog-hero">
        <div className="blog-hero-icon">✨</div>
        <h1 className="blog-hero-title">Discover AI</h1>
        <p className="blog-hero-subtitle">Find news, updates, and best practices for AI</p>
      </div>

      {/* Featured Article */}
      {featured && (
        <div className="blog-highlight-card" onClick={() => handleArticleClick(featured)}>
          <div className="blog-highlight-text">
            <h2 className="blog-highlight-title">{featured.title}</h2>
            <p className="blog-highlight-description">{featured.description}</p>
            <p className="blog-highlight-meta">
              By {featured.author.name} – {featured.readTime}
            </p>
            <span className="blog-highlight-link">Read article</span>
          </div>
          <div className="blog-highlight-image">
            <img src={featured.mainIllustration} alt={featured.title} />
          </div>
        </div>
      )}

      {/* Other Articles */}
      <div className="blog-subarticles">
        {articles.map((post) => (
          <div key={post.slug} className="subarticle-card" onClick={() => handleArticleClick(post)}>
            <div className="subarticle-text">
              <h3 className="subarticle-title">{post.title}</h3>
              <p className="subarticle-description">{post.description}</p>
              <p className="subarticle-meta">By {post.author.name} – {post.readTime}</p>
              <span className="subarticle-link">Read article</span>
            </div>
            <div className="subarticle-image-wrapper">
              <img src={post.mainIllustration} alt={post.title} className="subarticle-image" />
            </div>
          </div>
        ))}

        {/* Older Articles (after 'See More') */}
        {showMore && olderArticles.map((post) => (
          <div key={post.slug} className="subarticle-card" onClick={() => handleArticleClick(post)}>
            <div className="subarticle-text">
              <h3 className="subarticle-title">{post.title}</h3>
              <p className="subarticle-description">{post.description}</p>
              <p className="subarticle-meta">By {post.author.name} – {post.readTime}</p>
              <span className="subarticle-link">Read article</span>
            </div>
            <div className="subarticle-image-wrapper">
              <img src={post.mainIllustration} alt={post.title} className="subarticle-image" />
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {!showMore && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="see-more-button" onClick={handleSeeMore}>
            See more
          </button>
        </div>
      )}
    </div>
  );
}