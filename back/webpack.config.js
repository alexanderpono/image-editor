const path = require('path');

module.exports = {
    plugins: [],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
        alias: {
            '@back-src': path.resolve(__dirname, './back-src')
        }
    },
    entry: {
        back: './back-src/back.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'temp/back-dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    target: 'node',
    optimization: {}
};
