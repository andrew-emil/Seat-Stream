import React from "react";
import { Facebook, Twitter, Instagram } from "@vectopus/atlas-icons-react";

import "../css/components/footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="row">
					<div className="left-section">
						<h5 className="footer__title">About Us</h5>
						<p className="footer__text">
							Seat Stream Cinemas is the Middle East's largest cinema chain,
							operating over 200 cinemas across the region with a commitment to
							delivering the best movie experiences for everyone.
						</p>
					</div>
					<div className="middle-section">
						<h5 className="footer__title">Help & Support</h5>
						<ul className="footer__list">
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									About Us
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Refunds
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									What's On
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									FAQ
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>
					<div className="right-section">
						<h5 className="footer__title">Explore Our Site</h5>
						<ul className="footer__list">
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Contact Us
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Terms And Conditions
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Food Menus
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Careers
								</a>
							</li>
							<li className="footer__list-item">
								<a href="/" className="footer__link">
									Terms of Use
								</a>
							</li>
						</ul>
						<h5 className="footer__title">Stay In Touch</h5>
						<ul className="footer__social">
							<li className="footer__social-item">
								<a
									href="https://www.facebook.com/"
									target="_blank"
									rel="noreferrer"
									className="footer__social-link">
									<Facebook className="footer_social_media" />
								</a>
							</li>
							<li className="footer__social-item">
								<a
									href="https://x.com/"
									className="footer__social-link"
									target="_blank"
									rel="noreferrer">
									<Twitter className="footer_social_media" />
								</a>
							</li>
							<li className="footer__social-item">
								<a
									href="https://www.instagram.com/"
									className="footer__social-link"
									target="_blank"
									rel="noreferrer">
									<Instagram className="footer_social_media" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default React.memo(Footer);