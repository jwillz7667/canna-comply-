// Demo migration runner: synchronize is enabled, so we just log and exit
// This is executed by docker-compose before starting the app
// eslint-disable-next-line no-console
console.log('TypeORM synchronize:true active — no migrations to run for demo')
process.exit(0)


