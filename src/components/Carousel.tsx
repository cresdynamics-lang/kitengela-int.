import { useState, useEffect } from 'react'
import styles from './Carousel.module.css'

interface CarouselImage {
  id: number
  title: string
  image: string
  description: string
  phoneNumbers?: string[]
  location?: string
  services?: string[]
}

interface CarouselProps {
  images: CarouselImage[]
}

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10 seconds
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <div className={styles.slideContainer}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${styles.slide} ${
                index === currentIndex ? styles.active : ''
              }`}
            >
              <div className={styles.imageWrapper}>
                <img src={image.image} alt={image.title} className={styles.image} />
                <div className={styles.overlay} />
                <div className={styles.content}>
                  <h2 className={styles.title}>{image.title}</h2>
                  <p className={styles.description}>{image.description}</p>
                  
                  {image.phoneNumbers && image.phoneNumbers.length > 0 && (
                    <div className={styles.phoneNumbersRow}>
                      {image.phoneNumbers.map((phone, idx) => (
                        <a 
                          key={idx} 
                          href={`tel:${phone.replace(/\s/g, '')}`} 
                          className={styles.phoneLinkUnderlined}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {image.location && (
                    <p className={styles.locationUnderlined}>
                      {image.location}
                    </p>
                  )}
                  
                  {image.services && image.services.length > 0 && (
                    <div className={styles.servicesList}>
                      {image.services.map((service, idx) => (
                        <p key={idx} className={styles.serviceItem}>{service}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots Indicator */}
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
