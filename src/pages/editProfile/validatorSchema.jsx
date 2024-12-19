import * as yup from "yup";

const supportedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const maxSize = 512_000_000; // 5MB

const editProfileDataValidatorSchema = yup.object().shape({
  media: yup
    .mixed()
    .test(
      "fileFormat",
      "File format is not valid.",
      (value) => value && supportedFormats.includes(value.type),
    )
    .test(
      "fileSize",
      "The maximum file size is 5 MB.",
      (value) => value.size <= maxSize,
    ),
  name: yup.string().required("The name is required.").min(1).max(200),
  username: yup.string().required("The username is required.").min(3).max(200),
  email: yup
    .string()
    .email("The email is required.")
    .required("The email is required."),
  private: yup.boolean().required("The page type is required."),
});

export default editProfileDataValidatorSchema;
