import React from 'react'
import PrescriptionForm from '../components/PrescriptionForm'
import Contact from '../components/Contact'
import styles from '../style'
import Notification from '../components/Notification'

const Prescription = () => {
    return (
        <div>
            <div className="bg-slate-200">
                <h1 className="text-4xl md:text-8xl text-center py-5">Prescriptions</h1>
            </div>

            <div className={`${styles.paddingX} ${styles.flexStart} `}>
                <div className={`${styles.boxWidth}`}>
                    <div>
                        <div className="mt-10 max-w-3xl text-start mb-5">
                            <h3 className="text-lg font-semibold">Overview:</h3>
                            <p>Thank you for choosing our services for your healthcare needs. To ensure timely processing of your prescription, please fill out the form below and upload your prescription document. One of our dedicated team members will promptly review your submission and confirm its successful receipt.</p>
                            <h3>Instructions:</h3>
                            <ol>
                                <li><strong>Prescription Submission:</strong>Please fill in the required
                                    fields and upload your prescription document using the file upload button provided below.</li>
                                <li><strong>Confirmation:</strong>After submission, one of our team members
                                    will review your prescription and confirm its successful receipt via email.</li>
                                <li><strong>Medicine Availability:</strong>
                                    If you are unsure whether the prescribed medicine is available, please click
                                    <a href="/check-availability" className="text-blue underline font-bold text-md"> here </a>to access our availability checker.
                                    This will direct you to another page where you can verify the medicine's availability.</li>
                            </ol>
                        </div>
                        <PrescriptionForm />
                    </div>
                    <Contact />
                </div>
            </div>
            <Notification />
        </div>
    )
}

export default Prescription
