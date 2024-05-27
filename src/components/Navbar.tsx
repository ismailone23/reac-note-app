import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TodoContext } from '../contexts/context'
import { updateNote } from '../lib/note';

export default function Navbar() {
    const context = useContext(TodoContext)
    const location = useLocation();
    const path = location.pathname;
    const [heading, setHeading] = useState<string>('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEditState(true)
        setHeading(e.currentTarget.value);
    }
    const [editState, setEditState] = useState<boolean>(false)
    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!editState) return
            if (!context?.notes) return
            await updateNote(heading, "heading", context?.notes?.id)
            setEditState(false)
        }, 500)
        return () => {
            clearTimeout(handler)
        }
    }, [heading, editState, context])
    return (
        <div className='w-full flex h-full justify-center border-b-2'>
            <div className='items-center w-full grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 justify-between'>
                <div className='col-span-2 w-full flex justify-center border-r-2 h-full items-center px-2'>
                    <Link style={{ fontFamily: "cursive" }} className='underline text-xl' to={'/'}><span className='text-blue-800'>dl</span>Note</Link>
                </div>
                <div className='flex md:col-span-4 lg:col-span-5 xl:col-span-7 justify-between p-2'>
                    <div className='w-full justify-center items-center flex'>
                        {path.includes('view') ?
                            <input minLength={2} className='w-full outline-none text-center' maxLength={50} onChange={handleChange} defaultValue={context?.notes?.heading} /> : <h1>Note Title</h1>}
                    </div>
                    <div className='mx-2'>
                        <h1 className='w-full outline-none text-center'>user</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
