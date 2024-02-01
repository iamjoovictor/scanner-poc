const PROXY_CONFIG = [
    {
        context: ['/production'],
        // target: 'http://0.0.0.0:3000/',
        secure: false,
        pathRewrite: { '^/production': ''}
    },
    {
        context: ['/mock_local'],
        // target: 'http://0.0.0.0:3000/',
        secure: false,
        pathRewrite: { '^/mock_local': ''}
    },
    {
        context: ['/local'],
        target: 'http://192.168.100.88:4200/',
        secure: false,
        pathRewrite: { '^/local': ''}
    }
]

module.exports = PROXY_CONFIG
