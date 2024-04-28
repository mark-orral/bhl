import { useFormik } from "formik";
import classNames from "classnames";
import * as Yup from "yup";
import Container from "@/components/atoms/Container";
import Heading from "@/components/atoms/Heading";
import Button from "@/components/atoms/Button";

import styles from "./register-form.module.scss";
import { postRegisterUser } from "@/lib/services/strapi/company-admin/postCompanyAdmin";
import { createRef, useState } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import { GOOGLE_CAPTCHA_SITE_KEY } from "@/lib/utils/constants";
import ReCAPTCHA from "react-google-recaptcha";
import SinglePageText from "@/components/molecules/SinglePageText";

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
const categoryMap = {
  business: "Register a business",
  space: "List a space",
};
const RegisterForm = ({ type, category }) => {
  const recaptchaRef = createRef(null);
  const [submission, setSubmission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const token = await recaptchaRef.current.executeAsync();
        const { data } = await postRegisterUser(values, token);
        setUser(data);
        setSubmission(true);
      } catch (e) {
        console.error(e);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section
      className={classNames(
        styles.component,
        styles[`component_${type}`],
        styles[`component_${category}`]
      )}
    >
      <Container type={type}>
        <LoadingOverlay
          active={loading}
          spinner
          text="Registering..."
          styles={{
            overlay: (base) => ({
              ...base,
              ["background-color"]:
                category === "spaces"
                  ? "var(--pink)"
                  : category === "business"
                  ? "var(--grey-dark)"
                  : "var(--green-dark)",
            }),
          }}
        >
          <Heading
            className={classNames(
              styles.component_heading,
              styles[`component_heading_${type}`]
            )}
            type="h2"
          >
            {categoryMap[category] || "Register"}
          </Heading>
          {!submission ? (
            <>
              {type === "single" && (
                <SinglePageText
                  jsxChildren={
                    <>
                      <p className={styles.component_description}>
                        If you are interested in signing up to our business
                        directory please make sure you have checked the
                        Blackhorse Collective map to see if you sit within the
                        zone. If you are not sure feel free to message us at{" "}
                        <a href="mailto:info@blackhorsecollective.co.uk">
                          info@blackhorsecollective.co.uk
                        </a>{" "}
                        to find out. If you are not in the zone, Waltham Forest
                        Council have an amazing business directory called{" "}
                        <a href="https://wfconnected.org/" target="_blank">
                          Waltham Forest Connected
                        </a>{" "}
                        which covers all of the borough. We also encourage
                        businesses within the zone to sign up to this too as its
                        an amazing resource!
                      </p>
                    </>
                  }
                ></SinglePageText>
              )}

              <form
                className={classNames(
                  styles.component_form,
                  styles[`component_form_${type}`]
                )}
                onSubmit={formik.handleSubmit}
              >
                <FormInput
                  type={type}
                  id="firstname"
                  name="firstname"
                  placeholder={"Firstname"}
                  value={formik.values.firstname}
                  error={formik.errors.firstname}
                  touched={formik.touched.firstname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <FormInput
                  type={type}
                  id="lastname"
                  name="lastname"
                  placeholder={"Lastname"}
                  value={formik.values.lastname}
                  error={formik.errors.lastname}
                  touched={formik.touched.lastname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <FormInput
                  type={type}
                  id="email"
                  name="email"
                  placeholder={"Your email address"}
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Button
                  className={classNames(
                    styles.component_form_button,
                    styles[`component_form_button_${category}`]
                  )}
                  type="block"
                  disabled={!!user}
                >
                  Register
                </Button>
              </form>
              <div className={styles.message}>
                {error && <div className={styles.message_error}>{error}</div>}
              </div>
              <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={GOOGLE_CAPTCHA_SITE_KEY}
              />
            </>
          ) : (
            <span style={{ fontSize: "1.6rem" }}>
              Thank you for registering, please check your email
            </span>
          )}
        </LoadingOverlay>
      </Container>
    </section>
  );
};

const FormInput = ({ error, touched, type, ...rest }) => {
  return (
    <input
      className={classNames(
        styles.component_form_field,
        styles[`component_form_field_${type}`],
        !!error && touched && styles.component_form_field_alert
      )}
      type="text"
      {...rest}
    />
  );
};
export default RegisterForm;
