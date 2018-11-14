import React from 'react';
import url from 'url';

const siteUrl = 'https://dagstuan.com';

export const onRenderBody = ({ setHeadComponents, pathname = `/` }) => {
  const parsedUrl = url.parse(siteUrl);

  if (pathname && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  debugger;
  const myUrl = `${siteUrl}${pathname}`;

  setHeadComponents([
    <link
      rel="canonical"
      key={myUrl}
      href={myUrl}
      data-baseprotocol={parsedUrl.protocol}
      data-basehost={parsedUrl.host}
    />,
  ]);
};
