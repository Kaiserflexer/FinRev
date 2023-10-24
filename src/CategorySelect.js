// CategorySelect.js
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function CategorySelect({ categories, selectedCategory, onSelectCategory }) {
  return (
    <Select value={selectedCategory} onChange={onSelectCategory}>
      {categories.map((category) => (
        <Option key={category} value={category}>
          {category}
        </Option>
      ))}
    </Select>
  );
}

export default CategorySelect;
