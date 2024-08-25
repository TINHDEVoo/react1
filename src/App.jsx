
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.services';
import { useContext, useEffect } from 'react';
import { Spin } from 'antd';
import { AuthContext } from './components/context/auth.context';

const App = () => {

  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);

  useEffect(() => {
    fetchUserInfo();
  }, [])

  //delay tham khao code
  // const delay = (milSeconds) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, milSeconds)
  //   })
  // }
  const fetchUserInfo = async () => {
    const res = await getAccountAPI()
    // await delay(3000)
    if (res.data) {
      //success
      setUser(res.data.user)
      // console.log(">> check user data: ", res.data)
    }
    setIsAppLoading(false)
  }
  return (
    <>
      {isAppLoading === true ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)"
        }}>
          <Spin />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }


    </>
  )
}

export default App
