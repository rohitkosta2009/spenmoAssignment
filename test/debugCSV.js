const { assert } = require('console');
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('./spenmoFile.csv')
.pipe(csv({}))
.on('data', (data) => results.push(data))
.on('end', () => {
 // console.log(results);
 console.log(results[0]);

  var assert = require('assert');   
  assert.equal('reimbursement', results[0].request_type);
  assert.equal('Test', results[0].team_name);
  assert.equal('pending', results[0].status);
  assert.equal('pending', results[0].settlement_status);
  assert.equal('admin', results[0].name);
  assert.equal('admin@bd.com', results[0].email);
  assert.equal('1.00', results[0].amount);
  assert.equal('EUR', results[0].currency_code);
  assert.equal('Spenmo Assignment 1', results[0].title);
});