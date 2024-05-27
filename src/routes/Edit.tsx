import { Form, redirect } from "react-router-dom";
import { notesType } from "../types/typs";
import { createDoc } from "../lib/note";
import { useState } from "react";
import { Link } from "react-router-dom";

export async function action({ request, params }: { request: Request, params: any }) {
    const formData = await request.formData()
    const update = Object.fromEntries(formData) as { heading: string, content: string }
    let note: notesType = {
        ...update,
        id: params.noteid as string,
        updated_at: new Date().getTime().toString()
    }
    await createDoc(note)
    return redirect(`/notes/${note.id}/view`);
}

export default function EditNote() {
    const [isloading, setIsloading] = useState(false);
    return (
        <div className="flex w-full">
            <Form method="post" className="flex flex-col w-full gap-2 items-end" onSubmit={() => setIsloading(!isloading)}>
                <div className="w-full flex flex-col">
                    <label htmlFor="heading">Heading for note</label>
                    <input placeholder="Heading"
                        maxLength={50}
                        aria-label="Heading"
                        type="text"
                        className="border w-full outline-none px-2 py-1 text-sm rounded-md"
                        autoComplete="off"
                        id="heading"
                        name="heading" />
                </div>
                <div className="w-full flex flex-col">
                    <label htmlFor="content">Content of note</label>
                    <textarea
                        className="border w-full outline-none px-2 py-1 rounded-sm h-32"
                        placeholder="Content"
                        aria-label="Content"
                        name="content"
                        id="content"
                    ></textarea>
                </div>
                <div className="flex gap-2 ">
                    <Link to={'/'} className="rounded w-24 py-1 cursor-pointer bg-red-500 text-center text-white text-md">cancel</Link>
                    <button disabled={isloading} type="submit" className="disabled:bg-blue-100 disabled:cursor-not-allowed rounded w-24 py-1 cursor-pointer bg-blue-500 text-white">submit</button>
                </div>
            </Form>
        </div>
    )
}
