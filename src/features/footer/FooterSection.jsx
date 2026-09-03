import I8 from "../../shared/components/I8/I8";
import "./FooterSection.css";

const SHOP_LINKS = ["Women", "Men", "New Arrivals", "Sale"];
const COMPANY_LINKS = ["About Us", "Careers", "Contact Us"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service", "Cookie Settings"];
const SOCIAL = [
  { label: "Instagram", name: "instagram-new" },
  { label: "Facebook", name: "facebook-new" },
  { label: "Twitter", name: "twitter" },
  { label: "TikTok", name: "tiktok" },
];

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <h3 className="footer__brand-name">FLOW FACTORY</h3>
            <p className="footer__brand-desc">Refined clothing for the modern wardrobe. Curated with care, made to last.</p>
          </div>

          <div>
            <h4 className="footer__col-title">Shop</h4>
            {SHOP_LINKS.map((link) => (
              <p key={link} className="footer__link-item">
                <a href="#" className="footer__link">{link}</a>
              </p>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Company</h4>
            {COMPANY_LINKS.map((link) => (
              <p key={link} className="footer__link-item">
                <a href="#" className="footer__link">{link}</a>
              </p>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Stay in the Know</h4>
            <p className="footer__newsletter-desc">New arrivals, exclusive offers, and style notes — directly to your inbox.</p>
            <div className="footer__newsletter-form">
              <input type="email" placeholder="Your email" className="footer__newsletter-input" />
              <button className="footer__newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 FLOW FACTORY. All rights reserved.</p>
          <div className="footer__legal">
            {LEGAL_LINKS.map((link) => (
              <a key={link} href="#" className="footer__legal-link">{link}</a>
            ))}
          </div>
          <div className="footer__social">
            {SOCIAL.map(({ label, name }) => (
              <a key={label} href="#" aria-label={label} className="footer__social-link">
                <I8 name={name} size={20} color="968C80" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
