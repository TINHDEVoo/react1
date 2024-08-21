import { Button, Drawer } from "antd";

const ViewUserModal = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

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
                        <input type="file" id="btnUpload" hidden />
                    </div>
                    {/* <Button type="primary">Upload Avatar</Button> */}
                </>
                    :
                    <>
                        <p>Khong co data</p></>
            }
        </Drawer >
    )
}

export default ViewUserModal;