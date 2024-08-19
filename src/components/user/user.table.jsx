import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { fetchAllUserAPI } from '../../services/api.services';

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        { _id: "eric", fullName: 25, email: "hn" },
        { _id: "eric", fullName: 25, email: "hn" }

    ]);


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];
    const loadUser = async () => {
        const res = await fetchAllUserAPI()
        // setDataUsers(res.data)

    }

    loadUser();
    console.log(">>> Run Render")
    return (
        <Table columns={columns} dataSource={dataUsers} />
    )
}
export default UserTable;