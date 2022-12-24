import {useEffect, useRef, useState} from "react";
import useContextMenuPosition from "./useContextMenuPosition";


const useContextMenu = () => {

    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const contextMenuRef = useRef(null)
    const updateClickCoordinates = useContextMenuPosition(contextMenuRef, isContextMenuOpen)

    const openContextMenu = (event) => {
        event.preventDefault()

        updateClickCoordinates(event.clientX, event.clientY)
        setIsContextMenuOpen(true)
    }

    const closeContextMenu = () => {
        setIsContextMenuOpen(false)
    }

    useEffect(() => {

        if (!isContextMenuOpen) return

        const handleClickAway = ({target}) => {
            if (!contextMenuRef.current.contains(target)) {
                closeContextMenu()
            }
        }

        const handleEsc = ({key}) => {
            if (key === 'Escape') {
                closeContextMenu()
            }
        }

        document.addEventListener('mousedown', handleClickAway)
        document.addEventListener('keydown', handleEsc)

        return () => {
            document.removeEventListener('mousedown', handleClickAway)
            document.removeEventListener('keydown', handleEsc)
        }
    })

    return {
        openContextMenu,
        isContextMenuOpen,
        contextMenuRef
    }
}

export default useContextMenu