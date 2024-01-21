export const loginState = reactive({
  isLoginFailed: false,
  isLoginSuccess: false,
});

export const form = ref({
  email: "",
  password: "",
  remember: false,
});
