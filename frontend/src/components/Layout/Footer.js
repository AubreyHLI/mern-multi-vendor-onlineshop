import React from "react";
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter,} from "react-icons/ai";
import { Link } from "react-router-dom";
import { footercompanyLinks, footerProductLinks, footerSupportLinks } from "../../static/data";
import logoWhite from '../../assets/logo-white.png';

const Footer = () => {
    return (
        <div className="bg-lime-600 text-white">
            <div className="sm:px-8">
                <div className="grid grid-cols-1 500px:grid-cols-3 1100px:grid-cols-5 gap-6 py-16 sm:text-center">
                    <ul className="text-center sm:text-start flex flex-col items-center 500px:col-span-3 1100px:col-span-2 sm:block">
                        <img src={logoWhite} alt="logo"  className='h-12' style={{ filter: "brightness(0) invert(1)" }} />
                        <p className="pt-[20px]">The home and elements needeed to create beatiful products.</p>
                        <div className="flex items-center mt-[15px]">
                        <AiFillFacebook size={25} className="cursor-pointer" />
                        <AiOutlineTwitter
                            size={25}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        <AiFillInstagram
                            size={25}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        <AiFillYoutube
                            size={25}
                            style={{ marginLeft: "15px", cursor: "pointer" }}
                        />
                        </div>
                    </ul>
                </div>

                <div className="grid items-end grid-cols-1 500px:grid-cols-2 lg:grid-cols-3 gap-6 text-center text-[#dfdfdf] text-sm pb-6 pl-3">
                    <span>© 2023 Aubrey. All rights reserved.</span>
                    <span>Terms · Privacy Policy</span>
                    <div className="flex items-center justify-center w-full 500px:col-span-2 lg:col-span-1">
                        <img src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;