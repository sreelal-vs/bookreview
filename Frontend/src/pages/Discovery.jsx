import { Card, Col, Dropdown, Row, Spinner } from "react-bootstrap"
import { truncateText } from "../assets/assetsFunction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import "../styles/Discovery.css"
import { MdArrowDropDown } from "react-icons/md";
import { TbHeartFilled } from "react-icons/tb";
import { LiaCommentsSolid } from "react-icons/lia";
import { discoveryAsyncThunk, refresh } from "../Redux/bookSlice";
import defaultPic from "../assets/defaultcover.png";
import { getListBookThunk, updateStatusThunk } from "../Redux/readingListSlice";
import { getBookCollectionsThunk, getFavouriteBooksThunk, updateFavouriteThunk } from "../Redux/bookCollectionSlice";
import CollectionDropdown from "../components/CollectionDropdown";
import StarRating from "../components/StarRating";
import ReviewModal from "../components/ReviewModal";
// import Review from "../components/Review";



const Discovery = () => {


    const [sortValue, setSortValue] = useState("title");
    const [sortOrder, setSortOrder] = useState("1");
    const [pageNum, setpageNum] = useState(1);


    const { isAuthenticated } = useSelector((state) => state.auth);
    const { readingList } = useSelector((state) => state.Library);
    const { fav } = useSelector((state) => state.collection);
    const { books, loading } = useSelector((state) => state.book);




    const readingMap = new Map()
    const likeMap = new Map();


    const readingStatusLabel = {
        "default": "To read",
        "to-read": "To read",
        "reading": "Reading",
        "finished": "Finished"
    };

    const dispatch = useDispatch();
    const isFetch = useRef(false);
    const scrollY = useRef(0);


    const handleSelect = (value) => {

        dispatch(refresh(true))
        setTimeout(() => {
            dispatch(refresh(false));
        }, 1000);
        if (value === "1" || value === "-1") {
            setSortOrder(value);

        }
        else {
            setSortValue(value);
        }
        isFetch.current = false;

    }
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getListBookThunk())
            dispatch(getFavouriteBooksThunk())
            dispatch(getBookCollectionsThunk());

        }
        return
    }, [dispatch, isAuthenticated])
    useEffect(() => {
        if (isFetch.current) return;
        scrollY.current = window.scrollY;
        dispatch(discoveryAsyncThunk({ sortOrder, sortValue, pageNum }));

        isFetch.current = true

    }, [sortOrder, sortValue, pageNum, dispatch])

    readingList.forEach(item => {
        if (item.book?._id) {
            readingMap.set(item.book._id.toString(), item.status)
        }
        return
    });



    fav?.books?.forEach(item => {
        if (item) {
            likeMap.set(item?._id.toString(), true);
        }

        return
    })



    const addedBooks = books.map((item) => {


        const status = readingMap.get(item._id.toString()) || "default";
        const liked = likeMap.get(item._id.toString()) || false;

        return {
            ...item,
            readingStatus: status,
            likeStatus: liked
        }
    })




    useEffect(() => {
        window.scrollTo(0, scrollY.current);
    }, [books]);

    const [clickedId, setClickedId] = useState(null);
    const handleStatus = (id, value) => {
        dispatch(updateStatusThunk({ id, value }));
    }

    const handleLike = (liked, id) => {
        setClickedId(id);
        dispatch(updateFavouriteThunk({ liked, id }))
    }
    useEffect(() => {
        if (!clickedId) return;
        const timer = setTimeout(() => {
            setClickedId(null);
        }, 300);
        return (() => {
            clearTimeout(timer)
        })
    })

    const [reviewingBookId, setReviewingBookId] = useState(null);


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
                        <Col xs={12} md={12} lg={12}>
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
                        </Col>
                        {addedBooks.map((book, i) => (
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

                                                <CollectionDropdown bookId={book._id} />
                                                <div className="fav-btn bg-transparent  rounded-2 pt-2 " onClick={() => { handleLike(book.likeStatus, book._id) }}>
                                                    <TbHeartFilled className={`mt-1 ${book.likeStatus ? "liked" : "notliked"} ${clickedId == book._id ? "animate" : ""}`} size={20} />
                                                </div>
                                            </div>


                                        )}
                                        <Card.Title className="libre-heading">{truncateText(book.title, 20)}</Card.Title>
                                        <Card.Subtitle className="mt-1 text-black-50">{book.author}</Card.Subtitle>
                                        {isAuthenticated && (
                                            <Row>
                                                <Col className="heading pe-0 flex-grow-0 mx-1">
                                                    <div onClick={() => { setReviewingBookId(book._id) }} className="review-btn px-1 mt-1 d-flex justify-content-between align-items-center"><LiaCommentsSolid /><span>Reviews</span></div>
                                                    <ReviewModal bookId={book._id} show={reviewingBookId === book._id}  onHide={() => { setReviewingBookId(null) }} />
                                                </Col>
                                                <Col className="p-0 flex-wrap-1">
                                                    <StarRating readOnly={true} starCount={book.avgrating} />
                                                </Col>
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                <div className="text-center mt-4">
                    <button className="custom-btn border-0 px-3 mono text-white rounded-5" onClick={() => {
                        isFetch.current = false
                        setpageNum(p => p + 1)
                    }}>Load more</button>
                </div>
            </div>
        </div>


    )
}

export default Discovery;

