import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import knex  from 'knex';
const apiRouter = express.Router();

const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'smartfarm',
    supportBigNumber: true,
    timezone: '+7:00',
    dateStrings: true,
    charset: 'utf8mb4_unicode_ci',
  },
});

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/photos');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post('/api/stats', upload.single('file'), function (req, res) {
  console.log('Uploaded file:', req.file);
  console.log('Form data:', req.body);
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);

  if (!user) {
    return res.status(404).json({ code: "error", message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ code: "error", message: "Incorrect password" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  res.json({ code: "success", message: "Login successful", token });
});

// Protected route
app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Hello! You are authorized', decoded });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
});

apiRouter.get('/insert', async (req, res) => {
  try {
    console.log(req.query)
    console.log(req.query.name)
    ids = await db('member').insert({
      username: req.query.name,
      password: req.query.password,
      dep: req.query.dep

    })
    res.send({
      ok: 1,
      data: req.query,
      ids: ids[0]
    })
  } catch (e) {
    console.log(e.message)
    res.send({
      ok: 0,
      error: e.message
    })
  }
})// insert

apiRouter.get('/list', async (req, res) => {
  try {
    console.log('show user')
    let row = await db('member')
    // .where("major_id", 98)
    res.send({
      datas: row,
      status: 1,
    })
  } catch (e) {
    console.log(e.message)
    res.send({
      ok: 0,
      error: e.message
    })
  }
});//list

apiRouter.get('/delete', async (req, res) => {
  try {
    console.log('show id=', req.query)
    let row = await db('tb_member').where('id', req.query.id)
      .where('id', '=', req.query.id)
      .del()
    res.send({
      datas: row[0],
      status: 1,
    })
  } catch (e) {
    console.log(e.message)
    res.send({
      ok: 0,
      error: e.message
    })
  }
})//delete

apiRouter.post("/edit", async (req, res) => {
  try {
    console.log(req.body);
    let row = await db("tb_member").where("id", "=", req.body.id).update({
      m_user: req.body.m_user,
      m_pass: req.body.m_pass,
      m_name: req.body.m_name,
      m_phon: req.body.m_phon,
    })
    console.log("row=", row);
    res.send({
      ok: 1,
      data: row
    })
  } catch (e) {
    console.log(e.message);
    res.send({
      ok: 0,
      error: e.message,
    })
  }
})//edit


apiRouter.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    let row = await db("tb_member").where("id", "=", req.body.id).insert({
      m_user: req.body.m_user,
      m_pass: req.body.m_pass,
      m_name: req.body.m_name,
      m_phon: req.body.m_phon,
    })
    console.log("row=", row);
    res.send({
      ok: 1,
      data: row
    })
  } catch (e) {
    console.log(e.message);
    res.send({
      ok: 0,
      error: e.message,
    })
  }
})//edit

apiRouter.get('/temp', async (req, res) => {
  try {
    console.log(req.query)
    console.log(req.query.time)
    ids = await db('cover').insert({
      Date: req.query.date,
      Time: req.query.time,
      Temperature: req.query.temp,
      Humidity: req.query.hemi,
      pH_value: req.query.ph,
    })
  } catch (e) {
    console.log(e.message)
    res.send({
      ok: 0,
      error: e.message
    })
  }
})// cover

apiRouter.get('/listcover', async (req, res) => {
  try {
    console.log('show Cover')
    let row = await db('cover')
    res.send({
      datas: row,
      status: 1,
    })
  } catch (e) {
    console.log(e.message)
    res.send({
      ok: 0,
      error: e.message
    })
  }
});//list

app.use('/api', apiRouter);

app.listen(7001, () => {
  console.log('Server is running on port 7001');
});
