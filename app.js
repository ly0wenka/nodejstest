const qs = require('node:querystring');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3001;
const mysql = require('mysql2');




// Serve HTML form
app.get('/test_t_angular.html', (req, res) => {
    res.sendFile(__dirname + '/test_t_angular.html');
});

// Serve HTML form
app.get('/test_t.html', (req, res) => {
    res.sendFile(__dirname + '/test_t.html');
});

// Handle form submission
app.get('/submitget', (req, res) => {
    // Handle form submission logic here
    console.log(req.query); // Access form data

    res.send(`Form submitted successfully!<br>`+req.query);
});

app.get('/test_t', (request, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
      });
      
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          return;
        }
        console.log('Connected as id ' + connection.threadId);
      });
      
      // Query example
      connection.query('SELECT * FROM test_t', (error, results, fields) => {
        if (error) throw error;
        console.log(error);
        console.log(results);
        console.log(fields);
        //res.json(results);
        if (results.length > 0) {
            // Construct HTML table
            let htmlTable = '<table border="1"><tr>';
            
            // Iterate over fields to get column headers
            fields.forEach(field => {
              htmlTable += `<th>${field.name}</th>`;
            });
            htmlTable += '</tr>';
      
            // Iterate over rows to populate table data
            results.forEach(row => {
              htmlTable += '<tr>';
              // Iterate over each field in the row
              fields.forEach(field => {
                htmlTable += `<td>${row[field.name]}</td>`;
              });
              htmlTable += '</tr>';
            });
      
            htmlTable += '</table>';
      
            // Send the HTML table as the response
            res.send(htmlTable);
          } else {
            // If no rows returned
            res.send('No data found');
          }
      });
});

app.get('/test_t_json', (request, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
      });
      
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          return;
        }
        console.log('Connected as id ' + connection.threadId);
      });
      
      // Query example
      connection.query('SELECT * FROM test_t', (error, results, fields) => {
        if (error) throw error;
        console.log(error);
        console.log(results);
        console.log(fields);
        res.json(results);        
      });
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



app.get('/ajax_info.txt', (req, res) => {
    const filePath = path.join(__dirname, 'ajax_info.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.type('text/plain');
        res.send(data);
    });
});


// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
