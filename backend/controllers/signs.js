const bcrypt = require("bcrypt");
const User = require("../models/users");
const emailvalidator = require("email-validator");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

let smtpTransport = nodemailer.createTransport({

  service: "gmail",
  auth: {
    user: "mazaddjo@gmail.com",
    pass: "ehabehab"
  },
  tls: {
    rejectUnauthorized: false
  }

});



exports.postSignUp = (req, res, next) => {
  const { firstName, lastName, country, location, email, password, confirmPassword, phone } = req.body;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        res.send("already the email use");
        return;
      }
      else if (!emailvalidator.validate(req.body.email)) {
        res.status(202).send("The email not validate");
        return;
      }
      else if (!(password == confirmPassword)) {
        console.log("The password dose not match");
        res.status(202).send("The password dose not match");
        return;
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            firstName: firstName,
            lastName: lastName,
            country: country,
            location: location,
            email: email,
            password: hashedPassword,
            phone: phone
          });
          return user.save();
        })
        .then(result => {
          console.log();
          let token;
          try {
            token = jwt.sign(
              { userId: result._id.toString(), email: email },
              'supersecret_dont_share',
              { expiresIn: '1h' }
            );
            console.log(req.headers);
            res.status(200).json({ userId: result._id.toString(), email: email, token: token })
          }
          catch {
            console.log("failde");
          }
        });
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

exports.postSignIn = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {

        return res.status(401).send('email not connected to any user');;
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            let token;
            try {
              token = jwt.sign(
                { userId: user.id, email: user.email, admin: user.admin },
                'supersecret_dont_share',
                { expiresIn: '1h' }
              );
              console.log(req.headers);
              res.status(200).json({ userId: user.id, email: user.email, token: token })
            }
            catch {
              console.log("failde");
            }
          }
          else {
            res.status(400).send('not passed');
          }
        }
        )
        .catch(err => {
          res.status(401).send(err);

        });
    })
    .catch(err => res.status(400).send(err));
}

exports.postIsValid = async (req, res) => {
  try {
    const token = req.header("Authorization").split(' ')[1];;
    console.log(token);
    if (!token) return res.json({ token: false });
    const verified = jwt.verify(token, 'supersecret',);
    console.log(verified);
    if (!verified) return res.json({ token: false });
    const user = await User.findById(verified.userId);
    if (!user) return res.json({ token: false });
    else {
      console.log('ok');
      return res.json({ token: token });
    }
  } catch (err) {
    res.json({ token: false });
  }
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return;
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        console.log("user", user);
        if (!user) {
          console.log("notUser");
          res.status(403).send("this email in not connected to any account");
          return;
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        console.log("result",result);
        if (result) {
          smtpTransport.sendMail({
            to: req.body.email,
            from: 'mazaddjo@gmail.com',
            subject: 'Password reset',
            html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
            `
          })
            .then(resp => {
              console.log(resp)
              res.status(200).send({ found: 'found' })
            })

        }

      })
      .catch(err => {
        console.log(err);
      });
  });
};


exports.getNewPassword = (req, res, next) => {
  const token = req.query.id;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })

    .then(user => {
      console.log(user);
      if (!user) {
        res.status(400).send('not Valid')
        return
      }
      else {
        res.send({ id: user._id });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.id;
  const passwordToken = req.body.token;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};