const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const noteRouter=require("./routes/noteRouter")
const path=require('path')

const app = express();

app.use(express.json());
app.use(cors());

//
app.use("/users", userRouter);

app.use("/notes",noteRouter)

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to db"))
  .catch(e => console.log(e));


  if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port`, PORT);
});
