const nextConfig = {
  reactStrictMode: true,
  // Keep your existing images configuration
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
    ],
  },
  // Add these new settings to prevent build issues
  experimental: {
    workerThreads: false,
    cpus: 1
  },
};

module.exports = nextConfig;