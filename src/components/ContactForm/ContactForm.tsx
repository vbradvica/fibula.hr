import * as React from "react";
import classnames from "classnames";
import { default as ReCAPTCHA } from "react-google-recaptcha";
import * as validate from "validate.js";
import { isEmpty } from "lodash";
import { Grid, Header, Button, Container, Icon } from "semantic-ui-react";
import trackEvent from "../../analytics/trackEvent";

const RECAPTCHA_KEY = process.env.GATSBY_SITE_RECAPTCHA_KEY;

function encode(data: any) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

type ContactProps = {};
type ContactState = {
  constraints: any;
  contactMeByFax: string;
  email: string;
  errors: { [key: string]: string };
  gRecaptchaResponse: any;
  isValid: boolean;
  message: string;
  name: string;
  showValidation: boolean;
  subject: string;
  thanksVisible: boolean;
  visited: { [key: string]: boolean };
};

export default class Contact extends React.Component<
  ContactProps,
  ContactState
> {
  state: ContactState = {
    constraints: {
      email: {
        email: {
          message: "Unesena vrijednost nije validna email adresa."
        },
        presence: {
          allowEmpty: false,
          message: "Email je obavezno polje."
        }
      },
      message: {
        presence: { allowEmpty: false, message: "Poruka je obavezno polje." }
      },
      name: {
        presence: { allowEmpty: false, message: "Ime/Naziv je obavezno polje." }
      },
      subject: {
        presence: { allowEmpty: false, message: "Naslov je obavezno polje." }
      }
    },
    contactMeByFax: "",
    email: "",
    errors: {},
    gRecaptchaResponse: "",
    isValid: true,
    message: "",
    name: "",
    showValidation: false,
    subject: "",
    thanksVisible: false,
    visited: {}
  };

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { constraints } = this.state;
    const formInput = e.target as HTMLInputElement;
    const state = { ...this.state, [formInput.name]: formInput.value };
    const errors = validate(state, constraints, { fullMessages: false });
    this.setState({ ...state, errors, isValid: isEmpty(errors) });
  };

  handleBlur = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { visited, constraints } = this.state;
    const formInput =
      (e.target as HTMLInputElement) || (e.target as HTMLTextAreaElement);

    const state = {
      ...this.state,
      visited: {
        ...visited,
        [formInput.name]: true
      }
    };
    const errors = validate(state, constraints, { fullMessages: false });
    this.setState({ ...state, errors, isValid: isEmpty(errors) });
  };

  handleRecaptcha = (value: any) => {
    this.setState({ gRecaptchaResponse: value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { state } = this;
    const { constraints } = this.state;
    const errors = validate(state, constraints, { fullMessages: false });

    this.setState({
      ...state,
      errors,
      isValid: isEmpty(errors),
      showValidation: true
    });

    if (!isEmpty(errors)) {
      return;
    }

    const form = e.target as HTMLFormElement;
    fetch("/", {
      body: encode({
        contactMeByFax: this.state.contactMeByFax,
        email: this.state.email,
        "form-name": "contact",
        "g-recaptcha-response": this.state.gRecaptchaResponse,
        message: this.state.message,
        name: this.state.name,
        subject: this.state.subject
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST"
    })
      .then(r => {
        const { name, message } = this.state;
        trackEvent("Contact Form", "Submit", name, message);
        this.setState({
          contactMeByFax: "",
          email: "",
          errors: {},
          message: "",
          name: "",
          subject: "",
          thanksVisible: true,
          visited: {}
        });
      })
      .catch(err => {
        return;
      });
  };

  toggleThanks = () => {
    this.setState({ thanksVisible: false });
  };

  render() {
    const {
      contactMeByFax,
      email,
      errors,
      gRecaptchaResponse,
      isValid,
      message,
      name,
      showValidation,
      subject,
      thanksVisible,
      visited
    } = this.state;

    return (
      <Container>
        <Grid stackable centered doubling columns="2">
          <Grid.Row>
            <Grid.Column>
              <Header as="h2">Kontaktirajte nas:</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <form
                className="ui form contactForm"
                data-netlify-honeypot="contactMeByFax"
                data-netlify-recaptcha="true"
                data-netlify="true"
                method="POST"
                name="contact"
                onSubmit={this.handleSubmit}
                noValidate
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div className="required field" style={{ display: "none" }}>
                  <label>Odgovorite faksom:</label>
                  <div className="ui input">
                    <input
                      type="input"
                      name="contactMeByFax"
                      placeholder="Fax Number"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      value={contactMeByFax}
                      required
                    />
                  </div>
                </div>
                <div
                  className={classnames({
                    error: Boolean(
                      (visited.name || showValidation) && errors && errors.name
                    ),
                    field: true,
                    required: true
                  })}
                >
                  <label>Ime i prezime / Naziv firme</label>
                  <div className="ui input" style={{ flexDirection: "column" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ime"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      value={name}
                      required
                    />
                    <div className="validation" style={{ marginTop: "0.5rem" }}>
                      {(visited.name || showValidation) &&
                        errors &&
                        errors.name &&
                        errors.name[0]}
                    </div>
                  </div>
                </div>
                <div
                  className={classnames({
                    error: Boolean(
                      (visited.email || showValidation) &&
                        errors &&
                        errors.email
                    ),
                    field: true,
                    required: true
                  })}
                >
                  <label>Email</label>
                  <div className="ui input" style={{ flexDirection: "column" }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="ime@email.hr"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      value={email}
                      required
                    />
                    <div className="validation" style={{ marginTop: "0.5rem" }}>
                      {(visited.email || showValidation) &&
                        errors &&
                        errors.email &&
                        errors.email[0]}
                    </div>
                  </div>
                </div>
                <div
                  className={classnames({
                    error: Boolean(
                      (visited.subject || showValidation) &&
                        errors &&
                        errors.subject
                    ),
                    field: true,
                    required: true
                  })}
                >
                  <label>Naslov</label>
                  <div className="ui input" style={{ flexDirection: "column" }}>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Naslov"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      value={subject}
                      required
                    />
                    <div className="validation" style={{ marginTop: "0.5rem" }}>
                      {(visited.subject || showValidation) &&
                        errors &&
                        errors.subject &&
                        errors.subject[0]}
                    </div>
                  </div>
                </div>
                <div
                  className={classnames({
                    error: Boolean(
                      (visited.message || showValidation) &&
                        errors &&
                        errors.message
                    ),
                    field: true,
                    required: true
                  })}
                >
                  <label>Poruka</label>
                  <div className="ui input" style={{ flexDirection: "column" }}>
                    <textarea
                      rows={5}
                      name="message"
                      placeholder="Vaša poruka"
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      value={message}
                      required
                    />
                    <div className="validation" style={{ marginTop: "0.5rem" }}>
                      {(visited.message || showValidation) &&
                        errors &&
                        errors.message &&
                        errors.message[0]}
                    </div>
                  </div>
                </div>
                <div className="field">
                  <ReCAPTCHA
                    ref="recaptcha"
                    sitekey={RECAPTCHA_KEY}
                    onChange={this.handleRecaptcha}
                  />
                </div>
                <Button
                  disabled={!gRecaptchaResponse || !isValid}
                  primary
                  type="submit"
                >
                  Pošalji
                </Button>
              </form>
            </Grid.Column>
          </Grid.Row>
          {thanksVisible && (
            <div
              style={{
                alignItems: "center",
                backgroundColor: "white",
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                left: 0,
                position: "absolute",
                right: 0,
                textAlign: "left",
                top: 0
              }}
            >
              <div style={{ maxWidth: 500 }}>
                <Button
                  style={{
                    float: "right",
                    marginTop: "calc(2rem - .14285714em)"
                  }}
                  color="black"
                  inverted
                  icon
                  basic
                  onClick={this.toggleThanks}
                >
                  <Icon color="black" name="x" />
                </Button>
                <Header as="h2">Thank you for getting in touch!</Header>
                <p>
                  We appreciate you contacting us. One of our team members will
                  be getting back to you shortly.
                </p>
                <p>
                  While we do our best to answer your queries quickly, it may
                  take a day or two to receive a response from us during peak
                  days.
                </p>
                <p>Thanks in advance for your patience.</p>
                <p>Have a great day!</p>
              </div>
            </div>
          )}
        </Grid>
      </Container>
    );
  }
}
