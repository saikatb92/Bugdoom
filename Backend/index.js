const express = require('express');
const bugs = require('./bugs.json');

const app = express();

// Landing response
app.get('/', (req, res) => {
    res.send("Welcome to bugbaan");
})

// Bug list response
app.get('/bugs', (req, res) => {
    if(req.query.id) {
        const selectedBug = bugs.filter(bug => bug.id == req.query.id);
        res.send(selectedBug);
    } else {
    res.send(bugs);
    }
})

app.listen(3001, () => console.log('Listening at port 3001...'));