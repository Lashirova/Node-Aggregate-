const express = require('express')
const router = express.Router()

//Model
const AuthorModel = require('../models/Author')

router.get('/', (req, res) => {
  res.send('GET request to the Author Page')
})

router.get('/aggregate', (req, res) => {
  AuthorModel.aggregate([
    {
      $match:{isDelete:false}
    },
    /*{
      $group:{_id:"$category",totalCount:{$sum:1}}
    },*/
    {
      $project:{name:true,score:1}
    },
    {
      $sort:{score:-1}
    },
    {
      $limit:2
    },
    {
      $skip:1
    }
  ])
                .then((result)=>{res.json(result)})
                .catch((err)=>{res.json(err)})
})

router.post('/', function (req, res) {
 const newAuthor = new AuthorModel(req.body)
 newAuthor.save()
            .then((result)=>{res.json(result)})
            .catch((err)=>{res.json(err)})
})



module.exports = router