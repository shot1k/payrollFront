import React, { useState, useEffect } from 'react';
import moment from 'moment';

import 'antd/dist/antd.css';
import { Modal, Button, message, Form, Input, Space, Popconfirm, Table, Divider, Tooltip } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'

function Project() {
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
    {
      title: 'კოდი',
      dataIndex: 'code',
      render: text => <a>{text}</a>,
    },
    {
      title: 'აღწერა',
      dataIndex: 'description',
    },
    {
      title: 'შექმნის თარიღი',
      dataIndex: 'dateCreated',
      render: text => <p>{moment(text).format('LLL')}</p>,
    },
  ];

  const [dataSaveArray, setDataSaveArray] = useState([]);
  const [project, setProject] = useState({
    code: "",
    description: ""
  });
  const [tableLoading, setTableLoading] = useState(false);
  const [isEdiT, setIsEdiT] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchData = async () => {
    setTableLoading(true);
    const result = await axios(constants.API_PREFIX+"/api/Project");
    console.log("result", result.data);

    setDataSaveArray(result.data)
    setTableLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);




  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setIsEdiT(false);
    console.log("project", project)
    if (!isEdiT) {
      const result = await axios.post(constants.API_PREFIX+"/api/Project", project);
      console.log("result", result)
      if (result.data.isSuccess) {
        fetchData();
        message.success('This is a success message');
      }
      else {
        message.error('This is an error message');
      }
    }
    else {
      const result1 = await axios.put(constants.API_PREFIX+"/api/Project", project);
      console.log("result1", result1)
      if (result1.data.isSuccess) {
        fetchData();
        message.success('This is a success message');
      }
      else {
        message.error('This is an error message');
      }
    }
    setProject({
      code: "",
      description: ""
    })

  };

  const handleCancel = () => {
    setIsEdiT(false);
    setIsModalVisible(false);
    setProject({
      code: "",
      description: ""
    })
  };

  const handleChange = (e) => {
    // console.log('handleChange', e.target);
    setProject({ ...project, [e.target.name]: e.target.value })
  }

  const confirm = async (record) => {
    console.log("record", record)
    const result = await axios.delete(constants.API_PREFIX+"/api/Project", { data: record });
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
    setProject(record);
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
        title="პროექტი"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      // width={1000}
      >
        <Form>
          <Form.Item>
            <Form.Item
              label="კოდი"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <Input value={project.code} type="text" name="code" onChange={e => handleChange(e)} placeholder="კოდი" />
            </Form.Item>

            {/* </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}> */}
            <Form.Item
              label="აღწერა"
              rules={[{ required: true }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: "10px" }}
            >
              <Input value={project.description} type="text" name="description" onChange={e => handleChange(e)} placeholder="აღწერა" />
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

export default Project;
