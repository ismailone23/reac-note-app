import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Home() {
    return (
        <div style={{ height: "100vh" }} className='w-full overflow-hidden h-screen'>
            <div className='w-full h-12 '>
                <Navbar />
            </div>
            <div className='items-center pb-12 h-full w-full grid md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 justify-between'>
                <div className='col-span-2 h-full w-full overflow-y-auto flex justify-center border-r-2 p-2'>
                    <Sidebar />
                </div>
                <div className='flex h-full overflow-y-auto md:col-span-4 lg:col-span-5 xl:col-span-7 justify-between p-2'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
