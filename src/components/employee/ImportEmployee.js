import React, { useState, useEffect } from 'react';
import { Input, Table, Modal, Button, Row, Col, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import constants from '../../constant'
import { useTranslation } from "react-i18next";




function ImportEmployee({ isModalVisible, setIsModalVisible, fetchData }) {


  const { t } = useTranslation();

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
        title: t(`placeholderFirstName`),
        dataIndex: 'firstName',
    },
    {
        title: t(`placeholderLastName`),
        dataIndex: 'surName',
    },
    {
        title: t(`address`),
        dataIndex: 'adres1',
    }
];



    const [importArray, setImportArray] = useState([]);
    const [selectValue, setSelectValue] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
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
        if (isModalVisible) {
            
            setFilter({
                ...filter,
                resId: null,
                firstName: "",
                surName: ""
            });
            seach();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);


    const handleOk = async () => {
        console.log('selectValue', selectValue)
        setIsModalVisible(false);
        const result = await axios.post(constants.API_PREFIX + "/api/Employee/importFromSynergy", selectValue);
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


    const seach = async () => {
        setSearchLoading(true)

        console.log('filter', filter)
        const result = await axios(constants.API_PREFIX + "/api/Synergy/humres", { params: filter });
        console.log('result', result.data)

        setImportArray(result.data);
        setSearchLoading(false)
        


    }

    return (
        <div>
            <Modal width={700} title={t(`import`)} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} cancelText={t(`cancelText`)}>

                <Row gutter={[16, 24]}>
                    <Col span={6}><Input value={filter.resId} onChange={handleChangeInput} name="resId" type="number" placeholder="ResId" /></Col>
                    <Col span={6}><Input value={filter.firstName} onChange={handleChangeInput} name="firstName" placeholder={t(`placeholderFirstName`)} /></Col>
                    <Col span={6}><Input value={filter.surName} onChange={handleChangeInput} name="surName" placeholder={t(`placeholderLastName`)} /></Col>
                    <Col span={6}><Button loading={searchLoading} onClick={seach} type="primary" icon={<SearchOutlined />}>{t(`seach`)}</Button></Col>
                </Row>
                <br />
                <Table
                    loading={searchLoading}
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
