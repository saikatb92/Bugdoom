const { response } = require('express');
const express = require('express');
const bugs = require('./bugs.json');

const app = express();
app.use(express.json());

// Landing response
app.get('/', (req, res) => {
    res.send("Welcome to BugDoom");
})

// Bug list GET response
app.get('/bugs', (req, res) => {
    if(req.query.id) {
        const selectedBug = bugs.filter(bug => bug.id == req.query.id);
        if(selectedBug.length === 0) {
            res.status(404).send('No such bug id found');
        }
        res.send(selectedBug);
    } else {
    res.send(bugs);
    }
})

// Bug list POST request
app.post('/bugs', (req, res) => {
  const bug = {
      id: bugs.length + 1,
      ...req.body,
  }

  bugs.push(bug);
  res.status(200).send(bugs);
})

// Bug list PUT request
app.put('/bugs', (req, res) => {
  let modifingBug = bugs.findIndex((bug) => bug.id === req.body.id);
  if(modifingBug === -1) {
      res.status(404).send("No such bug found");
  }

  bugs[modifingBug] = {
      ...bugs[modifingBug],
      ...req.body,
  }

     res.status(200).send(bugs[modifingBug]);
})
app.listen(3001, () => console.log('Listening at port 3001...'));