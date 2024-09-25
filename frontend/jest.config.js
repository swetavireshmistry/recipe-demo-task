const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "/node_modules/(?!(swiper)/)", 
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust if your source directory is different
  },
};

module.exports = createJestConfig(customJestConfig);

// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'jsdom',
//     transform: {
//       '^.+\\.tsx?$': 'ts-jest',
//     },
//     moduleNameMapper: {
//       // Mock any non-JS files (like CSS or images)
//       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//       '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
//     },
//     transformIgnorePatterns: [
//       "/node_modules/(?!swiper)", // Add swiper to the list of modules to be transformed
//     ],
//   };
  