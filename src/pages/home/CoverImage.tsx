import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Img from 'gatsby-image';

import * as classes from './index.module.less';

type CoverImageProps = {
  visible: boolean;
  title: string;
  index: number;
  fluid: FluidObject;
  loading: `auto` | `lazy` | `eager`;
  onLoad: (index: number) => void;
};

function CoverImage(props: CoverImageProps) {
  const { index, visible, loading, title, fluid, onLoad } = props;

  const [isLoaded, setIsLoaded] = React.useState(false);
  const onImageLoad = React.useCallback(() => {
    setIsLoaded(true);
    onLoad(index);
  }, [index]);

  return (
    <Img
      alt={title}
      fluid={fluid}
      className={classes.coverImage}
      style={{
        display: loading === 'eager' || isLoaded ? 'block' : 'none',
        width: '100%',
        margin: '12vh auto',
        position: 'absolute',
        top: 0,
        bottom: 0,
        opacity: visible ? 1 : 0,
      }}
      onLoad={onImageLoad}
    />
  );
}

export default CoverImage;
