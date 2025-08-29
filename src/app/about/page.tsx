'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import './about.css';
import AboutAppearAnimation from '@/components/style/AboutAppearAnimation';

// Define animation variants
const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
};

// Define viewport options separately
const viewportOptions = {
  once: true,
  amount: 0.3,
};

export default function About() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const dot = document.querySelector('.about-fixed-nav-dot') as HTMLElement | null;
    const dotline = document.querySelector('.about-fixed-nav-line-fill') as HTMLElement | null;
    const fixedline = document.querySelector('.about-fixed-nav') as HTMLElement | null;
    const section = document.querySelector('.about-section-founder') as HTMLElement | null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!dot || !dotline || !fixedline) return;
        const entry = entries[0];
        if (entry.isIntersecting) {
          dot.classList.add('dot-light');
          dotline.classList.add('dot-light');
          fixedline.classList.add('dot-light');
        } else {
          dot.classList.remove('dot-light');
          dotline.classList.remove('dot-light');
          fixedline.classList.remove('dot-light');
        }
      },
      { threshold: 0.5 }
    );

    if (section) observer.observe(section);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <>
      <AboutAppearAnimation />
      <div className="about-container">
        {/* Vertical Progress Bar */}
        <div className="about-fixed-nav">
          <div
            className="about-fixed-nav-line-fill"
            style={{ height: `${scrollProgress}%` }}
          />
          <div
            className="about-fixed-nav-dot"
            style={{ top: `calc(${scrollProgress}% - 0.375rem)` }}
          />
        </div>

        {/* Page Sections */}
        <main className="about-main">
          <h1 className="about-title">ABOUT<br />US</h1>
        </main>

        {/* Our Mission */}
        <section className="about-section mission">
          <motion.div
            className="about-section-content"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
          >
            <h2 className="about-section-title">Our Mission</h2>
            <p className="about-section-text">
              We're on a mission to democratize access to{' '}
              <span className="about-section-highlight">artificial intelligence</span>{' '}
              for every business — no matter the size, budget, or technical expertise.
              <br />
              <br />
              AI shouldn’t be a luxury reserved for enterprises with deep pockets and consultant-heavy
              strategies. It should be fast, affordable, and actionable.
            </p>
          </motion.div>
          <motion.div
            className="section-icon-glow"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
            transition={{ ...fadeUpVariants.transition, delay: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="section-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="whiteGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#whiteGradient1)"
                d="m18.003 13.068l2.26-2.261A9 9 0 0 0 22.9 4.443V1.1h-3.343a9 9 0 0 0-6.364 2.636l-2.261 2.26l-5.657-.707L1.04 9.524L14.475 22.96l4.235-4.235zm-1.792 1.791l.393 3.143l-2.129 2.129l-1.768-1.768zm-7.07-7.071l-3.505 3.504L3.87 9.524l2.129-2.129zm-3.505 9.16l-3.535 3.536L.687 19.07l3.535-3.535zm2.829 2.83l-3.536 3.535l-1.414-1.414l3.535-3.536z"
              />
            </svg>
          </motion.div>
        </section>

        {/* What we do */}
        <section className="about-whatwedo about-section">
          <motion.div
            className="about-whatwedo-content about-section-content"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
          >
            <h2 className="about-whatwedo-title about-section-title">What we do</h2>
            <p className="about-whatwedo-text about-section-text">
              We build accessible, fast, and scalable AI products. Our tools eliminate unnecessary
              complexity so teams can make smart decisions — without needing a PhD in machine learning.
            </p>
          </motion.div>
          <motion.div
            className="section-icon-glow"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
            transition={{ ...fadeUpVariants.transition, delay: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              className="section-icon"
              height="24"
              viewBox="0 0 512 512"
            >
              <defs>
                <linearGradient id="whiteGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#whiteGradient2)"
                d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.1-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208m-111 17c9.4-9.4 9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31H128c-13.3 0-24 10.7-24 24s10.7 24 24 24h102.1l-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72z"
              />
            </svg>
          </motion.div>
        </section>

        {/* Who we are */}
        <section className="about-whatwedo about-section">
          <motion.div
            className="about-whatwedo-content about-section-content"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
          >
            <h2 className="about-whatwedo-title about-section-title">Who we are</h2>
            <p className="about-whatwedo-text about-section-text">
              A team of engineers, designers, and problem-solvers committed to simplifying AI. We
              believe in transparency, automation, and user-first design.
            </p>
          </motion.div>
          <motion.div
            className="section-icon-glow"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
            transition={{ ...fadeUpVariants.transition, delay: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="section-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="whiteGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#whiteGradient3)"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
              />
            </svg>
          </motion.div>
        </section>

        {/* Our Vision */}
        <section className="about-whatwedo about-section">
          <motion.div
            className="about-whatwedo-content about-section-content"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
          >
            <h2 className="about-whatwedo-title about-section-title">Our Vision</h2>
            <p className="about-whatwedo-text about-section-text">
              We envision a world where every business — from startups to enterprises — can use AI
              intuitively, affordably, and ethically.
            </p>
          </motion.div>
          <motion.div
            className="section-icon-glow"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
            transition={{ ...fadeUpVariants.transition, delay: 0.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="section-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="whiteGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#whiteGradient4)"
                d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
              />
            </svg>
          </motion.div>
        </section>

        {/* Founder */}
        <section className="about-section-founder light">
          <div className="founder-avatar" />
          <motion.div
            className="founder-content"
            variants={fadeUpVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportOptions}
          >
            <p className="founder-quote">
              At the heart of our vision is a simple belief: AI should empower every business to
              innovate, grow, and lead — without limits.
            </p>
            <div className="founder-meta">
              <div className="founder-name">Simon Fang</div>
              <div className="founder-role">Founder</div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}