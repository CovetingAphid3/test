import {
    instagram,
    facebook,
    twitter,
    linkedin
} from '../assets'

export const dashLinks = [
    {
        id: "home",
        title: "Home",
        path: "/"
    },
    {
        id: "customers",
        title: "Customers",
        path: "/admin/dashboard/customers"
    },
    {
        id: "prescriptions",
        title: "Prescriptions",
        path: "/admin/dashboard/prescriptions"
    },
    {
        id: "products",
        title: "Products",
        path: "/admin/dashboard/products"
    },
    {
        id: "requests",
        title: "Requests",
        path: "/admin/dashboard/requests"
    },
    {
        id: "messages",
        title: "Messages",
        path: "/admin/dashboard/messages"
    }

]

export const navLinks = [
    {
        id: "home",
        title: "Home",
        path: "/"
    },
    {
        id: "prescription-submission",
        title: "Prescriptions",
        path: "/prescription-submission"
    },
    {
        id: "check-availability",
        title: "Browse Products",
        path: "/check-availability"
    },

    {
        id: "about",
        title: "About",
        path: "/about"
    },
    {
        id: "services",
        title: "Services",
        path: "/services"
    },
    {
        id: "contact",
        title: "Contact",
        path: "/contact"
    },
];
export const onlineServices = [
    {
        id: "online-services",
        title: "Online Services",
        dropdown: [
            {
                id: "prescription-submission",
                title: "Prescription Submission",
                path: "/prescription-submission"
            },
            {
                id: "check-availability",
                title: "Check Availability",
                path: "/check-availability"
            },
        ]
    },

]
export const socialMedia = [
    {
        id: "social-media-1",
        icon: instagram,
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: facebook,
        link: "https://www.facebook.com/",
    },
    {
        id: "social-media-3",
        icon: twitter,
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: linkedin,
        link: "https://www.linkedin.com/",
    },
];
export const footerLinks = [
    {
        title: "About Us",
        links: [
            {
                name: "About Our Pharmacy",
                link: "/about",
            },
            {
                name: "Services",
                link: "/services",
            },
            {
                name: "Contact Us",
                link: "/contact",
            },
        ],
    },
    {
        title: "Quick Links",
        links: [
            {
                name: "Home",
                link: "/",
            },
            {
                name: "Upload Prescription",
                link: "/prescription-submission",
            },
            {
                name: "Browse",
                link: "/check-availability",
            },
            {
                name: "User Profile",
                link: "/user/dashboard",
            },
        ],
    },
    {
        title: "Partnerships",
        links: [
            {
                name: "Pharmaceutical Partners",
                link: "#pharmaceutical-partners",
            },
            {
                name: "Medical Providers",
                link: "#medical-providers",
            },
            {
                name: "Become a Partner",
                link: "/contact",
            },
        ],
    },
];



