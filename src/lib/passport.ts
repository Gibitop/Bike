import passport from 'passport'
import User, { IUser } from '@/models/User'
import { Strategy as LocalStrategy } from 'passport-local'
import { compareSync as comparePassowrd } from 'bcrypt'


passport.serializeUser((user: IUser, done) => done(undefined, user['_id']))

passport.deserializeUser((id: IUser['_id'], done) =>
    User.findById(id)
        .then(user => done(undefined, user))
        .catch(err => {
            console.error(err)
            done(undefined, false)
        })
)

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    (username, password, done) => {
        User.findOne({ email: username.toLowerCase() })
            .then(async user => {
                if (!user) {
                    done(undefined, false, {
                        message: 'User not found'
                    })
                } else {
                    if (comparePassowrd(password, user.password)) {
                        done(undefined, user)
                    } else {
                        done(undefined, false, {
                            message: 'Authentication failed'
                        })
                    }
                }
            })
            .catch(e => {
                console.error(e)
                done(undefined, false, {
                    message: 'Something went wrong'
                })
            })
    }
))

export default passport
