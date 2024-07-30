module.exports = {
  // root: true,
  // extends: '@react-native',
  parser: '@babel/eslint-parser', // Babel ESLint 파서 사용
  rules: {
    quotes: ['error', 'single'],
    // 다른 규칙들...
  },
  settings: {
    react: {
      version: 'detect', // React 버전을 자동으로 감지하여 사용
    },
  },
  parserOptions: {
    ecmaVersion: 2021, // 또는 최신 ES 버전 숫자
    sourceType: 'module', // ES6 모듈을 사용하기 위해 설정
    requireConfigFile: false, // Babel 설정 파일이 없어도 되도록 설정
    // babelOptions: {
    //   presets: ['@babel/preset-env', '@babel/preset-react'], // 필요한 경우 프리셋 추가
    // },
  },
}
