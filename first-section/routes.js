const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
            <html>
                <head>
                    <title>First course module</title>
                </head>
                <body>
                    <h1>Send us a message!</h1>
                    <form action="/message" method="POST">
                        <input type="text" name="message" required />
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>`);
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            // fs.writeFileSync('user-message.txt', message); // More performant: use WriteFile Always!
            fs.writeFile('user-message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/')
                return res.end();
            })
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>First course module</title></head><body><h1>Hello from NodeJs</h1></body></html>');
    res.end()
}

module.exports = {
    requestHandler
};