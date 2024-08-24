import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import { Link } from "react-router-dom";

const handleLinkClick = () => {
    window.scrollTo(0, 0);
};

const Footer = () => (
    <section id="footer" className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
        <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
            <div className="flex-[1] flex flex-col justify-start mr-10">
                <img
                    src={logo}
                    alt="hoobank"
                    className="w-[266px] h-[72.14px] object-contain"
                    onClick={() => window.scrollTo(0, 0)}
                />
                <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
                    Stay healthy with us!
                </p>
            </div>

            <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
                {footerLinks.map((footerlink) => (
                    <div key={footerlink.title} className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}>
                        <h4 className="font-roboto font-medium text-[18px] leading-[27px] ">
                            {footerlink.title}
                        </h4>
                        <ul className="list-none mt-4">
                            {footerlink.links.map((link, index) => (
                                <Link key={link.name} to={link.link} onClick={handleLinkClick}>
                                    <li
                                        className={
                                            `font-roboto font-normal text-[16px] leading-[24px] text-dimWhite
                                             hover:text-blue cursor-pointer ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                                            }`}
                                    >
                                        {link.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
            <p className="font-roboto font-normal text-center text-[18px] leading-[27px] ">
                Copyright Ⓒ 2024 Glaudina Pharmacy. All Rights Reserved.
            </p>

            <div className="flex flex-row md:mt-0 mt-6">
                {socialMedia.map((social, index) => (
                    <img
                        key={social.id}
                        src={social.icon}
                        alt={social.id}
                        className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                            }`}
                        onClick={() => window.open(social.link)}
                    />
                ))}
            </div>
        </div>
    </section>
);

export default Footer;

