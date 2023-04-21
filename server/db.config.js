
const dbHost = 'cluster1.h6pxllx.mongodb.net'
const dbPort = ''
const dbUser = 'user'
const dbUserPassword = 'alxpassword'
module.exports ={
  url: `mongodb+srv://${dbUser}:${dbUserPassword}@${dbHost}/?retryWrites=true&w=majority`
}