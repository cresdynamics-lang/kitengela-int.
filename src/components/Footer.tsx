'use client'

import { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import { publicApi } from '@/lib/api'

interface FooterLink {
  id: string
  title: string
  url: string
  category: string
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [adminLinks, setAdminLinks] = useState<FooterLink[]>([])
  const phoneNumbers = [
    '+254 722 566 399',
    '+254 720 276 162',
    '+254 720 977 189',
    '+254 775 036 515',
    '+254 703 182 203'
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Voice Of Salvation And Healing Church Int&apos;l</h3>
            <p className={styles.footerDescription}>
              KITENGELA
            </p>
            <p className={styles.slogan}>
              <strong>House of Solutions</strong> • <strong>Manifesting Christ</strong>
            </p>
          </div>

          <div className={styles.footerRow}>
            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Quick Links</h4>
              <ul className={styles.footerLinks}>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/leadership">Leadership</a></li>
                <li><a href="/sermons">Sermons</a></li>
                <li><a href="/give">Give</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
              {adminLinks.length > 0 && (
                <>
                  <h5 className={styles.footerSubHeading}>Resources</h5>
                  <ul className={styles.footerLinks}>
                    {adminLinks.map((link) => (
                      <li key={link.id}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Contact</h4>
              <div className={styles.phoneNumbers}>
                <strong>Phone:</strong>
                {phoneNumbers.map((phone, idx) => (
                  <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className={styles.phoneLink}>
                    {phone}
                  </a>
                ))}
              </div>
              <p className={styles.footerText}>
                <strong>WhatsApp:</strong> <a href="https://wa.me/254722566399" target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>+254 722 566 399</a>
              </p>
            </div>

            <div className={styles.footerSection}>
              <h4 className={styles.footerHeading}>Location</h4>
              <p className={styles.footerText}>
                Kitengela, Kenya<br />
                Along Baraka Road / Treewa Road<br />
                Next to Balozi Junior Academy
              </p>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Give & Support</h4>
            <p className={styles.footerText}>
              <strong>M-Pesa Paybill:</strong> 400222<br />
              <strong>Account:</strong> 1756443#offering/tithe
            </p>
            <a href="/give" className={styles.giveLink}>Learn More →</a>
            <div className={styles.socialLinks}>
              <h5 className={styles.socialTitle}>Follow Us</h5>
              <div className={styles.socialIcons}>
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon} 
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon} 
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.socialIcon} 
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Voice Of Salvation And Healing Church Int&apos;l – Kitengela. All rights reserved.
          </p>
          <p className={styles.hashtags}>
            #House_of_Solutions • #MANIFESTING_CHRIST
          </p>
          <p className={styles.poweredBy}>
            Powered by <a href="https://cresdynamics.com" target="_blank" rel="noopener noreferrer" className={styles.poweredByLink}>Cres Dynamics</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
