import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import { UsergroupAddOutlined, HomeOutlined, AuditOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext);

    console.log(">>>data; ", user)

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

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
            label: <Link to={"/book"}>Books</Link>,
            key: 'books',
            icon: <AuditOutlined />,

        },
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={("/login")}>Đăng Nhập</Link>,
                    key: 'login'
                },
                {
                    label: <Link to={("/Register")}>Đăng ký</Link>,
                    key: 'Register'
                }
            ]
        }

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