const express = require("express"); 
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/auth.middleware");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const app = express(); 
app.use(express.json()); 


app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
}))
app.use(cookieParser()); 

app.get("/", authMiddleware, (req, res)=>{
    res.send("app is running")
})

app.use('/api/auth', authRoutes); 
app.use('/api/posts', postRoutes); 
app.use('/api/comments', commentRoutes ); 

app.use(errorHandler); 

module.exports = app; 