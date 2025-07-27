import './privacy-policy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <p className="privacy-date">last updated : February 21, 2025</p>
      <section className="privacy-section">
        <h2 className="privacy-section-title">Introduction</h2>
        <p className="privacy-section-text">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
        <ul className="privacy-list">
          <li className="privacy-list-item">Agree to lorem ipsum</li>
          <li className="privacy-list-item">Agree to lorem ipsum</li>
          <li className="privacy-list-item">Agree to lorem ipsum</li>
        </ul>
      </section>
    </div>
  );
}