'use client';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { notFound, useRouter} from 'next/navigation';
import { blogPosts } from '@/tests/blogpost';
import './blog-post.css';
import { BlogArticle } from '../../../../types/blogType';
import { getRecommendations } from '../../../../helpers/blog/getArticles';
import BlogRecommendations from '@/components/blog/BlogRecommendations';

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

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'bigTitle':
      return <h2 className="blog-big-title">{block.text}</h2>;
    case 'smallTitle':
      return <h3 className="blog-small-title">{block.text}</h3>;
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

export default function ArticlePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');

  if (!dataParam) return notFound();

  let article: Article;
  try {
    article = JSON.parse(decodeURIComponent(dataParam));
  } catch (err) {
    console.error('Failed to parse article data:', err);
    return notFound();
  }

  return (
    <div className="blog-post-container">
      {/* Title */}
      <h1 className="blog-post-title">{article.title}</h1>

      {/* Date */}
      <p className="blog-post-date">
        {new Date(article.publishedAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {/* Main Illustration */}
      <div className="blog-post-main-image">
        <img src={article.mainIllustration} alt="Main illustration" />
      </div>

      {/* Author */}
      <div className="blog-post-author-box">
        <p className="blog-post-author-name">{article.author.name}</p>
        <p className="blog-post-author-title">{article.author.title}</p>
      </div>

      {/* Content */}
      <div className="blog-post-content">
        {article.content.map((block, index) => (
          <ContentBlockRenderer key={index} block={block} />
        ))}
      </div>

      {/* Recommendations */}
      <BlogRecommendations currentSlug={article.title} />

      {/* Button to redirect to /blog */}
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
    
  );
}
