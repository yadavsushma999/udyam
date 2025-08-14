"use client";

import { useState } from "react";
import { FormField } from "@/types/form";
import fields from "@/components/UdyamStep1.json";
import PanVerificationForm from "@/components/PanVerificationForm";

export default function UdyamRegistrationForm() {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [showPanForm, setShowPanForm] = useState(false);
    const [maskedNumber, setMaskedNumber] = useState("");
    const [successMessage, setSuccessMessage] = useState<string>("");


    const handleChange = (key: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: "" }));
        }
    };

    // In validateFields()
    const validateFields = () => {
        const newErrors: Record<string, string> = {};
        fields.forEach((field) => {
            if (field.required && !formData[field.key]?.toString().trim()) {
                if (field.type === "checkbox") {
                    newErrors[field.key] = "You must agree to declarations.";
                } else {
                    newErrors[field.key] = `Required`;
                }
            }
        });
        return newErrors;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setErrorMessages([]);
        setShowOtpBox(false);

        // Custom validation
        const newErrors = validateFields();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await fetch("/api/udyam/validate-aadhar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                const errs = Object.values(data.errors || {}).flat() as string[];
                setErrorMessages(errs);
            } else {
                // Store otpSessionId in local storage for OTP verification step
                localStorage.setItem("otpSessionId", data.otpSessionId);

                // For assignment/demo: show OTP in console (so you can test)
                alert(`Generated OTP (demo only): ${data.otp}`);
                setMessage(data.message);
                setMaskedNumber("1423"); // simulate masked number
                setShowOtpBox(true);
            }
        } catch {
            setErrorMessages(["Something went wrong. Please try again."]);
        }
    };

    const handleOtpValidation = async () => {
        const otpSessionId = localStorage.getItem("otpSessionId");
        try {
            const res = await fetch("/api/udyam/validate-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: formData.otp, otpSessionId }),
            });
            const data = await res.json();

            if (!res.ok) {
                setErrorMessages([data.message || "Invalid OTP."]);
            } else {
                setSuccessMessage(data.message);
                setShowOtpBox(false);
                setShowPanForm(true);
            }
        } catch {
            setErrorMessages(["OTP validation failed. Please try again."]);
        }
    };

    return (
        <main id="main" className="pt-[58px] bg-white min-h-screen">
            <section className="py-4 border-gray-200 mb-6 bg-[#f2f6f9]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-2xl md:text-3xl font-medium text-[#241b63]">
                        UDYAM REGISTRATION FORM - For New Enterprise not yet registered as MSME
                    </h2>
                </div>
            </section>

            <section className="container mx-auto px-4 max-w-6xl space-y-10">
                {/* Aadhaar Verification */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white border border-gray-300 rounded shadow">
                        <div className="bg-[#007bff] rounded-t p-4">
                            <h3 className="text-white text-lg font-normal">
                                Aadhaar Verification With OTP
                            </h3>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Input Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {fields
                                    .filter((f) => f.type !== "checkbox")
                                    .map((field: FormField) => (
                                        <div key={field.key} className="w-full">
                                            {field.label && (
                                                <label
                                                    htmlFor={field.key}
                                                    className="block mb-2 font-semibold text-gray-800"
                                                >
                                                    {field.label}
                                                </label>
                                            )}
                                            <input
                                                id={field.key}
                                                name={field.key}
                                                type={field.type}
                                                maxLength={field.maxlength}
                                                placeholder={field.placeholder}
                                                value={formData[field.key] || ""}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.currentTarget.value)
                                                }
                                                className={`w-full border rounded px-3 py-2 font-semibold focus:outline-none focus:ring-2 ${errors[field.key]
                                                    ? "border-blue-500 focus:ring-blue-500"
                                                    : "border-gray-300 focus:ring-blue-500"
                                                    }`}
                                            />
                                            {errors[field.key] && (
                                                <p className="mt-1 text-sm font-semibold text-red-500">
                                                    {errors[field.key]}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                            </div>

                            {/* Info List */}
                            <div className="text-gray-800 text-[16px] space-y-2 mt-4">
                                <ul className="list-disc pl-5">
                                    <li>Aadhaar number shall be required for Udyam Registration.</li>
                                    <li>
                                        The Aadhaar number shall be of the proprietor in the case of a
                                        proprietorship firm, of the managing partner in the case of a
                                        partnership firm and of a karta in the case of a Hindu Undivided
                                        Family (HUF).
                                    </li>
                                    <li>
                                        In case of a Company or a Limited Liability Partnership or a
                                        Cooperative Society or a Society or a Trust, the organisation or
                                        its authorised signatory shall provide its GSTIN and PAN along
                                        with its Aadhaar number.
                                    </li>
                                </ul>
                            </div>

                            {/* Checkbox Fields */}
                            {fields
                                .filter((f) => f.type === "checkbox")
                                .map((field: FormField) => (
                                    <div key={field.key} className="mt-4">
                                        <label className="inline-flex items-start space-x-2">
                                            <input
                                                id={field.key}
                                                type="checkbox"
                                                checked={!!formData[field.key]}
                                                onChange={(e) =>
                                                    handleChange(field.key, e.currentTarget.checked)
                                                }
                                                className="mt-1"
                                            />
                                            <span className="text-gray-900 text-[16px] break-words">
                                                {field.label}
                                            </span>
                                        </label>
                                        {errors[field.key] && (
                                            <p className="mt-1 text-[16px] font-extrabold text-red-600">
                                                {errors[field.key]}
                                            </p>
                                        )}
                                    </div>
                                ))}

                            {/* OTP Box */}
                            {showOtpBox && (
                                <div className="mt-6">
                                    <label
                                        htmlFor="otp"
                                        className="block mb-2 font-medium text-gray-800"
                                    >
                                        Enter OTP
                                    </label>
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        maxLength={6}
                                        placeholder="OTP Code"
                                        value={formData.otp || ""}
                                        onChange={(e) => handleChange("otp", e.currentTarget.value)}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-gray-600 text-sm mt-1">
                                        OTP sent to ******{maskedNumber.slice(-6)}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={handleOtpValidation}
                                        className="mt-3 bg-[#007bff] hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
                                    >
                                        Validate OTP
                                    </button>

                                    {/* Show OTP error below button */}
                                    {errorMessages.length > 0 && (
                                        <p className="text-red-600 text-[16px] font-extrabold mt-1">{errorMessages[0]}</p>
                                    )}

                                </div>
                            )}

                            {/* Submit Button */}
                            {!showOtpBox && !showPanForm && (
                                <div className="mt-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            className="bg-[#007bff] hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded"
                                        >
                                            Validate & Generate OTP
                                        </button>

                                        {errorMessages.length > 0 && (
                                            <span className="text-red-600 text-[16px] font-extrabold">
                                                {errorMessages[0]}
                                            </span>
                                        )}
                                    </div>

                                    {errorMessages.length > 1 && (
                                        <div className="mt-1 text-red-600 text-[16px] font-extrabold">
                                            {errorMessages.slice(1).map((err, idx) => (
                                                <div key={idx}>{err}</div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Feedback Messages */}
                            {successMessage && (
                                <p className="text-green-600 text-[16px] font-extrabold mt-1">{successMessage}</p>
                            )}


                        </div>
                    </div>
                </form>

                {/* PAN Verification */}
                {showPanForm && (
                    <div>
                        <PanVerificationForm />
                    </div>
                )}

                {/* Marquee */}
                <div className="mb-8 flex justify-center">
                    <div className="max-w-4xl w-full">
                        <div className="overflow-hidden whitespace-nowrap">
                            <div className="inline-block animate-marquee">
                                <a
                                    href="docs/OM_regarding_inclusion_of_Traders02072021.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#007bff] text-[15px] font-semibold"
                                >
                                    Activities (NIC codes) not covered under MSMED Act, 2006 for Udyam Registration
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
