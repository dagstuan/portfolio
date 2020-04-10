export const onRouteUpdate = ({ location }) => {
  const ogUrlDomElem = document.querySelector(`meta[property='og:url']`);
  var ogUrlContent = ogUrlDomElem.getAttribute(`content`);
  var ogUrlBaseProtocol = ogUrlDomElem.getAttribute(`data-baseProtocol`);
  var ogUrlBaseHost = ogUrlDomElem.getAttribute(`data-baseHost`);
  if (ogUrlContent && ogUrlBaseProtocol && ogUrlBaseHost) {
    ogUrlDomElem.setAttribute(
      `content`,
      `${ogUrlBaseProtocol}//${ogUrlBaseHost}${location.pathname}${location.search}${location.hash}`
    );
  }

  const twitterSiteDomElement = document.querySelector(
    `meta[property='twitter:site']`
  );
  var twitterSiteContent = twitterSiteDomElement.getAttribute(`content`);
  var twitterBaseProtocol = twitterSiteDomElement.getAttribute(
    `data-baseProtocol`
  );
  var twitterBaseHost = twitterSiteDomElement.getAttribute(`data-baseHost`);
  if (twitterSiteContent && twitterBaseProtocol && twitterBaseHost) {
    twitterSiteDomElement.setAttribute(
      `content`,
      `${twitterBaseProtocol}//${twitterBaseHost}${location.pathname}${location.search}${location.hash}`
    );
  }
};
