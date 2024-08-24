import styles from "../style";
import { Button } from "./ui/button";
import {Link} from "react-router-dom";

const CTA = () => (
    <section className={`${styles.flexCenter}  ${styles.padding} shadow-sm shadow-black  bg-lightBlue text-white mt-5 text-black sm:flex-row flex-col box-shadow `}>
        <div className="flex-1 flex flex-col ">
            <h2 className={styles.heading2}>Explore A World Of Benefits !</h2>
            <p className={`${styles.paragraph} max-w-[470px] `}>
                Want to Upload or check your prescription?
            </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <Link to="/user/dashboard"><Button variant="outline " className=" lg:mr-20 text-white font-bold text-lg bg-crimson hover:bg-green/90">
                Get Started
            </Button></Link>
        </div>
    </section>
);

export default CTA;

