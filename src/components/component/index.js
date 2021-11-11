import React, { useState, useEffect } from 'react';
import moment from 'moment';

import 'antd/dist/antd.css';
import { Table, Divider, Select, Modal, Button, message, Form, Input, Space, Popconfirm, Tooltip, DatePicker } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'

const { Option } = Select;


function Component() {
    const columns = [
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        // },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) =>
                <div>
                    <Space>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip placement="bottom" title="წაშლა">
                                <Button type="primary" icon={<DeleteOutlined />} />
                            </Tooltip>

                        </Popconfirm>
                        <Tooltip placement="bottom" title="რედაქტირება">
                            <Button onClick={() => clickEdit(record)} type="primary" icon={<EditOutlined />} />
                        </Tooltip>
                    </Space>
                </div>
        },
        {
            title: 'სახელი',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'კოეფიციენტი',
            dataIndex: 'coefficientName',
        },
        {
            title: 'credit Acount',
            dataIndex: 'creditAccountName',
        },
        {
            title: 'debit Acount',
            dataIndex: 'debitAccountName',
        },
        {
            title: 'დაწყება',
            dataIndex: 'startDate',
            render: text => <p>{moment(text).format('LLL')}</p>,
        },
        {
            title: 'დასრულება',
            dataIndex: 'endDate',
            render: text => <p>{moment(text).format('LLL')}</p>,
        },
        {
            title: 'შექმნის თარიღი',
            dataIndex: 'dateCreated',
            render: text => <p>{moment(text).format('LLL')}</p>,
        },
    ];

    const [dataSaveArray, setDataSaveArray] = useState([]);
    const [component, setComponent] = useState({
        name: "",
        coefficientId: null,
        creditAccountId: null,
        debitAccountId: null,
        startDate: null,
        endDate: null,

    });
    const [tableLoading, setTableLoading] = useState(false);
    const [isEdiT, setIsEdiT] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [accountsReportChartType, setAccountsReportChartType] = useState([]);

    const [accountsReportCharts, setAccountsReportCharts] = useState([]);
    const [coefficients, setCoefficients] = useState([]);

    const fetchData = async () => {
        setTableLoading(true);
        const result = await axios(constants.API_PREFIX+"/api/Component");
        console.log("result", result.data);

        setDataSaveArray(result.data)
        setTableLoading(false);
    }



    const fetchAaccountsReportCharts = async () => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX+"/api/AccountsReportChart");
        setAccountsReportCharts(result.data)
        // setTableLoading(false);
    }


    const fetchCoefficients = async () => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX+"/api/Coefficient");

        console.log('result Coifficient---', result.data)
        setCoefficients(result.data)
        // setTableLoading(false);
    }



    useEffect(() => {
        fetchData();
        fetchAaccountsReportCharts();
        fetchCoefficients();
    }, []);



    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        setIsEdiT(false);
        console.log("component",component)
        if (!isEdiT) {
            const result = await axios.post(constants.API_PREFIX+"/api/Component", component);
            console.log("resultPost", result)
            if (result.data.isSuccess) {
                fetchData();
                message.success('This is a success message');
            }
            else {
                message.error('This is an error message');
            }
        }
        else {
            const result1 = await axios.put(constants.API_PREFIX+"/api/Component", component);
            console.log("result1", result1)
            if (result1.data.isSuccess) {
                fetchData();
                message.success('This is a success message');
            }
            else {
                message.error('This is an error message');
            }
        }
        // setAccountsReportChart({
        //     code: "",
        //     description: "",
        //     accountsReportChartTypeId: null
        // })
    };

    const handleCancel = () => {
        setIsEdiT(false);
        setIsModalVisible(false);
        // setAccountsReportChart({
        //     code: "",
        //     description: "",
        //     accountsReportChartTypeId: null
        // })
    };

    const handleChange = (e) => {
        // console.log('handleChange', e.target);
        setComponent({ ...component, [e.target.name]: e.target.value })
    }

    const confirm = async (record) => {
        console.log("record", record)
        const result = await axios.delete(constants.API_PREFIX+"/api/Component", { data: record });
        console.log('result', result)
        if (result.data.isSuccess) {
            message.success(result.data.message);
            fetchData();
        }
        else {
            message.error(result.data.message);
        }
    }

    const clickEdit = (record) => {
        setIsEdiT(true);
        console.log("clickEdit", record)
        setComponent(record);
        setIsModalVisible(true);
    }

    const handleChangeSelect = (value, name) => {

        setComponent({ ...component, [name]: value });
        console.log('handleChangeSelect', value)

    }

    function onChange(date, dateString) {
        console.log(date, dateString);
      }


    return (
        <div>
            <Button type="primary" onClick={showModal} icon={<PlusCircleOutlined />}>
                დამატება
            </Button>
            <Modal
                loading={buttonLoading}
                okText={!isEdiT ? "დამატება" : "შენახვა"}
                cancelText="გაუქმება"
                title="კომპონენტი"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            // width={1000}
            >
                <Form>
                    <Form.Item>
                        <Space style={{ marginRight: "40px" }}>

                            <Form.Item
                                label="სახელი"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: 'calc(100% + 8px)' }}
                            >
                                <Input value={component.name} type="text" name="name" onChange={e => handleChange(e)} placeholder="სახელი" />
                            </Form.Item>
                        </Space>


                        <Form.Item
                            label="კოეფიციენტები"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '-20 8px',
                            }}
                        >
                            <Select
                                defaultValue="აირჩიეთ"
                                style={{ width: 120 }}
                                onChange={(value) => handleChangeSelect(value,'coefficientId')}
                                value={component.coefficientId}
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(100% - 8px)',
                                    margin: '-20 8px',
                                }}
                            >
                                {
                                    coefficients.map((i) =>
                                        <Option value={i.id}>{i.name}</Option>)
                                }


                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="credit Acount"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '-20 8px',
                            }}
                        >
                            <Select
                                defaultValue="აირჩიეთ"
                                style={{ width: 120 }}
                                onChange={(value) => handleChangeSelect(value,'creditAccountId')}
                                value={component.creditAccountId}
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(100% - 8px)',
                                    margin: '-20 8px',
                                }}
                            >
                                {
                                    accountsReportCharts.map((i) =>
                                        <Option value={i.id}>{i.code}</Option>)
                                }


                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="debit Debit"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '-20 8px',
                            }}
                        >
                            <Select
                                defaultValue="აირჩიეთ"
                                style={{ width: 120 }}
                                onChange={(value) => handleChangeSelect(value,'debitAccountId')}
                                value={component.debitAccountId}
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(100% - 8px)',
                                    margin: '-20 8px',
                                }}
                            >
                                {
                                    accountsReportCharts.map((i) =>
                                        <Option value={i.id}>{i.code}</Option>)
                                }


                            </Select>
                        </Form.Item>



                        <Form.Item
                            label="დაწყება"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '-20 8px',
                            }}
                        >
                            <Space>
                                <Space direction="vertical">
                                    <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} onChange={(value) => handleChangeSelect(value,'startDate')} />
                                </Space>
                            </Space>

                        </Form.Item>

                        <Form.Item
                            label="დასრულება"
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '-20 8px',
                            }}
                        >
                            <Space>
                                <Space direction="vertical">
                                <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} onChange={(value) => handleChangeSelect(value,'endDate')} />
                                </Space>
                            </Space>

                        </Form.Item>



                    </Form.Item>
                </Form>
            </Modal>

            <Divider />

            <Table
                loading={tableLoading}
                columns={columns}
                dataSource={dataSaveArray}
            />
        </div>
    );
}

export default Component;
