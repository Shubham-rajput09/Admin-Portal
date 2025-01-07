<template>
  <div>
    <div class="navbar">
      <div
        :class="['navbar-item', { active: selected === 'user' }]"
        @click="selectTab('user')"
      >
        Users
      </div>
      <div
        :class="['navbar-item', { active: selected === 'auditLog' }]"
        @click="selectTab('auditLog')"
      >
        Audit Log
      </div>
    </div>
    <hr class="underline" />
    <TableComponent :columns="filteredColumns" :data="filteredData" />
  </div>
</template>

<script>
import TableComponent from './TableComponent.vue';

export default {
  name: 'NavigationBar',
  components: { TableComponent },
  data() {
    return {
      selected: 'user', // Default to 'User' tab
      userColumns: [
        { key: 'account', label: 'Account' },
        { key: 'companyName', label: 'Company Name' },
        { key: 'accountType', label: 'Account Type' },
        { key: 'parentId', label: 'Parent ID' },
        { key: 'contact', label: 'Contact' },
        { key: 'contactPhone', label: 'Contact Phone' },
        { key: 'status', label: 'Status' },
        { key: 'country', label: 'Country' },
        { key: 'customerSignature', label: 'Customer Signature' },
      ],
      tableData1: [
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
      auditColumns: [
        { key: 'eventDate', label: 'Event Date/Time' },
        { key: 'eventType', label: 'Event Type' },
        { key: 'changedBy', label: 'Changed By' },
        { key: 'itemChanged', label: 'Item Changed' },
        { key: 'itemLocation', label: 'Item Location' },
        { key: 'changeSummary', label: 'Change Summary' },
      ],
      tableData2: [
        {
          eventDate: '2020-03-01',
          eventType: 'Startup',
          changedBy: 'PID9876',
          itemChanged: '2020-03-01',
          itemLocation: 'PID9876',
          changeSummary: 'John Doe',
        },
        {
          eventDate: '2020-03-01',
          eventType: 'Startup',
          changedBy: 'PID1234',
          itemChanged: '2020-03-01',
          itemLocation: 'PID1234',
          changeSummary: 'Jane Smith',
        },
      ],
    };
  },
  computed: {
    filteredColumns() {
      return this.selected === 'user' ? this.userColumns : this.auditColumns;
    },
    filteredData() {
      // Show empty table for audit log
      return this.selected === 'user' ? this.tableData1 : this.tableData2;
    },
  },
  methods: {
    selectTab(tab) {
      this.selected = tab;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}
.navbar-item {
  cursor: pointer;
  padding: 5px 2px;
  font-size: 1.1rem;
  text-align: center;
  position: relative;
  display: inline-block;
}

.navbar-item.active {
  font-weight: 600;
}

.navbar-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.navbar-item.active::after {
  background-color: black; /* Underline color when active */
}
.underline {
  margin-top: 4px;
}
</style>
