const OBA = require('node-oba-api-wrapper');
const fs = require('fs')
require('dotenv').config()

const client = new OBA ({
 public: process.env.PUBLIC_KEY,
 secret: process.env.SECRET_KEY
});

client.get('search',{
 q: 'Michael Jackson',
//  facet: 'type(book)',
 sort: 'year',
 refine: true,
 librarian: true,
 count: 100,
 log: true,
 filter: function (book) {
   return (book.titles
   && book.titles.title
   && book.languages
   && book.languages.language
   && book.publication
   && book.publication.year 
   && book.publication.year.$t >= '2000' 
  //  && book.genres
  //  && book.genres.genre

 )},
 map: function (book) {
   return {
     title: book.titles.title.$t,
     taal: book.languages.language.$t,
     jaartal: book.publication.year.$t,
    //  genre: book.genres.genre.length ? book.genres.genre.map(genre=> genre.$t) : [book.genres.genre.$t]
     // jaartal: book.publication.year.$t
   }
 }
})
 .then(results => {
   console.log(results)
  fs.writeFile('./Script/log.json', JSON.stringify(results), 'utf8',function() {})
 })
   .catch(err=>console.log(err))