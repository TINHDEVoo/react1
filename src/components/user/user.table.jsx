import { notification, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserModal from './view.user.detail';
import { deleteUserApi } from '../../services/api.services';

const UserTable = (props) => {
    const { dataUsers, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

    const [dataDetail, setDataDetail] = useState(null)

    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [dataUpdate, setDataUpdate] = useState(null)

    const handleDeleteUser = async (id) => {
        const res = await deleteUserApi(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Xoa User Thanh Cong"
            })
            await loadUser();
        }
        else {
            notification.success({
                message: "Error Delete User",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href='#'
                        onClick={() => {
                            setDataDetail(record)
                            setIsDetailOpen(true);
                        }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDeleteUser(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div >
            ),
        },

    ];
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />

            <ViewUserModal
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}
            />
        </>
    )
}
export default UserTable;