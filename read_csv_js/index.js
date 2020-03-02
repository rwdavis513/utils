const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
const uuid = require('uuid/v4');

exports.handler = (event, context) => {
    const bucketName = process.env.bucketName;
    const keyName = process.env.key;
    const params = { Bucket: bucketName, Key: keyName };
    const csv = require('csvtojson');
    const s3Stream = s3.getObject(params).createReadStream()
    let counter = 0;
    csv().fromStream(s3Stream)
         .on('data', (row) => {
             counter += 1;
             if (counter % 100 == 0){
               console.log(counter)
             }
             let jsonContent = JSON.parse(row);
             //console.log(JSON.stringify(jsonContent));
              // book_id: jsonContent.book_id,
              // goodreads_book_id
              // books_count
              // isbn
              // isbn13
              // authors
              // original_publication_year
              // original_title
              // title
              // language_code
              // average_rating
              // ratings_count
              // work_ratings_count
              // work_text_reviews_count
              // ratings_1
              // ratings_2
              // ratings_3
              // ratings_4
              // ratings_5
              // image_url
              // small_image_url
             jsonContent.createdAtDateTime = new Date().getTime();
             jsonContent.bookUid = uuid();

             let paramsToPush = {
                    TableName: process.env.tableName,
                    Item: removeEmptyStringElements(jsonContent)
                };
            addData(paramsToPush);
    });

};

const removeEmptyStringElements = (obj) => {
    for (var prop in obj) {
      if (typeof obj[prop] === 'object') {// dive deeper in
        removeEmptyStringElements(obj[prop]);
      } else if(obj[prop] === '') {// delete elements that are empty strings
        delete obj[prop];
      }
    }
    return obj;
};

function addData(params) {
          docClient.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              //console.log("Added item:", JSON.stringify(params.Item, null, 2));
              }
          });
      }

console.log("read_csv_js:: Upload csv from S3 into DynamoDB")
console.log("Starting...")
console.log(new Date())
exports.handler();
console.log(new Date())
