import * as React from 'react';
import {
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

import * as classes from './category.module.less';

interface ICategoryImageProps {
  imageRef: RefObject<any>;
  image: Image;
  index: number;
  critical: boolean;
  onImageLoad: (id: string) => void;
  onImageVisible: (index: number) => void;
}

const CategoryImage: FC<ICategoryImageProps> = (props) => {
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
    <li ref={imageRef} className={classes.categoryElem}>
      <div
        className={classes.categoryElem__imageOuterWrapper}
        ref={containerRef}
      >
        <div
          className={classes.categoryElem__imageWrapper}
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
            style={{ width: '100%', height: '100%' }}
            loading={shouldBeCritical ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    </li>
  );
};

export default memo(CategoryImage);
