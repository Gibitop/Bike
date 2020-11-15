# Bike

## Description:
Bike is a template for creating typical backend applications in Node.js. \
It's basically a Web framework, but all of its parts are simple and swappable \
This template is just a preset. You are **encouraged** to dig into the configuration files and modify them to suit your 
needs. Most of the configuration happens inside [app.ts](src/app.ts) file and inside `lib` directory \
If you think something else should be added to this template feel free to create an issue or submit a pull request

This project uses:
- [Typescript](https://www.typescriptlang.org/) 
- Serves API endpoints with [Express](https://expressjs.com/)
- Stores data in [MongoDB](https://mongodb.com/) using [mongoose](https://mongoosejs.com/)
- Manages authentication using [Passport.js](http://www.passportjs.org/) with 
  [passport-local strategy](http://www.passportjs.org/packages/passport-local/)
- Runs cron jobs with [node-cron](https://www.npmjs.com/package/cron)
- Renders emails using [Handlebars.js](https://www.npmjs.com/package/handlebars) and sends them with 
  [Nodemailer](https://www.npmjs.com/package/nodemailer)
- Supports server side rendering using [Express Handlebars](https://www.npmjs.com/package/express-handlebars)

All components are easily swappable, so if you, for example, want to use an `SQL` database, just swap `mongoose` 
with `sequelize` or any other DB manager. \
You can find information about swapping some components inside `docs/3. Swapping components`

This project runs on Windows, Linux and *probably* MacOS

---

You can find more information about developing with this template in `docs` directory

