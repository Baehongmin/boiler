const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser')
const {User} = require('./models/User')
const cors = require('cors');

const config = require('./config/key');

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
const { Paper } = require('./models/Paper')

mongoose.connect(config.mogoURI, {
  useNewUrlParser:true,useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
  console.log('monogodb connected...')
}).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})

app.post('/register', (req, res) => {

  const user = new User(req.body)

  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({success: true})
  })
})

app.post('/write', (req, res) => {
  const paper = new Paper(req.body)

  paper.save((err, paperInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({success: true})
  })
})

app.get('/writeList', (req, res) => {
  Paper.find((err, list) => {
    return res.json({
      list
    })
  })
})


app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

  // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch){
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."});
      }

      //비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) {
          return res.status(400).send(err);
        }

        // 토큰을 저장한다.
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})