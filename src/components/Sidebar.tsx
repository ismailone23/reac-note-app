import { useEffect, useRef, useState } from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { dragdrop } from '../lib/drag-drop';
import { notesType } from '../types/typs';
import Linkr from './Linkr';
import { getData } from '../lib/note';


export async function action() {
    const generateId = () => Math.random().toString(36).substring(2, 12)
    return redirect(`/notes/${generateId()}/new`)
}
export async function loader(): Promise<notesType[]> {
    return await getData()
}

export default function Sidebar() {
    const notesloded = useLoaderData() as notesType[];
    const [searchTxt, setSearchTxt] = useState<string | null>(null)
    const [isEnteredSearchMode, setIsEnteredSearchMode] = useState<boolean>(false)

    const linkref = useRef<HTMLDivElement>(null);
    const [noteR, setNoteR] = useState<notesType[]>([])
    useEffect(() => {
        !isEnteredSearchMode && dragdrop(linkref)
    })

    useEffect(() => {
        setNoteR(notesloded)
    }, [notesloded])

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!isEnteredSearchMode) return
            let x = await getData(searchTxt);
            console.log('loading');
            setNoteR(x);
            setIsEnteredSearchMode(false)
        }, 200)
        return () => {
            clearTimeout(handler)
        }
    }, [searchTxt])

    return (
        <div className="w-full h-full gap-1 flex flex-col overflow-auto">
            <div className="flex w-full gap-1 justify-between items-center">
                <div className='w-4/5 lg:h-9 h-8'>
                    <Form role='search' className='relative'>
                        <input placeholder='search in notes...'
                            type="search" autoComplete='off' style={{ paddingLeft: "1.5rem" }}
                            className={`${isEnteredSearchMode ? "" : "search "}text-gray-500 lg:h-9 border w-full outline-none px-1 rounded-md h-8 text-sm`}
                            name='q'
                            onChange={(e) => {
                                setSearchTxt(e.currentTarget.value)
                                setIsEnteredSearchMode(true)
                            }}
                        />
                        <div aria-hidden hidden={!isEnteredSearchMode} id='loading' />
                    </Form>
                </div>
                <Form method='post' className='w-1/5'>
                    <button
                        className='lg:h-9 border outline-none lg:px-1 px-[0.3rem] w-full text-blue-500 rounded-md h-8 text-sm'>
                        New
                    </button>
                </Form>
            </div>
            <div className="h-full overflow-auto flex flex-col gap-1">
                {
                    Number(noteR?.length) > 0 ?
                        <div ref={linkref} className="h-full overflow-auto flex flex-col gap-1">
                            {
                                noteR.map((note, i) =>
                                    <Linkr note={note} key={i} />
                                )
                            }
                        </div>
                        :
                        <i className='text-gray-500 text-sm'>no notes</i>
                }
            </div>
        </div>
    )
}