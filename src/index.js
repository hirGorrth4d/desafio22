const server = require('./services/server');
const dbSql = require('./classes/dbsql');

dbSql.init();


const puerto = 8080;
server.listen(puerto, () => {
    console.log('escuchando')
})