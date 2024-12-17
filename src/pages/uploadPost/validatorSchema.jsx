import * as yup from "yup";

const supportedFormats = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "video/mp4",
  "video/mkv",
];
const maxSize = 512_000_000; // 5MB

const uploadPostValidatorSchema = yup.object().shape({
  media: yup
    .mixed()
    .required("The media is required.")
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
  description: yup
    .string()
    .required("The description is required.")
    .min(1)
    .max(2000),
  hashtags: yup.string(),
});

export default uploadPostValidatorSchema;
