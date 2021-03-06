App.info({
  id: 'com.allobarcode.app',
  name: 'alloBarcode',
  description: 'Solution pour effectuer vos études de prix en temps réel',
  author: 'alloCoupon',
  email: 'guillaume@allocoupon.com',
  website: 'https://allobarcode.com',
  version: '0.1.0'
});

App.icons({
  // iOS
  'iphone': 'resources/icons/icon-60x60.png',
  'iphone_2x': 'resources/icons/icon-120x120.png',
  'iphone_3x': 'resources/icons/icon-180x180.png',
  'ipad': 'resources/icons/icon-72x72-i.png',
  'ipad_2x': 'resources/icons/icon-152x152.png',

  // Android
  'android_ldpi': 'resources/icons/icon-36x36.png',
  'android_mdpi': 'resources/icons/icon-48x48.png',
  'android_hdpi': 'resources/icons/icon-72x72.png',
  'android_xhdpi': 'resources/icons/icon-96x96.png'
});

App.launchScreens({
  // iOS
  'iphone_2x': 'resources/splash/Default@2x.png', // 640x960
  'iphone5': 'resources/splash/Default-568h@2x.png', // 640x1136
  'iphone6': 'resources/splash/Default-667h@2x.png', // 750x1334
  'iphone6p_portrait': 'resources/splash/Default-Portrait-736h@3x.png', // 1242x2208
  'iphone6p_landscape': 'resources/splash/Default-Landscape-736h@3x.png', // 2208x1242
  'ipad_portrait': 'resources/splash/Default-Portrait.png', // 768x1024
  'ipad_portrait_2x': 'resources/splash/Default-Portrait@2x.png', // 1536x2048
  'ipad_landscape': 'resources/splash/Default-Landscape.png', // 1024x768
  'ipad_landscape_2x': 'resources/splash/Default-Landscape@2x.png', // 2048x1536

  // Android
  'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
  'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
  'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
  'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
  'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
  'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
  'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
  'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000', 'android');
App.setPreference('StatusBarBackgroundColor', '#ffffff', 'ios');
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

App.accessRule('http://*.openfoodfacts.org/*');
App.accessRule('http://*.meteor.com/*');

// upload bug
App.accessRule("blob:*");
