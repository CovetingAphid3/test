import React from 'react';
import Title from './Title';
import styles from '../style';

function Contact() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            date: new Date().toISOString() // Add current date
        };

        fetch('https://pharmacy-web-page.vercel.app/submit-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                // Handle successful response
                console.log('Success:', responseData);
                // Optionally, reset the form
                event.target.reset();
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };
    return (
        <div className={`${styles.paddingX} ${styles.flexStart} `}>
            <div className={`${styles.boxWidth} `}>
                <div id="contact" className="flex flex-col mx-auto">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl md:text-5xl font-bold">
                            Get In Touch
                        </h1>
                        <p className='text-lg md:text-xl my-4 md:my-6 font-medium'>
                            Contact us via the form below with any questions or general queries.
                        </p>

                        <form
                            method="POST"
                            onSubmit={handleSubmit}
                            className="flex flex-col w-full md:w-7/12"
                        >
                            <Title>Contact</Title>
                            <input
                                required
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="p-2 bg-transparent border-2 focus:outline-none border border-black dark:border-white"
                            />
                            <input
                                required
                                type="text"
                                name="email"
                                placeholder="Email"
                                className="my-1 p-2 bg-transparent border-2 focus:outline-none border border-black dark:border-white"
                            />
                            <textarea
                                required
                                name="message"
                                placeholder="Message"
                                rows="10"
                                className="p-2 mb-2 bg-transparent border-2 focus:outline-none border border-black dark:border-white"
                            />
                            <button
                                type="submit"
                                className="
                        bg-orange  
                        flex items-center justify-center text-lg
                        text-center px-8 py-3 w-max text-base font-medium rounded-md   
                        from-yellow-500 to-pink-500 drop-shadow-md text-white"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Contact;

