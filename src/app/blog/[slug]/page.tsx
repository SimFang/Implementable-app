'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, notFound, useRouter } from 'next/navigation';
import { blogPosts } from '@/tests/blogpost';
import './blog-post.css';
import { BlogArticle } from '../../../../types/blogType';
import { getRecommendations } from '../../../../helpers/blog/getArticles';
import BlogRecommendations from '@/components/blog/BlogRecommendations';
import WhiteLoading from '@/components/style/WhiteLoading';
import Gradient from '@/components/style/Gradient';
import { motion, AnimatePresence } from 'framer-motion';

type Article = {
  title: string;
  mainIllustration: string;
  publishedAt: string;
  author: {
    name: string;
    title: string;
  };
  theme: string;
  content: ContentBlock[];
};

type ContentBlock =
  | { type: 'bigTitle'; text: string }
  | { type: 'smallTitle'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'imageLeft' | 'imageRight'; url: string; caption?: string; text?: string }
  | { type: 'imageBanner'; url: string; caption?: string };

function ContentBlockRenderer({ block, index }: { block: ContentBlock; index: number }) {
  switch (block.type) {
    case 'bigTitle':
      return <h2 id={`big-title-${index}`} className="blog-big-title">{block.text}</h2>;
    case 'smallTitle':
      return <h3 id={`small-title-${index}`} className="blog-small-title">{block.text}</h3>;
    case 'paragraph':
      return <p className="blog-paragraph">{block.text}</p>;
    case 'quote':
      return (
        <blockquote className="blog-quote">
          <p>{block.text}</p>
          {block.author && <footer>— {block.author}</footer>}
        </blockquote>
      );
    case 'imageBanner':
      return (
        <div className="blog-image-banner">
          <img src={block.url} alt={block.caption || 'banner'} />
          {block.caption && <div className="blog-caption">{block.caption}</div>}
        </div>
      );
    case 'imageLeft':
    case 'imageRight':
      return (
        <div className={`blog-image-text ${block.type === 'imageLeft' ? 'left' : 'right'}`}>
          <img src={block.url} alt={block.caption || 'illustration'} />
          <div>
            {block.text && <p>{block.text}</p>}
            {block.caption && <span className="blog-caption">{block.caption}</span>}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function SummaryPanel({
  titles,
}: {
  titles: { bigTitle: string; index: number; smallTitles: { text: string; index: number }[] }[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="summary-wrapper">
      <button
        className="summary-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle summary"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="summary-panel"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            {titles.map((section, i) => (
              <div key={i}>
                <div
                  className="summary-big-title"
                  onClick={() => handleScroll(`big-title-${section.index}`)}
                >
                  {section.bigTitle}
                </div>
                <ul className="summary-small-list">
                  {section.smallTitles.map((sub, j) => (
                    <li key={j}>
                      <button
                        onClick={() => {
                          handleScroll(`small-title-${sub.index}`)
                          setIsOpen(false)
                        }}
                        className="summary-link"
                      >
                        {sub.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsWideScreen(window.innerWidth > 1200);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  if (!dataParam) return notFound();

  let article: Article;
  try {
    article = JSON.parse(decodeURIComponent(dataParam));
  } catch (err) {
    console.error('Failed to parse article data:', err);
    return notFound();
  }

  const titles = article.content.reduce((acc, block, index) => {
    if (block.type === 'bigTitle') {
      acc.push({ bigTitle: block.text, index, smallTitles: [] });
    } else if (block.type === 'smallTitle') {
      if (acc.length > 0) {
        acc[acc.length - 1].smallTitles.push({ text: block.text, index });
      }
    }
    return acc;
  }, [] as { bigTitle: string; index: number; smallTitles: { text: string; index: number }[] }[]);

  return (
    <div className="blog-post-container">
      <WhiteLoading color="#ffffff" />
      <Gradient
        fromColor="#0235A6"
        toColor="#FFFFFF"
        position="right"
        size="1000px"
        style={{ zIndex: 0, pointerEvents: 'none', right: -700, bottom: 200 }}
      />

      {isWideScreen && <SummaryPanel titles={titles} />}

      <div className="blog-post-content">
        <h1 className="blog-post-title">{article.title}</h1>

        <p className="blog-post-date">
          {new Date(article.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <div className="blog-post-main-image">
          <img src={article.mainIllustration} alt="Main illustration" />
        </div>

        <div className="blog-post-author-box">
          <p className="blog-post-author-name">{article.author.name}</p>
          <p className="blog-post-author-title">{article.author.title}</p>
        </div>

        <div className="blog-post-content">
          {article.content.map((block, index) => (
            <ContentBlockRenderer key={index} block={block} index={index} />
          ))}
        </div>

        <BlogRecommendations currentSlug={article.title} />

        <div className="blog-post-content">
          <button
            onClick={() => router.push('/blog')}
            id="btn-go-to-blog"
            type="button"
          >
            Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
}