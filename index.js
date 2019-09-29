const Database = require('./config/database_config');
const Model = require('./config/modelConfig');



async function main(){
    const db = new Database();

    let connection = await db.createConnection('localhost', 'root', '12345678', 'ormdb', true);
    

    const User = new Model('User',
        {
            email: {
                type: 'text',
                required: true,
            },

            connected: {
                type: 'bool'
            }
        }, connection
    )
}

main()