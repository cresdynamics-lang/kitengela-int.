import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface GalleryImage {
  id: string
  title: string
  imageUrl: string
  thumbnailUrl?: string
}

interface GalleryGridProps {
  images: GalleryImage[]
  columns?: number
}

export function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const colsClass =
    {
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
    }[columns] || 'md:grid-cols-3'

  const closeLightbox = () => setSelectedIndex(-1)

  const goToPrevious = () => {
    if (images.length === 0) return
    setSelectedIndex((prev) => (prev <= 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (images.length === 0) return
    setSelectedIndex((prev) => (prev + 1) % images.length)
  }

  useEffect(() => {
    if (selectedIndex < 0) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') goToPrevious()
      if (event.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedIndex, images.length])

  return (
    <>
      <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${colsClass}`}>
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedIndex(index)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={image.thumbnailUrl || image.imageUrl}
              alt={image.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-center">
                <h3 className="text-white font-poppins font-bold text-lg">{image.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedIndex >= 0 && images[selectedIndex] && (
        <motion.div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close image viewer"
            className="absolute top-5 right-5 text-white text-3xl leading-none hover:text-yellow-400"
            onClick={closeLightbox}
          >
            x
          </button>

          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 md:left-8 text-white text-4xl leading-none hover:text-yellow-400"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
          >
            {'<'}
          </button>

          <motion.div
            className="max-w-6xl max-h-[85vh] w-full flex flex-col items-center"
            initial={{ scale: 0.96, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex].imageUrl}
              alt={images[selectedIndex].title}
              className="max-w-full max-h-[78vh] object-contain rounded-md"
            />
            <p className="mt-3 text-white text-center font-medium">{images[selectedIndex].title}</p>
          </motion.div>

          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 md:right-8 text-white text-4xl leading-none hover:text-yellow-400"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
          >
            {'>'}
          </button>
        </motion.div>
      )}
    </>
  )
}
