import React from 'react';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dropdown = ({ services }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Online Services</DropdownMenuTrigger>
            <DropdownMenuContent className="bg-primary text-white font-roboto font-bold text-[20px] h-auto mt-5 mr-10">
                {services.map((service) => (
                    <DropdownMenuItem key={service.id}>
                        <Link to={service.path}>{service.title}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dropdown;

