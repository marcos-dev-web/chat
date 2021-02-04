import express from 'express';
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


const users = [
  {
    name: 'marcos',
  },
  {
    name: 'maria',
  },
  {
    name: 'jose',
  },
]

router.post('/login', (req, res) => {
  let body = req.body
  res.send(body)
})

router.post('/getcontacts', (req, res) => {
  let contacts = [
    {
      name: 'joao',
      lastMessage: 'oi!',
      hour: '12:45'
    },
    {
      name: 'maria',
      lastMessage: '',
      hour: '12:00'
    },
    {
      name: 'pedro',
      lastMessage: 'ola jose marcos',
      hour: '11:01'
    }
  ]
  res.send({contacts: contacts});
})

router.post('/users', (req, res) => {
  res.setHeader('Access-Control-Origin', "http://localhost:5500/*")
  res.send(users)
})

export default router;