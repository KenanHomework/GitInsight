import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  login: Yup.string().required(),
});
