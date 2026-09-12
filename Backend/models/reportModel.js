const mongoose = require("mongoose")


const ReportSchema = new mongoose.Schema({
    reportedBy:{type:mongoose.Schema.Types.ObjectId ,required:true,ref:"user"},
    reportedTo:{type:String,enum:["review","comment","user"],required:true},
    targetId:{type:mongoose.Schema.Types.ObjectId,required:true,refPath:"reportedTo"},
    violation:{type:mongoose.Schema.Types.ObjectId},
    reportMessage:{type:String}
},{
    timestamps:true
})

const Reports = mongoose.model("report",ReportSchema);
module.exports = Reports;