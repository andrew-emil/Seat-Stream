import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import "@/app/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="left-section">
            <h5 className="footer__title">About Us</h5>
            <p className="footer__text">
              Seat Stream Cinemas is the Middle East&aposs largest cinema chain,
              operating over 200 cinemas across the region with a commitment to
              delivering the best movie experiences for everyone.
            </p>
          </div>
          <div className="middle-section">
            <h5 className="footer__title">Help & Support</h5>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link href="/about" className="footer__link">
                  About Us
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  Refunds
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/movies/whats-on" className="footer__link">
                  Whataposs On
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  FAQ
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-section">
            <h5 className="footer__title">Explore Our Site</h5>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  Contact Us
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  Terms And Conditions
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/food&drinks" className="footer__link">
                  Food Menus
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  Careers
                </Link>
              </li>
              <li className="footer__list-item">
                <Link href="/" className="footer__link">
                  Terms of Use
                </Link>
              </li>
            </ul>
            <h5 className="footer__title">Stay In Touch</h5>
            <ul className="footer__social">
              <li className="footer__social-item">
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social-link"
                >
                  <FacebookIcon className="footer_social_media" />
                </Link>
              </li>
              <li className="footer__social-item">
                <Link
                  href="https://x.com/"
                  className="footer__social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <XIcon className="footer_social_media" />
                </Link>
              </li>
              <li className="footer__social-item">
                <Link
                  href="https://www.instagram.com/"
                  className="footer__social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon className="footer_social_media" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
