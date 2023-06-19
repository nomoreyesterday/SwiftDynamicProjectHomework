// import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button, Form, Input, Radio, Row,  Select, DatePicker, Space,  
	// Checkbox, Space, 
} from 'antd';

import { useDispatch, 
	useSelector 
} from 'react-redux';
import { setFormData } from '../redux/dataSlice';
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../redux/store';

const DataForm = () => {
	const { Option } = Select;

	 const dispatch = useDispatch();
	 const formData = useSelector((state: RootState) => state.data.formData);

	//Submit
	const onFinish = (values: any) => {

		const date = values.birthdate.format("YYYY-MM-DD");
		const phone = phoneNumber.prefix + "-" + phoneNumber.number
		const newData = {
			id: uuidv4(),
			gender: values.gender,
			idNumber: idCard.join('-'),
			phoneNumber: phone,
			prename: values.prename,
			name: values.name,
			lastname: values.lastname,
			birthdate: date,
			nationality: values.nationality,
		  };
		  
		dispatch(setFormData(newData));
		console.log('form: ', formData);
	  };

	//Clear Form
	const [form] = Form.useForm();
	const onClear = () => {
		form.resetFields()
	}

	//Put sample
	const onFill = () => {
		form.setFieldsValue({
			id: "1",
			gender: "ชาย",
			idNumber: "1-2222-33333-44-5",
			prefix: +66,
			// phonenumber: "66-123456789",
			prename: "นาย",
			name: "1111",
			lastname: "2222222",
			// birthdate: "2021-01-14",
			nationality: "ไทย",
			passport: "111111",
			salary: "111111",
		  });
	}

	//ID Number
	const [idCard, setIdCard] = useState(['', '', '', '', '']);
	const handleInputChange = (e: any, index: number) => {
		const value = e.target.value;
		let updatedIDCard = [...idCard];
		const maxLength = e.target.maxLength;
  		updatedIDCard[index - 1] = value.slice(0, maxLength);
		setIdCard(updatedIDCard);
	};

	//Phone Number
	const [phoneNumber, setPhoneNumber] = useState({ prefix: '', number: '' });
	const handlePrefixChange = (value: string) => {
		setPhoneNumber((prevState) => ({
		  ...prevState,
		  prefix: value
		}));
	  };

	const handlePhoneNumberChange = (e: any) => {
		const value = e.target.value;
		const maxLength = e.target.maxLength;
		setPhoneNumber((prevState) => ({
			...prevState,
			number: value.slice(0, maxLength)
		}));
	};

	const prefixOptions = [
		{ value: '+66', label: '+66' },
		{ value: '+1', label: '+1' },
		{ value: '+44', label: '+44' },
	];

    return (
        <div className='dataform'>
            <Form 
				// style={{ display: 'flex', flexDirection: 'row' }}
                name="normal_login"
                className="login-form"
				form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
				<Row>
					<Form.Item
						name="prename"
						label="คำนำหน้า"
						rules={[
							{
								required: true,
								message: 'กรุณาเลือกคำนำหน้าชื่อด้วย!',
								// message: 'Please select your prefix name!',
							},
						]}
						>
						<Select style={{ width: '85px', margin: '0 10px 0 0' }} placeholder="คำนำหน้า">
							<Option value="นาย">นาย</Option>
							<Option value="นาง">นาง</Option>
							<Option value="นางสาว">นางสาว</Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="name"
						label="ชื่อจริง"
						rules={[
							{ 
								required: true, 
								message: 'กรุณาใส่ชื่อ!' 
								// message: 'Please fill your Name!' 
							}
						]}
					>
						<Input
							style={{ width: '340px', margin: '0 10px 0 0' }}
						/>
					</Form.Item>
					<Form.Item
						name="lastname"
						label="นามสกุล"
						rules={[
							{ 
								required: true, 
								message: 'กรุณาใส่นามสกุล!'
								// message: 'Please fill your Last Name!' 
							}
						]}
					>
						<Input
							style={{ width: '340px' }}
						/>
					</Form.Item>
				</Row>

				<Row>
					<Form.Item
						name="birthdate"
						label="วันเกิด"
						rules={[
							{ 
								required: true, 
								message: 'กรุณาใส่วันเกิด!' 
								// message: 'Please fill your birthdate!' 
							}
						]}
					>
						<DatePicker 
							placeholder="วัน/เดือน/ปี" 
							style={{ margin: '0 40px 0 0' }}
							/>
					</Form.Item>

					<Form.Item
						name="nationality" 
						label="สัญชาติ"
						rules={[
							{ 
								required: true, 
								message: 'กรุณาระบุสัญชาติ!' 
								// message: 'Please fill your Nationality!' 
							}
						]}
					>
						<Select 
							className="select-placeholder-left"
							style={{ width: 345 , left: 0}} 
							placeholder="-- กรุณาเลือก --">
							<Option value="ไทย">ไทย</Option>
						</Select>
					</Form.Item>
				</Row>

				<Row>
					<Form.Item
						label="เลขบัตรประชาชน"
						name="idnumber"
						rules={[
						{
							// required: true,
							message: 'กรุณากรอกรหัสบัตรประชาชน',
							// message: 'Please fill your ID number',
						},
						]}
					>
						<Space>
							<Input
								style={{ width: '75px' }}
								className="id-card-input"
								maxLength={1}
								onChange={(e) => handleInputChange(e, 1)}
							/>
							<span className="id-card-separator">-</span>
							<Input
								style={{ width: '150px' }}
								className="id-card-input"
								maxLength={4}
								onChange={(e) => handleInputChange(e, 2)}
							/>
							<span className="id-card-separator">-</span>
							<Input
								style={{ width: '150px' }}
								className="id-card-input"
								maxLength={5}
								onChange={(e) => handleInputChange(e, 3)}
								required
							/>
							<span className="id-card-separator">-</span>
							<Input
								style={{ width: '110px' }}
								className="id-card-input"
								maxLength={2}
								onChange={(e) => handleInputChange(e, 4)}
							/>
							<span className="id-card-separator">-</span>
							<Input
								style={{ width: '75px' }}
								className="id-card-input"
								maxLength={1}
								onChange={(e) => handleInputChange(e, 5)}
							/>
						</Space>
					</Form.Item>
				</Row>
				
				<Row>
					<Form.Item
						name="gender"
						label="เพศ"
						rules={[
							{
								required: true,
								message: 'กรุณาเลือกช่องใดช่องหนึ่ง',
								// message: 'Please fill your gender',
							},
						]}
						>
						<Radio.Group>
							<Radio value="ชาย">ผู้ชาย</Radio>
							<Radio value="หญิง">ผู้หญิง</Radio>
							<Radio value="ไม่ระบุ">ไม่ระบุ</Radio>
						</Radio.Group>
					</Form.Item>
				</Row>

				<Row>
					<Form.Item
						label="หมายเลขโทรศัพท์มือถือ"
						name="phoneNumber"
						rules={[
							{
								required: true,
								message: 'กรุณากรอกหมายเลขโทรศัพท์มือถือ',
								// message: 'Please fill your phone number',
							},
						]}
					>
						<div>
							<Form.Item name="prefix" noStyle>
								<Select 
									style={{ width: 120 }} 
									onChange={handlePrefixChange}
								>
								{prefixOptions.map((option) => (
									<Option 
										key={option.value} 
										value={option.value}>
											{option.label}
									</Option>
								))}
								</Select>
							</Form.Item>
							<span className="id-card-separator">-</span>
							<Input
								style={{ width: '300px' }}
								className="id-card-input"
								maxLength={9}
								onChange={handlePhoneNumberChange}
							/>
						</div>
					</Form.Item>
				</Row>

				<Row>
					<Form.Item
						name="passport"
						label="หนังสือเดินทาง"
						rules={[
							{
								// required: true,
								message: 'กรุณากรอกหนังสือเดินทาง',
								// message: 'Please fill your passport',
							},
						]}
					>
						<Input
							style={{ width: '320px' }}
						/>
					</Form.Item>
				</Row>

				<Row>
					<Form.Item
						name="salary"
						label="เงินเดือนที่คาดหวัง"
						rules={[
							{
								required: true,
								message: 'กรุณากรอกเงินเดือนที่คาดหวัง',
								// message: 'Please fill your expect salary',
							},
						]}
					>
						<Input
							style={{ width: '288px' }}
						/>
					</Form.Item>
					<div 
						className='submitButtonGroup'
					>
						<Button onClick={onClear} className='clearbutton'>ล้างข้อมูล</Button>
						<Button onClick={onFill} className='clearbutton'>ใส่ข้อมูลอัตโนมัติ</Button>
						<Button className='submitbutton' type='primary' htmlType='submit'>ส่งข้อมูล</Button>
					</div>
				</Row>
            </Form>
        </div>
    );
};

export default DataForm;
