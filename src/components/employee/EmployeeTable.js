import React, { useState, useEffect } from 'react';
import { Space, Tooltip, Table, Button, Popconfirm, message } from 'antd';
import { useHistory } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'
import { HOME_PAGE } from '../../constant';

function EmployeeTable({ employeeArray, fetchData, showDelete }) {

    const columns = [
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) =>
                <div>
                    <Space>
                        {showDelete ?
                            <Popconfirm
                                title="Are you sure to delete this task?"
                                onConfirm={() => confirm(record)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Tooltip title="წაშლა">
                                    <Button type="primary" icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Popconfirm>
                            : ''
                        }

                        <Tooltip title="რედაქტირება">
                            <Button onClick={() => clickEdit(record)} type="primary" icon={<EditOutlined />} />
                        </Tooltip>
                    </Space>


                </div>
        },
        {
            title: 'ResId',
            dataIndex: 'resId',
        },
        {
            title: 'სახელი',
            dataIndex: 'firstName',
        },
        {
            title: 'გვარი',
            dataIndex: 'lastName',
        },
        {
            title: 'ტელეფონის ნომერი',
            dataIndex: 'mobilePhone',
        },
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'personalNumber',
            dataIndex: 'personalNumber',
        },
        {
            title: 'address',
            dataIndex: 'address',
        },
    ];
    // const [dataSaveArray, setDataSaveArray] = useState([]);
    const [isEdiT, setIsEdiT] = useState(false);

    let history = useHistory();


    //   const fetchData = async () => {
    //     // setTableLoading(true);
    //     const result = await axios(constants.API_PREFIX + "/api/Employee");
    //     console.log("result1", result);
    //     setDataSaveArray(result.data)
    //     // setTableLoading(false);
    //   }

    //   useEffect(() => {
    //     fetchData();
    //   }, []);


    const confirm = async (record) => {
        console.log("record", record)
        const result = await axios.delete(constants.API_PREFIX + "/api/Employee", { data: record });
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
        // setIsEdiT(true);
        console.log("clickEdit222", record, record.resId)


        history.push(`${HOME_PAGE}/Employee/Edit/${record.id}`, record);
        // setIsModalVisible(true);
    }



    return (
        <div>
            <Table
                columns={columns}
                dataSource={employeeArray}
            />
        </div>
    );
}

export default EmployeeTable;
