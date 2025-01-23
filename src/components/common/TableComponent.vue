<template>
  <div class="table-wrapper">
    <table class="table-container">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            @click="sortColumn(column.key)"
            :data-sort="sortKey === column.key ? sortOrder : ''"
            :data-id="column.key"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedData"
          :key="rowIndex"
          class="table-data"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :data-id="`${rowIndex}-${column.key}`"
          >
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortKey: '',
      sortOrder: '',
    };
  },
  computed: {
    sortedData() {
      if (!this.sortKey) return this.data;
      return [...this.data].sort((a, b) => {
        const comparison = a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    },
  },
  methods: {
    sortColumn(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  background-color: white;
  height: 767px;
  border-radius: 5px;
}
.table-container {
  background-color: white;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  border-radius: 5px;
}

.table-container th {
  padding: 8px;
  cursor: pointer;
}
.table-container td {
  padding: 18px 18px 18px 22px;
  font-size: 15px;
  border-bottom: 1px solid #cccccc;
}

.table-container th {
  position: relative;
  border-bottom: 1px solid #000;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  user-select: none;
  text-align: left;
}

.table-container th:before {
  content: '';
  display: inline-block;
  background-image: url('/public/assets/both-arrows.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 10px;
  height: 10px;
  margin-right: 2px;
}

.table-container th[data-sort='asc']:before {
  background-image: url('/public/assets/up-arrow.svg');
}

.table-container th[data-sort='desc']:before {
  background-image: url('/public/assets/down-arrow.svg');
}
</style>
