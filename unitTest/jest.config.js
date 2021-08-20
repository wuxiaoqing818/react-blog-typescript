// jest.config.js
//获取自定义 指定检查所有需要测试的文件  不配置是默认
module.exports = {
    testURL: 'http://localhost/',
    setupFiles: [],
    moduleFileExtensions: ['js', 'jsx'],
    testPathIgnorePatterns: ['/node_modules/'],
    testRegex: '.*\\.test\\.js$',
    collectCoverage: true,
    collectCoverageFrom: [],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/mocks/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/mocks/styleMock.js'
    }
};

