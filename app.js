const qs = require('node:querystring');
const express = require('express');
const app = express();
const port = 3000;

// Serve HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.get('/submitget', (req, res) => {
    // Handle form submission logic here
    console.log(req.query); // Access form data

    res.send(`Form submitted successfully!<br>`+req.query);
});

// Handle form submission
app.post('/submitpost', (request, res) => {
    let body = [];
    let post = null;
    request.on('data', chunk => {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        post = qs.parse(body);
        console.log(post);
        console.log(post.name);
        res.send(`Hello for user-name!<br>`+post.name);
    });
    
});

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
