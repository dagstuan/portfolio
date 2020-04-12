import useEventListener from './useEventListener';
import { useEffect, useState, RefObject, useCallback } from 'react';
import { Image } from '../types/Image';

const getImageAspectRatio = (image: Image) => {
  const imageWidth = image.image.file.details.image.width;

  const imageHeight = imageWidth / image.image.fluid.aspectRatio;

  return imageWidth / imageHeight;
};

export default function useImageSize(
  containerRef: RefObject<HTMLDivElement>,
  image: Image
) {
  const [imageWidth, setImageWidth] = useState('0px');
  const [imageHeight, setImageHeight] = useState('0px');
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateDimensions = useCallback(() => {
    const windowWidth = typeof window !== `undefined` ? window.innerWidth : 0;
    if (windowWidth <= 750) {
      setImageWidth('100%');
      setImageHeight('100%');
      return;
    }

    const newContainerWidth = containerRef.current?.offsetWidth ?? 0;
    const newContainerHeight = containerRef.current?.offsetHeight ?? 0;

    if (
      containerWidth === newContainerWidth &&
      containerHeight === newContainerHeight
    ) {
      return;
    }

    const aspectRatio = getImageAspectRatio(image);

    setContainerWidth(newContainerWidth);
    setContainerHeight(newContainerHeight);

    if (newContainerWidth / newContainerHeight > aspectRatio) {
      setImageHeight(`${newContainerHeight}px`);
      setImageWidth(`${newContainerHeight * aspectRatio}px`);
    } else {
      setImageHeight(`${newContainerWidth / aspectRatio}px`);
      setImageWidth(`${newContainerWidth}px`);
    }
  }, [containerWidth, containerHeight, containerRef.current]);

  useEventListener('resize', updateDimensions);

  useEffect(updateDimensions, []);

  return { imageWidth, imageHeight };
}
