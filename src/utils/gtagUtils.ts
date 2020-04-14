export function gtagEvent(event: string, params: Gtag.EventParams) {
  window?.gtag && window.gtag('event', event, params);
}
