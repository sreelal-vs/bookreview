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
exports.getBookCollections = async (req, res) => {
    try {


        const { userId } = req.userData;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "The user id is not provided"
            })
        }
        const collections = await Collections.find(
            {
                user: userId,
                collectionName: { $ne: "Favourites" }
            }
        ).sort({ createAt: -1 }).populate("books");


        if (!collections) {
            return res.status(200).json({
                success: true,
                message: "There is no collection for this user"
            })
        }



        return res.status(200).json({
            success: true,
            message: "successfully fetched favourite collection",
            collections
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}

exports.createBookCollection = async (req, res) => {
    try {


        const { userId } = req.userData;
        const { name } = req.body;
        const collectionData = {
            user: userId,
            collectionName: name
        }
        if(!name){
             return res.status(200).json({
                success: false,
                message: "The user didn't input name"
            })
        }
        const newCollection = await Collections.create(collectionData)

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "The user id is not provided"
            })
        }






        return res.status(200).json({
            success: true,
            message: "successfully created new collection",
            newCollection
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
exports.deleteBookCollection = async (req, res) => {
    try {


        const { userId } = req.userData;
        const { id } = req.body;
        await Collections.findOneAndDelete({user:userId,_id:id})
        

        return res.status(200).json({
            success: true,
            message: "successfully deleted the collection",
            deletedCollectionId:id

        })
        
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
exports.addItemCollection = async (req, res) => {
    try {


        const { userId } = req.userData;
        const { collectionId, bookId } = req.body;




        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Data is missing"
            })
        }
          await Collections.findByIdAndUpdate(
                collectionId,
                { $addToSet: { books: bookId } },
            )


        return res.status(200).json({
            success: true,
            message: "successfully added the item to the collection",
            
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}
exports.getCurrentCollection = async (req, res) => {
    try {


        const { userId } = req.userData;
        const {id} = req.query;
        
        




        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "Data is missing"
            })
        }
          const currentCollection = await Collections.findById(id).populate("books")
        console.log(currentCollection);
        

        return res.status(200).json({
            success: true,
            message: "successfully got the  collection",
            currentCollection
            
        })
    } catch (error) {
        console.log(error);

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