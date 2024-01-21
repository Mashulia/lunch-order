export const registerState = reactive({
  isRegisterFailed: false,
  isRegisterSuccess: false,
  token: null,
});

export const form = ref({
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  phone: "",
  password: "",
});
