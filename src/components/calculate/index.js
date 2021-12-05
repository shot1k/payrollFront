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
  Drawer,
  Divider
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
import { sumBy } from "lodash";
import "./index.css"
import MyDrawer from "./drawer";


const { Option } = Select;

function Calculate() {

  const expandedRowRender = ({ children }) => {
    const columns = [
      { title: 'Component Name', dataIndex: 'name', key: 'name' },
      { title: 'Gross', dataIndex: 'gross', key: 'gross' },
      { title: 'Net', dataIndex: 'net', key: 'net' },
      { title: 'Paid', dataIndex: 'paid', key: 'paid' },
      { title: 'IncomeTax', dataIndex: 'incomeTax', key: 'incomeTax' },
      { title: 'PensionTax', dataIndex: 'pensionTax', key: 'pensionTax' },
      { title: 'RemainingGraceAmount', dataIndex: 'remainingGraceAmount', key: 'RemainingGraceAmount' },

    ];


    return <Table columns={columns} dataSource={children} pagination={false} />;
  };



  const columns = [
    {
      title: "Actions",
      dataIndex: "actions",
    },
    {
      title: "name",
      dataIndex: "name",
      render: (text, row) => {return row.key? <a onClick={() => openDraver(row)}>{row.name} </a> :<p>{row.name}</p> },
    },
    {
      title: "დარიცხვის თარიღი",
      dataIndex: "calculationDate",
    },
    {
      title: "Gross",
      dataIndex: "gross",
      render: (text, row) => <p> {row.gross}</p>,
    },
    {
      title: "Net",
      dataIndex: "net",
      render: (text, row) => <p>{row.net} </p>,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      render: (text, row) => <p>{row.paid}</p>,
    },
    {
      title: "IncomeTax",
      dataIndex: "incomeTax",
      render: (text, row) => <p>{row.incomeTax}</p>,
    },
    {
      title: "PensionTax",
      dataIndex: "PensionTax",
      render: (text, row) => <p>{row.pensionTax} </p>,
    },
    {
      title: "RemainingGraceAmount",
      dataIndex: "remainingGraceAmount",
      render: (text, row) => <p>{row.remainingGraceAmount} </p>,
    },
    {
      title: "Debit",
      dataIndex: "Debit",
      render: (text, row) => <p> </p>,
    },
    {
      title: "Total Balance",
      dataIndex: "TotalBalance",
      render: (text, row) => <p> </p>,
    },

  ];

  const [searchLoading, setSearchLoading] = useState(false);
  const [calculations, setCalculations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calculationDate, setCalculationDate] = useState(null);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [drawerId, setDrawerId] = useState("");


  const showCalculationModal = () => {
    setIsModalVisible(true);
  };
  const fetchDepartments = async () => {
    const result = await axios(constants.API_PREFIX + "/api/department");

    console.log("result EmployeeTypes---", result.data);
    setDepartments(result.data);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleOk = async () => {

    const result = await axios.post(constants.API_PREFIX + `/api/Calculation/calculate/${calculationDate}`, filter);

    console.log("result calculation---", result.data);

    search();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const search = async () => {
    setSearchLoading(true);

    console.log("filter", filter);
    const result = await axios(
      constants.API_PREFIX + "/api/Employee/GetEmployeeByCalculationFilter",
      { params: filter }
    );
    console.log("result", result.data);

    let mapedData = result.data.map(r => ({
      key: r.id,
      gross: sumBy(r.calculations, r => r.gross),
      net: sumBy(r.calculations, r => r.net),
      paid: sumBy(r.calculations, r => r.paid),
      incomeTax: sumBy(r.calculations, r => r.incomeTax),
      pensionTax: sumBy(r.calculations, r => r.pensionTax),
      remainingGraceAmount: r.remainingGraceAmount,
      name: `${r.firstName} ${r.lastName}`,
      children: r.calculations.map(c => ({
        gross: c.gross,
        net: c.net,
        paid: c.paid,
        incomeTax: c.incomeTax,
        pensionTax: c.pensionTax,
        calculationDate: moment(c.calculationDate).format('LLL'),
        name: c.employeeComponent?.componentName,
        remainingGraceAmount: c.remainingGraceAmount,
      }))
    }))
    setCalculations(mapedData);
    setSearchLoading(false);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFilter({ ...filter, [name]: value });
  };

  const onChangeCalculationPeriod = (date, dateString) => {
    console.log(date, dateString);
    setFilter({ ...filter, ["calculationPeriod"]: dateString });
  };

  const onChangeCalculationDate = (date, dateString) => {
    console.log(date, dateString);
    setCalculationDate(dateString);
  };

  const openDraver = (row) => {
    setVisibleDrawer(true);
    console.log("openDraver", row)
    setDrawerId(row.key);
  }

  return (
    <div>

      <MyDrawer visibleDrawer={visibleDrawer} setVisibleDrawer={setVisibleDrawer} drawerId={drawerId} />

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
            style={{ width: '100%' }}
            value={filter.departmentId}
          >
            {departments.map((i) => (
              <Option value={i.id}>{i.name}</Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <DatePicker
            onChange={onChangeCalculationPeriod}
            picker="month"
          />
        </Col>

        <Col span={4}>
          <Button
            loading={searchLoading}
            onClick={search}
            type="primary"
            icon={<SearchOutlined />}
          >
            search
          </Button>
        </Col>

      </Row>
      <br />
      <Row gutter={[16, 24]}>
        <Col span={4}>

        </Col>
      </Row>
      <br />
      <br />
      <Space>

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
          </Row>
        </Modal>
      </Space>

      <br />
      <br />

      <Table columns={columns} dataSource={calculations}
        // expandable={{ expandedRowRender }}
        scroll={{ x: 200 }}
      />
    </div>
  );
}

export default Calculate;
