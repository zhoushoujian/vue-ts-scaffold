<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="category" label="文件类别" width="240px">
      <template #default="scope">
        <span v-show="scope.row.required" class="start-mark">*</span>
        <span>{{ scope.row.category }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="requirements" label="文件要求" width="360px" />
    <el-table-column prop="fileList" label="文件列表">
      <template #default="scope">
        <div v-for="item in scope.row.fileList" :key="item.uid">
          <div class="file-list">
            <el-link type="primary" @click="() => downloadFile(scope.row.fileList, item.uid)"> {{ item.name }}</el-link>
            <el-icon><Delete class="delete-icon" @click="() => removeFile(scope.row.id, item.uid)" /></el-icon>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="上传状态" width="100px">
      <template #default="scope">
        <div :class="isUploaded(scope.row.status) ? 'uploaded-status' : 'not-upload-status'">
          <el-icon v-if="isUploaded(scope.row.status)" style="margin-right: 6px">
            <Select />
          </el-icon>
          <span v-if="!isUploaded(scope.row.status)" class="circle"></span>
          <span>{{ scope.row.status || '未上传' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="action" label="操作" width="100px">
      <template #default="scope">
        <el-upload
          action="/files"
          :multiple="scope.row.multiple"
          :limit="scope.row.numberLimit"
          :on-success="
            (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) =>
              onSuccess(response, uploadFile, uploadFiles, scope.row)
          "
          :accept="scope.row.accept"
          :file-list="scope.row.multiple ? scope.row.fileList : []"
          :before-upload="(rawFile: File) => handleBeforeUpload(rawFile, scope.row)"
          :data="{ currentFolder: '/files/temp' }"
          :show-file-list="false"
          :drag="false"
          :auto-upload="true"
          :on-exceed="(files: File[], uploadFiles: UploadUserFile[]) => handleOnExceed(files, uploadFiles, scope.row)"
        >
          <el-button type="primary" :link="true"> 上传 </el-button>
        </el-upload>
      </template>
    </el-table-column>
  </el-table>
</template>

<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { reactive } from 'vue';
import { Select, Delete } from '@element-plus/icons-vue';
import { ElMessage, UploadUserFile, type UploadFile, type UploadFiles } from 'element-plus';

defineOptions({ name: 'TableUploadComponentTest' });

type IUploadRowType = {
  accept: string;
  category: string;
  id: string;
  fileList: any[];
  multiple: boolean;
  numberLimit: number;
  required: boolean;
  requirements: string;
  sizeLimit: number;
  status: string;
};

const tableData = reactive<IUploadRowType[]>([
  {
    accept: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    category: '简历及证明',
    id: 'resume',
    fileList: [],
    multiple: false,
    numberLimit: 1,
    required: true,
    requirements: '请上传简历及证明文件，大小不超过5MB',
    sizeLimit: 5 * 1024 * 1024,
    status: '',
  },
  {
    accept: 'image/png,image/jpeg,application/pdf', //文件的mine类型
    category: '其他资料',
    id: 'others',
    fileList: [],
    multiple: true,
    numberLimit: 3,
    required: false,
    requirements: '',
    sizeLimit: 10 * 1024 * 1024,
    status: '',
  },
]);

const isUploaded = (status: string) => {
  return status === '已上传';
};

const handleOnExceed = (files: File[], uploadFiles: UploadUserFile[], row: IUploadRowType) => {
  console.log('files', files, 'uploadFiles', uploadFiles, 'row', row);
  const { numberLimit, multiple } = row;
  if (multiple && numberLimit <= uploadFiles.length) {
    ElMessage.error('已达到最大上传文件数量');
  }
};

const handleBeforeUpload = (rawFile: File, row: IUploadRowType) => {
  console.log('rawFile', rawFile, 'row', row);
  const { type, size } = rawFile;
  const { accept, sizeLimit } = row;
  if (size > sizeLimit) {
    ElMessage.error('文件大小超过限制');
    return false;
  } else if (
    !accept
      .split(',')
      .map((item: string) => item.trim())
      .includes(type)
  ) {
    ElMessage.error('文件类型不合法');
    return false;
  } else {
    return true;
  }
};

const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles, row: IUploadRowType) => {
  console.log('response', response, 'uploadFile', uploadFile, 'uploadFiles', uploadFiles, row);
  tableData.some((item) => {
    if (item.id === row.id) {
      item.fileList = uploadFiles;
      item.status = uploadFiles.length ? '已上传' : '未上传';
      return true;
    } else {
      return false;
    }
  });
};

const downloadFile = (fileList: any[], uid: string) => {
  const info = fileList.find((item: { uid: string } & object) => item.uid === uid);
  const element = document.createElement('a'); // 转换完成，创建一个a标签用于下载
  element.download = info.name;
  element.href = URL.createObjectURL(info.raw);
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
};

const removeFile = (rowId: string, fileId: string) => {
  tableData.some((item) => {
    if (item.id === rowId) {
      item.fileList = item.fileList.filter((child: { uid: string }) => child.uid !== fileId);
      item.status = item.fileList.length ? '已上传' : '未上传';
      return true;
    } else {
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.start-mark {
  color: $dangerColor;
  margin-right: 4px;
}
.not-upload-status {
  color: $dangerColor;
  display: flex;
  align-items: center;
}
.uploaded-status {
  color: $successColor;
  display: flex;
  align-items: center;
}
.circle {
  display: flex;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: $dangerColor;
  margin-right: 6px;
}
.file-list {
  display: flex;
  align-items: center;
  gap: 12px;
  .delete-icon {
    color: $dangerColor;
    cursor: pointer;
  }
}
</style>
