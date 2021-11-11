import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Tooltip,
  Col,
  Input,
  Row,
  DatePicker,
  Select,
  Modal,
} from "antd";
import {
  CalculatorOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import constants from "../../constant";
import moment from "moment";
const { Option } = Select;

function Calculate() {
  const columns = [
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
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
              <Button
                onClick={() => clickEdit(record)}
                type="primary"
                icon={<EditOutlined />}
              />
            </Tooltip>
          </Space>
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Disabled User",
  //     age: 99,
  //     address: "Sidney No. 1 Lake Park",
  //   },
  // ];

  const [isEdiT, setIsEdiT] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [calculations, setCalculations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calculationDate, setCalculationDate] = useState(null);

  const showCalculationModal = () => {
    setIsModalVisible(true);
  };
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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirm = async (record) => {
    console.log("record", record);
    // const result = await axios.delete(constants.API_PREFIX+"/api/AccountsReportChart", { data: record });
    // console.log('result', result)
    // if (result.data.isSuccess) {
    //     message.success(result.data.message);
    //     fetchData();
    // }
    // else {
    //     message.error(result.data.message);
    // }
  };

  const clickEdit = (record) => {
    setIsEdiT(true);
    console.log("clickEdit", record);
    // setAccountsReportChart(record);
    // setIsModalVisible(true);
  };

  const seach = async () => {
    setSearchLoading(true);

    console.log("filter", filter);
    const result = await axios(
      constants.API_PREFIX + "/api/Employee/GetEmployeeByCalculationFilter",
      { params: filter }
    );
    console.log("result", result.data);

    setCalculations(result.data);
    setSearchLoading(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFilter({ ...filter, [name]: value });
  };

  // function onChange(date, dateString) {
  //   console.log(date, dateString);
  //   setFilter({ ...filter, ['name']: value })
  // }

  const handleChangeEmployeeComponentSelect = (value, name) => {
    setFilter({ ...filter, [name]: value });
    console.log("handleChangeEmployeeComponent111111111s", value);
  };

  const onChangeCalculationPeriod = (date, dateString) => {
    console.log(date, dateString);
    setFilter({ ...filter, ["calculationPeriod"]: dateString });
  };

  const onChangeCalculationDate = (date, dateString) => {
    console.log(date, dateString);
    setCalculationDate(dateString);
  };

  return (
    <div>
      <Row gutter={[16, 24]}>
        <Col span={4}>
          <Input
            onChange={handleChangeInput}
            value={filter?.firstName}
            name="firstName"
            placeholder="firstName"
          />
        </Col>
        <Col span={4}>
          <Input
            onChange={handleChangeInput}
            value={filter.lastName}
            name="lastName"
            placeholder="lastName"
          />
        </Col>
        <Col span={4}>
          <Select
            defaultValue="აირჩიეთ"
            style={{ width: 200 }}
            value={filter.departmentId}
          >
            {departments.map((i) => (
              <Option value={i.id}>{i.name}</Option>
            ))}
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option> */}
          </Select>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col span={4}>
          <DatePicker
            //  defaultValue={moment('2022/01/01', 'YYYY/MM/DD')}
            // onChange={(value) =>
            //   handleChangeEmployeeComponentSelect(value, "calculationPeriod")
            // }
            onChange={onChangeCalculationPeriod}
            picker="month"
          />
        </Col>
        {/* <Col span={4}><DatePicker onChange={onChange} picker="year" /></Col> */}
        {/* <Col span={4}><Input onChange={handleChangeInput} name="department" placeholder="Department" /></Col> */}
      </Row>
      <br />
      <br />
      <Space>
        <Button
          loading={searchLoading}
          onClick={seach}
          type="primary"
          icon={<SearchOutlined />}
        >
          Seach
        </Button>
        <Button
          loading={searchLoading}
          onClick={showCalculationModal}
          icon={<CalculatorOutlined />}
        >
          Calculate
        </Button>

        <Modal
          title="კალკულაცია"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row gutter={[16, 24]}>
            <Col span={8}>
            </Col>
            <Col span={8}>
              <DatePicker onChange={onChangeCalculationDate} />
            </Col>
            <Col span={8}>
            </Col>
            {/* <Col span={4}><DatePicker onChange={onChange} picker="year" /></Col> */}
            {/* <Col span={4}><Input onChange={handleChangeInput} name="department" placeholder="Department" /></Col> */}
          </Row>
        </Modal>
      </Space>

      <br />
      <br />

      <Table columns={columns} dataSource={calculations} />
    </div>
  );
}

export default Calculate;
