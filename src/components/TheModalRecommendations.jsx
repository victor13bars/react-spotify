import React from 'react';
import BaseModal from "./BaseModal";

const TheModalRecommendations = ({onClose: handleClose}) => {
    return (
        <BaseModal onClose={handleClose}>
            <h1 className='text-3xl pt-8 pb-3 px-8 font-bold leading-relaxed border-b border-neutral-600'>
                About recommendations
            </h1>
            <div className='py-6 px-8 overflow-y-auto'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium architecto aspernatur doloremque dolores error, facilis magnam rerum.
                Accusantium adipisci aliquid animi assumenda atque aut commodi culpa cupiditate dicta dolorum
                ducimus enim facere fugiat hic ipsam iste laboriosam libero magni molestias nisi nobis obcaecati
                provident quam, quia quod rem saepe sed similique temporibus vel.
                Distinctio dolorum et in necessitatibus temporibus vel voluptatum.
                Ab accusamus autem deleniti dolor dolores dolorum earum excepturi facilis itaque, mollitia
                necessitatibus nemo, nihil non quibusdam veniam voluptas voluptates.
                Consequatur culpa delectus ea esse exercitationem id illo inventore ipsum iste libero maiores
                molestiae obcaecati placeat veritatis vero, voluptates?
            </div>
        </BaseModal>
    );
};

export default TheModalRecommendations;