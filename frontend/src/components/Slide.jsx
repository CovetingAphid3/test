import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { health, laboratory, pharmacy2 } from "../assets"; // Import images for carousel items

// Common component for carousel items
const CarouselItemContent = ({ imageSrc, altText, title, subtitle }) => {
    return (
        <div className="relative flex items-center justify-center min-w-[170px] h-[400px] md:h-[400px] cursor-pointer">
            <img src={imageSrc} alt={altText} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)]">
                <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">{title}</p>
                <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">{subtitle}</h2>
            </div>
        </div>
    );
};

// Component for the Carousel Slide
const Slide = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 768);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize); // Add event listener for resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup on unmount
        };
    }, []);

    return (
        <div className="relative z-0 mx-0 px-0"> {/* Ensure the container has a z-index */}
            {/* Other content that should appear above the carousel */}
            <div className="relative z-10">
                {/* Other content here */}
            </div>
            {/* Carousel Component */}
            <div className="z-0"> {/* Set the z-index of the carousel wrapper */}
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 3000, // Set autoplay delay to 3 seconds
                        }),
                    ]}
                    opts={{
                        align: "start", // Align carousel items to start
                        loop: true, // Enable looping of carousel items
                        slidesToScroll: 1, // Corrected the typo
                        dragFree: true, // Enable drag-free carousel navigation
                    }}
                >
                    {/* Carousel Content */}
                    <CarouselContent className="w-full">

                        <CarouselItem>
                            <CarouselItemContent
                                imageSrc={laboratory}
                                altText="Pharmacist with Lab Test"
                                title="Expert Care"
                                subtitle="Precision and care in every prescription."
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <CarouselItemContent
                                imageSrc={health}
                                altText="Woman Enjoying Fresh Fruit"
                                title="Nourish Your Body"
                                subtitle="Discover the joy of healthy living."
                            />
                        </CarouselItem>

                        <CarouselItem>
                            <CarouselItemContent
                                imageSrc={pharmacy2}
                                altText="Person Wearing a Face Mask"
                                title="Your Health Hub"
                                subtitle="Your one-stop for all healthcare needs."
                            />
                        </CarouselItem>

                    </CarouselContent>
                    {/* Navigation buttons */}
                    {/* Conditionally render navigation buttons based on screen size */}
                    {isDesktop && <CarouselPrevious />}
                    {isDesktop && <CarouselNext />}
                </Carousel>
            </div>
        </div>
    );
};

export default Slide;

