import { Outlet } from "react-router-dom"
import Header from "../Components/Header"
import { Toaster } from 'react-hot-toast';



function RootRouter() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default RootRouter