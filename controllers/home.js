// const Mongoose = require('mongoose').Mongoose;
// const sandboxInstance = new Mongoose();
// sandboxInstance.connect(process.env.MONGO_SANDBOX_URI);
// const Schema = sandboxInstance.Schema;
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_SANDBOX_URI;
const dbName = 'sandbox';
var db;

// Initialize connection once
MongoClient.connect(url, function(err, client) {
  // assert.equal(null, err);
  if (err) throw err;
  console.log("Connected successfully to server");

  db = client.db(dbName);
  // client.close();
});

const csv = require('fast-csv');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

exports.postQuery = (req, res) => {
  if (!req.body.query) {
    req.flash('errors', { msg: 'No query found, please submit a query.' });
  }
}

exports.postFileUpload = (req, res) => {
  if (!req.files) {
    req.flash('errors', { msg: 'No files found, please upload a file.' });
  }
  else if (!req.body.name) {
    req.flash('errors', { msg: 'Please provide a collection name.' });
  }

  var collectionName = req.body.name || 'Default';

  // const uploadSchema = new Schema({}, { strict: false });
  // var model = sandboxInstance.model(collectionName, uploadSchema);

  //Handle single file upload
  var myFiles = [].concat(req.files.myFiles || []);

  myFiles.forEach(function(file){
    var documents = [];
    csv
      .fromString(file.data.toString(), {
          headers: true,
          ignoreEmpty: true
      })
      .on("data", function(data){
        // data['_id'] = new sandboxInstance.Types.ObjectId();

        documents.push(data);
      })
      .on("end", function(){
        debugger;
        const collection = db.collection(collectionName);
        debugger;
        // model.collection.insert(documents, function(err, results) {
        collection.insertMany(documents, function(err, result) {
          debugger;
           if (err) throw err;
        });
      })
  })

  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.locals.messages = req.flash();
  res.render('home', {
    title: 'Home'
  });
};
