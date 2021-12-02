import { useState, useEffect } from 'react';

export const useProgressiveImage = (src) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (!src) {
      return
    }
    let unmounted = false

    if (!unmounted) {
      const img = new Image()
      img.src = src

      img.onload = () => {
        setImage(src)
      }
    }

    return () => {
      unmounted = true;
    }
  }, [src, image])

  return { image }
}
