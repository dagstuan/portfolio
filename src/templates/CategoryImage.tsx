import React, {
  FC,
  useRef,
  RefObject,
  useEffect,
  useCallback,
  memo,
  useState,
} from 'react';
import Img from 'gatsby-image';
import useImageSize from '../hooks/useImageSize';
import { Image } from '../types/Image';
import useOnScreen from '../hooks/useOnScreen';
import usePrevious from '../hooks/usePrevious';

interface ICategoryImageProps {
  imageRef: RefObject<any>;
  image: Image;
  index: number;
  critical: boolean;
  onImageLoad: (id: string) => void;
  onImageVisible: (index: number) => void;
}

const CategoryImage: FC<ICategoryImageProps> = props => {
  const {
    imageRef,
    image,
    index,
    critical,
    onImageLoad,
    onImageVisible,
  } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const previousCritical = usePrevious(critical);
  const visible = useOnScreen(imageRef);

  useEffect(() => {
    if (visible) {
      onImageVisible(index);
    }
  }, [visible, onImageVisible]);

  const onImageLoadCallback = useCallback(() => {
    setIsLoaded(true);
    onImageLoad(image.id);
  }, [onImageLoad]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { imageWidth, imageHeight } = useImageSize(containerRef, image);

  // Make sure we keep the image as critical if it was ever critical
  const shouldBeCritical = (!isLoaded && critical) || previousCritical === true;

  return (
    <li ref={imageRef} className="category-elem">
      <div className="category-elem__image-outer-wrapper" ref={containerRef}>
        <div
          className="category-elem__image-wrapper"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <Img
            key={shouldBeCritical.toString()}
            onLoad={onImageLoadCallback}
            fluid={image.image.fluid}
            alt={image.title}
            className="category-elem__image"
            style={{ width: '100%', height: '100%' }}
            critical={shouldBeCritical}
          />
        </div>
      </div>
    </li>
  );
};

export default memo(CategoryImage);
