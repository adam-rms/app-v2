import { ExpoConfig } from "expo/config";

export default (): ExpoConfig => ({
  scheme: "com.bstudios.adamrms",
  name: "AdamRMS",
  slug: "adam-rms-app-v2",
  version: "2.0.6",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/1fd2c987-e1de-4169-afb7-9c6648dc8277",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSCameraUsageDescription:
        "Allow AdamRMS to use your camera to scan barcodes.",
      NSMicrophoneUsageDescription: "Allow AdamRMS to access your microphone",
    },
    bundleIdentifier: "com.bstudios.adamrms",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    permissions: ["android.permission.CAMERA"],
    package: "com.bstudios.adamrms",
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId: "1fd2c987-e1de-4169-afb7-9c6648dc8277",
    },
  },
  owner: "bithellstudios",
  plugins: [
    [
      "expo-barcode-scanner",
      {
        cameraPermission: "Allow AdamRMS to use your camera to scan barcodes.",
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    "sentry-expo",
  ],
  runtimeVersion: {
    policy: "sdkVersion",
  },
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
      },
    ],
  },
});
