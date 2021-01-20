const express = require ('express');
const morgan = require ('morgan');
const path = require ('path');
const exphbs = require ('express-handlebars');
const flash = require ('connect-flash');
const session = require ('express-session');
const MySQLStore = require ('express-mysql-session');
const {database} = require('./keys');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { mainModule } = require('process');
const fetch = require("node-fetch");


//Init
const app=express();
require ('./lib/passport');

//Settings
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers:  require ('./lib/handlebars')
    
}));
app.set('view engine', '.hbs');



//Middleware
app.use(session({
    secret: 'serverweblibros',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Globals
app.use((req,res,next) =>{
    app.locals.guardado = req.flash('guardado');
    app.locals.mensaje = req.flash('mensaje');
    app.locals.user = req.user;
    next();
});




//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/libros', require('./routes/libros'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Start-Server
app.listen(app.get('port'),()=>{
    console.log('Server on port ', app.get('port'));
});
