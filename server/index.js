const path = require('path');
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
var cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

app.listen(
    PORT,
    () => console.log(`server is alive on http://localhost:${PORT}`)
)

//Searches through a local csv file and outputs whether or not a person is politically exposed or not
app.get('/api/pep', (req, res) => {
    const name = req.query.name;
    var numberOfHits = 0;
    var results = [];

    fs.createReadStream(path.resolve(__dirname, 'pep.csv'))
    .pipe(csv())
    .on('data', (row) => {
      if(typeof row.name != 'undefined' && row.name.toLowerCase() == name.toLowerCase()){
        numberOfHits++;
        results.push(row);
      }
    }).on('end', () => {
      res.status(200).send({
        "numberOfHits": numberOfHits,
        "results": results
      });
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});