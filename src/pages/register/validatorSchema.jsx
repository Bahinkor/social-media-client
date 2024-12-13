import * as yup from "yup";

const registerValidationSchema = yup.object().shape({
    name: yup.string()
        .required("The full name length must be between 1 and 200 characters.")
        .min(1)
        .max(200),
    username: yup.string()
        .required("The username length must be between 3 and 200 characters.")
        .min(3)
        .max(200),
    email: yup.string()
        .required("Please enter a valid email address.")
        .email(),
    password: yup.string()
        .required("The password length must be between 6 and 50 characters.")
        .min(6)
        .max(50),
});

export default registerValidationSchema;