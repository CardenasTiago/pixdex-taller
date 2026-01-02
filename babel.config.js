module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // Este plugin DEBE ir siempre al final de la lista
        'react-native-reanimated/plugin',
      ],
    };
  };