const ReadingList = require("../models/readingList");
const mongoose = require("mongoose")

exports.getReadingList = async (req, res) => {
    try {
        const { userId } = req.userData;
        const readingList = await ReadingList.find({ user: userId }).populate("book")

        res.status(200).json({
            success: true,
            message: "reading list fetched successfully",
            readingList
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
exports.updateStatus = async (req, res) => {
    try {


        const { id, value } = req.body;
        ;
        
        
        const { userId } = req.userData
        if (!id || !value) {
            return res.status(404).json({
                success: false,
                message: "missing datas for the update"
            })
        }
        await ReadingList.findOneAndUpdate(
            { user: userId, book: id },
            { $set: { status: value } },
            { returnDocument: "after", upsert: true }
        ) 
        const readingList = await ReadingList.find({ user: userId }).populate("book")
        
        return res.status(200).json({
            success: true,
            message: "readlist process completed successfully",
            readingList
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.getreadListBooks = async (req, res) => {
    try {
        const { userId } = req.userData;
        let { readingstatus ,sortOrder,sortValue} = req.query;
        sortOrder = parseInt(sortOrder);
        sortValue = `book.${sortValue}`
        
        
        

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "userId not found or token",

            })
        }
        let result;
        
        
        if (readingstatus == "default") {
                    
            result = await ReadingList.aggregate([
                {$match:{user:new mongoose.Types.ObjectId(userId)}},
                {$lookup:{
                    from:"books",
                    localField:"book",
                    foreignField:"_id",
                    as:"book"
                    
                }},{
                   $unwind:"$book"
                },{
                    $sort:{[sortValue]:sortOrder}
                }
            ])
        }
        else {
            
           result = await ReadingList.aggregate([
                {$match:{
                    user:new mongoose.Types.ObjectId(userId),
                    status:readingstatus
                }},
                {$lookup:{
                    from:"books",
                    localField:"book",
                    foreignField:"_id",
                    as:"book"
                    
                }},{
                   $unwind:"$book"
                },{
                    $sort:{[sortValue]:sortOrder}
                }
            ])

        }
       
        
         
            
             

        return res.status(200).json({
            success: true,
            message: "readlist process completed successfully",
            result

        })
    } catch (error) {
       

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteBook = async(req,res) =>{
    try {
        const {id} = req.params;
        const {userId} = req.userData;
        if(!id){
            return res.status(404).json({
            success: false,
            message: "id not found",
            

        })}

         const Deletedbook = await ReadingList.findByIdAndDelete(id);
         
         const books = await ReadingList.find({user:userId}).populate("book");
         if(!Deletedbook){
            return res.status(404).json({
            success: false,
            message: "book not found",
        })
         }
         return res.status(200).json({
            success: true,
            message: "Deletion success",
            books,
            deletedBookId:Deletedbook._id        

        })
    } catch (error) {
      
        
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}