import { RefObject } from "react";
import { updateNote } from "./note";

function getLink(link: RefObject<HTMLDivElement>) {
    let x = [];
    for (let index = 0; index < Number(link.current?.children.length); index++) {
        x.push(link.current?.children[index])
    }
    return x
}
export function dragdrop(link: RefObject<HTMLDivElement>) {

    let linkCollection = getLink(link)
    let afterelem: Element;
    let draggable: Element;

    linkCollection.forEach((item) => {
        item?.addEventListener('dragstart', () => {
            item.classList.add("draging")
            draggable = item;
        })
        item?.addEventListener('dragend', () => {
            item.classList.remove("draging")
        })
    })
    link.current?.addEventListener('dragover', async (e) => {
        e.preventDefault();
        let afterElement = getAfterEllement(e.clientY, linkCollection)

        link.current?.insertBefore(draggable, afterElement)
        afterelem = afterElement
    })
    link.current?.addEventListener('dragend', () => {
        setTimeout(async () => {
            const work1 = updateNote("not", "not", afterelem.id)
            const work2 = updateNote("not", "not", draggable.id)
            await Promise.all([work1, work2])
        }, 300)
    })


}
function getAfterEllement(y: number, lCollection: (Element | undefined)[]) {
    return lCollection.reduce((closest, child) => {
        const box = child?.getBoundingClientRect()
        const offset = y - Number(box?.top) - (Number(box?.height) / 2);

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}