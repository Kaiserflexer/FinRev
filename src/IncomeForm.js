import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

function IncomeForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете отправить данные в Indexed DB
    console.log('Отправлен доход: Категория -', category, 'Сумма -', amount);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Категория дохода">
        <Select onChange={handleCategoryChange}>
          <Option value="Зарплата">Зарплата</Option>
          <Option value="Подарок">Подарок</Option>
          {/* Добавьте больше категорий */}
        </Select>
      </Form.Item>
      <Form.Item label="Сумма дохода">
        <Input type="number" onChange={handleAmountChange} value={amount} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить доход
        </Button>
      </Form.Item>
    </Form>
  );
}

export default IncomeForm;
