import { FluidObject } from 'gatsby-image';

export interface ContentFulImageFileDetails {
  image: {
    width: number;
    height: number;
  };
}

export interface ContentfulImageFile {
  details: ContentFulImageFileDetails;
}

export interface ContentfulImageResize {
  src: string;
  width: string;
  height: string;
}

export interface ContentfulImage {
  fluid: FluidObject;
  file: ContentfulImageFile;
  resize: ContentfulImageResize;
}

export interface Image {
  id: string;
  title: string;
  image: ContentfulImage;
}
