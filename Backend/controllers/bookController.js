const Book = require("../models/bookModel");

exports.addBooks = async (req, res) => {
    try {
        const books = req.body;


        const { q } = req.query;
        if (!books) {
            return res.status(400).json({
                success: false,
                message: "Failed to get books"
            })
        }
        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Qeury not found"
            })
        }

        books.sort((a, b) => {
            let title1 = a?.title?.toLowerCase() || "";
            let title2 = b?.title?.toLowerCase() || "";
            const query = q.toLowerCase();

            const getPriority = (title) => {
                if (title.startsWith(query)) return 2;
                if (title.includes(query)) return 1;

                return 0;

            }

            return getPriority(title2) - getPriority(title1)
        })

        try {
            await Book.insertMany(books, { ordered: false })
        } catch (error) {
            if(error.code === 11000 || error.writeErrors) {
                books.slice(0, 20);
                return res.status(200).json({
                    success: true,
                    message: "Books added successfully",
                    books
                })
            }
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
exports.bookResults = async (req, res) => {
    try {
        let { q,limit,offset } = req.query;
        console.log(offset);
        
        limit = parseInt(limit);
        offset = parseInt(offset);
        


        if (!q) {
            return res.status(400).json({
                success: false,
                message: "query not found"
            })
        }
        const numFound = await Book.countDocuments({
            title: { $regex: `${q}`, $options: "i" }
        });

        const checkingAvailability = await Book.countDocuments({
            title: { $regex: `^${q}`, $options: "i" }
        });
        if (!checkingAvailability) {
            return res.status(200).json({
                success: false,
                message: "No such book in database",
                books: [],

            })
        }

        const books = await Book.aggregate([
            {
                $addFields: {
                    score: {
                        $cond: [
                            { $regexMatch: { input: "$title", regex: `^${q}`, options: "i" } },
                            2,
                            {
                                $cond: [
                                    { $regexMatch: { input: "$title", regex: `${q}`, options: "i" } },
                                    1,
                                    0
                                ]
                            }
                        ]
                    }
                }

            },
            {
                $match:
                {
                    score: { $gt: 0 }
                }
            },
            {
                $sort: { score: -1 }
            },{
                $skip:offset
            },
            {
                $limit:limit
            }

        ]);

        console.log(books);
        
        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            books,
            numFound
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}