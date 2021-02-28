const express = require('express')
const router = express.Router()

//Model
const BookModel = require('../models/Book')

router.get('/', (req, res) => {
  res.send('GET request to the Book Page')
})

router.get('/aggregate-lookup', (req, res) => {
    BookModel.aggregate([
      {
        $match:{_id:mongoose.Types.ObjectId("603aa469397ee31480562293")},
        $lookup:{
          from:"authors",//AuthorModel.collection.name
          localField:"authorId",
          foreignField:"_id",
          as:"author"
        }
      },
      {
        $project:{title:1,authorName:"author.name"}
      }
    ])
                  .then((data)=>{res.json(data)})
                  .catch((err)=>{res.json(err)})

})


router.post('/', function (req, res) {
 const newBook = new BookModel(req.body)
 newBook.save()
            .then((result)=>{res.json(result)})
            .catch((err)=>{res.json(err)})
})

module.exports = router