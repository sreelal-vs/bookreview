import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Row, Spinner } from "react-bootstrap"
import { MdArrowDropDown, MdBookmarkAdd, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { truncateText } from "../assets/assetsFunction"
import defaultPic from "../assets/defaultcover.png"
import { deleteListBookThunk, getReadListBooksThunk, updateStatusThunk } from "../Redux/readingListSlice";
import { TiPlus } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import "../styles/Library.css"
import {  deleteCollectionThunk, getBookCollectionsThunk } from "../Redux/bookCollectionSlice";
import CollectionCover from "../components/CollectionCover";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";


const Library = () => {
    const [sortValue, setSortValue] = useState("title");
    const [sortOrder, setSortOrder] = useState("1");
    const { readListBooks, loading } = useSelector((state) => state.Library);
    const {collections} = useSelector((state) => state.collection);

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
    useEffect(() => {
        dispatch(getBookCollectionsThunk());
        
    }, [dispatch])
    

    const handleStatus = (id, value) => {
        dispatch(updateStatusThunk({ id, value }));
    }
    const handleClose = (id) => {
        dispatch(deleteListBookThunk(id));
    }
    const [modalShow, setModalShow] = useState(false);
    // const handleSubmit = (event) => {
    //     const name = event.target.collectionName.value;
    //     setModalShow(false)
    //     event.preventDefault()
    //     dispatch(createCollectionThunk(name))
    // }
    const handleCollectionDelete = (id) =>{
        dispatch(deleteCollectionThunk(id))
    }
    const navigate = useNavigate();
   const [colors, setColors] = useState({}); 
    const setDomColour = useCallback((colour, id) => {
    setColors((prev) => ({
        ...prev, [id]: colour
    }));
}, []);
    const handleCollectionNav = (id) =>{      
        navigate(`/current-collection/${id}`,{
            state:{colour:colors[id]}
        })
    }
    
   
    
    return (
        <div className="flex-grow-1 d-flex justify-content-center my-5">
            <div className="section-size px-3 px-sm-5 px-lg-0">
                <Row className="w-100 resulthead text-start mt-2 align-items-center">
                    <h2 className="libre-heading ">My bookshelf</h2>
                    <p className="mono fs-6"> Explore books through different genre.Your library awaits</p>
                </Row>
                <Container className="d-flex py-2 bottomborder topborder">
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
                </Container>
                {loading ? (
                    <Row className="loading justify-content-center align-items-center w-100">
                        <Spinner animation="border" role="status" >
                            <span className="visually-hidden ">Loading...</span>
                        </Spinner>
                    </Row>
                ) : (
                    <Container className="read-list-container">
                        <Row xs={2} sm={3} lg={4} className="section-size  g-4 m-0" >

                            {readListBooks?.map((item) => (
                                <Col key={item._id}>
                                    <Card className="border-0">
                                        <div className="card-img-wrap p-3 position-relative">
                                            <div className="dlt-btn bg-body position-absolute rounded-2 z-2 " onClick={() => { handleClose(item._id) }}>
                                                <RiCloseFill size={24} />
                                            </div>
                                            <Card.Img className="library-img" src={item.book.coverpicid ? `https://covers.openlibrary.org/b/id/${item.book.coverpicid}-M.jpg` : defaultPic} />
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


                                                        <Dropdown.Item >Create Collection</Dropdown.Item>

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
                    </Container>
                )}
                <Container>
                    <Row className="topborder py-2 ">
                        <Col>
                            <h3 className="libre-heading fw-bold">My collections</h3>
                            <p className="fs-6">Organize your library into custom lists</p>
                        </Col>
                        <Col className="text-end align-self-center">
                            <Button className="custom-btn border-0" onClick={() => { setModalShow(true) }}>
                                Create New Collection
                            </Button>       
                            <ModalComponent show={modalShow} onHide={()=>{setModalShow(false)}} onSubmit={()=>{setModalShow(false)}}/>
                        </Col>
                    </Row>
                    <Row xs={2} sm={3} lg={4} className="g-4">
                        {collections.map((collection,i)=>(
                            <Col  style={{cursor:"pointer"}}  key={collection._id} onClick={()=>{handleCollectionNav(collection._id,i)}}>
                                <Card>
                                    <CollectionCover Initialbooks={collections[i].books} setDomColour={setDomColour} id={collection._id}/>
                                    <Card.Body >
                                        <Card.Title className="libre-heading fw-semibold">{collection.collectionName}</Card.Title>
                                        <div className="d-flex justify-content-between z-3" > 
                                            <p className="mono m-0 fs-6">{collection.books.length} {collection.books.length <= 1?"book":"books"}</p>
                                            <MdDelete onClick={(e)=>{
                                                e.stopPropagation();
                                                handleCollectionDelete(collection._id)}}/>
                                        </div>
                                    </Card.Body>
                                </Card>
                                
                               
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div >
    )
}

export default Library