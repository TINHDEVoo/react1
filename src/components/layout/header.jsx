import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, message } from 'antd'
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Children, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.services';

const Header = () => {
    const [current, setCurrent] = useState('');

    const navigate = useNavigate()

    const location = useLocation();

    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (location && location.pathname) {
            const allRouts = ["users", "books"]
            const currentRoute = allRouts.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute)
            } else {
                setCurrent("home")
            }
        }
    }, [location])
    // console.log(">>>data; ", user)

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            //clear data
            localStorage.removeItem("access_token")
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("logout thanh cong")

            //redirect to home
            navigate("/")


        }
    }

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,

        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng Nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogout()}>Đăng Xuất</span>,
                    key: 'logout',
                }
            ]
        }] : [])

    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}

export default Header