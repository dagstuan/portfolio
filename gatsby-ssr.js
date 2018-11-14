import React from 'react';
import url from 'url';

const siteUrl = 'https://dagstuan.com';

export const onRenderBody = ({ setHeadComponents, pathname = `/` }) => {
  const parsedUrl = url.parse(siteUrl);
  const myUrl = `${siteUrl}${pathname}`;
  setHeadComponents([
    <meta
      property="og:url"
      key={`og:url:${myUrl}`}
      content={myUrl}
      data-baseprotocol={parsedUrl.protocol}
      data-basehost={parsedUrl.host}
    />,
    <meta
      property="twitter:site"
      key={`twitter:site:${myUrl}`}
      content={myUrl}
      data-baseprotocol={parsedUrl.protocol}
      data-basehost={parsedUrl.host}
    />,
  ]);
};
