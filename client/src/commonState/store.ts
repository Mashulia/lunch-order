export const userRoles = ref([]);

export const isManager = computed(() => {
  return (
    !!userRoles.value.length &&
    userRoles.value.find((userRole) => userRole.value === "MANAGER")
  );
});

export const token = ref("");
