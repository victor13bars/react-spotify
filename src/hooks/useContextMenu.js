import {useEffect, useLayoutEffect, useRef, useState} from "react";

const generateContextMenuItems = (isAlternate = false) => {
    return [
        {
            label: 'to Your Library'
        },
        {
            label: 'Share',
            subMenuItems: [
                {
                    label: isAlternate ? 'Copy Spotify URI' : 'Copy link to playlist',
                    classes: 'min-w-[150px]'
                },
                {
                    label: 'Embed playlist'
                }
            ]
        },
        {
            label: 'About recommendations'
        },
        {
            label: 'Open in Desktop app'
        }
    ]
}
const clickPosition = {x: null, y: null}

const useContextMenu = ({toggleScrolling}) => {
    const [contextMenuItems, setContextMenuItems] = useState(generateContextMenuItems())
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const contextMenuRef = useRef(null)
    const bgClasses = isContextMenuOpen
        ? 'bg-[#272727]'
        : 'bg-[#181818] hover:bg-[#272727]'
    const openContextMenu = (event) => {
        event.preventDefault()
        clickPosition.x = event.clientX
        clickPosition.y = event.clientY
        setIsContextMenuOpen(true)
    }
    const closeContextMenu = () => {
        setIsContextMenuOpen(false)
    }

    const updateContextMenuHorizontalPosition = () => {

        const menuWidth = contextMenuRef.current.offsetWidth
        const shouldMoveLeft = menuWidth > window.innerWidth - clickPosition.x

        contextMenuRef.current.style.left = shouldMoveLeft
            ? `${clickPosition.x - menuWidth}px`
            : `${clickPosition.x}px`
    }

    const updateContextMenuVerticalPosition = () => {

        const menuHeight = contextMenuRef.current.offsetHeight
        const shouldMoveUp = menuHeight > window.innerHeight - clickPosition.y

        contextMenuRef.current.style.top = shouldMoveUp
            ? `${clickPosition.y - menuHeight}px`
            : `${clickPosition.y}px`
    }

    const updateContextMenuPosition = () => {
        updateContextMenuHorizontalPosition()
        updateContextMenuVerticalPosition()
    }

    useLayoutEffect(() => {

        toggleScrolling(!isContextMenuOpen)

        if (isContextMenuOpen) {
            updateContextMenuPosition()
        }
    })

    useEffect(() => {

        if (!isContextMenuOpen) return

        const handleClickAway = (event) => {
            if (!contextMenuRef.current.contains(event.target)) {
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

    useEffect(() => {

        const handleAltKeydown = ({key}) => {

            if (key === 'Alt' && isContextMenuOpen) setContextMenuItems(generateContextMenuItems(true))
        }

        const handleAltKeyup = ({key}) => {
            if (key === 'Alt' && isContextMenuOpen) setContextMenuItems(generateContextMenuItems(false))
        }

        document.addEventListener('keydown', handleAltKeydown)
        document.addEventListener('keyup', handleAltKeyup)

        return () => {

            document.removeEventListener('keydown', handleAltKeydown)
            document.removeEventListener('keyup', handleAltKeyup)
        }
    })

    return {
        bgClasses,
        openContextMenu,
        isContextMenuOpen,
        contextMenuRef,
        contextMenuItems
    }
}

export default useContextMenu