export function gtagEvent(event: string) {
  window?.gtag && window.gtag('event', event);
}
