const Collections = require("../models/collectionModel");
exports.getFavouriteBooks = async (req, res) => {
    try {


        const { userId } = req.userData;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "The user id is not provided"
            })
        }
        const favBooks = await Collections.findOne({ user: userId, collectionName: "Favourites" }).populate("books");
        
        
        if (!favBooks) {
            return res.status(404).json({
                success: false,
                message: "The favourite collection is not found"
            })
        }



        return res.status(200).json({
            success: true,
            message: "successfully fetched favourite collection",
            favBooks
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
// exports.getFavourite = async (req, res) => {
//     try {


//         const { userId } = req.userData;

//         if (!userId) {
//             return res.status(404).json({
//                 success: false,
//                 message: "The user id is not provided"
//             })
//         }
//         const favBooks = await Collections.findOne({ user: userId, collectionName: "Favourites" })
//         if (!favBooks) {
//             return res.status(404).json({
//                 success: false,
//                 message: "The favourite collection is not found"
//             })
//         }



//         return res.status(200).json({
//             success: true,
//             message: "successfully fetched favourite collection",
//             favBooks
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: true,
//             message: error.message
//         })
//     }
// }
exports.createBookCollection = async (req, res) => {
    try {


        const { userId } = req.userData;
        const {name} = req.body;
        const collectionData = {
            user:userId,
            collectionName:name
        }
        await Collections.create(collectionData)
        
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "The user id is not provided"
            })
        }
        
        



        return res.status(200).json({
            success: true,
            message: "successfully created new collection",
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
exports.updateFavourite = async (req, res) => {
    try {


        const { userId } = req.userData;
        const { liked, id } = req.body;
        



        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Data is missing"
            })
        }
        let favBooks;
        
        if (liked) {
            favBooks = await Collections.findOneAndUpdate(
                { user: userId, collectionName: "Favourites" },
                { $pull: { books: id } },
                { returnDocument: "after" }
            ).populate("books")
            

        } else {

            favBooks = await Collections.findOneAndUpdate(
                { user: userId, collectionName: "Favourites" },
                { $addToSet: { books: id } },
                { returnDocument: "after" }

            ).populate("books")
            
            

        }


        // favBooks = await Collections.find({ user: userId, collectionName: "Favourites" })
        
        

        return res.status(200).json({
            success: true,
            message: "successfully upertedn the item to favourite collection",
            favBooks
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}