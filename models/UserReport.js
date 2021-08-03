const mongoose=require("mongoose");

//create schema for user report
const reportSchema=new mongoose.Schema({
    reportID:String,
    reportDetails:{
        userID:{
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
        cmdtyID:{
            type:String,
            require:true
        },
        cmdtyName:{
            type:String,
            require:true
        },
        priceUnit:{
            type:String,
            require:true
        },
        convFctr:{
            type:Number,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        date:{
            type:String
        }
    }
})

const UserReport=mongoose.model('UserReport',reportSchema);

module.exports=UserReport;
