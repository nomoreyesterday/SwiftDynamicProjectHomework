import { Select } from 'antd';

const { Option } = Select;

const SelectLanguage = () => {
  return (
    <Select
      className="select-placeholder-left"
      style={{ width: '110px', right: 0 }}
      defaultValue="Thai"
      onChange={(value) => {
        console.log(value); 
      }}
    >
      <Option value="Thai">Thai</Option>
      <Option value="English">English</Option>
    </Select>
  );
};

export default SelectLanguage;
