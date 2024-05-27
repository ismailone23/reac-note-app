import { Form, useLoaderData } from "react-router-dom";
import { getSingleData, updateNote } from "../lib/note";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { TodoContext } from "../contexts/context";

export async function loader({ params }: { params: any }) {
    let noteid = params.noteid
    let docsnap = await getSingleData(noteid);
    if (docsnap.exists()) {
        return { data: docsnap.data() }
    } else {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }

}
export default function Viewnote() {

    const { data } = useLoaderData() as any;
    const context = useContext(TodoContext);
    const [textar, setTextar] = useState<string>('')

    const [editState, setEditState] = useState<boolean>(false)


    useEffect(() => {
        setTextar(data.content)
        context?.setNotes(data)
    }, [data])

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!editState) return
            if (!context?.notes) return
            await updateNote(textar, "content", context?.notes?.id)
            setEditState(false)
        }, 500)
        return () => {
            clearTimeout(handler)
        }
    }, [editState, context, textar])
    return (
        <Form action="post" className="flex flex-col w-full h-full gap-1">
            <label htmlFor="content" className="px-2">Contents <small>(you can edit from here)</small></label>
            <textarea required onChange={(e: ChangeEvent<HTMLTextAreaElement>) => { setTextar(e.currentTarget.value); setEditState(true) }}
                name="content" autoFocus id="content"
                className="text-sm w-full bg-gray-50 p-2 resize-none h-full outline-none" value={textar}></textarea>
        </Form>
    )
}
