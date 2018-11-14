import React from 'react';

export const titleMetaTags = title => {
  return [
    <meta key="og:title" property="og:title" content={title} />,
    <meta key="twitter:title" property="twitter:title" content={title} />,
  ];
};

export const descriptionMetaTags = description => [
  <meta key="description" name="description" content={description} />,
  <meta
    key="twitter:description"
    property="twitter:description"
    content={description}
  />,
  <meta key="og:description" property="og:description" content={description} />,
];

export const imageMetaTags = ({ src, width, height }, imageNum = 0) => [
  <meta key="og:image" property="og:image" content={src} />,
  <meta key="og:image:width" property="og:image:width" content={width} />,
  <meta key="og:image:height" property="og:image:height" content={height} />,
  <meta
    key={`twitter:image${imageNum}:src`}
    property={`twitter:image${imageNum}:src`}
    content={src}
  />,
];
