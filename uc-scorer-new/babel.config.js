// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Path alias: import x from "@/foo" -> ./src/foo
      ['module-resolver', {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: { '@': './src' },
      }],

      // MUST be last for react-native-reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
