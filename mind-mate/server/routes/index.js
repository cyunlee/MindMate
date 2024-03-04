const express = require('express');
const router = express.Router();
const controller = require('../controllers/Cmain');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send({ title: 'hello react!' });
});

router.get('/host', (req, res) => {
  res.send({ host: 'minsu' });
});

router.get('/test', controller.test_db);

module.exports = router;
