const mongoose = require("mongoose")


const ReportSchema = new mongoose.Schema({
    reportedBy:{type:mongoose.Schema.Types.ObjectId ,required:true,ref:"user"},
    reportedFor:{type:String,enum:["review","comment","user"],required:true},
    targetId:{type:mongoose.Schema.Types.ObjectId,required:true,refPath:"reportedFor"},
    violations:{type:[String]},
    status:{type:String,enum:["resolved","unresolved","rejected","fullfilled"],default:"unresolved"}
},{
    timestamps:true
})

const Reports = mongoose.model("report",ReportSchema);
module.exports = Reports;