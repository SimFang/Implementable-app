export type BlogArticle = {
    slug: string;
    title: string;
    description: string;
    readTime: string;
    mainIllustration: string;
    author: {
      name: string;
    };
    [key: string]: any; // optional fallback for extra fields
  };