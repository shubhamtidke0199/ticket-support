const mongoose = require("mongoose");


const connectDb = async () => {
   try {
      const mongoConnect = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDb connect at host ${mongoConnect.connection.host}`);
   } catch (error) {
      console.log(`MongoDb error: ${error.message}`);
      process.exit(1);
   }
 
}

module.exports = connectDb;