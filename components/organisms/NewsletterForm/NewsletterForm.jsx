import { useState } from "react";

import axios from "axios";
import Container from "@/components/atoms/Container";
import Heading from "@/components/atoms/Heading";
import Button from "@/components/atoms/Button";

import styles from "./newsletter-form.module.scss";
import classNames from "classnames";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

//? Create custom hook useNewsletterForm to handle form submissions
//? Use hook for handling fields and state
//! Add Captcha to form ?!

const NewsletterForm = () => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    const { firstname, lastname, email } = contact;

    if (!firstname && !lastname && !email) {
      setValidation(true);
      return;
    }
    setLoading(true);
    await Promise.all([
      axios
        .post("/api/mailchimp/lists/addContact", contact)
        .then((res) => {
          const { data } = res;

          if (data?.error) {
            setSubmission({
              type: "success",
              heading: "Thank you for trying to subscribe",
              message: `However, ${data?.message}`,
            });
          } else {
            setSubmission({
              type: "success",
              heading: "Thank you for subscribing",
              message:
                "You have been sent an email, please confirm your subscription by following the details in the email.",
            });
          }
        })
        .catch((error) => {
          console.error("Error", error);

          setSubmission({
            type: "error",
            heading: "We're sorry...",
            message:
              "An error has occurred with these details. Please send an email to <a href='mailto:help@blackhorsecollective.co.uk'>help@blackhorsecollective.co.uk</a> and we will add you to the list the old fashioned way.",
          });
        })
        .finally(() => {
          setLoading(false);
        }),
    ]);
  };

  const handleInputChange = (event) => {
    const updatedContact = { [event.target.name]: event.target.value };

    setContact((prevState) => {
      return { ...prevState, ...updatedContact };
    });
  };

  return (
    <LoadingOverlayWrapper
      active={loading}
      spinner
      text="Registering..."
      styles={{
        overlay: (base) => ({
          ...base,
          ["background-color"]: "var(--green-dark)",
        }),
      }}
    >
      <section className={styles.component}>
        <Container type="content">
          {!submission ? (
            <>
              <Heading
                className={classNames(
                  styles.component_heading,
                  styles.component_heading_content
                )}
                type="h2"
              >
                Stay in the know
              </Heading>
              <form
                className={classNames(
                  styles.component_form,
                  styles[`component_form_content`]
                )}
                onSubmit={handleFormSubmission}
              >
                <input
                  id="firstname"
                  name="firstname"
                  className={`${styles.component_form_field}
                ${styles[`component_form_field_content`]}
                ${
                  validation &&
                  contact.firstname.length === 0 &&
                  styles.component_form_field_alert
                }`}
                  type="text"
                  placeholder={
                    validation && contact.firstname.length === 0
                      ? "Enter your first name"
                      : "Firstname"
                  }
                  value={contact.firstname}
                  onChange={handleInputChange}
                />
                <input
                  id="lastname"
                  name="lastname"
                  className={`${styles.component_form_field} 
                ${styles[`component_form_field_content`]}
                ${
                  validation &&
                  contact.lastname.length === 0 &&
                  styles.component_form_field_alert
                }`}
                  type="text"
                  placeholder={
                    validation && contact.lastname.length === 0
                      ? "Enter your last name"
                      : "Lastname"
                  }
                  value={contact.lastname}
                  onChange={handleInputChange}
                />
                <input
                  id="email"
                  name="email"
                  className={`${styles.component_form_field}
                ${styles[`component_form_field_content`]}
                ${
                  validation &&
                  contact.email.length === 0 &&
                  styles.component_form_field_alert
                }`}
                  type="email"
                  placeholder={
                    validation && contact.email.length === 0
                      ? "Enter your email address"
                      : "Your email address"
                  }
                  value={contact.email}
                  onChange={handleInputChange}
                />
                <Button
                  className={classNames(styles.component_form_button)}
                  type="block"
                >
                  Sign me up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Heading className={styles.component_heading} type="h2">
                {submission.heading}
              </Heading>
              <div
                className={`${styles.message} ${
                  styles[`message_${submission.type}`]
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: submission.message }} />
              </div>
            </>
          )}
        </Container>
      </section>
    </LoadingOverlayWrapper>
  );
};

export default NewsletterForm;
