import * as React from 'react';
import { createPortal } from 'react-dom';
import { Image } from '../types/Image';
import * as nprogress from 'nprogress';
import * as classNames from 'classnames';
import useWindowSize from '../hooks/useWindowSize';
import { RefObject, useEffect, useCallback, memo } from 'react';

import * as classes from './category.module.less';
import useEventListener from '../hooks/useEventListener';
import { ZoomState, ZoomAction } from './CategoryImage';

type ImageZoomProps = {
  state: ZoomState;
  dispatch: React.Dispatch<ZoomAction>;
  image: Image;
  parentRef: RefObject<HTMLElement>;
  transitionDuration?: number;
};

const getScale = ({
  originalWidth,
  originalHeight,
  windowWidth,
  windowHeight,
}: Record<string, number>): number => {
  const scaleX = windowWidth / originalWidth;
  const scaleY = windowHeight / originalHeight;
  const scale = Math.min(scaleX, scaleY);

  return scale;
};

const getImageStyle = (
  state: ZoomState,
  windowWidth: number,
  windowHeight: number,
  originalWidth: number,
  originalHeight: number,
  originalTop: number,
  originalLeft: number,
  transitionDuration: number
): React.CSSProperties => {
  let returnStyles = {
    width: originalWidth,
    height: originalHeight,
    left: originalLeft,
    top: originalTop,
    transitionDuration: `${transitionDuration}ms`,
  };

  if (state.state !== 'open') {
    const initTransform = [`scale(1)`, `translate(0, 0)`].join(' ');

    return {
      ...returnStyles,
      transform: initTransform,
    };
  }

  const scale = getScale({
    originalWidth,
    originalHeight,
    windowWidth,
    windowHeight,
  });

  // Get the the coords for center of the viewport
  const viewportX = windowWidth / 2;
  const viewportY = windowHeight / 2;

  // Get the coords for center of the parent item
  const childCenterX = originalLeft + originalWidth / 2;
  const childCenterY = originalTop + originalHeight / 2;

  // Get offset amounts for item coords to be centered on screen
  const translateX = (viewportX - childCenterX) / scale;
  const translateY = (viewportY - childCenterY) / scale;

  const transform = [
    `scale(${scale})`,
    `translate(${translateX}px, ${translateY}px)`,
  ].join(' ');

  return {
    ...returnStyles,
    transform,
  };
};

function ImageZoom(props: ImageZoomProps) {
  const { state, dispatch, image, parentRef, transitionDuration = 250 } = props;

  const [, forceUpdate] = React.useState(0);

  const { width: windowWidth = 0, height: windowHeight = 0 } = useWindowSize();

  // get parent element's dimensions
  const {
    height: originalHeight,
    left: originalLeft,
    top: originalTop,
    width: originalWidth,
  } = parentRef.current?.getBoundingClientRect() ?? {
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  };

  const setVisible = useCallback(() => {
    dispatch({ type: 'setVisible' });
  }, []);

  const handleCloseClick = useCallback(() => {
    dispatch({ type: 'startClosing' });
  }, []);

  useEffect(() => {
    switch (state.state) {
      case 'opening': {
        if (!nprogress.isStarted()) {
          nprogress.start();
        }

        if (state.visible) {
          setTimeout(() => {
            dispatch({ type: 'setOpen' });
          }, transitionDuration);
        }

        break;
      }
      case 'open': {
        if (nprogress.isStarted()) {
          nprogress.done();
        }

        break;
      }
      case 'closing': {
        setTimeout(() => {
          dispatch({ type: 'setClosed' });
        }, transitionDuration);
        break;
      }
    }
  }, [state, transitionDuration]);

  const handleScroll = useCallback(() => {
    if (state.visible) {
      // need to recalculate top style while scrolling on closing
      forceUpdate((n) => n + 1);
    }

    if (state.state === 'open') {
      dispatch({ type: 'startClosing' });
    }
  }, [state]);

  useEventListener('scroll', handleScroll);

  if (state.state === 'closed') {
    return null;
  }

  const imageStyle = getImageStyle(
    state,
    windowWidth,
    windowHeight,
    originalWidth,
    originalHeight,
    originalTop,
    originalLeft,
    transitionDuration
  );

  return createPortal(
    <div
      aria-modal="true"
      className={classNames(classes.imageZoomWrapper, {
        [classes.imageZoomWrapperOpen]: state.state === 'open',
      })}
    >
      <img
        className={classes.imageZoom}
        src={image.image.fluid.src}
        alt={image.title}
        style={imageStyle}
        loading="eager"
        onLoad={setVisible}
      />

      <button
        className={classNames(classes.imageButton, classes.imageButtonClose)}
        onClick={handleCloseClick}
      />
    </div>,
    document.body
  );
}

export default memo(ImageZoom);
