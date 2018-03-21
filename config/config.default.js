'use strict'

module.exports = {
  production: {
    dialect: 'mysql',
    database: 'mysql_pj',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    ssl: false,
    timezone: '+08:00'
  },
  development: {
    dialect: 'mysql',
    database: 'mysql_pj',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    ssl: false,
    timezone: '+08:00'
  }
}