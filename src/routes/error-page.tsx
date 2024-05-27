import { Link } from 'react-router-dom';

export default function Notfound() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <p>
                <span className='text-red-400'>404</span> Notfound
            </p>
            <Link to='/' className='text-blue-600'>Return</Link>
        </div>
    )
}
