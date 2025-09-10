import React from "react";
import useGoogleAnalytics from "./UseGoogleAnalytics";

const AnalyticsWrapper = () => {
  useGoogleAnalytics();
  return null; // This component does not render anything.
};

export default AnalyticsWrapper;
