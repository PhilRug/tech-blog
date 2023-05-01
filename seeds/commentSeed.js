const { Post } = require('../models');

const postdata =
[
  {
    "comment_title": "Not a coding language",
    "comment_text": "Bananas are not a coding language",
    "user_id": 1
  },
  {
    "comment_title": "handlebars",
    "comment_text": "Handlebars is easy enough when you get past the crying and self loathing",
    "user_id": 2
  },
  {
    "comment_title": "seeding",
    "comment_text": "Seeding is useful when you dont want to copy info over and over",
    "user_id": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;