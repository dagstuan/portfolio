import React, { PureComponent } from 'react';
import Img from 'gatsby-image';

export default class CategoryImage extends PureComponent {
  constructor() {
    super();
    this.containerRef = null;

    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      containerWidth: 0,
      containerHeight: 0,
    };
  }

  setContainerRef = el => (this.containerRef = el);

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  getImageAspectRatio = () => {
    const { image } = this.props;

    const imageWidth = Math.min(
      image.image.fixed.width,
      image.image.file.details.image.width
    );
    const imageHeight = imageWidth / image.image.fixed.aspectRatio;

    return imageWidth / imageHeight;
  };

  updateDimensions = () => {
    const { containerWidth, containerHeight } = this.state;

    const newContainerWidth = this.containerRef.offsetWidth;
    const newContainerHeight = this.containerRef.offsetHeight;

    if (
      containerWidth === newContainerWidth &&
      containerHeight === newContainerHeight
    ) {
      return;
    }

    const aspectRatio = this.getImageAspectRatio();

    const style = {
      containerWidth: newContainerWidth,
      containerHeight: newContainerHeight,
    };

    if (newContainerWidth / newContainerHeight > aspectRatio) {
      style.imageHeight = newContainerHeight + 'px';
      style.imageWidth = (newContainerHeight * aspectRatio).toString() + 'px';
    } else {
      style.imageWidth = newContainerWidth + 'px';
      style.imageHeight = (newContainerWidth / aspectRatio).toString() + 'px';
    }

    this.setState(style);
  };

  render() {
    const { image, critical, onImageLoad } = this.props;

    const { imageWidth, imageHeight } = this.state;

    return (
      <li className="category-elem">
        <div
          className="category-elem__image-outer-wrapper"
          ref={this.setContainerRef}
        >
          <div
            className="category-elem__image-wrapper"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          >
            <Img
              key={critical}
              onLoad={onImageLoad}
              fixed={image.image.fixed}
              alt={image.title}
              className="category-elem__image"
              style={{ width: '100%', height: '100%' }}
              critical={critical}
            />
          </div>
        </div>
      </li>
    );
  }
}
CategoryImage.defaultProps = {
  critical: false,
};
