<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <tr>
            <td @click="toggleRow(rowIndex)" class="row-header">
              <span v-if="row.children" class="toggle-icon">{{
                isOpen[rowIndex] ? '−' : '+'
              }}</span>
              {{ row.category }}
            </td>
            <td
              v-for="(cell, cellIndex) in isOpen[rowIndex]
                ? []
                : row.permissions"
              :key="cellIndex"
            >
              <span v-if="cell === '✔'" class="checkmark">✔</span>
              <span v-else-if="cell === '✖'" class="cross">✖</span>
              <span v-else class="fraction">{{ cell }}</span>
            </td>
          </tr>
          <template v-if="isOpen[rowIndex]">
            <tr
              v-for="(child, childIndex) in row.children"
              :key="`${rowIndex}-${childIndex}`"
            >
              <td class="child-row">{{ child.category }}</td>
              <td
                v-for="(cell, cellIndex) in child.permissions"
                :key="cellIndex"
              >
                <span v-if="cell === '✔'" class="checkmark">✔</span>
                <span v-else-if="cell === '✖'" class="cross">✖</span>
                <span v-else class="fraction">{{ cell }}</span>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const tableData = ref([
      {
        category: 'Desktop & Mobile',
        permissions: ['✔', '✔', '✖', '✖', '✖', '✖', '✖', '✖'],
        children: [
          {
            category: 'Call Dashboard',
            permissions: ['✔', '✔', '✖', '✖', '✖', '✖', '✖', '✖'],
          },
          {
            category: 'Settings',
            permissions: ['✔', '✔', '✔', '✔', '✔', '✔', '✔', '✔'],
          },
        ],
      },
      {
        category: 'Admin Portal',
        permissions: ['✔', '✔', '✔', '✔', '✔', '✔', '✖', '✖'],
        children: [
          {
            category: 'Phone System',
            permissions: ['✔', '6/16', '✖', '3/16', '✖', '✖', '✖', '✖'],
          },
          {
            category: 'Business Apps',
            permissions: ['3/4', '✖', '✖', '✖', '✖', '✖', '✖', '✖'],
          },
        ],
      },
      {
        category: 'Billing',
        permissions: ['✔', '1/3', '✖', '✖', '2/3', '✖', '✖', '✖'],
        children: [
          {
            category: 'Store',
            permissions: ['✔', '1/2', '✖', '1/2', '1/2', '✖', '✖', '✖'],
          },
          {
            category: 'Reports',
            permissions: ['2/8', '✔', '✖', '3/8', '✖', '✔', '✔', '2/8'],
          },
        ],
      },
    ]);

    const headers = computed(() => [
      'Account Super User',
      'Account Admin',
      'Users Admin',
      'Call Queues Admin',
      'Billing Admin',
      'Reports Admin',
      'Call Queues Reporting Admin',
      'End User',
    ]);

    const isOpen = ref({});

    const toggleRow = (index) => {
      isOpen.value[index] = !isOpen.value[index];
    };

    return { headers, tableData, isOpen, toggleRow };
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

.row-header {
  text-align: left;
  font-weight: bold;
  background-color: #f9f9f9;
  cursor: pointer;
}

.child-row {
  text-align: left;
  padding-left: 20px;
  font-style: italic;
}

.checkmark {
  color: green;
  font-weight: bold;
}

.cross {
  color: red;
  font-weight: bold;
}

.fraction {
  color: gray;
  font-weight: bold;
}

.toggle-icon {
  margin-right: 5px;
  cursor: pointer;
}
</style>
