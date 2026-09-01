import { Card, Col, Dropdown, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchAsyncThunk } from "../Redux/bookSlice";
import "../styles/Cardimg.css"
import { truncateText } from "../assets/assetsFunction";
import defaultPic from "../assets/defaultcover.png";
import { MdBookmarkAdd } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { getListBookThunk, updateStatusThunk } from "../Redux/readingListSlice";
import { TbHeartFilled } from "react-icons/tb";
import { getFavouriteBooksThunk, updateFavouriteThunk } from "../Redux/bookCollectionSlice";

const Bookresults = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const Query = searchParams.get("q")
    const page = Number(searchParams.get("page"));

    useEffect(() => {
        dispatch(searchAsyncThunk({ Query, page }))
    }, [dispatch, page, Query])
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getListBookThunk())
            dispatch(getFavouriteBooksThunk())
        }
        return
    }, [dispatch, isAuthenticated])




    const { readingList } = useSelector((state) => state.Library);
    const { fav } = useSelector((state) => state.collection);
    const { books, loading } = useSelector((state) => state.book);


    const readingMap = new Map()
    const likeMap = new Map();





    readingList.forEach(item => {
        if (item.book._id) {
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

    const readingStatusLabel = {
        "default": "To read",
        "to-read": "To read",
        "reading": "Reading",
        "finished": "Finished"
    };
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


    return (
        <div className="flex-grow-1 d-flex flex-column align-items-center  px-3 px-sm-5 ">
            <Row className="w-75 resulthead">
                <h2 className="libre-heading ">Result for <span className="fs-6">"{Query}"</span></h2>
            </Row>
            {loading ? (
                <Row className="loading justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            ) : (
                <Row xs={2} sm={3} lg={4} className="section-size topborder g-4">

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
                                                <TbHeartFilled className={`mt-1 ${book.likeStatus ? "liked" : "notliked"} ${clickedId == book._id ? "animate" : ""}`} size={20} />
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
            <Row>
                <Pagination />
            </Row>
        </div>
    )
}

export default Bookresults;