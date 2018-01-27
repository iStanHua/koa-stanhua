'use strict'

const env = process.env.NODE_ENV || 'development'
const config = require('../../config/config.default')[env]

async function createDB() {
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password
  })
  // create database
  const DATABASE = await connection.execute('CREATE DATABASE IF NOT EXISTS ' + config.database)
}


async function init() {
  await createDB()

  // 这将先丢弃表，然后重新创建它
  await require('../model').sequelize.sync({ force: true })
  require('../seeder')
}

init()