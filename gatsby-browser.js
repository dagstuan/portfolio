export const onRouteUpdate = ({ location }) => {
  const domElem = document.querySelector(`meta[property='og:url']`);
  var existingContent = domElem.getAttribute(`content`);
  var baseProtocol = domElem.getAttribute(`data-baseProtocol`);
  var baseHost = domElem.getAttribute(`data-baseHost`);
  if (existingContent && baseProtocol && baseHost) {
    domElem.setAttribute(
      `content`,
      `${baseProtocol}//${baseHost}${location.pathname}${location.search}${
        location.hash
      }`
    );
  }
};
