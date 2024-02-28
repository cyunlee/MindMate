const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ title: 'hello react!' });
});

router.get('/host', (req, res) => {
  res.send({ host: 'minsu' });
});

module.exports = router;
