import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Listing from "./listing/Listing";
import UploadMessages from "./shared/UploadMessages";
import LoadingSpinner from "./shared/LoadingSpinner";
import Sidebar from "./Sidebar";

const Home = () => {
  const [listingData, setListingData] = useState({
    listings: [],
    loading: true,
  });

  // Hooks for infinite scroll
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  // States for sidebar / filter
  const [location, setLocation] = useState();
  // Error message
  const [message, setMessage] = useState("");

  const getListings = (variables) => {
    Axios.post("http://localhost:5000/listings/", variables)
      .then((res) => {
        if (variables.fetchMore === true) {
          setListingData({
            listings: [...listingData.listings, ...res.data],
            loading: false,
          });
        } else {
          setListingData({
            listings: res.data,
            loading: false,
          });
        }

        setHasMore(res.data.length > 0);
      })
      .catch((err) => {
        setMessage("Unable to fetch listings. Please try again");
        console.error(err);
      });
  };

  useEffect(() => {
    const variables = {
      skip,
      limit,
      location,
      fetchMore: true,
    };

    getListings(variables);
  }, []);

  useEffect(() => {
    const variables = {
      skip: 0,
      limit,
      location,
      fetchMore: false,
    };

    getListings(variables);
  }, [location]);

  const fetchMore = () => {
    const newSkip = skip + limit;
    setSkip(newSkip);

    const variables = {
      skip: newSkip,
      limit,
      location,
      fetchMore: true,
    };

    getListings(variables);
  };

  return listingData.loading ? (
    <LoadingSpinner />
  ) : (
    <main>
      <Container fluid>
        <Row>
          {message ? (
            <UploadMessages
              msg={message}
              clearError={() => {
                setMessage(undefined);
              }}
            />
          ) : null}
          <Col xl={2} lg={2} md={12} sm={12} xs={12}>
            <Sidebar setLocation={setLocation} />
          </Col>

          <Col xl={10} lg={10} md={12} sm={12} xs={12}>
            <InfiniteScroll
              dataLength={listingData.listings.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Row>
                {listingData.listings.map((listing) => (
                  <Listing
                    title={listing.title}
                    date={listing.date}
                    desc={listing.desc}
                    price={listing.price}
                    image={listing.image}
                    location={listing.location}
                    cuid={listing.cuid}
                    key={listing.cuid}
                  />
                ))}
              </Row>
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
