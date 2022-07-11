import {
  EditableFormInstance,
  EditableProTable,
  ProColumns,
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import { FC, useRef, useState } from 'react';

// service
const sendReq = (time: number = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
// 日期格式化方法
const dateFormatter = (val: any, valType: any) => {
  console.log(`val: ${val} -> type: ${valType}`);
  return val.format('YYYY/MM/DD HH:mm:ss');
};
// 初始化表单值
const getInitialVals = async () => {
  await sendReq();
  return {
    companyName: 'alibaba',
  };
};
// 树形选择器初始化
const treeSelectData = async () => {
  return [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
      children: [
        {
          title: 'child node 1',
          value: '0-0-0',
          key: '0-0-0',
        },
      ],
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
      children: [
        {
          title: 'child node 2',
          value: '0-1-0',
          key: '0-1-0',
        },
        {
          title: 'child node 3',
          value: '0-1-1',
          key: '0-1-1',
        },
      ],
    },
  ];
};
// 可编辑表格初始化
type ETDatasourceType = {
  id: React.Key;
  activityName?: string;
  desc?: string;
  state?: string;
  createdAt?: string;
  children?: ETDatasourceType[];
};
const ETDatasource: ETDatasourceType[] = [
  {
    id: 624748504,
    activityName: '活动名称一',
    desc: '这个活动不咋地',
    state: 'open',
    createdAt: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    activityName: '活动名称二',
    desc: '这个活动真好玩',
    state: 'closed',
    createdAt: '2020-05-26T08:19:22Z',
  },
];

const Base: FC<Record<string, any>> = () => {
  // 栅格化布局开关
  const [grid, setGrid] = useState(true);
  // 缓存 form instance
  const formRef = useRef<ProFormInstance>();
  // 缓存 editable table instance
  const ETRef = useRef<EditableFormInstance<ETDatasourceType>>();
  // 可编辑表格索引
  const [editableKeys, setEditableKeys] = useState<React.Key[]>(() => {
    return ETDatasource.map((item) => item.id);
  });
  // 可编辑表格 creator 位置
  const [creatorPosition, setCreatorPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  // 可编辑表格数据列定义
  const etColumns: ProColumns<ETDatasourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'activityName',
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: {
          text: '全部',
          status: 'Default',
        },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'desc',
      renderFormItem: (_, { record }) => {
        return <Input addonBefore={(record as any)?.addonBefore}></Input>;
      },
    },
    {
      title: '活动时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key={'edit'}
          onClick={() => {
            action?.startEditable(record.id);
          }}
        >
          编辑此项
        </a>,
        <a
          key={'delete'}
          onClick={() => {
            const ETDatasource = formRef.current?.getFieldValue('ET') as ETDatasourceType[];
            formRef.current?.setFieldsValue({
              ET: ETDatasource.filter((item) => item.id !== record.id),
            });
          }}
        >
          删除此项
        </a>,
      ],
    },
  ];
  return (
    <ProForm
      formKey="base"
      formRef={formRef}
      request={getInitialVals}
      autoFocusFirstInput
      dateFormatter={dateFormatter}
      grid={grid}
      onFinish={async (vals) => {
        await sendReq();
        // 打印初始表单值
        console.log('vals: ', vals);
        // 打印经过校验且格式化的表单值
        const validAndFormatedVals = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validAndFormatedVals: ', validAndFormatedVals);
        message.info('提交成功');
      }}
    >
      <ProForm.Group>
        <ProFormText
          name={'proFormText'}
          label={'ProFormText'}
          width={'md'}
          tooltip="最长 10 位"
          placeholder={'请输入文本'}
          addonBefore={<a>交互区域前节点</a>}
          addonAfter={<a>交互区域后节点</a>}
          required
          rules={[
            {
              required: true,
              message: '这是必填项',
            },
          ]}
          colProps={{
            span: 8,
          }}
        ></ProFormText>
        <ProFormText.Password
          name={'proFormText.Password'}
          label="ProFormText.Password"
          colProps={{ span: 4 }}
          rules={[{
            min: 3,
            message: '密码长度不小于3'
          },{
            required: true,
            message: '这是必填项'
          },{
            max: 6,
            message: '密码长度不超过6'
          }]}
        ></ProFormText.Password>
        <ProFormDigit
          name={'proFormDigit'}
          label="ProFormDigit"
          width={'lg'}
          rules={[{ type: 'number', min: 0 }]}
          colProps={{ span: 3 }}
        ></ProFormDigit>
        <ProFormSelect
          name={'proFormSelect'}
          label={'ProFormSelect'}
          width="xs"
          options={[
            {
              value: 'select_value_1',
              label: 'select_option_1',
            },
            {
              value: 'select_value_2',
              label: 'select_option_2',
            },
          ]}
          colProps={{ span: 3 }}
        ></ProFormSelect>
        <ProFormDatePicker
          name={'proFormDatePicker'}
          label="ProFormDatePicker"
          colProps={{ span: 3 }}
        ></ProFormDatePicker>
        <ProFormDateRangePicker
          name={'proFormDateRangePicker'}
          label="ProFormDateRangePicker"
          colProps={{ span: 5 }}
        ></ProFormDateRangePicker>
      </ProForm.Group>
      <ProForm.Group>
        <ProFormMoney
          name={'proFormMoney'}
          label="ProFormMoney"
          min={0}
          colProps={{ span: 4 }}
        ></ProFormMoney>
        <ProFormDependency name={['proFormSelect', 'proFormDatePicker']}>
          {(deps) => {
            return (
              <ProFormTextArea
                name={'proFormTextArea'}
                label="ProFormTextArea (ProFormDependency)"
                fieldProps={{
                  value: `您选择了 ${deps?.proFormSelect}，日期为 ${deps?.proFormDatePicker}`,
                }}
                colProps={{ span: 6 }}
              ></ProFormTextArea>
            );
          }}
        </ProFormDependency>
        <ProFormCascader
          name={'proFormCascader'}
          label="ProFormCascader"
          initialValue={['zhejiang', 'hangzhou', 'xihu']}
          addonAfter={'转塘街道'}
          colProps={{ span: 6 }}
          request={async () => [
            {
              value: 'zhejiang',
              label: '浙江',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  children: [
                    {
                      value: 'xihu',
                      label: '西湖区',
                    },
                  ],
                },
              ],
            },
            {
              value: 'hebei',
              label: '河北',
              children: [
                {
                  value: 'shijiazhuang',
                  label: '石家庄',
                  children: [
                    {
                      value: 'yuhua',
                      label: '裕华区',
                    },
                  ],
                },
              ],
            },
          ]}
        ></ProFormCascader>
        <ProFormTreeSelect
          name={'proFormTreeSelect'}
          label="ProFormTreeSelect"
          initialValue={['0-0-0']}
          request={treeSelectData}
          colProps={{ span: 8 }}
        ></ProFormTreeSelect>
      </ProForm.Group>
      <ProForm.Group></ProForm.Group>
      <ProForm.Item
        name={'ET'}
        label="EditableTable"
        initialValue={ETDatasource}
        trigger="onValuesChange"
      >
        <EditableProTable<ETDatasourceType>
          rowKey="id"
          editableFormRef={ETRef}
          toolBarRender={() => [
            <ProFormRadio.Group
              key={'creatorPosition'}
              fieldProps={{
                value: creatorPosition,
                onChange: (e) => {
                  setCreatorPosition(e.target.value);
                },
              }}
              options={[
                { label: '添加到顶部', value: 'top' },
                { label: '添加到底部', value: 'bottom' },
                { label: '隐藏', value: 'hidden' },
              ]}
            ></ProFormRadio.Group>,
            <Button
              type="primary"
              key={'showET'}
              onClick={() => {
                const rows = ETRef.current?.getRowsData?.();
                console.log('可编辑表格的内容为：', rows);
              }}
            >
              展示正在编辑的内容
            </Button>,
          ]}
          columns={etColumns}
          recordCreatorProps={
            creatorPosition !== 'hidden'
              ? {
                  newRecordType: 'dataSource',
                  position: creatorPosition,
                  record: () => ({
                    id: Date.now(),
                    addonBefore: 'dongyaoo',
                    desc: 'testForDongyaoo',
                  }),
                }
              : false
          }
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableKeys,
            actionRender: (row, config, dom) => {
              return [
                dom.save,
                dom.delete || dom.cancel,
                <a
                  key={'ETSetRow'}
                  onClick={() => {
                    ETRef.current?.setRowData?.(config.index!, {
                      activityName: 'wxg',
                    });
                  }}
                >
                  动态设置此行
                </a>,
              ];
            },
          }}
        ></EditableProTable>
      </ProForm.Item>
    </ProForm>
  );
};
export default Base;
