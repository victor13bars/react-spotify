const usePopoverPosition = (ref, isSmallScreen) => {

    const move = (target, offset) => {
        offset = offset || calculateTargetOffset(target)
        ref.current.style.top = `${offset.top}px`
        ref.current.style.left = `${offset.left}px`
    }

    const calculateTargetOffset = (target) => {
        const {top, right, left, height} = target.getBoundingClientRect()


        return {
            top: isSmallScreen ? top + height * 2 : top - (height / 3) * 2,
            left: isSmallScreen ? left : right + 30
        }
    }
    return move
}

export default usePopoverPosition