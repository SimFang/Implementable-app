import './about.css';

export default function About() {
  return (
    <div className="about-container">
      {/* Header */}
      <header className="about-header">
        <div className="about-logo">LOREM</div>

        <nav className="about-nav">
          <a href="#" className="about-nav-link">Articles</a>
          <a href="#" className="about-nav-link">About us</a>
          <a href="#" className="about-nav-link">Tutorial</a>
        </nav>

        <button className="about-button">
          get started
        </button>
      </header>

      {/* Hero Section */}
      <main className="about-main">
        <h1 className="about-title">
          ABOUT<br />US
        </h1>
      </main>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="about-mission-content">
          <h2 className="about-mission-title">Our Mission</h2>
          <p className="about-mission-text">
            We're on a mission to democratize access to <span className="about-mission-highlight">artificial intelligence</span> for every business — no matter the size, budget, or technical expertise. 
            <br /><br />
            AI shouldn't be a luxury reserved for enterprises with deep pockets and consultant-heavy strategies. It should be fast, affordable, and actionable.
          </p>
        </div>

        {/* Rocket Icon with Navigation Line */}
        <div className="about-rocket">
          <svg xmlns="http://www.w3.org/2000/svg" className="about-rocket-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l-2 2h4l-2-2zm-2 4v2h4V6h-4zm0 4v2h4v-2h-4zm-4 4h8v2H6v-2zm4 4v-2h-4v2h4zm4-8v-2h-8v2h8zm-4-4V4h-4v2h4z"/>
          </svg>
          <div className="about-nav-line"></div>
          <div className="about-nav-dot"></div>
        </div>

        {/* Fixed Navigation Indication Bar */}
        <div className="about-fixed-nav">
          <div className="about-fixed-nav-dot"></div>
        </div>
      </section>
    </div>
  );
}