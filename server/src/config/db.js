const mongoose = require("mongoose"); 

const db = async()=>{
    try {
        const dbConnection  =  await mongoose.connect(process.env.MONGO_URL); 
        console.log(`Db connect sucessfully at ${dbConnection.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = db; 