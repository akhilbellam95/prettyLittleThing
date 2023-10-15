module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native-community|@react-native|react-native|@react-native-firebase|@react-navigation|@react-native-fast-image|redux-flipper|@rneui/base|@rneui/themed))',
  ],
  testRegex: '/__tests__/.+\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/*.tsx', '**/*.ts'],
};
