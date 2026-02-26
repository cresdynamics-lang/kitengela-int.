'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import styles from './give.module.css'

export default function GivePage() {
  return (
    <main>
      <Header />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Give & Support Ministry</h1>
          <p className={styles.subtitle}>
            Your giving supports tithes & offerings, the building of our church sanctuary, and ministry equipment for evangelism and outreach.
          </p>
        </div>

        {/* Tithes & Offerings */}
        <ScrollReveal direction="left">
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>For Tithes & Offerings</h2>
          <p className={styles.sectionIntro}>
            Use the details below for your regular tithes and offerings. <strong>Always specify the type of giving</strong> (e.g. Tithe, Offering, Building fund, Sanctuary, Ministry equipment, Evangelism) so we can allocate your gift correctly.
          </p>
          <div className={styles.givingCard}>
            <div className={styles.givingMethod}>
              <div className={styles.methodHeader}>
                <span className={styles.icon}>📱</span>
                <h3>M-Pesa Paybill (Tithes & Offerings)</h3>
              </div>
              <div className={styles.methodDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Paybill Number</span>
                  <span className={styles.value}>400222</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Account Number</span>
                  <span className={styles.value}>33985#</span>
                </div>
                <p className={styles.specifyNote}>(Specify type of giving in the reference, e.g. Tithe, Offering, Building, Sanctuary, Ministry, Evangelism)</p>
                <div className={styles.instructions}>
                  <p><strong>How to give via M-Pesa:</strong></p>
                  <ol>
                    <li>Go to M-Pesa → Lipa na M-Pesa → Paybill</li>
                    <li>Enter Paybill: <strong>400222</strong></li>
                    <li>Enter Account: <strong>33985#</strong></li>
                    <li>In the reference, specify type: <strong>Tithe</strong>, <strong>Offering</strong>, <strong>Building</strong>, <strong>Sanctuary</strong>, <strong>Ministry</strong>, or <strong>Evangelism</strong></li>
                    <li>Enter amount and your M-Pesa PIN, then confirm</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bankCard}>
            <h3 className={styles.bankTitle}>Bank (Tithes & Offerings)</h3>
            <p className={styles.bankInfo}>
              <strong>Bank:</strong> Co-operative Bank<br />
              <strong>Account Name:</strong> Athi River VOSH Church
            </p>
            <p className={styles.specifyNote}>When depositing, please specify the type of giving (Tithe, Offering, Building fund, Sanctuary, Ministry equipment, Evangelism).</p>
          </div>
        </section>
        </ScrollReveal>

        {/* Partner With Us – Building & Ministry */}
        <ScrollReveal direction="right">
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Partner With Us — Let&apos;s Build God&apos;s House</h2>
          <p className={styles.sectionIntro}>
            Give towards <strong>building our church sanctuary</strong> and <strong>purchasing church ministry equipment</strong> for evangelism and outreach.
          </p>
          <div className={styles.givingCard}>
            <div className={styles.givingMethod}>
              <div className={styles.methodHeader}>
                <span className={styles.icon}>📱</span>
                <h3>M-Pesa (Lipa na M-Pesa) — Building & Ministry</h3>
              </div>
              <div className={styles.methodDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Paybill Number</span>
                  <span className={styles.value}>100400</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Account Number</span>
                  <span className={styles.value}>9783810989</span>
                </div>
                <div className={styles.instructions}>
                  <p><strong>Steps:</strong></p>
                  <ol>
                    <li>M-Pesa → Lipa na M-Pesa → Paybill</li>
                    <li>Paybill: <strong>100400</strong></li>
                    <li>Account: <strong>9783810989</strong></li>
                    <li>Enter amount and PIN, then confirm</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.paypalCard}>
            <div className={styles.methodHeader}>
              <span className={styles.icon}>💳</span>
              <h3>PayPal</h3>
            </div>
            <p className={styles.bankInfo}>
              You can also give via PayPal to:<br />
              <a href="mailto:voshkitengelahouseofsolutions@gmail.com" className={styles.paypalEmail}>voshkitengelahouseofsolutions@gmail.com</a>
            </p>
          </div>
        </section>

        {/* Quick reference: types of giving */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Types of Giving</h2>
          <div className={styles.categoriesGrid}>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>💰</span>
              <h3>Tithes</h3>
              <p>Regular tithe to support the church ministry. Use Paybill <strong>400222</strong>, Account <strong>33985#</strong> and specify &quot;Tithe&quot;.</p>
            </div>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>🎁</span>
              <h3>Offerings</h3>
              <p>General offerings for church operations. Use Paybill <strong>400222</strong>, Account <strong>33985#</strong> and specify &quot;Offering&quot;.</p>
            </div>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>⛪</span>
              <h3>Building / Sanctuary</h3>
              <p>Building the church sanctuary. Use Paybill <strong>400222</strong> (Account 33985#, specify &quot;Building&quot; or &quot;Sanctuary&quot;) or Paybill <strong>100400</strong>, Account <strong>9783810989</strong>.</p>
            </div>
            <div className={styles.categoryCard}>
              <span className={styles.categoryIcon}>🎤</span>
              <h3>Ministry & Evangelism</h3>
              <p>Ministry equipment and evangelism & outreach. Use Paybill <strong>400222</strong> (Account 33985#, specify &quot;Ministry&quot; or &quot;Evangelism&quot;) or Paybill <strong>100400</strong>, Account <strong>9783810989</strong>, or PayPal.</p>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal direction="right">
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <div className={styles.bankCard}>
            <p className={styles.bankInfo}>For any questions about giving, reach us on:</p>
            <div className={styles.contactInfo}>
              <p><strong>Phone:</strong> +254 722 566 399</p>
              <p><strong>Phone:</strong> +254 720 276 162</p>
              <p><strong>Phone:</strong> +254 720 977 189</p>
              <p><strong>Email:</strong> voshkitengelahouseofsolutions@gmail.com</p>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal direction="left">
        <section className={styles.section}>
          <div className={styles.scripture}>
            <p className={styles.scriptureText}>
              &quot;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&quot;
            </p>
            <p className={styles.scriptureReference}>— 2 Corinthians 9:7</p>
            <p className={styles.slogan}>House of Solutions</p>
          </div>
        </section>
        </ScrollReveal>
      </div>
      <Footer />
    </main>
  )
}
