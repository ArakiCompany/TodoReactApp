import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // ← desativa em dev
});

const nextConfig = {
 experimental: {
    turbo: undefined,
  },
    serverExternalPackages: ["jspdf"]
};

export default pwaConfig(nextConfig);