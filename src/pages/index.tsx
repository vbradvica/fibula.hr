import * as React from "react";
import { Link } from "gatsby";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import {
  Segment,
  Container,
  Grid,
  Header,
  Icon,
  Embed,
} from "semantic-ui-react";

import ContactForm from "../components/ContactForm/ContactForm";

const GATSBY_SITE_MAPS_KEY = process.env.GATSBY_SITE_MAPS_KEY;

const IndexPage = (props: LayoutProps) => (
  <div>
    {/* Master head */}
    <Segment
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch"
      }}
      vertical
      inverted
      textAlign="center"
      className="masthead"
    >
      <HeaderMenu
        Link={Link}
        pathname={props.location.pathname}
        items={menuItems}
        inverted
      />
      <Container
        style={{
          flexGrow: 1,
          display: "flex",
          // width: "100%",
          alignContent: "stretch",
          alignItems: "stretch"
        }}
      >
        <Grid columns="2" stackable style={{ width: "100%" }}>
          <Grid.Row>
            <Grid.Column verticalAlign="middle" textAlign="left">
              <Header inverted as="h1">
                Fibula d.o.o.
              </Header>
              <Header inverted as="h2">
                CNC obrada metala i plastike
              </Header>
              <Header inverted as="h3" style={{ marginTop: "3rem" }}>
                tel: +385 1 349 69 12
              </Header>
              <Header
                inverted
                as="h3"
                style={{ marginTop: "1.5rem", marginBottom: "0.1rem" }}
              >
                Samoborska cesta 145
              </Header>
              <Header inverted as="h3" style={{ marginTop: "0.1rem" }}>
                10090, Zagreb
              </Header>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Embed
                aspectRatio="4:3"
                active
                url={`https://www.google.com/maps/embed/v1/place?key=${GATSBY_SITE_MAPS_KEY}&q=Fibula%20d.o.o.&zoom=14`}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>

    {/* About this starter */}
    <Segment vertical className="stripe">
      <Container>
        <Header color="blue" as="h2">
          Usluge
        </Header>
        <Grid stackable stretched verticalAlign="top">
          <Grid.Row>
            <Grid.Column width="8">
              <div
                style={{
                  opacity: 0.7,
                  height: 175,
                  width: "100%",
                  backgroundImage: `url(${require("../assets/mill.jpg")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              />
              <Header>CNC glodanje</Header>
              <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Naši moderni CNC obradni centri pružaju odlične perfomanse
                glodanja metala i plastike. Kvaliteta izrade rezultira visoko
                kvalitetnim finalnim proizvodom.
              </p>
              <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Maksimalna veličina izratka: <b>1500 x 660 mm</b>
              </p>
              {/* <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Materijali:
                <ul>
                  <li>45% aluminij</li>
                  <li>30% nehrđajući čelik</li>
                  <li>15% plastika</li>
                  <li>5% mesing</li>
                  <li>5% ostali materijali</li>
                </ul>
              </p> */}
            </Grid.Column>
            <Grid.Column width="8">
              <div
                style={{
                  opacity: 0.7,
                  height: 175,
                  width: "100%",
                  backgroundImage: `url(${require("../assets/lathe.jpg")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              />
              <Header>CNC tokarenje</Header>
              <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Pružamo visoku fleksibilnost i kvalitetu obrade na našim CNC
                obradnim centrima za tokarenje.
              </p>
              <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Maksimalna veličina izratka: <b>1500 x 660 mm</b>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="8">
              <div
                style={{
                  opacity: 0.7,
                  height: 175,
                  width: "100%",
                  backgroundImage: `url(${require("../assets/lathe.jpg")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              />
              <Header>Dolor sit amet</Header>
              <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                laudantium ad, quae, perspiciatis ipsa distinctio.
              </p>
            </Grid.Column>
            <Grid.Column width="8">
              <div
                style={{
                  opacity: 0.7,
                  height: 175,
                  width: "100%",
                  backgroundImage: `url(${require("../assets/lathe.jpg")})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center"
                }}
              />
              <Header>Dolor sit amet</Header>
              <p style={{ color: "#6C6C6C", fontSize: "1.15rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
                laudantium ad, quae, perspiciatis ipsa distinctio.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>

    <Segment vertical className="stripe alternate feature">
      <Container>
        <Header color="blue" as="h2" style={{ marginBottom: "3rem" }}>
          Materijali
        </Header>
        <Grid
          columns="5"
          textAlign="center"
          divided
          relaxed
          stackable
          className="container"
        >
          <Grid.Row>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard" />
                Aluminij
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard" />
                Nehrđajući čelik
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard" />
                Plastika
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard" />
                Mesing
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header icon>
                <Icon name="wizard" />
                Ostali metali
              </Header>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas eaque at quae cupiditate aspernatur quibusdam!
                Distinctio quod non, harum dolorum earum molestias, beatae
                expedita aliquam dolorem asperiores nemo amet quaerat.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>

    {/* Key features */}
    <Segment vertical className="stripe feature">
      <ContactForm />
    </Segment>
  </div>
);

export default withLayout(IndexPage);
