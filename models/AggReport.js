const mongoose=require("mongoose");

//define the schema of aggregated report
const aggSchema=new mongoose.Schema({
    _id:String,
    cmdtyName:{
        type:String,
        require:true
    },
    cmdtyID:{
        type:String,
        require:true
    },
    marketID:{
        type:String,
        require:true
    },
    marketName:{
        type:String,
        require:true
    },
    users:{
        type:[String],
        require:true
    },
    timestamp:{
        type:Number,
        require:true
    },
    priceUnit:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

const AggReport=mongoose.model('AggReport', aggSchema);

module.exports=AggReport;
