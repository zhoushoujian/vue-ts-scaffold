import { Component } from 'vue';

export interface IHandleDialogEventParams {
  prop: 'submit' | 'close' | 'cancel' | string;
}

export type IPaginationProps = {
  pageNum?: number; // 分页页码
  pageSize?: number; // 分页大小
  total?: number; // 分页总条目
};

export type IButtonType = '' | 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger';

export type IFormEventParam = {
  label: string;
  prop: string;
  value: string | undefined;
  icon?: Component;
  type?: IButtonType | 'change' | 'click';
  size?: '' | 'default' | 'small' | 'large';
  clearable?: boolean;
  eType?: 'Button' | 'Input';
  labelWidth?: string | number;
  placeholder?: string;
  span?: number;
  noFormItem?: boolean;
  style?: string;
};

export interface IApiResponse<T> {
  rspCode: string;
  rspDesc: string;
  data: T;
}

export type ISendMsgBtnType = {
  eType: string;
  value: string;
  type: string;
  prop: string;
  span: number;
  noFormItem: boolean;
};
