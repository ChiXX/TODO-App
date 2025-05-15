/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
const nextJest = require('next/jest') ;

const createJestConfig = nextJest({ dir: './' });


/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageProvider: "v8",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

};

module.exports = createJestConfig(config);
