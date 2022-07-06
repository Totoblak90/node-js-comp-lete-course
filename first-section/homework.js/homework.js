const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const users = [];
    if (url === '/') {
        return homePage(res)
    }
    if (url === '/create-user' && method === 'POST') {
        return createUser(req, res, users)
    }
    if (url === '/users') {
        console.log(users)
        return userList(res, users);
    }
});

const homePage = (res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
            <head>
                <title>Listing users</title>
            </head>
            <body>
                <h1>Please type your name!</h1>
                <form action="/create-user" method="POST">
                    <input type="text" name="username" required />
                    <button type="submit">Save</button>
                </form>
            </body>
        </html>`);
    return res.end()
}

const userList = (res, users) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <html>
        <head>
            <title>User list</title>
        </head>
        <body>
            <h1>User list</h1>
            <ul>
            <li>Tobias</li>
            ${users.map(user => {
                return `<li>${user}</li>`
            })}
            </ul>
        </body>
    </html>`);
    return res.end()
}

const createUser = (req, res, users) => {
    const body = [];
    req.on('data', (chunk) => body.push(chunk));
    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const username = parsedBody.split("=")[1];
        console.log(username)
        users.push(username);
        res.statusCode = 302;
        res.setHeader('Location', '/users')
        return res.end();
    })
}

server.listen(3000);