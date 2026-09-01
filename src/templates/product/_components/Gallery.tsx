import React, { useState, useEffect, useCallback } from 'react'
import {EmblaPluginType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { GalleryThumb } from './GalleryThumb'
import Image from 'next/image'
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay'




type ProductGalleryType = {
  gallery:{
     alt: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
    productId: string;
  }[]
  plugins?:EmblaPluginType[]
}

const Gallery = (props: ProductGalleryType) => {
  const { gallery, plugins} = props
  const [selectedIndex, setSelectedIndex] = useState({})
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({direction:'rtl'},plugins)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    direction:"rtl"
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef} >
        <div className="embla__container">
          {gallery.map((item,idx) => (
            <div className="embla__slide" key={idx}>
              <div className="embla__slide__number"><Image className='w-full h-full border-2 border-primary rounded-lg' src={item.url} alt={item.alt?? ''}  width={500} height={500} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {gallery.map((item,idx) => (
              <GalleryThumb
                key={idx}
                onClick={() => onThumbClick(idx)}
                selected={item.url === selectedIndex}
                image={{...item, alt:item.alt ?? undefined}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
