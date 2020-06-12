import React, { useContext } from "react";
import { ListingContext } from "../Context";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import placeholder from "../placeholder.png";

function MainContent() {
  const [listings, setListings] = useContext(ListingContext);
  return (
    <main>
      <Container fluid>
        <Row>
          <Col lg={3} className="my-4">
            <ListGroup>
              <ListGroup.Item active>Category 1</ListGroup.Item>
              <ListGroup.Item>Category 2</ListGroup.Item>
              <ListGroup.Item>Category 3</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={9} className="my-4">
            <Row>
              <Col lg={4} md={6} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={placeholder} />
                  <Card.Body>
                    <Card.Title>Item 1</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={6} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={placeholder} />
                  <Card.Body>
                    <Card.Title>Item 2</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={6} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={placeholder} />
                  <Card.Body>
                    <Card.Title>Item 3</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={6} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={placeholder} />
                  <Card.Body>
                    <Card.Title>Item 4</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={6} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={placeholder} />
                  <Card.Body>
                    <Card.Title>Item 5</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={6} xs={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={placeholder} />
                  <Card.Body>
                    <Card.Title>Item 6</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default MainContent;
