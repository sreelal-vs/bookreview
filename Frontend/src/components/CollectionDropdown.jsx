import { Dropdown } from "react-bootstrap"
import { MdBookmarkAdd, MdCreateNewFolder } from "react-icons/md"
import { TiPlus } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"
import ModalComponent from "./ModalComponent"
import { useState } from "react"
import { addItemCollectionThunk } from "../Redux/bookCollectionSlice"

const CollectionDropdown = ({ bookId }) => {


    const { collections } = useSelector((state) => state.collection);
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch();
    const handleAddtoCollection = (collectionId) => {
        dispatch(addItemCollectionThunk({ collectionId, bookId }))
    }
    return (
        <Dropdown className="align-self-center readlist-drop">
            <Dropdown.Toggle id="dropdown-autoclose-true" className="border-0 rounded-0 bg-transparent pt-0 pe-0">
                <MdBookmarkAdd size={20} />
            </Dropdown.Toggle>

            <Dropdown.Menu >

                <Dropdown.Item as="div" onClick={(e) => e.stopPropagation()}>
                    <Dropdown className="align-self-center ">
                        <Dropdown.Toggle style={{ cursor: "pointer" }} as="div" id="dropdown-autoclose-true" className="border-0 rounded-0 bg-transparent p-0">
                            <TiPlus className="mb-1" />
                            Add to collection
                        </Dropdown.Toggle>


                        {collections.length < 1 ? (<Dropdown.Menu className="p-0">
                            <Dropdown.Item>
                                No Collections created
                            </Dropdown.Item>
                        </Dropdown.Menu>) : (<Dropdown.Menu className="p-0">
                            {collections.map(collection => (
                                <Dropdown.Item onClick={() => { handleAddtoCollection(collection._id) }} key={collection._id}>
                                    {collection.collectionName}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>)}
                    </Dropdown>

                </Dropdown.Item>
                <Dropdown.Item onClick={() => { setModalShow(true) }}><MdCreateNewFolder className="mb-1" />Create Collection</Dropdown.Item>
                <ModalComponent show={modalShow} onHide={() => { setModalShow(false) }} onSubmit={() => { setModalShow(false) }} />

            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CollectionDropdown;