const express=require("express");
const getUuid = require('uuid-by-string')
require("./db/connection");

const app=express();

const UserReport=require("./models/UserReport");
const AggReport=require("./models/AggReport");
app.use(express.json());


app.route("/reports")
    .post(function(req,res){
        
        //create a unique ID for marketID-cmdtyID
        const newReportID=getUuid(req.body.marketID+"-"+req.body.cmdtyID);

        //create a new document of user report 
        const newUserReport= new UserReport({
            reportID:newReportID,
            reportDetails:req.body
        })

        newUserReport.save(function(err){
            if(!err){
                res.send({
                    status:"Success",
                    reportID:newUserReport.reportID
                });
            } else{
                res.send(err);
            }
        })
    
    
        //After saving the user report change the mean price of a cmdtyID item
        //by taking effective mean of all the reports and add new user to agg report
        AggReport.findOne({_id:newReportID},function(err,doc){
            if(!err){
                //If no document found means the no record/report is submitted for that marketID-cmdtyID
                //So create one and then save it into the database
                if(!doc){
                    const aggRep={
                        _id:newReportID,
                        cmdtyName:req.body.cmdtyName,
                        cmdtyID:req.body.cmdtyID,
                        marketID:req.body.marketID,
                        marketName:req.body.marketName,
                        users:[req.body.userID],
                        timestamp:Date.now(),
                        priceUnit:"Kg",
                        price:req.body.price/req.body.convFctr
                    }
                    
                    const newAggRep= new AggReport(aggRep);
                    newAggRep.save(function(err){
                        if(!err){
                            console.log("Successfully updated")
                        } else{
                            console.log(err);
                        }
                    })
                }

                //If the documnet os already present for a particular marketID-cmdtyID then 
                //Then update its effective mean price in kgs and add user 
                else{
                    let currentLength=doc.users.length;
                    let newUserConversion=req.body.price/req.body.convFctr;
    
                    let newPrice=((doc.price)*currentLength + newUserConversion)/(currentLength+1);
    
                    AggReport.updateOne({_id:newReportID},
                        {
                            '$push': { users: req.body.userID },
                            '$set' : { price: newPrice}
                        },function(err){
                            if(!err){
                                console.log("No error")
                            } else{
                                console.log(err);
                            }
                        }   
                    )
                }
            } else{
                console.log(err);
            }
        })
    })


    .get(function(req,res){
        let reportID=req.query.reportID;
        //find the document for a particular marketID-cmdtyID and update the current timestamp 
        // at each time when server gets 'get' request
        AggReport.findOneAndUpdate({_id:reportID},
            {
                '$set':{timestamp: Date.now()}
            },
            { new: true },
            function(err,doc){
                if(!err){
                    res.send(doc);
                } else{
                    res.send(err);
                }
        })
    });


app.listen(3000,function(req,res){
    console.log("The app is runnig on port 3000");
})