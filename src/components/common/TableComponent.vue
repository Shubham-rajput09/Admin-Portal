<template>
  <div class="table-wrapper">
    <table class="table-container">
      <thead>
        <tr>
          <th
            class="table-head"
            @click="sortColumn('account')"
            :data-sort="sortKey === 'account' ? sortOrder : ''"
          >
            Account
          </th>
          <th
            class="table-head"
            @click="sortColumn('companyName')"
            :data-sort="sortKey === 'companyName' ? sortOrder : ''"
          >
            Company Name
          </th>
          <th
            class="table-head"
            @click="sortColumn('accountType')"
            :data-sort="sortKey === 'accountType' ? sortOrder : ''"
          >
            Account Type
          </th>
          <th
            class="table-head"
            @click="sortColumn('parentId')"
            :data-sort="sortKey === 'parentId' ? sortOrder : ''"
          >
            Parent ID
          </th>
          <th
            class="table-head"
            @click="sortColumn('contact')"
            :data-sort="sortKey === 'contact' ? sortOrder : ''"
          >
            Contact
          </th>
          <th
            class="table-head"
            @click="sortColumn('contactPhone')"
            :data-sort="sortKey === 'contactPhone' ? sortOrder : ''"
          >
            Contact Phone
          </th>
          <th
            class="table-head"
            @click="sortColumn('status')"
            :data-sort="sortKey === 'status' ? sortOrder : ''"
          >
            Status
          </th>
          <th
            class="table-head"
            @click="sortColumn('country')"
            :data-sort="sortKey === 'country' ? sortOrder : ''"
          >
            Country
          </th>
          <th
            class="table-head"
            @click="sortColumn('customerSignature')"
            :data-sort="sortKey === 'customerSignature' ? sortOrder : ''"
          >
            Customer Signature
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index" class="table-data">
          <td>{{ row.account }}</td>
          <td>{{ row.companyName }}</td>
          <td>{{ row.accountType }}</td>
          <td>{{ row.parentId }}</td>
          <td>{{ row.contact }}</td>
          <td>{{ row.contactPhone }}</td>
          <td>{{ row.status }}</td>
          <td>{{ row.country }}</td>
          <td>{{ row.customerSignature }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortKey: '',
      sortOrder: '',
      tableData: [
        {
          account: 'ACC12345',
          companyName: 'Tech Solutions Inc.',
          accountType: 'Enterprise',
          parentId: 'PID9876',
          contact: 'John Doe',
          contactPhone: '(555) 123-4567',
          status: 'Active',
          country: 'USA',
          customerSignature: 'John Doe',
        },
        {
          account: 'ACC23456',
          companyName: 'Green Innovations',
          accountType: 'Individual',
          parentId: 'PID1234',
          contact: 'Jane Smith',
          contactPhone: '(555) 987-6543',
          status: 'Inactive',
          country: 'Canada',
          customerSignature: 'Jane Smith',
        },
        {
          account: 'ACC34567',
          companyName: 'Global Enterprises',
          accountType: 'Enterprise',
          parentId: 'PID5678',
          contact: 'Emily Johnson',
          contactPhone: '(555) 246-8101',
          status: 'Active',
          country: 'UK',
          customerSignature: 'Emily Johnson',
        },
        {
          account: 'ACC45678',
          companyName: 'FutureTech',
          accountType: 'Startup',
          parentId: 'PID6789',
          contact: 'Michael Lee',
          contactPhone: '(555) 369-2580',
          status: 'Active',
          country: 'Germany',
          customerSignature: 'Michael Lee',
        },
        {
          account: 'ACC56789',
          companyName: 'Alpha Ventures',
          accountType: 'Individual',
          parentId: 'PID7890',
          contact: 'Sarah Miller',
          contactPhone: '(555) 753-1594',
          status: 'Inactive',
          country: 'Australia',
          customerSignature: 'Sarah Miller',
        },
      ],
    };
  },
  methods: {
    sortColumn(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }

      this.tableData.sort((a, b) => {
        let comparison = 0;
        if (a[key] > b[key]) {
          comparison = 1;
        } else if (a[key] < b[key]) {
          comparison = -1;
        }
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
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
  background-image: url('../../assets/both-arrows.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 10px;
  height: 10px;
}

.table-container th[data-sort='asc']:before {
  content: '';
  background-image: url('../../assets/up-arrow.svg');
  font-weight: bold;
}

.table-container th[data-sort='desc']:before {
  content: '';
  background-image: url('../../assets/down-arrow.svg');
  font-weight: bold;
}
</style>
