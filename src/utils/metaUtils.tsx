import * as React from 'react';

export const titleMetaTags = (title: string) => {
  return [
    <meta key="og:title" property="og:title" content={title} />,
    <meta key="twitter:title" property="twitter:title" content={title} />,
  ];
};

export const descriptionMetaTags = (description: string) => [
  <meta key="description" name="description" content={description} />,
  <meta
    key="twitter:description"
    property="twitter:description"
    content={description}
  />,
  <meta key="og:description" property="og:description" content={description} />,
];

export const imageMetaTags = (
  {
    src,
    width,
    height,
  }: { src: string; width: string | number; height: string | number },
  title: string
) => {
  const fixedSrc = `https:${src}`;

  return [
    <meta key="og:image:alt" property="og:image:alt" content={title} />,
    <meta key="og:image" property="og:image" content={fixedSrc} />,
    <meta
      key="og:image:width"
      property="og:image:width"
      content={width.toString()}
    />,
    <meta
      key="og:image:height"
      property="og:image:height"
      content={height.toString()}
    />,
    <meta
      key={`twitter:image`}
      property={`twitter:image`}
      content={fixedSrc}
    />,
  ];
};
