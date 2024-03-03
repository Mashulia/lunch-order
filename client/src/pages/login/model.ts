import { useVuelidate } from "@vuelidate/core";

export const loginState = reactive({
  isLoginFailed: false,
  isLoginSuccess: false,
});

export const form = ref({
  email: "",
  password: "",
});

export const isFormEmailValid = ref<boolean>(false);

export const emailRules = [
  (value: string) => {
    const regTest = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (regTest.test(value)) return true;

    isFormEmailValid.value = true;
    return "You must enter a valid email.";
  },
];

const initialForm = reactive({
  ...form.value,
});
export const v$ = useVuelidate(emailRules, initialForm);

export const loginForm = ref();
