import React, { useState, useEffect } from 'react';
import './App.css';
import { Layout, Row, Col, Card, Empty, Space, Button, Progress, Statistic, message } from 'antd';
import { DollarCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { addIncomeEntry, addExpenseEntry, getIncomeEntries, getExpenseEntries, deleteIncomeEntry, deleteExpenseEntry } from './db';

const { Content } = Layout;

function App() {
  const [categories, setCategories] = useState(['Зарплата', 'Подарок', 'Еда', 'Транспорт', 'Кредиты', 'Страхование', 'Медецина', 'Лекарства', 'Развлечения', 'Алкоголь', 'Фаст-фуд', 'Подарки', 'Премия', 'Ремонт', 'Штрафы', 'Бытовая Химия']);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  useEffect(() => {
    updateIncomeEntries();
    updateExpenseEntries();
  }, []);

  const updateIncomeEntries = async () => {
    const entries = await getIncomeEntries();
    setIncomeEntries(entries);
  };

  const updateExpenseEntries = async () => {
    const entries = await getExpenseEntries();
    setExpenseEntries(entries);
  };

  const handleEntrySubmit = async (entry, type) => {
    try {
      if (type === 'income') {
        await addIncomeEntry(entry);
        await updateIncomeEntries();
      } else {
        await addExpenseEntry(entry);
        await updateExpenseEntries();
      }
    } catch (err) {

      message.error(
        `Не удалось добавить ${type === 'income' ? 'доход' : 'расход'}: ${err.message}`
      );

      const action = type === 'income' ? 'добавить доход' : 'добавить расход';
      message.error(`Не удалось ${action}: ${err.message}`);

    }
  };

  const handleEntryDelete = async (entry, type) => {
    try {
      if (type === 'income') {
        await deleteIncomeEntry(entry.id);
        await updateIncomeEntries();
      } else {
        await deleteExpenseEntry(entry.id);
        await updateExpenseEntries();
      }
    } catch (err) {

      message.error(
        `Не удалось удалить ${type === 'income' ? 'доход' : 'расход'}: ${err.message}`
      );

      const action = type === 'income' ? 'удалить доход' : 'удалить расход';
      message.error(`Не удалось ${action}: ${err.message}`);

    }
  };

  const getTotalIncome = () => {
    return incomeEntries.reduce((total, entry) => total + entry.amount, 0);
  };

  const getTotalExpense = () => {
    return expenseEntries.reduce((total, entry) => total + entry.amount, 0);
  };

  // Calculate totals once per render to avoid duplicate work
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const totalSum = totalIncome + totalExpense;
  const totalDifference = totalIncome - totalExpense;

  // Determine progress bar percentages, guarding against division by zero
  const incomePercent = totalSum === 0 ? 0 : Number(((totalIncome / totalSum) * 100).toFixed(2));
  const expensePercent = totalSum === 0 ? 0 : Number(((totalExpense / totalSum) * 100).toFixed(2));

  return (
    <Layout className="layout">
      <Content style={{ background: '#fff', padding: '20px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Ввод данных" style={{ minHeight: '300px' }}>
              <EntryForm categories={categories} onSubmit={handleEntrySubmit} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Доходы" style={{ minHeight: '300px' }}>
              {incomeEntries.length > 0 ? (
                <EntryList entries={incomeEntries} type="income" onDelete={(entry) => handleEntryDelete(entry, 'income')} />
              ) : (
                <Empty description="Пусто" />
              )}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Расходы" style={{ minHeight: '300px' }}>
              {expenseEntries.length > 0 ? (
                <EntryList entries={expenseEntries} type="expense" onDelete={(entry) => handleEntryDelete(entry, 'expense')} />
              ) : (
                <Empty description="Пусто" />
              )}
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Общий доход">
              <Statistic title="Общий доход" value={totalIncome.toFixed(2)} precision={2} />
              <Progress
                percent={incomePercent}
                status="active"
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Общий расход">
              <Statistic title="Общий расход" value={totalExpense.toFixed(2)} precision={2} />
              <Progress
                percent={expensePercent}
                status="active"
                strokeColor={{
                  from: '#f50',
                  to: '#87d068',
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Общая разница">
              <Statistic
                title="Общая разница"
                value={totalDifference.toFixed(2)}
                precision={2}
                valueStyle={{ color: totalDifference >= 0 ? 'green' : 'red' }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
