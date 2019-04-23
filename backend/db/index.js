const mongoose = require('mongoose'),
    chalk = require('chalk'),
    log = console.log;

mongoose.connect('mongodb://localhost:27017/time-tracker', {
    useCreateIndex: true,
    useNewUrlParser: true
}, (err) => {
    if (err) {
        log(chalk.red(err));
    } else {
        log(chalk.green("Connected to database"));
    }
});
module.exports = {
    User: require('./models/User')
};
