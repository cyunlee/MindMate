const express = require('express');
const app = express();

//app.set('view engine', 'ejs');
const cors = require('cors');
app.use(cors());
//const mysql = require('mysql2');
//const dotenv = require('dotenv');
//dotenv.config();
//const db = require('./models/Main');
const PORT = process.env.PORT || 4000;

const api = require('./routes/index');
app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});

/*db.sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });*/
