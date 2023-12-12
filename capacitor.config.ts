import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.watsend.app',
  appName: 'Watsend',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      splashFullScreen: false,
      backgroundColor: "#398378"
    }
  }
};

export default config;
