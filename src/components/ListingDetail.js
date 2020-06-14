import React, { useContext } from "react";
import { ListingContext } from "../Context";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Carousel,
  Badge,
  Button,
} from "react-bootstrap";

function ListingDetail() {
  const { contextDetail } = useContext(ListingContext);
  const [detail, setDetail] = contextDetail;

  return (
    <Container fluid className="my-4">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{detail.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col lg={7}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col lg={5}>
          <h3>
            {detail.title}
            <Badge variant="secondary">${detail.price}</Badge>
          </h3>
          <Button variant="outline-primary">Reply</Button> <p>{detail.desc}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ListingDetail;
