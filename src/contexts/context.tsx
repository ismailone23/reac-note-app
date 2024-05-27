import { Dispatch, createContext, useState } from 'react'
import { notesType } from '../types/typs';

export type contextType = {
    notes: notesType | null,
    setNotes: Dispatch<notesType | null>
}

export const TodoContext = createContext<contextType | null>(null)

export default function TodoProvider({ children }: { children: JSX.Element }) {
    const [notes, setNotes] = useState<notesType | null>(null);

    const contextvalue: contextType = {
        notes,
        setNotes
    }

    return (
        <TodoContext.Provider value={contextvalue}>
            {children}
        </TodoContext.Provider>
    )
}
