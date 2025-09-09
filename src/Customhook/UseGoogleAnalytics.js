import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_TRACKING_ID = "G-E5N9P7ZWQ8";

function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Load script only once
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID);

  }, []);

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

export default useGoogleAnalytics;
