require("dotenv").config(); 
const app = require("./app");
const db = require("./config/db");
const PORT  = process.env.PORT || 5000
db(); 
app.listen(PORT, ()=>{
    console.log(`Server is running at Port: ${PORT}`);
})

