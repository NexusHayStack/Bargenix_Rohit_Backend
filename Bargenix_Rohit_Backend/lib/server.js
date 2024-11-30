const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const config = require('./config');

const server = {
    routes: {
        '/generate-coupon': handlers.generateCoupon,
        '/validate-coupon': handlers.validateCoupon,
        '/log-request': handlers.logRequest,
    },

    init: () => {
        const httpServer = http.createServer((req, res) => {
            const parsedUrl = url.parse(req.url, true);
            const chosenHandler = server.routes[parsedUrl.pathname] || (() => res(404, { error: 'Not Found' }));

            let body = '';
            req.on('data', chunk => (body += chunk));
            req.on('end', () => {
                const parsedBody = body ? JSON.parse(body) : {};
                chosenHandler(
                    { body: parsedBody },
                    (statusCode, payload) => {
                        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(payload));
                    }
                );
            });
        });

        httpServer.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    },
};

module.exports = server;
