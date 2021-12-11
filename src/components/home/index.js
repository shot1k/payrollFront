import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout as LayoutAnt, Select, Avatar, Menu, Dropdown, Space, Divider } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FunctionOutlined,
  DatabaseOutlined,
  FundOutlined,
  CalculatorOutlined,
  ProjectOutlined,
  StrikethroughOutlined,
  SettingOutlined,
  DiffOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
  UserOutlined,
  UnlockOutlined,
  LogoutOutlined
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
import { useTranslation } from "react-i18next";



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
import GE from '../../assets/logos/ge.png'; // with import
import EN from '../../assets/logos/en.png'; // with import
import RU from '../../assets/logos/ru.png'; // with import


const { Header, Sider, Content } = LayoutAnt;


const { SubMenu } = Menu;

const { Option } = Select;


function Home() {
  let history = useHistory();
  let url = useRouteMatch();
  let location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [activeUrl, setActiveUrl] = useState([]);

  const { t, i18n } = useTranslation();

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

  function handleChange(value) {
    console.log(`selected ${value}`);
    i18n.changeLanguage(value)
  }

  const languageMenu = (
    <Menu>
      <Menu.Item>
        <Space>
          <img width={25} height={20} src={GE} /> <span>Gergian</span>
        </Space>
      </Menu.Item>
      <Menu.Item  >
        <Space>
          <img width={25} height={20} src={EN} /> <span>English</span>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space>
          <img width={25} height={20} src={RU} /> <span>Russian</span>
        </Space>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Space>
          <UserOutlined /> Settings
        </Space>
      </Menu.Item>
      <Menu.Item  >
        <Space>
          <UnlockOutlined />Change Password
        </Space>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Space>
          <LogoutOutlined />Log Out
        </Space>
      </Menu.Item>
    </Menu>
  );

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
            {t(`calculation`)}
          </Menu.Item>
          <Menu.Item key="1" icon={<FundOutlined />} onClick={clickcomponent}>
            {t(`component`)}
          </Menu.Item>
          <Menu.Item key="2" icon={<FunctionOutlined />} onClick={clickCoefficient} >
            {t(`coefficient`)}
          </Menu.Item>
          {/* <Menu.Item key="4" icon={<AccountBookOutlined />} onClick={clickAccountPlan}>
          accountPlan
          </Menu.Item> */}
          <Menu.Item key="3" icon={<UsergroupAddOutlined />} onClick={clickEmployee}>
            {t(`employee`)}
          </Menu.Item>

          <SubMenu key="sub1" title="Setting" icon={<SettingOutlined />}>
            <Menu.Item key="4" icon={<ProjectOutlined />} onClick={clickProject}>
              {t(`project`)}
            </Menu.Item>
            <Menu.Item key="5" icon={<StrikethroughOutlined />} onClick={clickCostCenter}>
              {t(`costCenter`)}
            </Menu.Item>
            <Menu.Item key="6" icon={<DiffOutlined />} onClick={clickAccountsReportChart}>
              accountsReportChart
            </Menu.Item>
            <Menu.Item key="7" icon={<DatabaseOutlined />} onClick={clickDepartment}>
              {t(`department`)}
            </Menu.Item>

          </SubMenu>
        </Menu>
      </Sider>

      <LayoutAnt className="site-layout">
        <Header
          style={{
            // position: 'fixed',
            zIndex: 1, width: '100%',
            backgroundColor: '#f5f7f7'
          }}
          className="site-layout-background" >



          {/* <div style={{ display: "flex"}}> */}

          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}




          <div style={{ float: 'right', right: 0 }}>
            {/* <Select defaultValue="en" style={{ width: 120 }} onChange={handleChange}>
              <Option value="en">En</Option>
              <Option value="ge">Ge</Option>

            </Select> */}

            <Space size={'large'}>
              <Dropdown overlay={userMenu}>
                <div style={{ cursor: 'pointer' }}>
                  <Space>
                    <Avatar size={32} icon={<UserOutlined />} overlay={languageMenu} />
                    <span>Avtandil</span>
                  </Space>
                </div>
              </Dropdown>

              <Dropdown overlay={languageMenu}>
                <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <GlobalOutlined style={{ fontSize: '23px', color: '#1f91ff', cursor: 'pointer' }} />
                </div>
              </Dropdown>
            </Space>
          </div>

          {/* </div> */}


        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '35px 16px',
            // padding: 18,
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
