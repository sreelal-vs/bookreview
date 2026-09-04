import { Card, Col, Dropdown, Row, Spinner } from "react-bootstrap";
import { TbHeartFilled } from "react-icons/tb";
import { truncateText } from "../assets/assetsFunction";
import { TiPlus } from "react-icons/ti";
import { MdBookmarkAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getFavouriteBooksThunk, updateFavouriteThunk } from "../Redux/bookCollectionSlice";
import { getListBookThunk, updateStatusThunk } from "../Redux/readingListSlice";
import { useEffect } from "react";
import defaultPic from "../assets/defaultcover.png";


const FavouriteBooks = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { readingList } = useSelector((state) => state.Library);
    const { fav, loading } = useSelector((state) => state.collection);
    
    
    
    const books = fav.books;
    
    


    const readingMap = new Map()
    const likeMap = new Map();

    const dispatch = useDispatch();


    const readingStatusLabel = {
        "default": "To read",
        "to-read": "To read",
        "reading": "Reading",
        "finished": "Finished"
    };

    readingList?.forEach(item => {
        if (item.book?._id) {
            readingMap.set(item.book._id.toString(), item.status)
        }
        return
    });
    books?.forEach(item => {
        if (item) {
            likeMap.set(item?._id.toString(), true);
        }

        return
    });
    useEffect(() => {
            if(isAuthenticated){
                dispatch(getListBookThunk())
                dispatch(getFavouriteBooksThunk())
            }
            return
        }, [dispatch,isAuthenticated])
    const handleStatus = (id, value) => {
        dispatch(updateStatusThunk({ id, value }));
    }

    const handleLike = (liked, id) => {
        dispatch(updateFavouriteThunk({ liked, id }))
    }
    const addedBooks = books?.map((item) => {


        const status = readingMap.get(item._id?.toString()) || "default";
        const liked = likeMap.get(item._id?.toString()) || false;

        return {
            ...item,
            readingStatus: status,
            likeStatus: liked
        }
    })
  
    
    return (
        <div className="flex-grow-1 d-flex justify-content-center my-5">
            <div className="section-size px-3 px-sm-5 px-lg-0">
                <Row className="w-100 resulthead text-center my-5 align-items-center">
                    <h2 className="libre-heading ">Find your next adventure</h2>
                    <p className="mono fs-6"> Explore books through different genre.Your library awaits</p>
                </Row>
                {loading ? (
                    <Row className="loading justify-content-center align-items-center w-100">
                        <Spinner animation="border" role="status" >
                            <span className="visually-hidden ">Loading...</span>
                        </Spinner>
                    </Row>
                ) : (
                    <Row xs={2} sm={3} lg={4} className="section-size topborder g-4 m-0" >
                        {/* <Col xs={12} md={12} lg={12}>
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle className="rounded-5 heading fw-semibold text-text-black-50">
                                    {sortValue}&nbsp;<MdArrowDropDown />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="title" active={sortValue === "title"} className="ps-3 ">Title</Dropdown.Item>
                                    <Dropdown.Item eventKey="author" active={sortValue === "author"} className="ps-3">Author</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="1" active={sortOrder === "1"} className="ps-3">Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="-1" active={sortOrder === "-1"} className="ps-3">Descending</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col> */}
                        {addedBooks?.map((book, i) => (
                            <Col key={i}>

                                <Card className="border-0">
                                    <div className="card-img-wrap p-3 ">

                                        <Card.Img src={book.coverpicid ? `https://covers.openlibrary.org/b/id/${book.coverpicid}-M.jpg` : defaultPic} />
                                    </div>

                                    <Card.Body>
                                        {isAuthenticated && (
                                            <div className="d-flex">
                                                <Dropdown className="my-2 w-100 custom-drop-down readlist-drop" >
                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className=" w-100">
                                                        {readingStatusLabel[book.readingStatus]}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="w-100">
                                                        <Dropdown.Item onClick={() => handleStatus(book._id, "to-read")} active={book.readingStatus === "to-read"} disabled={book.readingStatus === "to-read"} >To read</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleStatus(book._id, "reading")} active={book.readingStatus === "reading"} disabled={book.readingStatus === "reading"}>Reading</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleStatus(book._id, "finished")} active={book.readingStatus === "finished"} disabled={book.readingStatus === "finished"}>Finished</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <Dropdown className="align-self-center readlist-drop">
                                                    <Dropdown.Toggle id="dropdown-autoclose-true" className="border-0 rounded-0 bg-transparent pt-0 pe-0">
                                                        <MdBookmarkAdd size={20} />

                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu >
                                                        {/* create new collection */}
                                                        <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                                                            <Dropdown className="align-self-center ">
                                                                <Dropdown.Toggle id="dropdown-autoclose-true" className="border-0 rounded-0 bg-transparent p-0">
                                                                    <TiPlus className="mb-1" />

                                                                    Add to collection
                                                                </Dropdown.Toggle>

                                                                <Dropdown.Menu >
                                                                    <Dropdown.Item >
                                                                        Create playlist
                                                                    </Dropdown.Item>

                                                                </Dropdown.Menu>
                                                            </Dropdown>

                                                        </Dropdown.Item>
                                                        {/* create new collection */}


                                                        <Dropdown.Item >Add to favourite</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <div className="fav-btn bg-transparent  rounded-2 pt-2 " onClick={() => { handleLike(book.likeStatus, book._id) }}>
                                                    <TbHeartFilled className={`mt-1 ${book.likeStatus ? "liked" : "notliked"}`} size={20} />
                                                </div>
                                            </div>


                                        )}
                                        <Card.Title className="libre-heading">{truncateText(book.title, 20)}</Card.Title>
                                        <Card.Subtitle className="mt-1 text-black-50">{book.author}</Card.Subtitle>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}

            </div>
        </div>
    )
}

export default FavouriteBooks;