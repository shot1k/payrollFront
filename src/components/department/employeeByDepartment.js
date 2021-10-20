import React, { useState, useEffect } from 'react';
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


function EmployeeByDepartment() {

    let { id } = useParams();
    const [employeeArray, setEmployeeArray] = useState([]);

    const fetchData = async () => {
        // setTableLoading(true);
        const result = await axios(constants.API_PREFIX+`/api/Employee/getEmployeeByDepartment/${id}`);
        console.log("result", result.data);
    
        setEmployeeArray(result.data)
        // setTableLoading(false);
      }
    
      useEffect(() => {
        fetchData();
      }, []);


  return (
    <div>
        <h3>ID: {id}</h3>
        <EmployeeTable employeeArray={employeeArray}/>
    </div>
  );
}

export default EmployeeByDepartment;
