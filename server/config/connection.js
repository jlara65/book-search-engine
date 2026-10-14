const mongoose = require('mongoose');
let cached;
module.exports = () => (cached ??= mongoose.connect(process.env.MONGODB_URI));

/* const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;*/
