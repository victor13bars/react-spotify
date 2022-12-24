import {useLayoutEffect} from "react";

const clickPosition = {x: null, y: null}

const useContextMenuPosition = (ref, isOpen) => {

    useLayoutEffect(() => {
        if (isOpen) updatePosition()
    })

    const updatePosition = () => {
        updateVerticalPosition()
        updateHorizontalPosition()
    }

    const updateVerticalPosition = () => {
        const y = clickPosition.y
        const menuHeight = ref.current.offsetHeight
        const shouldMoveUp = menuHeight > window.innerHeight - y

        ref.current.style.top = `${shouldMoveUp ? y - menuHeight : y}px`
    }

    const updateHorizontalPosition = () => {
        const x = clickPosition.x
        const menuWidth = ref.current.offsetWidth
        const shouldMoveLeft = menuWidth > window.innerWidth - x

        ref.current.style.left = `${shouldMoveLeft ? x - menuWidth : x}px`
    }

    const updateClickCoordinates = (x, y) => {
        clickPosition.x = x
        clickPosition.y = y
    }

    return updateClickCoordinates
}

export default useContextMenuPosition