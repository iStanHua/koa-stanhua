
const md5 = require('../extend/md5')

module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(16),
      unique: true,
      comment: '用户名',
      validate: {
        len: [2, 16],
      }
    },
    gender: {
      type: DataTypes.TINYINT(2),
      defaultValue: '3',
      comment: '1:男，2：女，3：未知'
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/db0ce68abde8b1a1619910',
      comment: '头像'
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '密码',
      set(val) {
        this.setDataValue('password', md5(val))
      }
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      comment: '邮箱',
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING(11),
      unique: true,
      comment: '手机号',
      validate: {
        is: /^1[3|5|6|7|8|9]\d{9}$/
      }
    },
    active: {
      type: DataTypes.TINYINT(2),
      defaultValue: 1,
      comment: '0:不可用，1:可用'
    },
    created_time: {
      type: DataTypes.BIGINT,
      comment: '创建时间'
    },
    updated_time: {
      type: DataTypes.BIGINT,
      comment: '修改时间'
    }
  },
    {
      tableName: 't_user',
      comment: '用户表',
      indexes: [
        {
          unique: true,
          fields: ['id']
        }
      ],
      getterMethods: {

      },
      setterMethods: {}
    })

  user.associate = (models => {
    // 一对多关联
    user.hasMany(models.news)
  })

  return user
}
