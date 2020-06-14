const Sequelize = require('sequelize')

 let db
if (process.env.NODE_ENV == 'testing') {
  db = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
  })
} else {
  if(process.env.DATABASE_URL){
    db = new Sequelize(process.env.DATABASE_URL)
  }else{
  db = new Sequelize({
    dialect: 'mysql',
    database: 'cbsocialmediadb5',
    username: 'cbsocialuser5',
    password: 'cbsocialpass5',  
   /* dialect: 'postgres',
    database: 'd9mu0ds3h8it67',
    username: 'muhasxjdljshbr',
    password: '0107c4672e0576145335d701ce23e5e99afa165a70ff28d386836f0b064d6ed4',
    host: 'ec2-35-174-127-63.compute-1.amazonaws.com' */
  })
 } 
}
const COL_ID_DEF = {
  type: Sequelize.DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
}
const COL_USERNAME_DEF = {
  type: Sequelize.DataTypes.STRING(30),
  unique: true,
  allowNull: false,
}
const COL_TITLE_DEF = {
  type: Sequelize.DataTypes.STRING(140),
  allowNull: false,
}

const Users = db.define('user', {
  id: COL_ID_DEF,
  username: COL_USERNAME_DEF,
})

const Posts = db.define('post', {
  id: COL_ID_DEF,
  title: COL_TITLE_DEF,
  body: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
  },
})

const Comments = db.define('comment', {
  id: COL_ID_DEF,
  title: COL_TITLE_DEF,
  body: {
    type: Sequelize.DataTypes.TEXT('tiny'),
  },
})

Users.hasMany(Posts)
Posts.belongsTo(Users)

Users.hasMany(Comments)
Comments.belongsTo(Users)

Posts.hasMany(Comments)
Comments.belongsTo(Posts)

module.exports = {
  db,
  Users,
  Posts,
  Comments,
}