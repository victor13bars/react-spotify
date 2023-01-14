import React from 'react';
import TheRegistrationInfo from "./TheRegistrationInfo";
import BaseButton from "./BaseButton";

const TheRegistration = () => {
    return (
        <a href="/"
           className="bg-gradient-to-r from-[#af2896] to-[#509bf5] text-white py-4 px-8 flex justify-between items-center flex-wrap gap-x-6 gap-y-2">
            <TheRegistrationInfo/>
            <BaseButton primary>
                Sign up free
            </BaseButton>
        </a>
    );
};

export default TheRegistration;