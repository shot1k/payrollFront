import React, { useState, useEffect } from 'react';
import moment from 'moment';

import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, Table, Radio, Divider, Popconfirm, message, Space, Tooltip } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'

function Department() {

  const [department, setDepartment] = useState({
    name: ""
  });
  const [isEdiT, setIsEdiT] = useState(false);


  const columns = [
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
              <Tooltip title="წაშლა">
                <Button type="primary" icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>

            <Tooltip title="რედაქტირება">
              <Button onClick={() => clickEdit(record)} type="primary" icon={<EditOutlined />} />
            </Tooltip>
          </Space>
        </div>
    },
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    // },
    {
      title: 'სახელი',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'რაოდენობა',
      dataIndex: 'numberOfEmployees',
    },
    {
      title: 'შექმნის თარიღი',
      dataIndex: 'dateCreated',
      render: text => <p>{moment(text).format('LLL')}</p>,
    },
  ];



  const [dataSaveArray, setDataSaveArray] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);


  const fetchData = async () => {
    setTableLoading(true);
    const result = await axios(constants.API_PREFIX+"/api/Department");
    console.log("result", result);
    setDataSaveArray(result.data)
    setTableLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);




  const showModal = () => {
    setIsModalVisible(true);
  };
  console.log('showModal', !isEdiT)

  const handleOk = async () => {
    setIsEdiT(false);
    setIsModalVisible(false);
    console.log("resultPost1", department);
    if (!isEdiT) {
      const result = await axios.post(constants.API_PREFIX+"/api/Department", department);
      console.log("resultPost", result);
      if (result.data.isSuccess) {
        fetchData();
        message.success('This is a success message');
      }
      else {
        message.error('This is an error message');
      }
    }
    else {

      const result1 = await axios.put(constants.API_PREFIX+"/api/Department", department);
      console.log("result", result1);
      if (result1.data.isSuccess) {
        fetchData();
        message.success('This is a success message');
      }
      else {
        message.error('This is an error message');
      }
    }
    setDepartment({
      name: ""
    })

  };

  const handleCancel = () => {
    setIsEdiT(false);
    setIsModalVisible(false);
    setDepartment({
      name: ""
    })
  };

  const handleChange = (e) => {
    console.log('handleChange', e.target.name, department);
    setDepartment({ ...department, [e.target.name]: e.target.value });
  }

  function clickDelete(id) {
    console.log("clickDelete", id)
    // setDataSaveArray(dataSaveArray.filter(info => info.id !== id));
  }

  const confirm = async (record) => {
    console.log("record", record)
    const result = await axios.delete(constants.API_PREFIX+"/api/Department", { data: record });
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
    setDepartment(record);
    setIsModalVisible(true);

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
        title="დეპარტამენტი"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item
            label="სახელი"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input value={department.name} type="text" name="name" onChange={(e) => handleChange(e)} />
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

export default Department;
