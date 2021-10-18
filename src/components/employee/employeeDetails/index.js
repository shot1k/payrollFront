import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Row, Col, Select, Button, Modal, Table, DatePicker, Checkbox, message, Space, Popconfirm, Tooltip, Upload } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, CheckOutlined, CloseCircleOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import axios from "axios";
import moment from 'moment';
import constants from '../../../constant'
import {
    useParams
} from "react-router-dom";
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
import AddComponent from './AddComponent';

const { Option } = Select;


function EmployeeDetails() {
    const [form] = Form.useForm();
    let { id } = useParams();
    let history = useHistory();


    const handleSave = values => {
        console.log('onFinish', values);
        // call save API
    };

    const [isEdiT, setIsEdiT] = useState(false);
    const [schemes, setSchemes] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        mobilePhone: "",
        email: "",
        personalNumber: "",
        address: "",
        bankAccountNumber: "",
        scheme: "",
        employeeTypes: "",
        departmentName: "",
        employeeComponents: []

    });

    const fetchSchemes = async () => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX + "/api/Common/schemeTypes");

        console.log('result setSchemes---', result.data)
        setSchemes(result.data)
        // setTableLoading(false);
    }

    const fetchEmployeeTypes = async () => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX + "/api/Common/EmployeeTypes");

        console.log('result setSchemes---', result.data)
        setEmployeeTypes(result.data)
        // setTableLoading(false);
    }


    const fetchDepartments = async () => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX + "/api/department");

        console.log('result EmployeeTypes---', result.data)
        setDepartments(result.data)
        // setTableLoading(false);
    }


    const fetchEmployeeById = async (id) => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX + `/api/Employee/getEmployee/${id}`);

        console.log('result fetchEmployeeById11111', result.data)
      
        setEmployee(result.data)
        // setTableLoading(false);
    }

    useEffect(() => {
        if (id) {
            setIsEdiT(true)
            fetchEmployeeById(id)
        }
        //     fetchProjects();
        //     fetchCostCenters();
        fetchDepartments();
        //     fetchComponents();
        fetchSchemes();
        //     fetchPaymentDaysTypes();
        fetchEmployeeTypes();
    }, []);

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    const requiredFieldRule = [{ required: true, message: 'Required Field' }];

    const handleChangeSelect = (value, name) => {
        setEmployee({ ...employee, [name]: value });
        console.log('handleChangeSelect', value)
    }

    const handleSaveEmployee = async () => {
        console.log("avto", isEdiT, employee)
        let result;
        if (!isEdiT) {
            result = await axios.post(constants.API_PREFIX + "/api/Employee", employee);
        }
        else {
            result = await axios.put(constants.API_PREFIX + "/api/Employee", employee);
        }
        console.log('result ', result)

        if (result.data.isSuccess) {
            // fetchData();
            message.success(result.data.message);
        }
        else {
            message.error(result.data.message);
        }

    }


    const goBack = () => {
        history.goBack()
    }

    const { loading, imageUrl } = useState("");



    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const [fileList, setFileList] = useState([])

    const handleChangeFileList = (info) => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show the last recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        setFileList(fileList);
    };

    const handlePreview = (file) => {
        console.log('file', file)
    }


    return (
        <div>
            {/* <Upload
                    listType="picture-card"

            >
                
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload> */}
            {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}

            <Upload onPreview={handlePreview} listType="picture-card" fileList={fileList} onChange={handleChangeFileList}>
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

            {/* <Upload style={{width: "10px"}} listType="picture" fileList={fileList} onChange={handleChangeFileList}>
            <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}

            <Card title="Add Employee" loading={false}>
                <Form
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="product-form"
                    onFinish={handleSave}
                    layout={'vertical'}
                >
                    <Row>
                        <Col span={6}>
                            <Form.Item label="Name" rules={requiredFieldRule} >
                                <Input disabled={employee.resId != null} value={employee.firstName} name="firstName" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="Lastname">
                                <Input disabled={employee.resId != null} value={employee.lastName} name="lastName" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="ResId">
                                <Input disabled value={employee.resId} name="resId" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="landIso">
                                <Input disabled={employee.resId != null} value={employee.landIso} name="landIso" onChange={e => handleChange(e)} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="MobilePhone">
                                <Input disabled={employee.resId != null} value={employee.mobilePhone} name="mobilePhone" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input disabled={employee.resId != null} value={employee.email} name="email" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="PersonalNumber">
                                <Input disabled={employee.resId != null} value={employee.personalNumber} name="personalNumber" onChange={e => handleChange(e)} />
                            </Form.Item>

                        </Col>
                        <Col span={6}>
                            <Form.Item label="Address">
                                <Input disabled={employee.resId != null} value={employee.address} name="address" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="BankAccountNumber">
                                <Input disabled={employee.resId != null} value={employee.bankAccountNumber} name="bankAccountNumber" onChange={e => handleChange(e)} />
                            </Form.Item>
                            <Form.Item label="Scheme">
                                <Select
                                    disabled={employee.resId != null}
                                    defaultValue="აირჩიეთ"
                                    onChange={(value) => handleChangeSelect(value, 'schemeTypeId')}
                                    value={employee.schemeTypeId}
                                >
                                    {
                                        schemes.map((i) =>
                                            <Option value={i.id}>{i.name}</Option>)
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col span={6}>
                            <Form.Item label="DepartmentName">
                                <Select
                                    disabled={employee.resId != null}
                                    defaultValue="აირჩიეთ"
                                    onChange={(value) => handleChangeSelect(value, 'departmentId')}
                                    value={employee.departmentId}
                                >
                                    {
                                        departments.map((i) =>
                                            <Option value={i.id}>{i.name}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Position">
                                <Input disabled={employee.resId != null} value={employee.position} name="position" onChange={e => handleChange(e)} />
                            </Form.Item>

                            <Form.Item label="EmployeeTypes">
                                <Select
                                    disabled={employee.resId != null}
                                    defaultValue="აირჩიეთ"
                                    onChange={(value) => handleChangeSelect(value, 'employeeTypeId')}
                                    value={employee.employeeTypeId}
                                >
                                    {
                                        employeeTypes.map((i) =>
                                            <Option value={i.id}>{i.name}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <AddComponent employee={employee} setEmployee={setEmployee} />
            <br />
            <Button type="primary" onClick={handleSaveEmployee} icon={<PlusCircleOutlined />}>
                შენახვა
            </Button>
            <Button style={{ marginLeft: "10px" }} onClick={goBack} icon={<CloseCircleOutlined />}>
                დახურვა
            </Button>
        </div>
    );
}

export default EmployeeDetails;
