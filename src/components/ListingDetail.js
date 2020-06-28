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
import ListingImageCarousel from "./ListingImageCarousel";

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
          <ListingImageCarousel imgs={detail.image} />
        </Col>
        <Col lg={5}>
          <h3>{detail.title}</h3>
          <p>{"$" + detail.price}</p>
          <Button variant="dark" size="md" block>
            Offer
          </Button>
          <Button variant="outline-dark" size="md" block>
            Message
          </Button>
          <p className="font-weight-bold my-4">Description</p>
          <p>{detail.desc}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ListingDetail;
