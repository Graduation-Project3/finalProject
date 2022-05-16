const bcrypt = require("bcrypt");
const User = require("../models/users");
const emailvalidator = require("email-validator");
const jwt = require('jsonwebtoken');
exports.postSignUp = (req,res,next) =>{
    const { firstName, lastName, city, location, email, password, confirmPassword, phone } = req.body;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                res.send("already the email use");
                return;
            }
            else if(!emailvalidator.validate(req.body.email)){
              res.status(202).send("The email not validate");
              return;
          }
          else if(!(password==confirmPassword)){
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
                        city: city,
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
                    { expiresIn: '20s' }
                  );
                    console.log(req.headers);
                    res.status(200).json({ userId: result._id.toString(), email: email, token: token })}
                    catch {
                      console.log("failde");
                    }
                });
        })
        .catch(err => {
            res.status(400).send(err);
        });
}

exports.postSignIn = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
    .then(user => {
      if (!user) {
        
        return res.status(401).send('email not connected to any user'); ;
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
              let token;
              try {
                 token = jwt.sign(
                { userId: user.id, email: user.email },
                'supersecret_dont_share',
                { expiresIn: '20s' }
              );
                console.log(req.headers);
                res.status(200).json({ userId: user.id, email: user.email, token: token })}
                catch {
                  console.log("failde");
                }
              }
    
            else{
           res.send('not passed');
            }
          }
          
        )
        .catch(err => {
            res.status(401).send(err);

        });
    })
    .catch(err => res.status(400).send(err));
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.send({isAuth:false})
    });
  };
exports.postIsValid = async(req,res) =>{
  try {
    const token = req.header("Authorization").split(' ')[1];;
    console.log(token);
    if (!token) return res.json({token:false});
    const verified = jwt.verify(token,'supersecret_dont_share', );
    console.log(verified);
    if (!verified) return res.json({token:false});
    const user = await User.findById(verified.userId);
    if (!user) return res.json({token:false});
    else {
      console.log('ok');
      return res.json({token:token});
    }
    } catch (err) {
    res.json({token:false});
    }
    };
    

  