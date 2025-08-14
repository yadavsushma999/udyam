"use client"; 
import Image from "next/image";
import { useState } from "react";

export default function Header() {
    return (
        <header
            id="header"
            className="fixed w-full z-[997] transition-all duration-500 bg-[rgba(24,6,185,0.8)]"
        // You can add scroll effect by React state if needed to add bg on scroll
        >
            <div className="container mx-auto">
                <div className="flex items-center justify-start gap-16 max-w-[1100px] mx-auto">
                    {/* Logo */}
                    <h1 className="logo ">
                        <a href="/Government-India/Ministry-MSME-registration.htm" aria-label="Home" className="inline-block">
                            <img
                                src="/img/MINISTRY_NAME.webp"
                                alt="Ministry Logo"
                                className="h-16 w-auto"
                            />

                        </a>
                    </h1>

                    {/* Middle Image */}


                    {/* Navigation */}
                    <nav className="hidden lg:block nav-menu">
                        <ul className="flex list-none m-0 p-0">
                            <li className="relative whitespace-nowrap px-6 py-2">
                                <a
                                    href="/Government-India/Ministry-MSME-registration.htm"
                                    aria-label="Home"
                                    className="text-white text-opacity-70 hover:text-white font-semibold text-[15px] relative after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 after:ease-in-out after:w-0 hover:after:w-full"
                                >
                                    Home
                                </a>
                            </li>

                            <li className="relative whitespace-nowrap px-6 py-2">
                                <a
                                    href="/docs/NIC-code-for-MSME-classification-definition.pdf"
                                    target="_blank"
                                    aria-label="NIC Code"
                                    rel="noreferrer"
                                    className="text-white text-opacity-70 hover:text-white font-semibold text-[15px] relative after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 after:ease-in-out after:w-0 hover:after:w-full"
                                >
                                    NIC Code
                                </a>
                            </li>

                            {/* Dropdown "Useful Documents" */}
                            <li className="group relative px-6 py-2 whitespace-nowrap cursor-pointer">
                                <span
                                    aria-label="Useful Documents"
                                    className="flex items-center gap-1 text-white text-opacity-70 hover:text-white font-semibold text-[15px] relative after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 after:ease-in-out after:w-0 hover:after:w-full"
                                >
                                    Useful Documents
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3} // increase thickness
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>


                                <ul
                                    className="absolute left-5 top-full  min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50"
                                    aria-label="submenu"
                                >
                                    <li>
                                        <a
                                            href="/msme-registration-process/free-government-portal.html"
                                            aria-label="Important"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Important
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>
                                    <li>
                                        <a
                                            href="/docs/Benefits_of_UR.pdf"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Udyam Registration Benefits"
                                            className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Udyam Registration Benefits
                                            <img
                                                alt="New"
                                                src="/images/new.gif"
                                                height={20}
                                                width={38}
                                                className="ml-2"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>
                                    <li>
                                        <a
                                            href="/Highlights.aspx"
                                            aria-label="Site Highlights"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Site Highlights
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>
                                    <li>
                                        <a
                                            href="/Circular.aspx"
                                            aria-label="Circulars & Orders"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Circulars & Orders
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>
                                    <li>
                                        <a
                                            href="/docs/UdyamApplication.pdf"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Udyam Registration Sample Form"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Udyam Registration Sample form
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>

                                    {/* Nested dropdown "Udyam Registration Bulletin" */}
                                    <li className="group relative cursor-pointer">
                                        <span className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e] font-semibold">
                                            Udyam Registration Bulletin
                                            <img
                                                alt="New"
                                                src="/images/new.gif"
                                                height={20}
                                                width={38}
                                                className="ml-2"
                                            />
                                        </span>

                                        <ul
                                            className="absolute left-full top-0 ml-[-30px] mt-0 min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50"
                                            aria-label="submenu"
                                        >
                                            {[
                                                { href: "/docs/Buletin-I-Analysis-of-Udyam-Registration-Data.pdf", label: "Udyam Registration Bulletin I" },
                                                { href: "/docs/Buletin-II-Analysis-of-Udyam-Registration-Data.pdf", label: "Udyam Registration Bulletin II" },
                                                { href: "/docs/Buletin-III-Analysis-of-Udyam-Registration-Data.pdf", label: "Udyam Registration Bulletin III" },
                                                { href: "/docs/Buletin-IV-Analysis-of-Udyam-Registration-Data.pdf", label: "Udyam Registration Bulletin IV" },
                                                { href: "/docs/Buletin-V-Analysis-of-Udyam-Registration-Data.pdf", label: "Udyam Registration Bulletin V" },
                                                { href: "/docs/Buletin-VI-Analysis-of-Udyam-Registration-Data.pdf", label: "Udyam Registration Bulletin VI" },
                                                {
                                                    href: "/docs/Buletin-VII-Analysis-of-Udyam-Registration-Data.pdf",
                                                    label: "Udyam Registration Bulletin VII",
                                                    isNew: true,
                                                },
                                                {
                                                    href: "/docs/Buletin-VIII-Analysis-of-Udyam-Registration-Data.pdf",
                                                    label: "Udyam Registration Bulletin VIII",
                                                    isNew: true,
                                                },
                                            ].map(({ href, label, isNew }) => (
                                                <li key={label}>
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label={label}
                                                        className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                                    >
                                                        {label}
                                                        {isNew && (
                                                            <img
                                                                alt="New"
                                                                src="/images/new.gif"
                                                                height={20}
                                                                width={38}
                                                                className="ml-2"
                                                            />
                                                        )}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>

                                    <li>
                                        <hr className="my-0" />
                                    </li>

                                    <li>
                                        <a
                                            href="/docs/Udyam_Metadata.pdf"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="Metadata Compliance"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Metadata Compliance
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Dropdown "Print / Verify" */}
                            <li className="group relative px-6 py-2 whitespace-nowrap cursor-pointer">
                                <span
                                    aria-label="Useful Documents"
                                    className="flex items-center gap-1 text-white text-opacity-70 hover:text-white font-semibold text-[15px] relative after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 after:ease-in-out after:w-0 hover:after:w-full"
                                >
                                    Print / Verify
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3} // increase thickness
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                                <ul className="absolute left-5 top-full min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                                    <li>
                                        <a
                                            href="/Udyam_Login.aspx"
                                            aria-label="Print Udyam Certificate"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Print Udyam Certificate
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/Udyam_Verify.aspx"
                                            aria-label="Verify Udyam Registration Number"
                                            className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Verify Udyam Registration Number
                                            <img
                                                alt="New"
                                                src="/images/new.gif"
                                                height={20}
                                                width={38}
                                                className="ml-2"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>
                                    <li>
                                        <a
                                            href="/UA/PrintAcknowledgement_Pub.aspx"
                                            aria-label="Print UAM Certificate"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Print UAM Certificate
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/UA/PrintApplication_Pub.aspx"
                                            aria-label="Print UAM Application"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Print UAM Application
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/UA/UA_VerifyUAM.aspx"
                                            aria-label="Verify Udyaog Aadhaar"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Verify Udyog Aadhaar
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="my-0" />
                                    </li>
                                    <li>
                                        <a
                                            href="/ForgotRegNo.aspx"
                                            aria-label="Forgot Udyam/UAM No."
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Forgot Udyam/UAM No.
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Dropdown "Update Details" */}
                            <li className="group relative px-6 py-2 whitespace-nowrap cursor-pointer">
                                <span
                                    aria-label="Useful Documents"
                                    className="flex items-center gap-1 text-white text-opacity-70 hover:text-white font-semibold text-[15px] relative after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 after:ease-in-out after:w-0 hover:after:w-full"
                                >
                                    Update Details
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3} 
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                                <ul className="absolute left-5 top-full min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                                    <li>
                                        <a
                                            href="/Udyam_Login.aspx"
                                            aria-label="Update/Cancel Udyam Registration"
                                            className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Update/Cancel Udyam Registration
                                            <img
                                                alt="New"
                                                src="/images/new.gif"
                                                height={20}
                                                width={38}
                                                className="ml-2"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Dropdown "Login" */}
                            <li className="group relative px-6 py-2 whitespace-nowrap cursor-pointer">
                                <span
                                    aria-label="Useful Documents"
                                    className="flex items-center gap-1 text-white text-opacity-70 hover:text-white font-semibold text-[15px] relative after:absolute after:bottom-[-5px] after:left-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 after:ease-in-out after:w-0 hover:after:w-full"
                                >

                                    Login
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3} // increase thickness
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </span>
                                <ul className="absolute left-5 top-full min-w-[220px] bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 z-50">
                                    <li>
                                        <a
                                            href="/Udyam_Officer_Login.aspx"
                                            aria-label="Officer's Login"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Officer's Login
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/Udyam_EFC_Login.aspx"
                                            aria-label="EFC's Login"
                                            className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            EFC's Login
                                            <img
                                                alt="New"
                                                src="/images/new.gif"
                                                height={20}
                                                width={38}
                                                className="ml-2"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/Udyam_NSSH_Login.aspx"
                                            aria-label="NSSH Officer's Login"
                                            className="flex items-center justify-between px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            NSSH Officer's Login
                                            <img
                                                alt="New"
                                                src="/images/new.gif"
                                                height={20}
                                                width={38}
                                                className="ml-2"
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/Udyam_Login.aspx"
                                            aria-label="Udyami Login"
                                            className="block px-5 py-2 text-[#2c4964] text-sm hover:text-[#07174e]"
                                        >
                                            Udyami Login
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
