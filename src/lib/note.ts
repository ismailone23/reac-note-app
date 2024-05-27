import { setDoc, doc, collection, getDocs, getDoc, DocumentSnapshot, DocumentData, updateDoc } from "firebase/firestore";
import { notesType } from "../types/typs";
import { db } from "../firebase";

export async function createDoc(note: notesType): Promise<void> {
    const response = await setDoc(doc(db, 'notes', note.id), note)
    return response
}
export async function getData(q?: string | null): Promise<notesType[]> {
    let allnotes: notesType[] = []
    const querysnapshot = await getDocs(collection(db, 'notes'))
    querysnapshot.forEach(doc => allnotes.push(doc.data() as notesType))

    if (q === "" || q == undefined || q == null) {
        return allnotes
    } else {
        return [...new Set([...allnotes.filter(note => note.heading.toLocaleLowerCase().includes(q)),
        ...allnotes.filter(note => note.content.toLocaleLowerCase().includes(q))])];
    }
}
export async function getSingleData(q: string): Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    const docRef = doc(db, "notes", q);
    const docSnap = await getDoc(docRef);
    return docSnap
}

export async function updateNote(text: string | 'not', area: 'heading' | 'content' | 'not', id: string) {
    const docref = doc(db, 'notes', id)
    if (area === "heading") {
        return await updateDoc(docref, { heading: text, updated_at: new Date().getTime() })
    }
    else if (area === 'content') {
        return await updateDoc(docref, { content: text, updated_at: new Date().getTime() })
    } else {
        return await updateDoc(docref, { updated_at: new Date().getTime() })
    }
}