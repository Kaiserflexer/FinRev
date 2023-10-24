import React from 'react';
import { List, Typography, Card, Row, Col, Button, Tag, Space } from 'antd';
import { DollarCircleOutlined, CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

const EntryList = ({ entries, type, onDelete }) => {
  const IconComponent = type === 'income' ? <DollarCircleOutlined /> : <CreditCardOutlined />;
  const iconColor = type === 'income' ? 'green' : 'red';

  const handleDelete = (entry) => {
    onDelete(entry);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={entries}
      renderItem={(entry) => (
        <List.Item>
          <List.Item.Meta
            avatar={IconComponent}
            title={entry.category}
          />
          <Row gutter={8}>
            <Col span={10}>
              <Text strong style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                {entry.amount} грн
              </Text>
            </Col>
            <Col span={6}>
              <Space>
                <Tag color={iconColor}>
                  {type === 'income' ? 'Доход' : 'Расход'}
                </Tag>
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(entry)} style={{ color: 'red', width: '24px' }} />
              </Space>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default EntryList;
