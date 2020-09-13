import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container fluid>
      <Row className="my-4">
        <Col lg={12}>
          <h1 id="craigslist-redux">
            Craigslist <small className="text-muted">Redux</small>
          </h1>
          <p>
            Full stack, &quot;modern&quot; recreation of Craigslist with
            features that I wish to add to Craigslist: in-app messaging,
            emphasis on product images, simplified UI/UX, light social features,
            and many more.
          </p>
          <p>
            <em>
              The project is non-commercial, and built soley for personal and
              educational purposes.
            </em>
          </p>
          <h2 id="stack">Stack</h2>
          <p>The site uses the MERN stack: MongoDB, Express, React, Node</p>
          <p>The site is hosted on Heroku.</p>
          <p>
            The code is linted by the airbnb ESlint config:{" "}
            <a href="https://github.com/airbnb/javascript">
              github.com/airbnb/javascript
            </a>
          </p>
          <h2 id="philosophy">Philosophy</h2>
          <blockquote className="blockquote">
            <p>If it ain&#39;t broke, it lacks features.</p>
          </blockquote>
          <p>
            Why recreate Craigslist? Some may argue that the site is perfect for
            its functions, as demonstrated by the longevity and relevance of the
            site. I wholeheartedly agree. I admire the engineers and designers
            at Craigslist: the site is incredibly complex, yet has great
            performance and clarity in UI/UX. I rarely hear criticisms of
            Craigslist for good reasons. The site is truly what the Web should
            strive for. No frills, all gas.
          </p>
          <p>
            However, with the emergence of new used goods sites like{" "}
            <a href="https://www.grailed.com/">Grailed</a>, I wished to combine
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
              <strong>Infinite scrolling:</strong> rather controversial, I do
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
          <h2 id="so-it-s-just-a-mishmash-between-craigslist-and-grailed-">
            So it&#39;s just a mishmash between Craigslist and Grailed?
          </h2>
          <p>
            Yes! I truly love the UI/UX of Grailed, I believe the site really
            set a standard for how product-centric ecommerce sites should look
            and perform. When I talked to the CEO of Grailed in my freshmen year
            of NYU by pretending I was part of a big student club, I never
            forgot what he told me:
          </p>
          <blockquote className="blockquote">
            <p>
              I didn’t know how to build Grailed when I built Grailed. I just
              Googled it. Literally. “How do I build a website where I can do
              this.” There’s so much knowledge on the internet, that you can
              figure anything out if you read about it. Some combination of
              believing yourself and making it happen.
            </p>
          </blockquote>
          <p>
            I internalized the same philosophy building this site. I didn&#39;t
            know the first thing about web development best practices. I simply
            confronted problems as they emerged, solved them by any means
            necessary, and slowly developed the vision for what the site should
            look like, feel like, and perform like. Nothing motivated me to
            build this site than the sake of building a beautiful product I can
            be proud of.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
