import React from 'react';

export const titleMetaTags = title => {
  return [
    <meta key="og:title" property="og:title" value={title} />,
    <meta key="twitter:title" property="twitter:title" value={title} />,
  ];
};

export const descriptionMetaTags = description => [
  <meta key="description" name="description" value={description} />,
  <meta
    key="twitter:description"
    property="twitter:description"
    value={description}
  />,
  <meta key="og:description" property="og:description" value={description} />,
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
