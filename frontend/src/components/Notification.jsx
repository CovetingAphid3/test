import styles from "../style";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { hospital } from "../assets";



const handleLinkClick = () => {
    window.scrollTo(0, 0);
};

const CTA = () => (
    <section className={`${styles.flexCenter}  ${styles.padding} shadow-sm shadow-black  bg-lightBlue text-white mt-5 text-black sm:flex-row flex-col box-shadow `}

        style={{ backgroundImage: `url(${hospital})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
        <div className="flex-1 flex flex-col ">
            <h2 className={styles.heading2} style={{ textShadow: '0 0 5px #000' }}>Join Us Today!</h2>
            <p className={`${styles.paragraph} max-w-[470px] md:max-w-[870px] `} style={{ textShadow: '0 0 5px #000' }}>
                Sign up and get exclusive benefits and announcements
            </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
            <Link to="/signup" onClick={handleLinkClick}><Button variant="outline " className=" lg:mr-20 text-white font-bold text-lg bg-crimson hover:bg-green/90">
                Get Started
            </Button></Link>
        </div>
    </section>
);

export default CTA;


