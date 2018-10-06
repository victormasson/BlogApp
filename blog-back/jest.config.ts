export const transform = {
  '^.+\\.tsx?$': 'ts-jest'
};
export const moduleFileExtensions = [
  'js',
  'ts'
];
export const testMatch = [
  '**/test/**/*.test.(ts|js)'
];
export const testEnvironment = 'node';