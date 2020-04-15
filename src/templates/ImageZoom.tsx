import * as React from 'react';
import { createPortal } from 'react-dom';
import { Image } from '../types/Image';
import * as nprogress from 'nprogress';
import * as classNames from 'classnames';
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
  parentRef: React.RefObject<HTMLElement>,
  transitionDuration: number
): React.CSSProperties => {
  const windowWidth = document?.documentElement?.clientWidth ?? 0;
  const windowHeight = document?.documentElement?.clientHeight ?? 0;

  const {
    height: originalHeight,
    left: originalLeft,
    top: originalTop,
    width: originalWidth,
  } = parentRef.current?.getBoundingClientRect() ?? {
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  };

  const scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const scrollLeft =
    window.pageXOffset ||
    document.documentElement.scrollLeft ||
    document.body.scrollLeft ||
    0;

  const returnStyles = {
    width: originalWidth,
    height: originalHeight,
    left: originalLeft + scrollLeft,
    top: originalTop + scrollTop,
    transitionDuration: `${transitionDuration}ms`,
  };

  if (state.state !== 'open') {
    return returnStyles;
  }

  const scale = getScale({
    originalWidth,
    originalHeight,
    windowWidth,
    windowHeight,
  });

  const translateX =
    (-originalLeft + (windowWidth - originalWidth) / 2) / scale;

  const translateY =
    (-originalTop + (windowHeight - originalHeight) / 2) / scale;

  const transform = [
    `scale(${scale})`,
    `translate3d(${translateX}px, ${translateY}px, 0)`,
  ].join(' ');

  return {
    ...returnStyles,
    transform,
  };
};

function ImageZoom(props: ImageZoomProps) {
  const { state, dispatch, image, parentRef, transitionDuration = 250 } = props;

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

  const closeIfOpen = useCallback(() => {
    if (state.state === 'open') {
      dispatch({ type: 'startClosing' });
    }
  }, [state.state]);

  useEventListener('scroll', closeIfOpen);
  useEventListener('resize', closeIfOpen);

  if (state.state === 'closed') {
    return null;
  }

  const imageStyle = getImageStyle(state, parentRef, transitionDuration);

  return createPortal(
    <>
      <div
        className={classNames(classes.imageZoomBackground, {
          [classes.imageZoomBackgroundOpen]: state.state === 'open',
        })}
      ></div>
      <img
        className={classNames(classes.imageZoom, {
          [classes.imageZoomVisible]: state.visible,
        })}
        src={image.image.fluid.src}
        alt={image.title}
        style={imageStyle}
        loading="eager"
        onLoad={setVisible}
      />
      <button
        className={classNames(
          classes.imageZoomButton,
          classes.imageZoomButtonClose
        )}
        onClick={handleCloseClick}
      />
    </>,
    document.body
  );
}

export default memo(ImageZoom);
