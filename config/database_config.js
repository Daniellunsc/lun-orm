const mysql = require('mysql');


class Database {

    async createConnection(host, user, password, database) {
            let databaseConnection = mysql.createConnection({
                host, 
                user, 
                password, 
                database
            });
            
            return new Promise((resolve, reject) => {
                databaseConnection.connect((err) => {
                    if(err) {
                        reject('Ocorreu um erro: ', err.message)
                    } else {
                        console.log(`Conectado a ${database}!`)
                        resolve(databaseConnection);
                    }
                });
            }) 
        
    }

    async endConnection(connection){
        return new Promise((resolve, reject) => {
            if(connection) {
                connection.end(() => resolve());
                console.log('Desconectado');
            } else {
                reject('Não existe uma conexão para ser destruída')
            }
        })
        
    }

}

module.exports = Database;