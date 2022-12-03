import * as Yup from "yup";


const _requiredMessage = "Zorunlu Alan";
const _minRequiredMessage = "En Az 8 Karakter";
const _emailRequiredMessage ="Geçerli bir email adresi giriniz !"

const validationSchema = Yup.object({
  firstName: Yup.string().required(_requiredMessage),
  lastName: Yup.string().required(_requiredMessage),
  email: Yup.string().email(_emailRequiredMessage).required(_requiredMessage),
  password: Yup.string().min(8, _minRequiredMessage).required(_requiredMessage),
});

export default validationSchema;
