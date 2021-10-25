import React, { useState, useEffect, createContext, useContext } from 'react';
import EmployeeTable from '../employee/EmployeeTable';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import constants from '../../constant'
import axios from "axios";
import { Form, Select } from 'antd';
// import App from '../../App';
// import { UserProvider } from './src/context/appContext'
import { UserContext } from '../../App';



const { Option } = Select;

function EmployeeByDepartment() {

  const user = useContext(UserContext);


  let { id } = useParams();
  const [employeeArray, setEmployeeArray] = useState([]);
  const [departments, setDepartments] = useState([]);



  const fetchData = async (props) => {
    // setTableLoading(true);
    const result = await axios(constants.API_PREFIX + `/api/Employee/getEmployeeByDepartment/${props}`);
    console.log("result444", result.data);

    setEmployeeArray(result.data)
    // setTableLoading(false);
  }

  const fetchDepartments = async () => {
    // setTableLoading(true);
    const result = await axios(constants.API_PREFIX + "/api/department");

    console.log('result fetchDepartments---', result.data)
    setDepartments(result.data)
    // setTableLoading(false);
  }


  const handleChangeSelect = (e) => {
    console.log(e)
    fetchData(e);
    // const result = departments.filter(dept => dept.id == e)[0]?.name;
    // console.log(result)
  }


  useEffect(() => {
    fetchData(id);
    fetchDepartments();
  }, []);


  return (
    <div>
      <h2>{`employeebydepartment ${user} again!`}</h2>
      {/* <h3>ID: {id}</h3> */}
      {/* <UserContext>
        {(value) => (
          <p>im inside the consumer {console.log(value)}</p>
        )}
      </UserContext> */}
      {/* <UserProvider value={'hey'}> */}
        {/* <App /> */}
      {/* </UserProvider> */}


      <Form.Item label="DepartmentName">
        <Select
          // disabled={employee.resId != null}
          onChange={handleChangeSelect}

          defaultValue={id}
        >
          {
            departments.map((i) =>
              <Option key={i.id}>{i.name}</Option>)
          }
        </Select>
      </Form.Item>
      <EmployeeTable employeeArray={employeeArray} />
    </div>
  );
}

export default EmployeeByDepartment;
