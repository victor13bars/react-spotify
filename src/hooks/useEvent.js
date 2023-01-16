import {useEffect} from "react";

const useEvent = (name, handler, target = document) => {

    useEffect(() => {
        target.addEventListener(name, handler)

        return () => target.removeEventListener(name, handler)
    })

}

export default useEvent