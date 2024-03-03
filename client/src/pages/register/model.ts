import useVuelidate from "@vuelidate/core";
import { emailRules } from "../login/model";

export const registerState = reactive({
  isRegisterFailed: false,
  isRegisterSuccess: false,
});

export const form = ref({
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phone: "",
  password: "",
});

const initialForm = reactive({
  ...form.value,
});

export const v$ = useVuelidate(emailRules, initialForm);
