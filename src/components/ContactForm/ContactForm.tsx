import * as React from "react";
import { default as ReCAPTCHA } from "react-google-recaptcha";
import * as validate from "validate.js";
import { isEmpty } from "lodash";
import {
  Heading,
  Button,
  Icon,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Box,
  FormHelperText,
} from "@chakra-ui/react";
import trackEvent from "../../analytics/trackEvent";

const RECAPTCHA_KEY = process.env.GATSBY_SITE_RECAPTCHA_KEY;

function encode(data: any) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
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
          message: "Unesena vrijednost nije validna email adresa.",
        },
        presence: {
          allowEmpty: false,
          message: "Email je obavezno polje.",
        },
      },
      message: {
        presence: { allowEmpty: false, message: "Poruka je obavezno polje." },
      },
      name: {
        presence: {
          allowEmpty: false,
          message: "Ime/Naziv je obavezno polje.",
        },
      },
      subject: {
        presence: { allowEmpty: false, message: "Naslov je obavezno polje." },
      },
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
    visited: {},
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
        [formInput.name]: true,
      },
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
      showValidation: true,
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
        subject: this.state.subject,
      }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
    })
      .then((r) => {
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
          visited: {},
        });
      })
      .catch((err) => {
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
      visited,
    } = this.state;

    return (
      <>
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
          <Input type="hidden" name="form-name" value="contact" />
          <FormControl mt={3} id="contactMeByFax" isRequired display="none">
            <FormLabel>Odgovorite faksom</FormLabel>
            <Input
              color="whiteAlpha.700"
              name="contactMeByFax"
              error={
                (visited.contactMeByFax || showValidation) &&
                errors.contactMeByFax
              }
              isInvalid={Boolean(
                (visited.contactMeByFax || showValidation) &&
                  errors.contactMeByFax
              )}
              type="input"
              placeholder="Fax Number"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              value={contactMeByFax}
              isRequired
            />
            {Boolean(
              (visited.contactMeByFax || showValidation) &&
                errors.contactMeByFax
            ) && (
              <FormHelperText color="red.500">
                {errors.contactMeByFax?.[0]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mt={3} id="name" isRequired>
            <FormLabel style={{ color: "#FFFFFFAA" }}>
              Ime i prezime / Naziv firme
            </FormLabel>
            <Input
              color="whiteAlpha.700"
              name="name"
              error={(visited.name || showValidation) && errors.name}
              isInvalid={Boolean(
                (visited.name || showValidation) && errors.name
              )}
              type="input"
              placeholder="Ime / naziv firme"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              value={name}
              isRequired
            />
            {Boolean((visited.name || showValidation) && errors.name) && (
              <FormHelperText color="red.500">
                {errors.name?.[0]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mt={3} id="email" isRequired>
            <FormLabel style={{ color: "#FFFFFFAA" }}>Email</FormLabel>
            <Input
              color="whiteAlpha.700"
              name="email"
              error={(visited.email || showValidation) && errors.email}
              isInvalid={Boolean(
                (visited.email || showValidation) && errors.email
              )}
              type="email"
              placeholder="ime@email.hr"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              value={email}
              isRequired
            />
            {Boolean((visited.email || showValidation) && errors.email) && (
              <FormHelperText color="red.500">
                {errors.email?.[0]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mt={3} id="subject" isRequired>
            <FormLabel style={{ color: "#FFFFFFAA" }}>Naslov</FormLabel>
            <Input
              color="whiteAlpha.700"
              name="subject"
              error={(visited.subject || showValidation) && errors.subject}
              isInvalid={Boolean(
                (visited.subject || showValidation) && errors.subject
              )}
              type="text"
              placeholder="Naslov"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              value={subject}
              isRequired
            />
            {Boolean((visited.subject || showValidation) && errors.subject) && (
              <FormHelperText color="red.500">
                {errors.subject?.[0]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl mt={3} id="message" isRequired>
            <FormLabel style={{ color: "#FFFFFFAA" }}>Poruka</FormLabel>
            <Textarea
              color="whiteAlpha.700"
              name="message"
              rows={5}
              error={(visited.message || showValidation) && errors.message}
              isInvalid={Boolean(
                (visited.message || showValidation) && errors.message
              )}
              type="text"
              placeholder="Vaša poruka"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              value={message}
              isRequired
            />
            {Boolean((visited.message || showValidation) && errors.message) && (
              <FormHelperText color="red.500">
                {errors.message?.[0]}
              </FormHelperText>
            )}
          </FormControl>
          <Box mt={3}>
            <ReCAPTCHA
              ref="recaptcha"
              sitekey={RECAPTCHA_KEY}
              onChange={this.handleRecaptcha}
            />
          </Box>
          <Button
            mt={3}
            disabled={!gRecaptchaResponse || !isValid}
            variant="solid"
            colorScheme="whiteAlpha"
            type="submit"
          >
            Pošalji
          </Button>
        </form>
        {thanksVisible && (
          <Box
            alignItems="center"
            bgColor="white"
            bottom={0}
            display="flex"
            flexDir="column"
            justifyContent="center"
            left={0}
            position="absolute"
            right={0}
            textAlign="left"
            top={0}
          >
            <Box maxW={500}>
              <Button
                float="right"
                marginTop="calc(2rem - .14285714em)"
                color="black"
                onClick={this.toggleThanks}
              >
                <Icon color="black" name="x" />
              </Button>
              <Heading size="md">Hvala na javljanju.</Heading>
              <p>Odgovorit ćemo na vaš upit u najkraćem mogućem roku.</p>
              <p>Hvala Vam na strpljenju.</p>
            </Box>
          </Box>
        )}
      </>
    );
  }
}
