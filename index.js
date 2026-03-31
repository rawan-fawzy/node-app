const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! This is my Node app running on Kubernetes');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});