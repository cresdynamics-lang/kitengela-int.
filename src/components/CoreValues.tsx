import styles from './CoreValues.module.css'

const CORE_VALUES = ['Prayer', 'Stewardship', 'Holiness', 'Advocacy', 'Unity']

export default function CoreValues() {

  return (
    <section className={styles.coreValuesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Core Values</h2>
        <p className={styles.sectionSubtitle}>
          The foundational principles that guide our ministry
        </p>
        
        <div className={styles.valuesGrid}>
          {CORE_VALUES.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <span className={styles.arrow}>›</span>
              </div>
              <h3 className={styles.valueName}>{value}</h3>
            </div>
          ))}
        </div>

        <div className={styles.hashtags}>
          <span className={styles.hashtag}>#House_of_Solutions</span>
          <span className={styles.hashtag}>#MANIFESTING_CHRIST</span>
        </div>
      </div>
    </section>
  )
}
