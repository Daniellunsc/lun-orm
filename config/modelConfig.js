class Model {
    constructor(tableName, attributes, connection) {
        if(typeof(attributes) !== "object") {
            console.log('Atributos não estão no formato correto');
        }
        
        this.initialize(tableName, attributes, connection)
    }

    async initialize(tableName, attributes, connection) {
        this._attributes = await this.mapAttributesToColumns(attributes);
        this.checkCreateTable(connection, tableName)
    }

    async mapAttributesToColumns(attributes){
        return new Promise((resolve, reject) => {
            Object.keys(attributes).map((column, index) => {

                if(attributes[column]) {
                    if(attributes[column].type === "text") {
                        attributes[column].typeRaw = "VARCHAR(50)"
                    } else if (attributes[column].type === "bool") {
                        attributes[column].typeRaw = "TINYINT(1)"
                    }
                }

                if(index === Object.keys(attributes).length - 1) {
                    resolve(attributes)
                }

            })
        })
       
    }


    async checkCreateTable(connection, tableName) {
        connection.query(`SHOW TABLES LIKE '${tableName}'`, (err, results, fields) => {
            if(err){
                throw new Error(err)
            } 

            console.log(`CREATE TABLE IF NOT EXISTS ${tableName} (${Object.keys(this._attributes).map(column => `\`${column}\` ${this._attributes[column].typeRaw} ${this._attributes[column].required ? 'NOT NULL' : ''}`)});`)

            if(results.length === 0) {
                connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${Object.keys(this._attributes).map(column => `\`${column}\` ${this._attributes[column].typeRaw} ${this._attributes[column].required ? 'NOT NULL' : ''}`)});`)
            }
        })
    }
}


module.exports = Model;