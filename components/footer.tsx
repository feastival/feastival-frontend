import React from "react";

export default function Footer() {
  return (
    <div className="w-[1440px] h-[436px] relative">
    <div className="w-[1440px] h-[436px] left-0 top-0 absolute bg-black" />
    <div className="w-[1440px] h-[70px] left-0 top-[366px] absolute">
        <div className="w-[1440px] h-[70px] left-0 top-0 absolute bg-purple-500" />
        <div className="left-[120px] top-[25px] absolute text-white text-base font-normal">© Feastival 2023 all rights reserved</div>
        <div className="w-[382px] h-[22px] left-[938px] top-[24px] absolute justify-start items-start gap-[42px] inline-flex">
            <div className="text-white text-base font-normal leading-snug">Trems & Condition</div>
            <div className="text-white text-base font-normal leading-snug">Privacy Policy</div>
            <div className="text-white text-base font-normal leading-snug">Cookies</div>
        </div>
    </div>
    <div className="w-[1300px] left-[70px] top-[53px] absolute justify-center items-start inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
            <div className="text-white text-4xl font-normal uppercase leading-9">feastival</div>
            <div className="h-[142px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch h-[59px] flex-col justify-start items-start gap-2 flex">
                    <div className="text-white text-lg font-medium leading-[27px]">Contact</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">(021) 567-789-123</div>
                </div>
                <div className="h-[59px] flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch text-white text-lg font-medium leading-[27px]">Address</div>
                    <div className="self-stretch text-neutral-400 text-base font-normal leading-normal">Jl. Pahlawan Indonesia</div>
                </div>
            </div>
        </div>
        <div className="justify-start items-start gap-12 flex">
            <div className="flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch text-white text-lg font-medium leading-[27px]">Menu</div>
                <div className="self-stretch h-[152px] flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-400 text-base font-normal leading-normal">Home</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">Tickets</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">Careers</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">Community</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">About</div>
                </div>
            </div>
            <div className="flex-col justify-start items-start gap-4 inline-flex">
                <div className="text-white text-lg font-medium leading-[27px]">FAQ</div>
                <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-400 text-base font-normal leading-normal">Payment</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">Order</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">How Trade Ticket</div>
                </div>
            </div>
            <div className="flex-col justify-start items-start gap-4 inline-flex">
                <div className="text-white text-lg font-medium leading-[27px]">Support</div>
                <div className="flex-col justify-start items-start gap-4 flex">
                    <div className="text-neutral-400 text-base font-normal leading-normal">Send Email</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">Online chat</div>
                    <div className="text-neutral-400 text-base font-normal leading-normal">Call center</div>
                </div>
            </div>
        </div>
    </div>
</div>
  
    );
}