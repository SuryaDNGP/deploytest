module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      '@babel/plugin-proposal-export-namespace-from',
      "expo-router/babel",
      "react-native-reanimated/plugin"
    ]
  };
};
