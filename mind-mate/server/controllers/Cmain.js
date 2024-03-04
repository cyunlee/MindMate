const axios = require('axios');
const db = require('../models/Main');
const Main = require('../models/Main');

exports.test_db = async (req, res) => {
  const { id, number } = req.query;

  console.log('chapter ', id, 'ep ', number);

  try {
    console.log('EnemyDeck find all');
    const result = await db.TestDB.findAll({
      where: {
        id: id,
        number: number,
      },
    });

    // 결과를 클라이언트에게 반환
    res.json(result);
  } catch (err) {
    console.error('Error fetching enemy deck data:', err);
    res.status(500).send('Internal Server Error');
  }
};
