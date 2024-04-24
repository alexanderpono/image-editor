// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'temp/coverage',
    testEnvironment: 'node',
    collectCoverage: false,
    reporters: ['default'],
    collectCoverageFrom: [
        'src/**/*.ts*',
        '!ui-src/**/*.types.ts',
        '!ui-src/**/*.d.ts',
        '!ui-src/**/index.ts*'
    ],
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: './temp/testResult.html'
            }
        ]
    ],
    setupFilesAfterEnv: ['<rootDir>/internals/jestSettings.js'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {},
    verbose: true,
    testPathIgnorePatterns: ['/node_modules/', 'temp'],
    transformIgnorePatterns: []
};
