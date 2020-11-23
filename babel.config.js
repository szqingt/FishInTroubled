module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@components': './src/components',
          '@config': './src/config',
          '@pages': './src/pages',
          '@store': './src/store',
          '@services': './src/services',
        },
      },
    ],
  ],
};
