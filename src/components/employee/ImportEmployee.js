import React, { useState, useEffect } from 'react';
import { Input, Table, Modal, Button, Row, Col, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'


const importUsersColumns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },

    {
        title: 'resId',
        dataIndex: 'resId',
    },
    {
        title: 'FirstName',
        dataIndex: 'firstName',
    },
    {
        title: 'SurName',
        dataIndex: 'surName',
    },
    {
        title: 'adres1',
        dataIndex: 'adres1',
    }
];

function ImportEmployee({ isModalVisible, setIsModalVisible, fetchData }) {


    const [importArray, setImportArray] = useState([]);
    const [selectValue, setSelectValue] = useState("");
    const [filter, setFilter] = useState({
        resId: null,
        firstName: "",
        surName: ""
    });


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setSelectValue(selectedRowKeys)
        }
      };

    useEffect(() => {
        seach();
    }, []);


    const handleOk = async () => {
        console.log('selectValue',selectValue)
        setIsModalVisible(false);
        const result = await axios.post(constants.API_PREFIX+"/api/Employee/importFromSynergy", selectValue);
        if (result.data.isSuccess) {
            message.success(result.data.message);
            fetchData();
          }
          else {
            message.error(result.data.message);
          }
        console.log('selectValue', selectValue[0], result)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target

        setFilter({ ...filter, [name]: value })

    }
    

    const seach = async () =>{
        console.log('filter', filter)
        const result = await axios(constants.API_PREFIX + "/api/Synergy/humres", { params: filter});
        console.log('result', result.data)
        setImportArray(result.data);

        
    }

    return (
        <div>
            <Modal width={700} title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <Row gutter={[16, 24]}>
                    <Col span={6}><Input onChange={handleChangeInput} name="resId" type="number" placeholder="ResId" /></Col>
                    <Col span={6}><Input onChange={handleChangeInput} name="firstName" placeholder="FirstName" /></Col>
                    <Col span={6}><Input onChange={handleChangeInput} name="surName" placeholder="SurName" /></Col>
                    <Col span={6}><Button onClick={seach} type="primary" icon={<SearchOutlined />}>seach</Button></Col>
                </Row>
                <br />
                <Table
                    pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5 }}
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={importUsersColumns}
                    dataSource={importArray}
                    rowKey={record => record.id}
                />
            </Modal>
        </div>
    );
}

export default ImportEmployee;
