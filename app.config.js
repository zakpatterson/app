module.exports = {
  name: 'sportflyer-app',
  slug: 'sportflyer-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'me.petja.sportflyer',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    bundler: 'metro',
    favicon: './assets/images/favicon.png',
  },
  extra: {
    apiUrl: process.env.API_URL,
    eas: {
      projectId: '3090785f-6280-4276-8bab-79affc49061c',
    },
  },
};
