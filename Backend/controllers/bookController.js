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
        });
        
        try {
             await Book.insertMany(books, { ordered: false });
             
              return res.status(200).json({
                success: true,
                message: "Books added successfully without duplication error",
                books
            })
            
        } catch (error) {
            if (error.code === 11000 || error.writeErrors) {
                
                return res.status(200).json({
                    success: true,
                    message: "Books added successfully with duplication error",
                    
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
        let { q, limit, offset } = req.query;
        

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
                books:[],

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
            }, {
                $skip: offset
            },
            {
                $limit: limit
            }

        ]);

        

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

exports.discoveryResults = async (req, res) => {
    try {
        let { offset, limit, sortValue, sortOrder,pageNum } = req.query
        offset = parseInt(offset);
        limit = parseInt(limit);
        sortOrder = parseInt(sortOrder);
        pageNum = parseInt(pageNum);

        
        
        if(!sortValue||!sortOrder||!pageNum){
            return res.status(400).json({
                success:false,
                message:"something missing from query"
            })
        }
        const totalcount = await Book.countDocuments();
        const totalPages = Math.ceil(totalcount/20);
        if(pageNum>totalPages)
        {
            return  res.status(200).json({
                success:false,
                message:"no more pages to load"
            })
        }
        
        
        const books = await Book.aggregate([
            { $sort: { [sortValue]: Number(sortOrder) } },
            { $skip: offset },
            { $limit: limit }
        ])


            
            
            
            
            
            return  res.status(200).json({
                success:false,
                message:"got books successfully",
                books
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}