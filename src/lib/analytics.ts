// Google Analytics 4 utility functions
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
    clarity: (...args: unknown[]) => void;
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID', {
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', 'engagement', formName, success ? 1 : 0);
  
  // Also track with Clarity
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', `form_${formName}_${success ? 'success' : 'error'}`);
  }
};

// Track portfolio clicks
export const trackPortfolioClick = (projectTitle: string, category: string) => {
  trackEvent('portfolio_click', 'engagement', `${category}_${projectTitle}`);
};

// Track contact attempts
export const trackContactAttempt = (method: 'email' | 'phone' | 'form') => {
  trackEvent('contact_attempt', 'engagement', method);
};

// Track service inquiries
export const trackServiceInquiry = (serviceType: string) => {
  trackEvent('service_inquiry', 'business', serviceType);
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    trackEvent('scroll_depth', 'engagement', `${percentage}%`);
  }
};

// Track time on page
export const trackTimeOnPage = (timeInSeconds: number) => {
  if (timeInSeconds > 30) { // Only track if user spent more than 30 seconds
    trackEvent('time_on_page', 'engagement', 'long_visit', timeInSeconds);
  }
};

// Initialize scroll tracking
export const initializeScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const trackingPoints = [25, 50, 75, 100];
  const trackedPoints = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      trackingPoints.forEach(point => {
        if (scrollPercent >= point && !trackedPoints.has(point)) {
          trackedPoints.add(point);
          trackScrollDepth(point);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Initialize time tracking
export const initializeTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeSpent);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Initialize all tracking
export const initializeAnalytics = () => {
  const cleanupScroll = initializeScrollTracking();
  const cleanupTime = initializeTimeTracking();
  
  return () => {
    cleanupScroll?.();
    cleanupTime?.();
  };
};

// Utility to check if analytics are enabled
export const isAnalyticsEnabled = () => {
    return process.env.NODE_ENV === 'production' &&
    (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
}; 