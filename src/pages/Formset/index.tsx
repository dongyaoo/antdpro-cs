import { message } from 'antd';
import ProForm, {
  ProFormUploadDragger,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { FC, useRef, useState } from 'react';
import { createContext } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import ProCard from '@ant-design/pro-card';
import Base from './Base';
// export interface ContextProps {
//   entity: object[];
// }

const Formset: FC<Record<string, any>> = () => {
  const [type, setType] = useState<string>('Base');
  // 表单组件映射
  const components = {
    Base,
  }
  let Form = components[type]
  return (
    <PageContainer content="表单集">
      <ProCard gutter={8} split={'horizontal'}>
        <ProCard layout='center' direction='column'>
          <div style={{ marginBottom: -25 }}>
            <ProFormRadio.Group
              style={{ margin: 16 }}
              radioType='button'
              fieldProps={{
                value: type,
                onChange: (e) => {
                  console.log(e.target.value);
                  setType(e.target.value)
                },
              }}
              options={[
                { label: 'Base表单', value: 'Base' },
                { label: 'Modal表单', value: 'Modal' },
                { label: 'Steps表单', value: 'Steps' },
                { label: 'Login表单', value: 'Login' },
                { label: 'Drawer表单', value: 'Drawer' },
                { label: 'QueryFilter表单', value: 'QueryFilter' },
                { label: 'LightFilter表单', value: 'LightFilter' },
              ]}></ProFormRadio.Group>
          </div>

          {/* <ProForm
            formKey='formset'
            submitter={false}>
          </ProForm> */}
        </ProCard>
        <ProCard layout='center' direction='column'><Form></Form></ProCard>

      </ProCard>
    </PageContainer>
  );
};

export default Formset;
