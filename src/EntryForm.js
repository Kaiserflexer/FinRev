import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const EntryForm = ({ categories, onSubmit }) => {
  const [form] = Form.useForm();
  const [type, setType] = useState('income');

  const handleTypeChange = (value) => {
    setType(value);
  };

  const onFinish = (values) => {
    const entry = {
      ...values,
      type, // Передаем тип из состояния
    };
    onSubmit(entry, type); // Теперь передаем тип снова в onSubmit
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ type: 'income' }}>
      <Form.Item label="Тип" name="type">
        <Select onChange={handleTypeChange}>
          <Option value="income">Доход</Option>
          <Option value="expense">Расход</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Категория" name="category" rules={[{ required: true, message: 'Выберите категорию' }]}>
        <Select>
          {categories.map((category, index) => (
            <Option key={index} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Сумма (грн)" name="amount" rules={[{ required: true, message: 'Введите сумму' }]}>
        <InputNumber style={{ width: '100%' }} className="text-no-wrap" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" icon={type === 'income' ? <PlusCircleOutlined /> : <MinusCircleOutlined />} htmlType="submit">
            {type === 'income' ? 'Добавить доход' : 'Добавить расход'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EntryForm;
