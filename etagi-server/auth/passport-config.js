const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const initialize = async (passport, getUserByName, getUserById) => {
    const authenticateUser = (name, password, done) => {
        const user = getUserByName(name).then(async user => {
            if(user == null){
                console.log("Нет пользователя с таким именем");
                return done(null, false, {message: "Нет пользователя с таким именем"})
            }
    
            try{
                if(await bcrypt.compare(password, user.password)){
                    return done(null, user);
                } else {
                    console.log("Пароль неверный");
                    return done(null, false, {message: "Пароль неверный"});
                } 
            }
            catch (e){
                return done(e);
            }
        });
    }
    passport.use(new LocalStrategy({ username: 'name', password: 'password' }, authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        getUserById(id)
            .then(user => {
                done(null, user)
            })
    });
}

module.exports = initialize