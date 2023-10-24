import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

function ExpenseForm() {
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
    console.log('Отправлен расход: Категория -', category, 'Сумма -', amount);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Категория расхода">
        <Select onChange={handleCategoryChange}>
          <Option value="Еда">Еда</Option>
          <Option value="Транспорт">Транспорт</Option>
          {/* Добавьте больше категорий */}
        </Select>
      </Form.Item>
      <Form.Item label="Сумма расхода">
        <Input type="number" onChange={handleAmountChange} value={amount} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить расход
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ExpenseForm;
