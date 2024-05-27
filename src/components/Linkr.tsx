import { NavLink } from "react-router-dom";
import { notesType } from "../types/typs";

export default function Linkr({ note }: { note: notesType }) {
    return (
        <NavLink id={note.id} draggable to={`/notes/${note.id}/view`}
            className={({ isActive }) => `p-2 rounded-sm items-center justify-center w-full ${isActive && "bg-gray-100 text-blue-500"}`}>
            <p className="truncate">{note.heading}</p>
        </NavLink>
    )
}
