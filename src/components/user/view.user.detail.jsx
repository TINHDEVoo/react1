import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.services";

const ViewUserModal = (props) => {
    const { loadUser, dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    const handleUpdateUserAvatar = async () => {
        //step1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            //step2: update user
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setSelectedFile(null)
                setPreview(null)
                await loadUser();
                notification.success({
                    message: "Update User Avatar",
                    description: "Cap nhat thanh cong"
                })
            }
            else {
                notification.error({
                    message: "Error Upload avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }
        } else {
            notification.error({
                message: "Error Upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }
    // console.log("Check file: ", preview)
    return (
        <Drawer
            title="View a User"
            onClose={() => {
                setDataDetail(null)
                setIsDetailOpen(false)
            }}
            open={isDetailOpen}
        >
            {
                dataDetail ? <>
                    <p>ID: {dataDetail._id}</p>
                    <br />
                    <p>Full Name: {dataDetail.fullName}</p>
                    <br />
                    <p>Email: {dataDetail.email}</p>
                    <br />
                    <p>Phone number: {dataDetail.phone}</p>
                    <br />
                    <p>Avatar:</p>
                    <div>
                        <img height={150} width={150}
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar} `} alt="" />
                    </div>
                    <div>
                        <label htmlFor="btnUpload"
                            style={{
                                backgroundColor: "green",
                                padding: "10px 20px",
                                borderRadius: "50px",
                                color: "#fff"
                            }}>
                            Upload Avatar
                        </label>
                        <input type="file" id="btnUpload" hidden
                            // onChange={handleOnChangeFile}
                            onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                    {preview &&
                        <>
                            <div style={{ marginTop: "15px" }}>
                                <img height={150} width={150}
                                    src={preview} alt="" />
                            </div>
                            <Button type="primary"
                                onClick={() => handleUpdateUserAvatar()}
                            >Save </Button>
                        </>
                    }
                </>
                    :
                    <>
                        <p>Khong co data</p></>
            }
        </Drawer >
    )
}

export default ViewUserModal;