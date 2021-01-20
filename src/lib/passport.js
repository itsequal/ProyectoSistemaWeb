const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('../database');
const encrypt = require('../lib/encrypt');


passport.use('local.login', new LocalStrategy({
    usernameField:'usuario',
    passwordField: 'contraseña',
    passReqToCallback:true
}, async (req, usuario, contraseña, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if(rows.length > 0) {
        const user = rows[0];
        const validPassword = await encrypt.matchPassword(contraseña, user.contraseña);
        if (validPassword == true) {
            done(null,user,req.flash('guardado','Bienvenido, ' + user.usuario));
        }else{
            done(null,false, req.flash('mensaje','Contraseña incorrecta'));
        }
    }else{
        return done(null,false,req.flash('mensaje','Usuario no existe'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField:'usuario',
    passwordField: 'contraseña',
    passReqToCallback:true
}, async (req, usuario, contraseña, done) =>{

    const newUser={
        usuario,
        contraseña
    };
    newUser.contraseña = await encrypt.encryptPassword(contraseña);
    const result = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
    }));

    
    passport.serializeUser((user,done) =>{
        return done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) =>{
        const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return done(null, rows[0]);
    });
    
