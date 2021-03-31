# Database

## Files, that *probably* need to be updated or replaced

- Everything inside `models` directory
- [lib/mongoose.ts](../../src/lib/mongoose.ts)
- `DB setup` section in [app.ts](../../src/app.ts)
- `Auth setup` section in [app.ts](../../src/app.ts) - make it use different DB
- DB related variables in `.env`
- *Maybe, but probably not* `User` interface inside [express.d.ts](../../src/types/express.d.ts)
- API endpoints, that use current models

## Guide: replacing MongoDB + mongoose with MySQL + Sequelize

// TODO: write
