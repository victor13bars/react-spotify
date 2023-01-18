import React from 'react';
import BaseModal from "./BaseModal";
import BaseButton from "./BaseButton";

const TheModalEmbedPlaylist = ({onClose: handleClose}) => {
    return (
        <BaseModal
            classes="w-[600px] bg-neutral-900"
            onClose={handleClose}
        >
            <h1 className='text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed'>
                Embed PlayList
            </h1>
            <div className='py-6 px-8 text-neutral-500 text-[13px]'>
                Lorem ipsum dolor sit amet {' '}
                <a href='/' className='text-white font-bold hover:underline'>
                    consectetur adipisicing elit
                </a>
                . Ex fugiat minus, quia recusandae sequi voluptatibus.
            </div>
            <div className="text-right pb-6 px-8">
                <BaseButton primary>Copy</BaseButton>
            </div>
        </BaseModal>
    );
};

export default TheModalEmbedPlaylist;