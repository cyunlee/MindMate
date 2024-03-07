const axios = require('axios');
const { db, Sequelize } = require('../models/Main');
const Main = require('../models/Main');

exports.test_db = async (req, res) => {
  let id = req.body[0];
  let username = req.body[1];

  console.log(req.body);

  console.log('id ', id, 'username ', username);

  try {
    console.log('Test database connection');
    const result = await db.User.findAll({
      where: {
        id: id,
        username: username,
      },
    });

    // 결과를 클라이언트에게 반환
    res.json(result);
  } catch (err) {
    console.error('Error fetching enemy deck data:', err);
    res.status(500).send('Internal Server Error');
  }
};
