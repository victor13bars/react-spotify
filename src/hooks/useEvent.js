import {useEffect} from "react";

const useEvent = (name, handler, shouldHandler = true, target = document) => {

    useEffect(() => {

        const handle = shouldHandler instanceof Function ? shouldHandler() : shouldHandler

        if (!handle) return

        const node = target instanceof Function ? target() : target

        node.addEventListener(name, handler)

        return () => node.removeEventListener(name, handler)
    })

}

export default useEvent