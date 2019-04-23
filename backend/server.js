const chalk = require('chalk'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    passportJWT = require('passport-jwt'),
    config = require('./config'),
    log = console.log;

// Local auth strategy for passport module
passport.use(new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.jwtSecret
}, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    let user = User.findOne({id: jwt_payload.id});
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
}));

app.use(passport.initialize());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/auth', require('./controllers/authorization'));
app.listen(3000, () => log(chalk.green('Example app listening on port 3000!')));
