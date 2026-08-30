import { Col, Image, Row } from "react-bootstrap";

const Aboutus = () => {
    return (
        <div className="flex-grow-1 d-flex justify-content-center">
            <div className="section-size px-3 px-sm-5 px-lg-0 d-flex flex-column">
                <Row sm={2} className="flex-grow-1 explore row-cols-1 py-5 mx-0">
                    <Col className="d-flex flex-column justify-content-center ">
                        <h3 className="libre-heading">Your personal <br />library,<br />reimagined</h3>
                        <p className="mono py-3">
                            BookNest was born from a simple desire: to restore the quiet dignity of the personal library in a noisy digital age. We believe that tracking your reading journey shouldn't feel like a chore or a social media competition. It should feel like running your fingers along the spines of well-loved books.
                        </p>
                        
                    </Col>
                    <Col>
                        <div className="px-lg-4 py-4">
                            <Image className="object-fit-cover rounded-4" height="400px" width="100%" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-R0pGI2eBBhiVLIA-dCIWYdVIzwHnavSojTLjx2-o5N1qE2GweS4EIizLuFcZ0q6dsJBKEmqmacvsL1k7bXJmvDgfL6LFP7yihI04q-Dao6Z5apElwOo6HzYXQor_DEfINtagvDB-bJJK0QtlOe-AxlmB--Kqf6JjH6mxXwUWXwzrnzyZBi8URJ-MqnHbAm0OJ6lR9GYFaZfDPF243Bkd4P_CSGA6A_YYH0nqzqfl-R-6waFv7qZB"  />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )

}

export default Aboutus;
