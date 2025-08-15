import React, { useState, useEffect } from 'react';
import './App.css';
import { Layout, Row, Col, Card, Empty, Space, Button, Progress, Statistic, message } from 'antd';
import { DollarCircleOutlined, CreditCardOutlined } from '@ant-design/icons';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { openDB, addIncomeEntry, addExpenseEntry, getIncomeEntries, getExpenseEntries, deleteIncomeEntry, deleteExpenseEntry } from './db';

const { Content } = Layout;

function App() {
  const [categories, setCategories] = useState(['Зарплата', 'Подарок', 'Еда', 'Транспорт', 'Кредиты', 'Страхование', 'Медецина', 'Лекарства', 'Развлечения', 'Алкоголь', 'Фаст-фуд', 'Подарки', 'Премия', 'Ремонт', 'Штрафы', 'Бытовая Химия']);
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  useEffect(() => {
    openDB().then(() => {
      updateIncomeEntries();
      updateExpenseEntries();
    });
  }, []);

  const updateIncomeEntries = () => {
    getIncomeEntries().then((entries) => {
      setIncomeEntries(entries);
    });
  };

  const updateExpenseEntries = () => {
    getExpenseEntries().then((entries) => {
      setExpenseEntries(entries);
    });
  };

  const handleEntrySubmit = (entry, type) => {
    if (type === 'income') {
      addIncomeEntry(entry)
        .then(() => {
          updateIncomeEntries();
        })
        .catch((err) => {
          message.error(`Не удалось добавить доход: ${err.message}`);
        });
    } else {
      addExpenseEntry(entry)
        .then(() => {
          updateExpenseEntries();
        })
        .catch((err) => {
          message.error(`Не удалось добавить расход: ${err.message}`);
        });
    }
  };

  const handleEntryDelete = (entry, type) => {
    if (type === 'income') {
      deleteIncomeEntry(entry.id)
        .then(() => {
          updateIncomeEntries();
        })
        .catch((err) => {
          message.error(`Не удалось удалить доход: ${err.message}`);
        });
    } else {
      deleteExpenseEntry(entry.id)
        .then(() => {
          updateExpenseEntries();
        })
        .catch((err) => {
          message.error(`Не удалось удалить расход: ${err.message}`);
        });
    }
  };

  const getTotalIncome = () => {
    return incomeEntries.reduce((total, entry) => total + entry.amount, 0);
  };

  const getTotalExpense = () => {
    return expenseEntries.reduce((total, entry) => total + entry.amount, 0);
  };

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
              <Statistic title="Общий доход" value={getTotalIncome().toFixed(2)} precision={2} />
              <Progress
                percent={((getTotalIncome() / (getTotalIncome() + getTotalExpense())) * 100).toFixed(2)}
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
              <Statistic title="Общий расход" value={getTotalExpense().toFixed(2)} precision={2} />
              <Progress
                percent={((getTotalExpense() / (getTotalIncome() + getTotalExpense())) * 100).toFixed(2)}
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
                value={(getTotalIncome() - getTotalExpense()).toFixed(2)}
                precision={2}
                valueStyle={{ color: getTotalIncome() - getTotalExpense() >= 0 ? 'green' : 'red' }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
