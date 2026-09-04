const Review = require("../models/reviewModel");
const Book = require("../models/bookModel")


// exports.getReviews = async (req, res) => {
//     try {
//         const { id } = req.query;
//         if (!id) {
//             return res.status(404).json({
//                 success: false,
//                 message: "id is not found"
//             })
//         }
//         const reviews = await Review.find({ book: id }).populate("user");
        

//         if (reviews.length === 0) {
//             return res.status(200).json({
//                 success: true,
//                 message: "No reviews for this book yet",
//             })
//         } else {

//             return res.status(200).json({
//                 success: true,
//                 message: "reviews fetched successfully",
//                 reviews
//             })
//         }

//     } catch (error) {
//         return res.status(500).json({
//             success: true,
//             message: error.message
//         })
//     }
// }

exports.createReview = async (req, res) => {
    try {
        const { userId } = req.userData;
        const { review, bookId, starCount } = req.body;



        const newreview = await Review.create({
            user: userId,
            book: bookId,
            rating: starCount,
            content: review
        });
        const populatedReview = await newreview.populate("user");
        
        const result = await Review.find({ book: bookId })
        const avgRating = result.length ? Math.ceil(result.reduce((sum, item) => {
            sum = sum + item.rating
            return sum
        }, 0) / result.length) : 0;
        await Book.findByIdAndUpdate(
            bookId,
            {avgrating:avgRating},
           
        )

       
        console.log(avgRating);
        
        return res.status(200).json({
            success: true,
            message: "reviews fetched successfully",
            avgRating,
            bookId,
            newreview:populatedReview
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}


exports.getReviews = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "id is not found"
            })
        }
        const reviews = await Review.find({ book: id }).populate("user");
        

        if (reviews.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No reviews for this book yet",
            })
        } else {

            return res.status(200).json({
                success: true,
                message: "reviews fetched successfully",
                reviews
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
}

exports.updateReview = async (req, res) => {
    try {
        
        const { review, reviewId, starCount } = req.body;



        const newreview = await Review.findByIdAndUpdate(reviewId,{
            content:review,
            rating:starCount
        },
    {returnDocument:"after"});
        
        const result = await Review.find({ book: newreview.book });
        const avgRating = result.length ? Math.ceil(result.reduce((sum, item) => {
            sum = sum + item.rating
            return sum
        }, 0) / result.length) : 0;
        await Book.findByIdAndUpdate(
            newreview.book,
            {avgrating:avgRating},          
        )


        
        return res.status(200).json({
            success: true,
            message: "reviews updated successfully",
            avgRating,
            bookId:newreview.book,
            newreviewContent:newreview.content,
            reviewId:newreview._id,
            newRating:newreview.rating
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteReview = async (req, res) => {
    try {
        
        const { id } = req.query;
        console.log(id);



        const deletedReview = await Review.findByIdAndDelete(id);
        console.log(deletedReview);
        
        const result = await Review.find({ book: deletedReview.book });
        const avgRating = result.length ? Math.ceil(result.reduce((sum, item) => {
            sum = sum + item.rating
            return sum
        }, 0) / result.length) : 0;
        await Book.findByIdAndUpdate(
            deletedReview.book,
            {avgrating:avgRating},          
        )


        
        return res.status(200).json({
            success: true,
            message: "reviews updated successfully",
            avgRating,
            bookId:deletedReview.book,
            reviewId:deletedReview._id,
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}