import { notification, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserModal from './view.user.detail';
import { deleteUserApi } from '../../services/api.services';

const UserTable = (props) => {
    const { dataUsers, loadUser,
        current, pageSize, total,
        setCurrent, setPageSize
    } = props;

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
            title: "STT",
            render: (_, record, index) => {
                // console.log(">> CHeck index ", index)
                return (
                    <>
                        {(index + 1) + (current - 1) * pageSize}
                    </>
                )
            }
        },
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

    const onChange = (pagination, filters, sorter, extra) => {
        // setCurrent, setPageSie
        // neu thay doi trang : current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }

        // neu thay doi tong so phan tu : [pageSize]
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
        console.log(">> check", pagination, filters, sorter, extra)
    };
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUsers}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
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