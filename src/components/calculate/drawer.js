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


const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

function MyDrawer({ visibleDrawer, setVisibleDrawer, drawerId }) {

  const [employee, setEmployee] = useState({});

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const getEmployee = async () => {
    const result = await axios(constants.API_PREFIX + `/api/Employee/getEmployee/${drawerId}`);
    console.log("result employee", result.data);

    setEmployee(result.data)
  }


  useEffect(() => {
    if (drawerId) {
      getEmployee();
    }
    // console.log("drawerId", drawerId)
  }, [drawerId]);



  return (
    <div>

      <Drawer width={640} placement="right" onClose={onClose} visible={visibleDrawer}>


        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content={`${employee.firstName} ${employee.lastName}`} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={employee.email} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="PersonalNumber" content={employee.personalNumber} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="MobilePhone" content={employee.mobilePhone} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="SchemeTypeName" content={employee.schemeTypeName} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Position" content={employee.position} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="BankAccountNumber" content={employee.bankAccountNumber} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="DepartmentName" content={employee.departmentName} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="GraceAmount" content={employee.graceAmount} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="ResId" content={employee.resId} />
          </Col>
        </Row>
        
        <Divider />


        <p className="site-description-item-profile-p">Components</p>
        <Row>
          {/* {employee.} */}
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>




      </Drawer>


    </div>
  );
}

export default MyDrawer;
