import './terms-of-service.css';

export default function TermsOfService() {
  return (
    <div className="terms-container">
      <h1 className="terms-title">Terms of Service</h1>
      <p className="terms-date">Last updated: February 21, 2025</p>

      <section className="terms-section">
        <h2 className="terms-section-title">1. Acceptance of Terms</h2>
        <p className="terms-section-text">
          By accessing and using this website, you accept and agree to be bound by the terms and
          provision of this agreement.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-section-title">2. Use License</h2>
        <p className="terms-section-text">
          Permission is granted to temporarily download one copy of the materials (information or
          software) on Websora's website for personal, non-commercial transitory viewing only.
        </p>
        <p className="terms-section-text">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul className="terms-list">
          <li className="terms-list-item">Modify or copy the materials</li>
          <li className="terms-list-item">Use the materials for any commercial purpose</li>
          <li className="terms-list-item">Attempt to decompile or reverse engineer any software contained on Websora's website</li>
          <li className="terms-list-item">Remove any copyright or other proprietary notations from the materials</li>
          <li className="terms-list-item">Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2 className="terms-section-title">3. Disclaimer</h2>
        <p className="terms-section-text">
          The materials on Websora's website are provided on an 'as is' basis. Websora makes no
          warranties, expressed or implied, and hereby disclaims and negates all other warranties
          including, without limitation, implied warranties or conditions of merchantability, fitness
          for a particular purpose, or non-infringement of intellectual property or other violation
          of rights.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="terms-section-title">4. Limitations</h2>
        <p className="terms-section-text">
          In no event shall Websora or its suppliers be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business interruption) arising
          out of the use or inability to use the materials on Websora's website, even if Websora
          or a Websora authorized representative has been notified orally or in writing of the
          possibility of such damage.
        </p>
      </section>
    </div>
  );
}