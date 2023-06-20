
import { Table, Button, Modal, Input, Form, Row, Col  } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FormRecord, deleteAllFormData, deleteFormData, editFormData,  } from '../redux/dataSlice';

const TableForm = () => {
    const formData = useSelector((state: RootState) => state.data.formData);
    const dispatch = useDispatch();

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const onSelectChange = (selectedKeys:any) => {
        setSelectedRowKeys(selectedKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // interface FormRecord {
    //     id: string;
    //     gender: string;
    //     idNumber: string;
    //     phoneNumber: string;
    //     prename: string;
    //     name: string;
    //     lastname: string;
    //     birthdate: string;
    //     nationality: string;
    // }

    const handleDelete = (record: FormRecord) => {
        if (selectedRowKeys.length === 0 || !selectedRowKeys.includes(record.id)) {
            return;
        }
        dispatch(deleteFormData(record));
        setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.id));
    };

    const columns = [
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
            sorter: (a:any, b:any) => a.name.localeCompare(b.name),
        },
        {
            title: 'เพศ',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a:any, b:any) => a.gender.localeCompare(b.gender),
        },
        {
            title: 'หมายเลขโทรศัพท์มือถือ',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            sorter: (a:any, b:any) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: 'สัญชาติ',
            dataIndex: 'nationality',
            key: 'nationality',
            sorter: (a:any, b:any) => a.nationality.localeCompare(b.nationality),
        },
        {
            title: 'จัดการ',
            key: 'action',
            render: (record:any) => (
                <>
                    <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: '8px' }}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record)}>Delete</Button>
                </>
            ),
        },
    ];

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<FormRecord | undefined>({} as FormRecord);

    const handleEdit = (record: any) => {
        setIsEditing(true);
        setEditData({ ...record });
        console.log(record)
    };
    
    // console.log("editData:", JSON.stringify(editData));

    const handleEditCancel = () => {
        setIsEditing(false);
    };

    const handleEditDone = (record: FormRecord) => {
        const recordIndex = formData.findIndex((item) => item.id === record.id);
        if (recordIndex !== -1) {
            const updatedFormData: FormRecord = { 
                ...formData[recordIndex], ...record 
            };
            // console.log(formData)
            dispatch(editFormData(updatedFormData));
            setIsEditing(false);
        }
    };

    const deleteAllRecord = () => {
        const selectedRecords = formData.filter((record) =>
            selectedRowKeys.includes(record.id)
        ) as FormRecord[];
        dispatch(deleteAllFormData(selectedRecords));
        setSelectedRowKeys([]);
      };

    return (
        <>
            <div className='tableform'>
                <div style={{ display: 'flex', alignItems: 'center', margin: '35px 0 10px' }}>
                    <label>
                    <input
                        type="checkbox"
                        checked={formData.length > 0 && selectedRowKeys.length === formData.length}
                        onChange={(e) => {
                            const selectAll = e.target.checked;
                            const allRowKeys = formData.map((record) => record.id);
                            setSelectedRowKeys(selectAll ? allRowKeys : []);
                        }}
                    />
                    เลือกทั้งหมด
                    </label>
                    <Button style={{ marginLeft: '10px' }}onClick={deleteAllRecord}>
                        ลบข้อมูล
                    </Button>
                </div>
                <Table 
                    dataSource={formData}
                    columns={columns}
                    rowKey="id"
                    rowSelection={rowSelection}
                    pagination={{
                        pageSize: 5,
                        pageSizeOptions: ['5', '10', '20', '50'], 
                    }}
                />
                <Modal
                    title="แก้ไขข้อมูล"
                    style={{ width: '80%', height: '80%' }}
                    open={isEditing}
                    closable={false}
                    maskClosable={false}

                    footer={[
                        <Button 
                            key="cancel" 
                            onClick={handleEditCancel}
                        >
                            Cancel
                        </Button>,
                        <Button
                            key="done"
                            type="primary"
                            onClick={() => editData && handleEditDone(editData)}
                        >
                            Done
                        </Button>,
                    ]}
                >

                    <Form
                        onFinish={handleEditDone}
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 15 }}
                        autoComplete="off"
                        initialValues={{
                            name: editData?.name,
                            nationality: editData?.nationality,
                            gender: editData?.gender,
                            phoneNumber: editData?.phoneNumber
                          }}
                    >
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                name="name"
                                label="ชื่อ"
                                rules={[
                                    {
                                    // required: true,
                                    message: "กรุณาใส่ชื่อ!",
                                    },
                                ]}
                                >
                                <Input
                                    onChange={(e) => {
                                        setEditData((prevData) => {
                                        if (prevData) {
                                            return { ...prevData, name: e.target.value } as FormRecord;
                                        }
                                        return { name: e.target.value } as FormRecord;
                                        });
                                    }}
                                />
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={24}>
                                <Form.Item
                                name="gender"
                                label="เพศ"
                                rules={[
                                    {
                                    // required: true,
                                    message: "กรุณาระบุเพศ!",
                                    },
                                ]}
                                >
                                <Input 
                                    onChange={(e) => {
                                        setEditData((prevData) => {
                                            if (prevData) {
                                                return { ...prevData, gender: e.target.value } as FormRecord;
                                            }
                                            return { gender: e.target.value } as FormRecord;
                                        });
                                    }}
                                />
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={24}>
                                <Form.Item
                                name="phoneNumber"
                                label="หมายเลขโทรศัพท์มือถือ"
                                rules={[
                                    {
                                    // required: true,
                                    message: "กรุณาระบุหมายเลขโทรศัพท์มือถือ!",
                                    },
                                ]}
                                >
                                <Input 
                                    onChange={(e) => {
                                        setEditData((prevData) => {
                                            if (prevData) {
                                                return { ...prevData, phoneNumber: e.target.value } as FormRecord;
                                            }
                                            return { phoneNumber: e.target.value } as FormRecord;
                                        });
                                    }}
                                />
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row>
                            <Col span={24}>
                                <Form.Item
                                name="nationality"
                                label="สัญชาติ"
                                rules={[
                                    {
                                    // required: true,
                                    message: "กรุณาระบุสัญชาติ!",
                                    },
                                ]}
                                >
                                <Input 
                                    onChange={(e) => {
                                        setEditData((prevData) => {
                                            if (prevData) {
                                                return { ...prevData, nationality: e.target.value } as FormRecord;
                                            }
                                            return { nationality: e.target.value } as FormRecord;
                                        });
                                    }}
                                />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default TableForm;