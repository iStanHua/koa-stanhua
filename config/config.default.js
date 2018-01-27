'use strict'

module.exports = {
  production: {
    dialect: 'mysql',
    database: 'stan_hua_db',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    ssl: false,
    timezone: '+08:00'
  },
  development: {
    dialect: 'mysql',
    database: 'stan_hua_db',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    ssl: false,
    timezone: '+08:00'
  }
}