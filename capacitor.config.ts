import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'com.example.app',
//   appName: 'ecommerce',
//   webDir: 'www',
//   server: {
//     androidScheme: 'https',
//   },
// };
const config: CapacitorConfig = {
  appId: 'com.anandamela.app',
  appName: 'Anandamela',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: 'http://anandamelaretail.com',
    cleartext: true,
  },
};

export default config;
// server: {
//   url: 'http://122.161.194.183/anandamela',
//   cleartext: true,
// },
