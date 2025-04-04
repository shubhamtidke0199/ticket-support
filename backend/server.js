const express = require("express");
const connectDb = require("./config/db");
const path = require('path')
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// Connect MongoDb
   connectDb();
//Parse json file into requests
app.use(express.json());
// Parse from front end as key value pairs
app.use(express.urlencoded({ extended: false}))

// app.get("/", (req, res)=> {
//    res.send("Hello");
// })

//Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/tickets", require("./routes/ticketRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))

// Server FrontEnd
if(process.env.NODE_ENV === "production") {
   //static address to front end
   app.use(express.static(path.join(__dirname, "../frontend/build")));
   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../", "frontend", "build", "index.html"), 
      function(err){
         if(err){
            res.status(500).send(err);
         }
      });
      
   })
   app.listen(PORT)
} else {
   app.get("/", (req, res)=> {
      res.status(200).json({message: "help Desk APIs"})
   })
   app.listen(PORT, console.log(`Server running on port ${PORT}`))
   
}
// using set values for errors in posting


app.use(errorHandler)

