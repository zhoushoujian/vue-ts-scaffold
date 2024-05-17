<template>
  <CustomCardComponent
    ref="customCardRef"
    labelPosition="left"
    :showExpandBtn="true"
    :rules="rules"
    :isPagination="true"
    :headerTitle="'表单表格(CustomCard)'"
    :formData="states.formData"
    :formCols="formCols"
    :tableData="states.tableData"
    :tableCols="tableCols"
    :pagination="states.pagination"
    :loading="states.loading"
    :isUseFEPagination="true"
    @sortChange="sortChange"
    @loadData="loadData"
    @event="changeEvent"
  ></CustomCardComponent>
  <CustomDialogComponent
    ref="dialogRef"
    dialogWidth="60%"
    title="资源路径"
    cancelButton="取消"
    :appendToBody="true"
    @event="handleDialogEvent"
  >
    弹框标题靠左对齐，弹框底部按钮居中对齐
  </CustomDialogComponent>
</template>

<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { CirclePlus, Edit, Delete } from '@element-plus/icons-vue';
import { polyfillTestFunc } from '@szhou/script-tools';
import { CustomDialogComponent, CustomCardComponent } from '@szhou/components';
import type {
  IFormEventParam,
  IHandleDialogEventParams,
  IPaginationProps,
} from '@szhou/components/dist/vue/types/common';

defineOptions({ name: 'CustomCardComponentTest' });

const customCardRef = ref<InstanceType<typeof CustomCardComponent>>();
const dialogRef = ref<InstanceType<typeof CustomDialogComponent>>();

const formCols = [
  [
    {
      eType: 'Input',
      placeholder: '请输入角色编码',
      label: '角色编码',
      prop: 'roleCode',
      clearable: true,
      maxlength: 32,
    },
    {
      eType: 'Input',
      placeholder: '请输入角色名称',
      label: '角色名称',
      prop: 'roleName',
      clearable: true,
      maxlength: 32,
    },
    {
      eType: 'Input',
      placeholder: '请输入手机号',
      label: '手机号',
      prop: 'phone',
      suffixIcon: '',
      clearable: true,
      maxlength: 32,
    },
  ],
  [
    {
      eType: 'Input',
      placeholder: '请输入qq',
      label: 'qq',
      prop: 'qq',
      suffixIcon: '',
      clearable: true,
      maxlength: 32,
    },
  ],
  [
    {
      eType: 'Button',
      noFormItem: true,
      value: '新增角色',
      type: 'primary',
      prop: 'add',
      span: 2,
      icon: CirclePlus,
      authority: 'PROTAL_OPERATION.ENT-MANAGEMENT.DATA-ROLE.ADD',
    },
  ],
];

const tableCols = [
  {
    label: '角色编码',
    prop: 'roleCode',
    align: 'center',
    fixed: 'left',
    sortable: true,
  },
  {
    label: '角色名称',
    prop: 'roleName',
    align: 'center',
  },
  {
    label: '启用状态',
    prop: 'isEnable',
    align: 'center',
    eType: 'Tag',
    formatter: (row: (typeof states.tableData)[0]) => {
      return {
        type: row.isEnable === 'N' ? 'danger' : 'success',
        label: row.isEnable === 'N' ? '停用' : '启用',
      };
    },
  },
  {
    label: '是否内置',
    prop: 'isBuiltin',
    align: 'center',
    eType: 'Tag',
    formatter: (row: (typeof states.tableData)[0]) => {
      return {
        type: row.isBuiltin === 'N' ? 'danger' : 'success',
        label: row.isBuiltin === 'N' ? '否' : '是',
      };
    },
  },
  {
    label: '授权',
    prop: 'createUserName',
    align: 'center',
    eType: 'Button',
    formatter: (row: (typeof states.tableData)[0]) => {
      return [
        {
          label: '数据授权',
          type: 'primary',
          link: true,
          handle: () => handleTableBtnEvent(row, 'authorization'),
        },
      ];
    },
  },
  {
    label: '操作',
    eType: 'Button',
    align: 'center',
    fixed: 'right',
    formatter: (row: (typeof states.tableData)[0]) => {
      return [
        {
          label: '编辑',
          icon: Edit,
          type: 'primary',
          link: true,
          handle: () => handleTableBtnEvent(row, 'edit'),
        },
        {
          label: row.isEnable === 'Y' ? '禁用' : '启用',
          icon: Edit,
          type: 'primary',
          link: true,
          handle: () => handleTableBtnEvent(row, 'isEnable'),
        },
        {
          label: '删除',
          type: 'primary',
          link: true,
          icon: Delete,
          iconClass: 'delete',
          handle: (row: (typeof states.tableData)[0]) => {
            handleTableBtnEvent(row, 'delete');
          },
        },
      ];
    },
  },
];

const states = reactive({
  formData: {
    roleCode: '',
    roleName: '',
    phone: '',
    qq: '',
  },
  tableData: [
    {
      roleId: '1724704312174628865',
      roleName: '通用用户',
      roleCode: 'TYYH001',
      roleDesc: '通用用户角色',
      isBuiltin: 'N',
      isEnable: 'Y',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725343875570184194',
      roleName: '测试角色002',
      roleCode: '002',
      roleDesc: '哈哈哈',
      isBuiltin: 'N',
      isEnable: 'Y',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725345403483828226',
      roleName: '测试角色',
      roleCode: '003',
      roleDesc: '哈哈哈应用',
      isBuiltin: 'N',
      isEnable: 'Y',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725347824159272962',
      roleName: '测试004',
      roleCode: '004',
      roleDesc: '',
      isBuiltin: 'N',
      isEnable: '',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725347878748139521',
      roleName: '测试005',
      roleCode: '005',
      roleDesc: '',
      isBuiltin: 'N',
      isEnable: '',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725347959278776322',
      roleName: '测试006',
      roleCode: '006',
      roleDesc: '哈哈哈',
      isBuiltin: 'N',
      isEnable: 'Y',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725348002727571458',
      roleName: '测试wjm',
      roleCode: '007fddfd',
      roleDesc: '',
      isBuiltin: 'N',
      isEnable: 'Y',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725348059531030529',
      roleName: '测试008',
      roleCode: '008',
      roleDesc: '应用',
      isBuiltin: 'N',
      isEnable: 'N',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725348115038449665',
      roleName: '测试009',
      roleCode: '009',
      roleDesc: '测试',
      isBuiltin: 'N',
      isEnable: 'N',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725348654656630786',
      roleName: '测试010',
      roleCode: '010',
      roleDesc: '',
      isBuiltin: 'N',
      isEnable: '',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
    {
      roleId: '1725348654656620786',
      roleName: '测试011',
      roleCode: '010',
      roleDesc: '',
      isBuiltin: 'N',
      isEnable: '',
      corpId: null,
      corpName: null,
      corpCode: null,
    },
  ],
  pagination: { pageSize: 10, pageNo: 1, total: 11 },
  loading: false,
});

onMounted(() => {
  polyfillTestFunc();
  states.loading = true;
  setTimeout(() => {
    states.loading = false;
  }, 500);
});

const rules = {
  roleCode: [{ required: true }],
};

function sortChange(data: { column: any; prop: string; order: any }) {
  console.log('sortChange data', data);
}

function loadData(pagination: IPaginationProps) {
  console.log('states.formData111', states.formData, 'pagination111', JSON.parse(JSON.stringify(pagination)));
}

const handleDialogEvent = (params: IHandleDialogEventParams) => {
  console.log('params', params);
};

function changeEvent(param: IFormEventParam) {
  const { prop } = param;
  console.log('prop', prop);
  switch (prop) {
    case 'search':
      customCardRef.value!.submit().then((valid: boolean) => {
        console.log('valid', valid);
        loadData(states.pagination);
      });
      break;
    case 'reset':
      loadData(states.pagination);
      break;
    case 'add':
      console.log('add');
      dialogRef.value?.open();
      break;
    default:
      break;
  }
}

function handleTableBtnEvent(row: (typeof states.tableData)[0], prop: string) {
  console.log('row', row, 'prop', prop);
}
</script>

<style></style>
