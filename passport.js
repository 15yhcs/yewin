const localStrategy = require("passport-local").Strategy
const bcrypt =  require("bcrypt")


function initialize(passport, getUserByEmail,getUserById) { 
    const authenticateUser = async (email,password,done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message: "User email not found "})
        }

        try {
            if (password === user.password) {
                return done(null, user)
            }else{
                return done(null, false, {message: "password incorrect"})
            }
        } catch (error) {
            
        }
    }
    passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
 }

 module.exports = initialize

