import useEvent from "./useEvent";

const useClickAway = (ref, handler, shouldHandler = () => true) => {

    const handleMousedown = (event) => {

        const handle = shouldHandler instanceof Function ? shouldHandler(event) : shouldHandler

        if (handle && !ref.current.contains(event.target)) handler()
    }

    useEvent('mousedown', handleMousedown)

}

export default useClickAway