import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

export const initMixpanel = () => {
  if (!mixpanel.__loaded) {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: import.meta.env.VITE_NODE_ENV === 'development',
      track_pageview: true,
    });
  }
};

export const trackEvent = (event, props) => {
  mixpanel.track(event, props);
};