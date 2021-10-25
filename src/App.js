import './App.css';
import 'antd/dist/antd.css';
import Home from './components/home/index';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState, createContext, useContext } from "react";
import constants from './constant'
import axios from "axios";

export const UserContext = createContext();



function App() {

  const [user, setUser] = useState("Jesse Hall");

  const [departments, setDepartments] = useState([]);



  const fetchDepartments = async () => {
    // setTableLoading(true);
    const result = await axios(constants.API_PREFIX + "/api/department");

    console.log('result fetchDepartments---', result.data)
    setDepartments(result.data)
    // setTableLoading(false);
  }





  return (
    <div className="App">

      <UserContext.Provider value={user}>
        {/* <h1>{`Hello ${user}!`}</h1> */}
        {/* <EmployeeByDepartment user={user} /> */}
        <Router>
          <Switch>
            <Route>
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>


    </div>
  );
}

export default App;
