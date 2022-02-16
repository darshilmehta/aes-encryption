var express = require("express");
var app = express();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/aes-encryption");
var user = require("./model/user.js");

const aesjs = require('aes-js');

app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

const AES_Encrypt = (password) => {
  // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
  const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

  // Convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(password);

  // The counter is optional, and if omitted will begin at 1
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  const encryptedBytes = aesCtr.encrypt(textBytes);

  // To print or store the binary data, you may convert it to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
}

const AES_Verify = (submittedPass, storedPass) => {

  // The submitted password is plaintext
  
  // The stored password is encrypted
  
  // We would decrypt the stored password and then
  
  // We would verify it with the submitted password
  
  // When ready to decrypt the hex string, convert it back to bytes

  const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

  var encryptedBytes = aesjs.utils.hex.toBytes(storedPass);
  
  // The counter mode of operation maintains internal state, so to
  
  // decrypt a new instance must be instantiated.
  
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  
  var decryptedBytes = aesCtr.decrypt(encryptedBytes);
  
  // Convert our bytes back into text
  
  var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  
  console.log(decryptedText);
  console.log(submittedPass);

  return decryptedText === submittedPass;
}

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      })
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: 'Apis'
  });
});

app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if(data.length > 0) {
          if(AES_Verify(req.body.password, data[0].password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }    
        } else {
          res.status(400).json({
            errorMessage: 'Username doesnot exist!',
            status: false
          });
        }
      })
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password && req.body.cpassword) {
      if(req.body.password !== req.body.cpassword) {
        res.status(400).json({
          errorMessage: "Passwords don't match!",
          status: false
        })
      } else {
        user.find({ username: req.body.username }, (err, data) => {
          if (data.length == 0) {
            const encrypted_pass = AES_Encrypt(req.body.password);
            let User = new user({
              username: req.body.username,
              password: encrypted_pass
            });

            User.save((err, data) => {
              if (err) {
                res.status(400).json({
                  errorMessage: err,
                  status: false
                });
              } else {
                res.status(200).json({
                  status: true,
                  title: 'Registered Successfully.'
                });
              }
            });

          } else {
            res.status(400).json({
              errorMessage: `UserName ${req.body.username} Already Exist!`,
              status: false
            });
          }

        });
      }
      } else {
        res.status(400).json({
          errorMessage: 'Add proper parameter first!',
          status: false
        });
      }
    } catch (e) {
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
    }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ user: data.username, id: data._id }, 'shhhhh11111', { expiresIn: '1d' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.json({
        message: 'Login Successfully.',
        token: token,
        status: true
      });
    }
  });
}

app.listen(2000, () => {
  console.log("Server is Runing On port 2000");
});
