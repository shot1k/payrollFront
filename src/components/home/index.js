import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout as LayoutAnt, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FunctionOutlined,
  DatabaseOutlined,
  FundOutlined,
  AccountBookOutlined,
  CalculatorOutlined,
  ProjectOutlined,
  StrikethroughOutlined,
  SettingOutlined,
  DiffOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';

import Component from '../component/index';
import Department from '../department/index';
import Coefficient from '../coefficient/index';
// import AccountPlan from '../accountPlan/index';
import Employee from '../employee/index';
import Project from '../project/index';
import CostCenter from '../costCenter/index';
import AccountsReportChart from '../accountsReportChart/index';
import EmployeeDetails from '../employee/employeeDetails';
import EmployeeByDepartment from '../department/employeeByDepartment';
import Calculate from '../calculate';
import Logo from '../../1.png';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useRouteMatch,
  useLocation
} from "react-router-dom";

import { useHistory } from "react-router-dom";
import { HOME_PAGE } from '../../constant';

const { Header, Sider, Content } = LayoutAnt;


const { SubMenu } = Menu;

function Home() {
  let history = useHistory();
  let url = useRouteMatch();
  let location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [activeUrl, setActiveUrl] = useState([]);

  useEffect(() => {
    if (location.pathname == '/payroll/component') {
      setActiveUrl(['1']);
    }

    if (location.pathname == '/payroll/coefficient') {
      setActiveUrl(['2']);
    }
    // if( location.pathname == '/Reports/accountPlan'){
    //   setActiveUrl(['4']);
    // }
    if (location.pathname == '/payroll/employee') {
      setActiveUrl(['3']);
    }
    if (location.pathname == '/payroll/project') {
      setActiveUrl(['4']);
    }
    if (location.pathname == '/payroll/costCenter') {
      setActiveUrl(['5']);
    }
    if (location.pathname == '/payroll/accountsReportChart') {
      setActiveUrl(['6']);
    }
    if (location.pathname == '/payroll/department') {
      setActiveUrl(['7']);
    }
    if (location.pathname == '/payroll/calculate') {
      setActiveUrl(['8']);
    }

  }, []);

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const clickcomponent = () => {
    setActiveUrl(['1'])
    history.push(`${HOME_PAGE}/component`);
  }

  const clickCoefficient = () => {
    setActiveUrl(['2'])
    history.push(`${HOME_PAGE}/coefficient`);
  }

  // const clickAccountPlan = () => {
  //   setActiveUrl(['4'])
  //   history.push(`${HOME_PAGE}/accountPlan`);
  // }

  const clickEmployee = () => {
    setActiveUrl(['3'])
    history.push(`${HOME_PAGE}/employee`);
  }
  const clickProject = () => {
    setActiveUrl(['4'])
    history.push(`${HOME_PAGE}/project`);
  }
  const clickCostCenter = () => {
    setActiveUrl(['5'])
    history.push(`${HOME_PAGE}/costCenter`);
  }
  const clickAccountsReportChart = () => {
    setActiveUrl(['6'])
    history.push(`${HOME_PAGE}/accountsReportChart`);
  }

  const clickDepartment = () => {
    setActiveUrl(['7'])
    history.push(`${HOME_PAGE}/department`);
  }

  const clickCalculate = () => {
    setActiveUrl(['8'])
    history.push(`${HOME_PAGE}/calculate`);
  }
  return (
    <LayoutAnt>
      <Sider
        className="site-layout"
        style={{
          height: "100%",
          position: "sticky",
          top: 0,
        }}
        theme="light" trigger={null} collapsible collapsed={collapsed} width={260}
      >
        <div className="logo" >
          {/* <img alt="aaa" style={{width:'100%', height: 'auto'}} src={"http://static1.squarespace.com/static/595bc3af29687ff67d144e54/t/5fff75649475673f7e479897/1610577255521/Payroll+logo.png?format=1500w"} /> */}
          {/* <img alt="aaa" style={{width:'100%', height: 'auto'}} src={Logo} /> */}

        </div>
        <Menu selectedKeys={activeUrl} theme="light" mode="inline"   >
          <Menu.Item key="8" icon={<CalculatorOutlined />} onClick={clickCalculate}>
            calculation
          </Menu.Item>
          <Menu.Item key="1" icon={<FundOutlined />} onClick={clickcomponent}>
            component
          </Menu.Item>
          <Menu.Item key="2" icon={<FunctionOutlined />} onClick={clickCoefficient} >
            coefficient
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<AccountBookOutlined />} onClick={clickAccountPlan}>
          accountPlan
          </Menu.Item> */}
          <Menu.Item key="3" icon={<UsergroupAddOutlined />} onClick={clickEmployee}>
            employee
          </Menu.Item>

          <SubMenu key="sub1" title="Setting" icon={<SettingOutlined />}>
            <Menu.Item key="4" icon={<ProjectOutlined />} onClick={clickProject}>
              project
            </Menu.Item>
            <Menu.Item key="5" icon={<StrikethroughOutlined />} onClick={clickCostCenter}>
              costCenter
            </Menu.Item>
            <Menu.Item key="6" icon={<DiffOutlined />} onClick={clickAccountsReportChart}>
              accountsReportChart
            </Menu.Item>
            <Menu.Item key="7" icon={<DatabaseOutlined />} onClick={clickDepartment}>
              department
            </Menu.Item>

          </SubMenu>
        </Menu>
      </Sider>

      <LayoutAnt className="site-layout">
        <Header
          style={{
            position: 'fixed',
            zIndex: 1, width: '100%',
            backgroundColor: '#f5f7f7'
          }}
          className="site-layout-background" >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '85px 16px',
            padding: 18,
            // minHeight: 280,
            // textAlign: "center"
          }}
        >
          <Switch>
            <Route exact path="/">
              <Redirect to={`${HOME_PAGE}/component`} />
            </Route>
            <Route path={`${HOME_PAGE}/component`}>
              <Component />
            </Route>

            <Route path={`${HOME_PAGE}/coefficient`}>
              <Coefficient />
            </Route>
            {/* <Route path={`${HOME_PAGE}/accountPlan`}>
              <AccountPlan />
            </Route> */}
            <Route exact path={`${HOME_PAGE}/employee`}>
              <Employee />
            </Route>
            <Route exact path={`${HOME_PAGE}/Employee/Add`}>
              <EmployeeDetails />
            </Route>
            <Route exact path={`${HOME_PAGE}/Employee/Edit/:id`}>
              <EmployeeDetails />
            </Route>
            <Route path={`${HOME_PAGE}/project`}>
              <Project />
            </Route>
            <Route path={`${HOME_PAGE}/costCenter`}>
              <CostCenter />
            </Route>
            <Route path={`${HOME_PAGE}/accountsReportChart`}>
              <AccountsReportChart />
            </Route>
            <Route path={`${HOME_PAGE}/department`}>
              <Department />
            </Route>
            <Route path={`${HOME_PAGE}/calculate`}>
              <Calculate />
            </Route>
            <Route path={`${HOME_PAGE}/employeeByDepartment/:id`}>
              <EmployeeByDepartment />
            </Route>
          </Switch>


        </Content>
      </LayoutAnt>
    </LayoutAnt>
  );
}
export default Home;
