import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { PlusCircleOutlined, ImportOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { HOME_PAGE } from '../../constant';
import ImportEmployee from './ImportEmployee';
import EmployeeTable from './EmployeeTable';
import axios from "axios";
import constants from '../../constant'

function Employee() {

  const [dataSaveArray, setDataSaveArray] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let history = useHistory();

  const add = () => {
    history.push(`${HOME_PAGE}/Employee/Add`);
  };

  


  const fetchData = async () => {
    // setTableLoading(true);
    const result = await axios(constants.API_PREFIX + "/api/Employee");
    console.log("result1", result);
    setDataSaveArray(result.data)
    // setTableLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);


  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={add} icon={<PlusCircleOutlined />}>
        დამატება
      </Button>

      {/* <Divider /> */}
      <Button style={{ marginLeft: "10px" }} onClick={showModal} icon={<ImportOutlined />} type="primary">
        იმპორტი
      </Button>
      <br />
      <br />
      <ImportEmployee  isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} fetchData={fetchData} />

      <EmployeeTable showDelete={true}  employeeArray={dataSaveArray} fetchData={fetchData}/>

    </div>
  );
}

export default Employee;
