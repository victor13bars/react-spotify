import {useState} from "react";

const useModal = () => {

    const [isOpen, setIsOpen] = useState()

    const open = () => {
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }

    return {
        open,
        close,
        isOpen
    }

}

export default useModal