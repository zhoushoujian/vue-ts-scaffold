<template>
  <div style="width: 100%">
    <CustomTableComponent
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      :isSelection="true"
      @loadData="loadData"
      @select="handleSelectUser"
      @selectAll="handleSelectAll"
    >
    </CustomTableComponent>
  </div>
</template>

<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { CustomTableComponent } from '@szhou/components';
import { IPaginationProps } from '@szhou/components/dist/vue/types/common';

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
const tableCols = [
  {
    label: 'Date',
    prop: 'date',
  },
  {
    label: 'Name',
    prop: 'name',
  },
  {
    label: 'Address',
    prop: 'address',
    width: '300px',
  },
];

const pagination = {
  total: tableData.length,
};

const loadData = (pagination: IPaginationProps) => {
  console.log('pagination', pagination);
};

function handleSelectUser(selectedItems: object[] | undefined) {
  console.log('selectedItems selectedItems', selectedItems);
}
function handleSelectAll(selectedItems: object[]) {
  console.log('handleSelectAll selectedItems', selectedItems);
}
</script>
