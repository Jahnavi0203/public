const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001; // You can change the port if needed

// Serve the script.js file


// Serve CSS files with the appropriate MIME type
app.get('/ITC505/lab-7/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505', 'lab-7', 'style.css'));
});
// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use('/ITC505/lab-7',express.static(path.join(__dirname, 'public')));
app.get('/ITC505/lab-7/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'ITC505','lab-7', 'index.html'));
});


app.post('/generate', (req, res) => {
    const { adjective1, noun1, verb1, adverb, adjective2 } = req.body;

    // Check if all fields are filled
    if (!adjective1 || !noun1 || !verb1 || !adverb || !adjective2) {
        return res.status(400).send(`
            <h1>Error</h1>
            <p>Please fill out all fields.</p>
            <a href="/">Go Back</a>
        `);
    }

    // Generate the story
    const story = `
        <div class="container">
            <h2>Your Space Adventure Story</h2>
            <div id="story">
                In a ${adjective1} galaxy far, far away, a brave ${noun1} decided to ${verb1} 
                across the universe. As they ${adverb} navigated through asteroid fields and 
                nebulas, they encountered a ${adjective2} alien civilization. This unexpected 
                meeting led to an interstellar adventure beyond their wildest dreams!
            </div>
            <a href="/ITC505/lab-7/index.html">Create Another Story</a>
        </div>
    `;

    // Send the generated story
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Space Adventure Story</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            ${story}
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
