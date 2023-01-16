import useEvent from "./useEvent";

const useClickAway = (ref, handle, shouldHandle = () => true) => {

    useEvent('mousedown', handleMousedown)

    const handleMousedown = (event) => {
        if (shouldHandle(event) && !ref.current.contains(event.target)) handle()
    }
}

export default useClickAway