module.exports = {
    type: 'mysql', // type of our database
    host: 'mysql', // database host
    port: 3306, // database host
    username: 'dudy206', // username
    password: 'abcdef123', // user password
    database: 'nestjs', // name of our database,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli:{
        migrationsDir: 'src/migrations',
    }
}