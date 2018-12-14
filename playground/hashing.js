const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const password = '123abc';
// bcryptjs.genSalt(10, (err, salt) => {
//   bcryptjs.hash(password, salt, (err, hash) => {
//     console.log('Hash', hash);
//   });
// });

const hashedPassword = '$2a$10$WG5ForQ57F8m15MxEr7QBOBSOymoAzDCrGrsMA6.5qPw.MQLpfHIS';
bcryptjs.compare('123', hashedPassword, (err, res) => {
  console.log(res);
});

// const data = {
//   id: 10
// };
//
// const token = jwt.sign(data, '123abc')
// console.log('Token:', token);
//
// const decoded = jwt.verify(token, '123abc');
// console.log('Decoded', decoded);

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();
//
// console.log('Message', message);
// console.log('Hash', hash);

// const data = {
//   id: 4
// };
//
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not change');
// } else {
//   console.log('Data was changed. Do not trust.');
// }
