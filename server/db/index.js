const mongoose = require("mongoose");

const uri = "mongodb+srv://user:alxpassword@cluster1.h6pxllx.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect((uri), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("connected to mongodb"))
.catch(err => console.log(err))