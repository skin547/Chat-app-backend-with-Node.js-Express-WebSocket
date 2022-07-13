module.exports = {
    authentication:{
        secretkey:"YOUR_SECRET_KEY",
    },
    database:{
        database:"chat",
        user:"USER",
        password:"PASSWORD",
        options:{
            host:"127.0.0.1",
            dialect:"mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },            
        }
    }
}