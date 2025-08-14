// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            id="footer"
            className="text-white text-sm bg-[linear-gradient(45deg,rgba(2,4,53,0.91)_0%,rgba(22,4,90,0.9)_100%),url('/img/hero-bg.jpg')] bg-cover bg-center"
        >
            {/* Top Section */}
            <div className="py-16 px-12 pb-8 relative max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Contact */}
                    <div>
                        <h3 className="text-3xl mb-6 font-medium uppercase">Udyam Registration</h3>
                        <p className="leading-6 font-poppins">
                            Ministry of MSME <br />
                            Udyog bhawan - New Delhi
                            <br /><br />
                            <strong>Email:</strong> champions@gov.in
                            <br /><br />
                            <strong>
                                <Link href="/ContactUs.aspx" className="text-white">
                                    Contact Us
                                </Link>
                            </strong>
                            <br />
                            <strong>
                                <a
                                    href="https://champions.gov.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white"
                                >
                                    For Grievances / Problems
                                </a>
                            </strong>
                        </p>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h4 className="text-base font-bold pb-3 relative">Our Services</h4>
                        <ul className="list-none p-0 m-0">
                            {[
                                ["CHAMPIONS", "https://champions.gov.in/"],
                                ["MSME Samadhaan", "https://samadhaan.msme.gov.in/"],
                                ["MSME Sambandh", "https://sambandh.msme.gov.in/"],
                                ["MSME Dashboard", "https://dashboard.msme.gov.in/"],
                                [
                                    "Entrepreneurship Skill Development Programme (ESDP)",
                                    "https://msmedi.dcmsme.gov.in/",
                                ],
                            ].map(([label, url], i) => (
                                <li key={i} className={`flex items-center py-2 ${i === 0 ? "pt-0" : ""}`}>
                                    <i className="bx bx-chevron-right text-lg pr-1"></i>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/80 hover:underline hover:text-white transition"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Video */}
                    <div>
                        <h4 className="text-base font-bold pb-3 relative">Video</h4>
                        <video
                            controls
                            poster="/videos/udyam.png"
                            className="w-full rounded-lg overflow-hidden"
                        >
                            <source src="/videos/udyam.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-[#8577fb] py-6 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-4">

                    {/* Left-aligned Copyright */}
                    <div className="text-left">
                        <div className="text-sm">
                            © Copyright{" "}
                            <strong>
                                <span>Udyam Registration</span>
                            </strong>
                            . All Rights Reserved. Website Content Managed by Ministry of Micro
                            Small and Medium Enterprises, GoI
                        </div>
                        <div className="text-xs mt-1">
                            Website hosted &amp; managed by{" "}
                            <a
                                href="http://home.nic.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:underline"
                            >
                                National Informatics Centre
                            </a>
                            ,{" "}
                            <a
                                href="http://deity.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:underline"
                            >
                                Ministry of Communications and IT
                            </a>
                            ,{" "}
                            <a
                                href="http://india.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:underline"
                            >
                                Government of India
                            </a>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-2">
                        {[
                            ["twitter", "https://twitter.com/minmsme"],
                            ["facebook", "https://www.facebook.com/minmsme"],
                            ["instagram", "https://www.instagram.com/minmsme/"],
                        ].map(([name, url], i) => (
                            <a
                                key={i}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                            >
                                <i className={`bx bxl-${name} text-white text-lg`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
