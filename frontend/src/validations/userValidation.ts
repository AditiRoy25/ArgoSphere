import * as yup from "yup";

export const addUserSchema = yup.object({
  name: yup.string().required(),

  email: yup.string().email().required(),

  phone: yup.string().required(),

  password: yup.string().required(),

  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),

  role: yup
  .string()
  .oneOf(
    ["", "farmer", "ngo", "officer", "ministry", "admin"],
    "Please select a role"
  )
  .required("Role is required"),

  gender: yup
  .string()
  .oneOf(
    ["", "male", "female", "other"],
    "Please select a gender"
  )
  .required("Gender is required"),

  address: yup.string().default(""),

  district: yup.string().default(""),

  state: yup.string().default(""),

  image: yup
    .mixed<File | null>()
    .nullable()
    .default(null),
});

export type AddUserForm =
  yup.InferType<typeof addUserSchema>;