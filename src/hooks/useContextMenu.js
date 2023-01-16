import {useRef, useState} from "react";
import useContextMenuPosition from "./useContextMenuPosition";
import useClickAway from "./useClickAway";
import useEvent from "./useEvent";

const useContextMenu = (items) => {

    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)
    const move = useContextMenuPosition(ref, isOpen)

    const open = (event) => {
        event.preventDefault()

        move(event.clientX, event.clientY)
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }

    const handleEsc = ({key}) => {
        if (key === 'Escape') {
            close()
        }
    }

    useClickAway(ref, close, () => isOpen)

    useEvent('keydown', handleEsc, () => isOpen)

    return {
        open,
        close,
        isOpen,
        ref,
        items
    }
}

export default useContextMenu