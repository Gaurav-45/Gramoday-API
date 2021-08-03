const mongoose=require("mongoose");
mongoose.set('useFindAndModify', false);

//Set monogdb connection
mongoose.connect("mongodb://localhost:27017/gramod-api",
    {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}
).then(()=>{
    console.log("Connected with database");
}) .catch((error)=>{
    console.log(error);
})