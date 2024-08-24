import React from 'react'
import Contact from '../components/Contact'

const ContactPage = () => {
    return (
        <div>
            <div className="bg-slate-200">
                <h1 className="text-6xl md:text-8xl text-center py-5">Contact</h1>
            </div>

            <div className="flex  flex-col-reverse lg:flex-row-reverse items-center justify-center w-full lg:mt-10">

                <div className="flex flex-col  items-center justify-center bg-white text-ring py-10 px-5 shadow-sm ">
                    <h1 className="text-3xl md:text-5xl font-semibold text-ring">Details </h1>
                    <div className="ml-5  text-start my-5">
                        <p className="text-lg md:text-xl my-2"><strong>Email Address : </strong><a href="mailto:2H9pG@example.com" className="text-blue text-lg font-semibold underline">2H9pG@example.com</a></p>
                        <p className="text-lg md:text-xl my-2"><strong>Contact Us : </strong> <a href="tel:1234567890" className="text-blue text-lg font-semibold underline">(123) 456-7890</a></p>

                        <p className="text-lg md:text-xl my-2"><strong>Address : </strong> <a href="https://www.google.com/maps/place/123+Main+Street,+Cityville,+State+ZIP" className="text-blue text-lg font-semibold underline">123 Main Street, Cityville, State, ZIP</a> </p>
                        <p className="text-lg md:text-xl my-2 text-ring text-lg font-semibold"><strong className="text-ring">Operating Hours : </strong> Monday to Friday, <span className="text-blue">9:00 AM - 6:00 PM</span></p>
                    </div>

                </div>

                <div className="w-full lg:w-1/2 mb-10">
                    <Contact />
                </div>
            </div>

        </div>
    )
}

export default ContactPage
