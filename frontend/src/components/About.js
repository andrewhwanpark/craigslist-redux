import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h1>Craigslist Redux</h1>
          <p>
            Full stack recreation of Craigslist with modern features that we
            wish to add to Craigslist: in-app messaging, minimal social
            features, and many more.
          </p>
          <p>
            <em>
              The project is non-commercial, and built soley for personal and
              educational purposes.
            </em>
          </p>
          <h2>Philosophy</h2>
          <blockquote>
            <p>If it ain&#39;t broke, it lacks features.</p>
          </blockquote>
          <p>
            Why recreate Craigslist? Some may argue that the site is perfect for
            its functions, as demonstrated by the longevity and relevance of the
            site. We wholeheartedly agree. We admire the engineers and designers
            at Craigslist: the site is incredibly complex, yet has great
            performance and clarity in UI/UX. We rarely hear criticisms of
            Craigslist for good reasons. The site is truly what the Web should
            strive for. No frills, all gas.
          </p>
          <p>
            However, with the emergence of new used goods sites like{" "}
            <a href="https://www.grailed.com/">Grailed</a>, we wished to combine
            some modern elements of used goods sites like Grailed with
            craigslist.
          </p>
          <p>
            For those unaware of <a href="https://www.grailed.com/">Grailed</a>,
            here are some reasons why we believe they have been so successful:
          </p>
          <ul>
            <li>
              <strong>Minimal and consistent UI/UX</strong>
            </li>
            <li>
              <strong>Emphasis on product images:</strong> reading an eBay
              listing feels like reading technical documentation.
            </li>
            <li>
              <strong>Infinite scrolling:</strong> rather controversial, we do
              concede some sites work better without infinite scrolling.
            </li>
            <li>
              <strong>In app messaging:</strong> intuitive and easy
              categorization of different and concurrent conversations users are
              having between each other. Craigslist still relies on email
              communication. eBay&#39;s messaging portal is just disgusting.
            </li>
            <li>
              <strong>Favorites:</strong> you can add any listing to your
              personal &quot;Favorites&quot; and keep track of them in one page,
              and get notifications when prices change. In the same page, you
              can keep track of sellers you follow.
            </li>
            <li>
              <strong>Seller branding:</strong> sellers can add profile pictures
              and usernames. You can also add profile pictures in eBay, but when
              do you ever see them? I don&#39;t even know if I have a profile
              picture uploaded on eBay. But I don&#39;t know or care since I
              never come across it.
            </li>
            <li>
              <strong>Price drops and bump:</strong> You can perform 2 actions
              to your listings. Drop the price by n%, or bump the listing to the
              top every week. Try this very simple action on eBay. Price
              dropping takes around 10 clicks, and bumping is non-existant.
            </li>
            <li>
              <strong>Comments on listings:</strong> Comments allow sellers to
              broadcast information or answer specific FAQs. Comments also allow
              buyers to publically broadcast information about the listing.
              I&#39;ve had times where I found out the product is fake thanks to
              comments left by users.
            </li>
          </ul>
          <h2>Stack</h2>
          <p>We are using the MERN stack: MongoDB, Express, React, Node</p>
          <h2>TBD</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
