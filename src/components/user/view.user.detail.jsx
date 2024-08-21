import { Button, Drawer } from "antd";
import { useState } from "react";

const ViewUserModal = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
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
    console.log("Check file: ", preview)
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
                        <div>
                            <img height={150} width={150}
                                src={preview} alt="" />
                        </div>
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