class Config {
    static get apiBaseUrl() {
      return process.env.NEXT_PUBLIC_API_BASE_URL || "https://default-api-url.com";
    }
  
    static get cdnUrl() {
      return process.env.NEXT_PUBLIC_CDN_URL || "https://default-cdn-url.com";
    }
  
    static get stripeApiKey() {
      if (!process.env.NEXT_PUBLIC_STRIPE_API_KEY) {
        console.warn("Stripe API Key is not defined in the environment variables.");
      }
      return process.env.NEXT_PUBLIC_STRIPE_API_KEY || "";
    }
  
    static get googleAnalyticsId() {
      if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
        console.warn("Google Analytics ID is not defined in the environment variables.");
      }
      return process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
    }
  }
  
export default Config;
  