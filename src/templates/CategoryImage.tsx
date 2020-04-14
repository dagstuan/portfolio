import * as React from 'react';
import {
  useRef,
  RefObject,
  useEffect,
  useCallback,
  memo,
  useState,
  useReducer,
} from 'react';
import Img from 'gatsby-image';
import * as classNames from 'classnames';
import useImageSize from '../hooks/useImageSize';
import { Image } from '../types/Image';
import useOnScreen from '../hooks/useOnScreen';
import usePrevious from '../hooks/usePrevious';

import * as classes from './category.module.less';
import ImageZoom from './ImageZoom';
import useKeyPress from '../hooks/useKeyPress';
import { gtagEvent } from '../utils/gtagUtils';

type CategoryImageProps = {
  imageRef: RefObject<any>;
  image: Image;
  index: number;
  critical: boolean;
  onImageLoad: (index: number) => void;
  onImageVisible: (index: number) => void;
};

export type ZoomAction = {
  type:
    | 'startOpening'
    | 'setVisible'
    | 'setOpen'
    | 'startClosing'
    | 'setClosed';
};

type ZoomStatus = 'opening' | 'open' | 'closing' | 'closed';

export type ZoomState = {
  state: ZoomStatus;
  visible: boolean;
};

const categoryImageReducer = (
  state: ZoomState,
  action: ZoomAction
): ZoomState => {
  switch (action.type) {
    case 'startOpening': {
      return { state: 'opening', visible: false };
    }
    case 'setVisible': {
      return { ...state, visible: true };
    }
    case 'setOpen': {
      return { state: 'open', visible: true };
    }
    case 'startClosing': {
      return { state: 'closing', visible: true };
    }
    case 'setClosed': {
      return { state: 'closed', visible: false };
    }
    default:
      return state;
  }
};

const CategoryImage = (props: CategoryImageProps) => {
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
  const containerRef = useRef<HTMLDivElement>(null);

  const visible = useOnScreen(containerRef);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const [zoomState, dispatch] = useReducer(categoryImageReducer, {
    state: 'closed',
    visible: false,
  });
  const { state: zoomStatus, visible: zoomVisible } = zoomState;

  useEffect(() => {
    if (visible) {
      onImageVisible(index);
    }
  }, [visible, onImageVisible]);

  const onImageLoadCallback = useCallback(() => {
    setIsLoaded(true);
    onImageLoad(index);
  }, [onImageLoad, index]);

  const openZoom = useCallback(() => {
    gtagEvent('openZoom', {
      event_category: 'zoom',
      event_label: 'open',
    });
    dispatch({ type: 'startOpening' });
  }, []);

  const closeZoom = useCallback(() => {
    gtagEvent('closeZoom', {
      event_category: 'zoom',
      event_label: 'close',
    });
    dispatch({ type: 'startClosing' });
  }, []);

  const spaceKeyPressed = useKeyPress({ key: ' ' });

  useEffect(() => {
    if (spaceKeyPressed) {
      if (visible && zoomStatus === 'closed') {
        openZoom();
      } else if (zoomStatus === 'open') {
        closeZoom();
      }
    }
  }, [spaceKeyPressed, zoomState, visible]);

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
          className={classNames(classes.categoryElem__imageWrapper, {
            [classes.categoryElem__imageWrapperZoomOpen]: zoomVisible,
          })}
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
          ref={imageWrapperRef}
        >
          <Img
            onLoad={onImageLoadCallback}
            fluid={image.image.fluid}
            alt={image.title}
            style={{ width: '100%', height: '100%' }}
            loading={shouldBeCritical ? 'eager' : 'lazy'}
          />

          {isLoaded && (
            <button
              className={classes.imageZoomButton}
              aria-label="Open zoom"
              onClick={openZoom}
              type="button"
            />
          )}
        </div>

        {isLoaded && (
          <ImageZoom
            state={zoomState}
            dispatch={dispatch}
            image={image}
            parentRef={imageWrapperRef}
          />
        )}
      </div>
    </li>
  );
};

export default memo(CategoryImage);
