import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Tooltip, Col, Input, Row, DatePicker, Select } from 'antd';
import { CalculatorOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from "../../constant";

const { Option } = Select;

function Calculate() {

  const columns = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) =>
        <div>
          <Space>
            <Popconfirm
              title="Are you sure to delete this task?"
              // onConfirm={() => confirm(record)}
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
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const [isEdiT, setIsEdiT] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    age: null,
    surName: ""
  });


  const fetchDepartments = async () => {
    // setTableLoading(true);
    const result = await axios(constants.API_PREFIX + "/api/department");

    console.log("result EmployeeTypes---", result.data);
    setDepartments(result.data);
    // setTableLoading(false);
  };


  useEffect(() => {
    fetchDepartments();
  }, []);



  const confirm = async (record) => {
    console.log("record", record)
    // const result = await axios.delete(constants.API_PREFIX+"/api/AccountsReportChart", { data: record });
    // console.log('result', result)
    // if (result.data.isSuccess) {
    //     message.success(result.data.message);
    //     fetchData();
    // }
    // else {
    //     message.error(result.data.message);
    // }
  }

  const clickEdit = (record) => {
    setIsEdiT(true);
    console.log("clickEdit", record)
    // setAccountsReportChart(record);
    // setIsModalVisible(true);
  }


  const seach = async () => {
    setSearchLoading(true)

    // console.log('filter', filter)
    // const result = await axios(constants.API_PREFIX + "/api/Synergy/humres", { params: filter });
    // console.log('result', result.data)

    // setImportArray(result.data);
    setSearchLoading(false)
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target

    setFilter({ ...filter, [name]: value })

  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div>
      <Row gutter={[16, 24]}>
        <Col span={4}><Input onChange={handleChangeInput} name="name" placeholder="Name" /></Col>
        <Col span={4}><Input onChange={handleChangeInput} name="age" placeholder="Age" /></Col>
        <Col span={4}><Input onChange={handleChangeInput} name="address" placeholder="Address" /></Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col span={4}><DatePicker onChange={onChange} picker="month" /></Col>
        {/* <Col span={4}><DatePicker onChange={onChange} picker="year" /></Col> */}
        {/* <Col span={4}><Input onChange={handleChangeInput} name="department" placeholder="Department" /></Col> */}
        <Col span={4}>
          <Select
            defaultValue="აირჩიეთ"
            style={{ width: 120 }}
          // onChange={(value) => handleChangeEmployeeComponentSelect(value, 'schemeTypeId')}
          // value={employeeComponent.schemeTypeId}
          >
            {
            departments.map((i) =>
              <Option value={i.id}>{i.name}</Option>)
          }
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option> */}


          </Select>
        </Col>
      </Row>
      <br />
      <br />
      <Space>
      <Button loading={searchLoading} onClick={seach} type="primary" icon={<SearchOutlined />}>Seach</Button>
      <Button loading={searchLoading} onClick={seach}  icon={<CalculatorOutlined />}>Calculate</Button>
        </Space>
      
      <br />
      <br />


      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

export default Calculate;
