const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbpoper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    dbpoper.insertDocument(db, { name: 'vadonut', description: 'Test'}, 'dishes',(result) => {

        console.log('Insert Document: \n', result.ops);

        dbpoper.findDocument(db, 'dishes', (docs) => {
            console.log('Found documents:\n',docs);

            dbpoper.updateDocument(db, {name: 'vadonut'}, {description: 'Updated Test'}, 'dishes', (result) => {
                console.log('Updated Document:\n',result.result);

                dbpoper.findDocument(db, 'dishes', (docs) => {
                    console.log('Found Document:\n',docs);

                    db.dropCollection('dishes',(result) => {
                        console.log('Dropped Collection: ',result);
                    });
                });
            });
        });
    });
});