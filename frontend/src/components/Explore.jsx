'use client';
import SmallAd from './SmallAd';
import Slide from './Slide';
import styles from '../styles';
import { payments } from '../assets';


const Explore = () => {

    return (
        <section className={`${styles.xPaddings}  `} id="explore">
            <div
                className={` flex flex-col justify-center items-center ${styles.boxWidth}`}
            >
                <div className="ml-2 py-0 flex lg:flex-row flex-col h-full w-[90vw] md:w-full">
                    <Slide />
                </div>
            </div>
            <SmallAd />
            <div className={`${styles.flexCenter} ${styles.marginX}  rounded-sm shadow-md shadow-black bg-primary text-slate-200 mt-5 text-black sm:flex-row flex-col rounded-sm box-shadow`}>
                <div className="flex-1 flex flex-col m-10 font-rubik text-white ">
                    <h2 className={`text-5xl `}>Medical Aid Accepted!</h2>
                    <p className={`text-lg max-w-[370px]`}>
                        Access quality healthcare without worrying about payment.
                    </p>
                </div>
                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 `}>
                    <img src={payments} alt="payments" className="w-[50%] h-[50%] object-contain" />
                </div>

            </div>

        </section>
    );
};

export default Explore;
