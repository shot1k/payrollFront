import React, { useState, useEffect } from 'react';
import { Table, Divider, Modal, Button, Form, Input, message, Space, Popconfirm, Tooltip, InputNumber } from 'antd';

import 'antd/dist/antd.css';
import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

function Coefficient() {
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
      title: 'სახელი',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'აღწერა',
      dataIndex: 'description',
    },
    {
      title: 'gross',
      dataIndex: 'sgross',
      render: (text, row) => <a>{row.sgross}/{row.pgross}</a>,
    },
    {
      title: 'net',
      dataIndex: 'snet',
      render: (text, row) => <a>{row.snet}/{row.pnet}</a>,
    },
    {
      title: 'paid',
      dataIndex: 'spaid',
      render: (text, row) => <a>{row.spaid}/{row.ppaid}</a>,
    },
    {
      title: 'incomeTax',
      dataIndex: 'sincomeTax',
      render: (text, row) => <a>{row.sincomeTax}/{row.pincomeTax}</a>,
    },
    {
      title: 'pension',
      dataIndex: 'spension',
      render: (text, row) => <a>{row.spension}/{row.ppension}</a>,
    },
    {
      title: 'tax1',
      dataIndex: 'stax1',
      render: (text, row) => <a>{row.stax1}/{row.ptax1}</a>,
    },
    {
      title: 'tax2',
      dataIndex: 'stax2',
      render: (text, row) => <a>{row.stax2}/{row.ptax2}</a>,
    },
  ];


  const [isEdiT, setIsEdiT] = useState(false);
  const [dataSaveArray, setDataSaveArray] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coefficient, setCoefficient] = useState({
    name: "",
    description: "",
    sgross: 1.0,
    snet: 1.0,
    spaid: 1.0,
    sincomeTax: 1.0,
    spension: 1.0,
    stax1: 1.0,
    stax2: 1.0,
    pgross: 1.0,
    pnet: 1.0,
    ppaid: 1.0,
    pincomeTax: 1.0,
    ppension: 1.0,
    ptax1: 1.0,
    ptax2: 1.0,

  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const fetchData = async () => {
    // setTableLoading(true);
    const result = await axios(constants.API_PREFIX+"/api/coefficient");

    setDataSaveArray(result.data)
    // setTableLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = async () => {
    setIsModalVisible(false);
    setIsEdiT(false);
    if (!isEdiT) {
      console.log("coefficient111", coefficient)
      const result = await axios.post(constants.API_PREFIX+"/api/Coefficient", coefficient);
      if (result.data.isSuccess) {
        fetchData();
        message.success(result.data.message);
      }
      else {
        message.error(result.data.message);
      }
    }
    else {
      console.log("coefficient222", coefficient)
      const result1 = await axios.put(constants.API_PREFIX+"/api/Coefficient", coefficient);
      if (result1.data.isSuccess) {
        fetchData();
        message.success(result1.data.message);
      }
      else {
        message.error(result1.data.message);
      }
    }


  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const inputChange = (e) => {
    // setCoefficient({ ...coefficient, [e.target.name]: e.target.value })
    // setCoefficient({ ...coefficient, [e.target.name]: (e.target.name == "name" || e.target.name=="description")? e.target.value : parseFloat(e.target.value) })
    setCoefficient({ ...coefficient, [e.target.name]: (e.target.name == "name" || e.target.name == "description") ? e.target.value : (isNaN(e.target.value) ? e.target.value : parseFloat(e.target.value)) })

  }

  const confirm = async (record) => {
    const result = await axios.delete(constants.API_PREFIX+"/api/Coefficient", { data: record });
    if (result.data.isSuccess) {
      message.success(result.data.message);
      fetchData();
    }
    else {
      message.error(result.data.message);
    }
  }

  const clickEdit = (record) => {
    console.log('clickEdit', record)
    setIsEdiT(true);
    setCoefficient(record);
    setIsModalVisible(true);
  }

  return (
    <div>
      <Button type="primary" onClick={showModal} icon={<PlusCircleOutlined />}>
        დამატება
      </Button>
      <Modal
        title="კოეფიციენტის დამატება"
        okText={!isEdiT ? "დამატება" : "შენახვა"}
        cancelText="გაუქმება"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
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
            <Input value={coefficient.name} type="text" name="name" onChange={e => inputChange(e)} />
          </Form.Item>

          <Form.Item
            label="აღწერა"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input value={coefficient.description} type="text" name="description" onChange={e => inputChange(e)} />
          </Form.Item>

          <Form.Item onChange={e => inputChange(e)} label="საპენსიო  &nbsp; &nbsp; ">
            <Input.Group compact>
            <div className="site-input-number-wrapper">
              <Input type="number" value={coefficient.sgross} name="sgross" style={{ width: '14%' }} min={1} max={100000} defaultValue="1.0"/>
              <Input type="number" value={coefficient.snet} name="snet" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.spaid} name="spaid" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.sincomeTax} name="sincomeTax" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.spension} name="spension" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.stax1} name="stax1" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.stax2} name="stax2" style={{ width: '14%' }} defaultValue="1.0" />
              </div>
            </Input.Group>
          </Form.Item>
          <br />
          <Form.Item onChange={e => inputChange(e)} label="სტანდარტი">
            <Input.Group compact>
              <Input type="number" value={coefficient.pgross} name="pgross" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.pnet} name="pnet" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.ppaid} name="ppaid" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.pincomeTax} name="pincomeTax" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.ppension} name="ppension" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.ptax1} name="ptax1" style={{ width: '14%' }} defaultValue="1.0" />
              <Input type="number" value={coefficient.ptax2} name="ptax2" style={{ width: '14%' }} defaultValue="1.0" />
            </Input.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Divider />

      <Table
        columns={columns}
        dataSource={dataSaveArray}
      />
    </div>
  );
}

export default Coefficient;
