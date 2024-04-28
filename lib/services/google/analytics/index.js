export const pageview = (url) => {
  if (window && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      cookie_domain: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_COOKIE_DOMAIN,
      cookie_flags: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_COOKIE_FLAGS,
      page_path: url,
    });
  }
};

export const event = (action, label, category) => {
  if (window && window.gtag) {
    window.gtag("event", action, {
      event_label: label,
      event_category: category,
    });
  }
};
