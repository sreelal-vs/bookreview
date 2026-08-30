import { useEffect, useState } from "react";
import { Card, Col, Dropdown, Row, Spinner } from "react-bootstrap"
import { MdArrowDropDown, MdBookmarkAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { truncateText } from "../assets/assetsFunction"
import defaultPic from "../assets/defaultcover.png"
import { deleteListBookThunk, getReadListBooksThunk, updateStatusThunk } from "../Redux/readingListSlice";
import { TiPlus } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";



const Library = () => {
    const [sortValue, setSortValue] = useState("title");
    const [sortOrder, setSortOrder] = useState("1");
    const { readListBooks, loading } = useSelector((state) => state.Library);
    const [readingStatus, setReadingStatus] = useState("default");

    const dispatch = useDispatch();
    const handleSelect = (value) => {
        if (value === "1" || value === "-1") {
            setSortOrder(value);

        }
        else {
            setSortValue(value);
        }
    }
    const readingStatusLabel = {
        "default": "All",
        "to-read": "To read",
        "reading": "Reading",
        "finished": "Finished"
    };
    const handleStatusSelect = (value) => {
        setReadingStatus(value)
    }
    useEffect(() => {


        dispatch(getReadListBooksThunk({ readingStatus, sortOrder, sortValue }))
    }, [dispatch, readingStatus, sortOrder, sortValue])
    const handleStatus = (id, value) => {   
                
                    
                dispatch(updateStatusThunk({ id, value }));
        }
     const handleClose = (id) =>{
            dispatch(deleteListBookThunk(id))
        }   
    return (
        <div className="flex-grow-1 d-flex justify-content-center my-5">
            <div className="section-size px-3 px-sm-5 px-lg-0">
                <Row className="w-100 resulthead text-start my-2 align-items-center">
                    <h2 className="libre-heading ">My bookshelf</h2>
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
                        <Col xs={12} md={12} lg={12} className="d-flex">
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle className="rounded-5 heading fw-semibold text-text-black-50">
                                    {sortValue}&nbsp;<MdArrowDropDown />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="title" active={sortValue === "title"} className="ps-3 ">Title</Dropdown.Item>
                                    <Dropdown.Item eventKey="author" active={sortValue === "author"} className="ps-3">Author</Dropdown.Item>
                                    <Dropdown.Item eventKey="1" active={sortOrder === "1"} className="ps-3">Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="-1" active={sortOrder === "-1"} className="ps-3">Descending</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown onSelect={handleStatusSelect} className="ms-1">
                                <Dropdown.Toggle className="rounded-5 heading fw-semibold text-text-black-50">
                                    {readingStatusLabel[readingStatus]}&nbsp;<MdArrowDropDown />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="default" active={readingStatus === "default"} className="ps-3 ">All</Dropdown.Item>
                                    <Dropdown.Item eventKey="to-read" active={readingStatus === "to-read"} className="ps-3 ">To read</Dropdown.Item>
                                    <Dropdown.Item eventKey="reading" active={readingStatus === "reading"} className="ps-3">Reading</Dropdown.Item>
                                    <Dropdown.Item eventKey="finished" active={readingStatus === "finished"} className="ps-3">Finished</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        {readListBooks?.map((item, i) => (
                            <Col key={i}>
                                <Card className="border-0">
                                    <div className="card-img-wrap p-3 position-relative">
                                        <div className="dlt-btn bg-body position-absolute rounded-2 z-2 " onClick={()=>{handleClose(item._id)}}>
                                            <RiCloseFill  size={24}/>
                                        </div>
                                        <Card.Img src={item.book.coverpicid ? `https://covers.openlibrary.org/b/id/${item.book.coverpicid}-M.jpg` : defaultPic} />
                                    </div>
                                    <Card.Body>
                                        <div className="d-flex">
                                            <Dropdown className="my-2 w-100 custom-drop-down readlist-drop" >
                                                <Dropdown.Toggle id="dropdown-autoclose-true" className=" w-100">
                                                    {readingStatusLabel[item.status]}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="w-100">
                                                    <Dropdown.Item onClick={() => handleStatus(item.book._id, "to-read")} active={item.status === "to-read"} disabled={item.status === "to-read"} >To read</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatus(item.book._id, "reading")} active={item.status === "reading"} disabled={item.status === "reading"}>Reading</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleStatus(item.book._id, "finished")} active={item.status === "finished"} disabled={item.status === "finished"}>Finished</Dropdown.Item>
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
                                        </div>
                                        <Card.Title className="libre-heading">{truncateText(item.book.title, 20)}</Card.Title>
                                        <Card.Subtitle className="mt-1 text-black-50">{item.book.author}</Card.Subtitle>
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

export default Library