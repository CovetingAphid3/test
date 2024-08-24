import styles from "../style";
import Hero from "../components/Hero"
import Explore from "../components/Explore"
import ProductDisplay from "../components/ProductDisplay"
import ServicesInfo from "../components/ServicesInfo"
import Banner from "../components/Banner"
import HealthNews from "../components/HealthNews"
import Notification from "../components/Notification"

import React from 'react'

const Home = () => {
    return (
        <div>

            <Hero />
            <Banner />
            <Explore />
            <ProductDisplay />
            <ServicesInfo />
            <div className={`${styles.paddingX} ${styles.flexStart} mb-10`}>
                <div className={`${styles.boxWidth}`}>
                    <HealthNews />
                </div>
            </div>

            <Notification />
        </div>
    )
}

export default Home
