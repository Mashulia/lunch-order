<script setup lang="ts">
import EmployesTable from "@/views/pages/employees/EmployesTable.vue";
import DialogToDeleteEmployee from "@/views/pages/employees/DialogToDeleteEmployee.vue";
import { getAllUsers, deleteUser } from "@/api/users.api";

const allUsers = ref([]);
const currentEmployee = ref("");
const dialog = ref(false);

const removeHighlighting = () => {
  const rows = document.querySelectorAll(".v-table__wrapper td");

  rows.forEach((item) => {
    if (item.classList.contains("bg-primary"))
      item.classList.remove("bg-primary");
  });
};

const highLightRow = (row: MouseEvent) => {
  removeHighlighting();

  row.srcElement.classList.add("bg-primary");
};

const selectCurrentRow = (row: MouseEvent) => {
  currentEmployee.value = row.target.textContent;
  highLightRow(row);
};

const formattedUsers = computed(() => {
  return allUsers.value.map((user) => {
    return `${user.lastName} ${user.firstName} ${user.middleName}`;
  });
});

const deleteEmployee = async (val: boolean) => {
  dialog.value = val;

  const employeeName = currentEmployee.value.split(" ");

  const deletedEmployee = allUsers.value.find(
    (employee) =>
      employee.lastName === employeeName[0] &&
      employee.firstName === employeeName[1] &&
      employee.middleName === employeeName[2]
  );
  try {
    if (deletedEmployee?.id) {
      await deleteUser(deletedEmployee.id);
      console.log("User deleted successfully");
      getEmployees();
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }

  removeHighlighting();
};

const getEmployees = async () => {
  try {
    allUsers.value = await getAllUsers();
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};

onMounted(() => {
  getEmployees();
});
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard title="Ф.И.О. сотрудника">
          <EmployesTable
            :employees="formattedUsers"
            :current-employee="currentEmployee"
            @select-current-row="selectCurrentRow"
          />
        </VCard>
      </VCol>
      <VCol>
        <VBtn
          type="reset"
          color="error"
          variant="tonal"
          :disabled="!currentEmployee"
          :class="{ 'disabled-btn': !currentEmployee }"
        >
          Удалить сотрудника
          <DialogToDeleteEmployee
            :dialog="dialog"
            @deleteEmployee="deleteEmployee"
          />
        </VBtn>
        <VBtn color="primary" variant="tonal" @click="dialog = !dialog">
          Отмена
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
:deep.v-btn--disabled {
  cursor: not-allowed;
}
</style>
