import { useEffect, useState } from "react";
import { Input, notification, Modal } from "antd";
import { createUserAPI, updateUserAPI } from "../../services/api.services";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        // console.log(">> check data update: ", dataUpdate)
        if (dataUpdate) {
            setFullName(dataUpdate.fullName);
            setId(dataUpdate._id);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])
    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Update user thành công"
            })
            resetAndCloseModal();
            await loadUser();

        } else {
            notification.error({
                message: "Error Update user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate(null)
    }



    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>
    )
}
export default UpdateUserModal;