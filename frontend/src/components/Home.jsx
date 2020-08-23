import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Listing from "./listing/Listing";
import UploadMessages from "./shared/UploadMessages";
import LoadingSpinner from "./shared/LoadingSpinner";
import Sidebar from "./Sidebar";
import UserContext from "../context/UserContext";
import { isDefined } from "../utils/null-checks";

const Home = () => {
  const { userData } = useContext(UserContext);

  const [listingData, setListingData] = useState({
    listings: [],
    loading: true,
  });

  // Determines whether user is logged in, then set location
  const decideLocation = () => {
    if (isDefined(userData.user)) {
      return userData.user.location;
    }

    return undefined;
  };

  // Hooks for infinite scroll
  const [skip, setSkip] = useState(0);
  const [limit] = useState(12);
  const [hasMore, setHasMore] = useState(true);
  // States for sidebar / filter
  const [location, setLocation] = useState(decideLocation);
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

        setHasMore(res.data.length === limit);
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
    <LoadingSpinner className="centered-on-page-spinner" />
  ) : (
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
          <Sidebar
            location={location}
            setLocation={setLocation}
            setSkip={setSkip}
          />
        </Col>

        <Col xl={10} lg={10} md={12} sm={12} xs={12}>
          <InfiniteScroll
            dataLength={listingData.listings.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={
              <div className="text-center">
                <LoadingSpinner />
              </div>
            }
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
                  key={listing._id}
                  id={listing._id}
                />
              ))}
            </Row>
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
