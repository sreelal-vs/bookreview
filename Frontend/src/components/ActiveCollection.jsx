import { useEffect, useState } from "react";
import { Card, Col, Dropdown, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getCurrentCollectionThunk, updateFavouriteThunk } from "../Redux/bookCollectionSlice";
import { updateStatusThunk } from "../Redux/readingListSlice";
import { GoDotFill } from "react-icons/go";

import { TbHeartFilled } from "react-icons/tb";
import { truncateText } from "../assets/assetsFunction";
import defaultPic from "../assets/defaultcover.png";
import CollectionCover from "./CollectionCover";


const ActiveCollection = () => {
    const { id } = useParams();
    const location = useLocation();
    const domColor = location.state.colour

    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { readingList } = useSelector((state) => state.Library);
    const { fav, currentCollection, loading } = useSelector((state) => state.collection);
    const books = currentCollection?.books;
    const readingMap = new Map()
    const likeMap = new Map();
    // const [domColor, setDomColour] = useState(null);        

    useEffect(() => {

        dispatch(getCurrentCollectionThunk(id));

    }, [dispatch, id])
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

    const readingStatusLabel = {
        "default": "To read",
        "to-read": "To read",
        "reading": "Reading",
        "finished": "Finished"
    };

    const addedBooks = books?.map((item) => {


        const status = readingMap.get(item._id.toString()) || "default";
        const liked = likeMap.get(item._id.toString()) || false;

        return {
            ...item,
            readingStatus: status,
            likeStatus: liked
        }
    })


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
        < div className=" d-flex flex-column align-items-center flex-grow-1 justify-content-center py-5 px-3" style={{ background: `linear-gradient(180deg, rgb(${domColor}) 0%, transparent 100%)` }} >

            <div style={{ display: domColor ? 'none' : 'block', position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <CollectionCover height={300} width={250} Initialbooks={books} />
            </div>

            {loading || !domColor ? (<Row className="loading justify-content-center align-items-center w-100">
                <Spinner animation="border" role="status" >
                    <span className="visually-hidden ">Loading...</span>
                </Spinner>
            </Row>) : (
                <div className="w-100 section-size">
                    <div className="mb-5 py-3 px-5 d-flex justify-content-start w-100 gap-5 bg-body rounded">
                        <div className="rounded overflow-hidden">
                            <CollectionCover height={300} width={250} Initialbooks={books} />
                        </div>
                        <div className="d-flex flex-column justify-content-end">
                            <div>
                                <h1 className="libre-heading collection-name fw-bolder">{currentCollection?.collectionName}</h1>
                                <p className="mono fs-4 fw-bold mb-0">{user?.name?.[0]?.toUpperCase() + user?.name?.slice(1) || ""}&nbsp;<GoDotFill size={10}/>
                                    <span className="fw-medium fs-6">{addedBooks?.length}&nbsp;{addedBooks?.length === 1 ? "book" : "books"}</span>
                                    
                                </p>
                            </div>
                        </div>

                    </div>
                    <Row xs={2} sm={3} lg={4} className=" justify-content-start g-4"  >
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


                                                <div className="fav-btn bg-transparent ms-2  rounded-2 pt-2 " onClick={() => { handleLike(book.likeStatus, book._id) }}>
                                                    <TbHeartFilled className={`mt-1 ${book.likeStatus ? "liked" : "notliked"} ${clickedId == book._id ? "animate" : ""}`} size={24} />
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
                </div>
            )}
        </div >
    )
}


export default ActiveCollection;