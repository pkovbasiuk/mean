const express = require('express'),
    models = require('../db/index'),
    chalk = require('chalk'),
    localization = require('../localization'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    log = console.log;

module.exports = (() => {
    const app = express.Router();

    app.post('/signin', async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            log(chalk.red(localization.ARE_NOT_FILLED_MSG));
            res.status(400).send(localization.ARE_NOT_FILLED_MSG);
            next();
        } else {
            try {
                let user = await models.User.create({email: req.body.email, password: req.body.password});
                let msg = `User with ${user.email} successfully created`;
                log(chalk.green(msg));
                res.send(msg);
                next();
            } catch (e) {
                log(chalk.red(e.message));
                res.status(400).send(e);
                next();
            }
        }
    });

    app.post('/login', async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            log(chalk.red(localization.ARE_NOT_FILLED_MSG));
            res.status(400).send(localization.ARE_NOT_FILLED_MSG);
            next();
        } else {
            try {
                let user = await models.User.findOne({email: req.body.email});
                let token = 'JWT ' + jwt.sign({id: user.id}, config.jwtSecret, config.jwtExpireTime);
                log(chalk.green(token));
                res.send(token);
                next();
            } catch (e) {
                log(chalk.red(e.message));
                res.status(400).send(e);
                next();
            }
        }
    });

    return app
})();
