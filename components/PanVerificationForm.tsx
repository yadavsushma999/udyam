import React, { useState } from "react";

interface PanForm {
    typeOfOrg: string;
    pan: string;
    panHolderName: string;
    dob: string;
    consent: boolean;
}

interface ServerError {
    message?: string;
    note?: string;
}

const PanVerification: React.FC = () => {
    const [form, setForm] = useState<PanForm>({
        typeOfOrg: "",
        pan: "",
        panHolderName: "",
        dob: "",
        consent: false,
    });

    const [successMessage, setSuccessMessage] = useState<string>("");
    const [serverError, setServerError] = useState<ServerError | null>(null);
    const [errors, setErrors] = useState<Record<keyof PanForm, string>>({
        typeOfOrg: "",
        pan: "",
        panHolderName: "",
        dob: "",
        consent: "",
    });
    const [isVerified, setIsVerified] = useState<boolean>(false);

    const orgTypes = [
        { value: "1", label: "1. Proprietary / एकल स्वामित्व" },
        { value: "2", label: "2. Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)" },
        { value: "3", label: "3. Partnership / पार्टनरशिप" },
        { value: "4", label: "4. Co-Operative / सहकारी" },
        { value: "5", label: "5. Private Limited Company / प्राइवेट लिमिटेड कंपनी" },
        { value: "6", label: "6. Public Limited Company / पब्लिक लिमिटेड कंपनी" },
        { value: "7", label: "7. Self Help Group / स्वयं सहायता समूह" },
        { value: "8", label: "8. Limited Liability Partnership / सीमित दायित्व भागीदारी" },
        { value: "9", label: "9. Society / सोसाइटी" },
        { value: "10", label: "10. Trust / ट्रस्ट" },
        { value: "11", label: "11. Others / अन्य" },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (errors[name as keyof PanForm]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name as keyof PanForm]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            setErrors((prev) => ({ ...prev, dob: "You cannot select a future date." }));
            setForm((prev) => ({ ...prev, [name]: "" }));
            return;
        }
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors.dob) setErrors((prev) => ({ ...prev, dob: "" }));
    };

    const handleSubmit = async () => {
        setServerError(null);
        setSuccessMessage("");

        const newErrors: Record<keyof PanForm, string> = {
            typeOfOrg: "",
            pan: "",
            panHolderName: "",
            dob: "",
            consent: "",
        };

        const typeVal = parseInt(form.typeOfOrg, 10);

        if (!form.typeOfOrg) newErrors.typeOfOrg = "Required";
        if (typeVal >= 2 && typeVal <= 11) {
            if (!form.pan.trim()) {
                newErrors.pan = "Required.";
            } else {
                const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                if (!panRegex.test(form.pan.toUpperCase())) {
                    newErrors.pan = "Invalid PAN format. Format should be ABCDE1234F.";
                }
            }
            if (!form.panHolderName.trim()) {
                newErrors.panHolderName = "Required.";
            }
            if (!form.dob) {
                newErrors.dob = "Required.";
            }
        }
        if (!form.consent) newErrors.consent = "You must give consent.";

        const hasErrors = Object.values(newErrors).some((val) => val !== "");
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            const otpSessionId = localStorage.getItem("otpSessionId");
            if (!otpSessionId) {
                alert("OTP session is missing. Please complete Aadhaar verification first.");
                return;
            }

            const res = await fetch("/api/udyam/save-pan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    otpSessionId,
                    pan: form.pan.toUpperCase(),
                    panHolderName: form.panHolderName,
                    dob: form.dob,
                    typeOfOrg: form.typeOfOrg,
                    consent: form.consent,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 409 && data.alreadyExists) {
                    setServerError({ message: data.message, note: data.note });
                } else {
                    setServerError({ message: data.message || "Failed to save PAN details." });
                }
            } else {
                setSuccessMessage(data.message);
                setIsVerified(true);
            }
        } catch (error) {
            console.error(error);
            setServerError({ message: "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="max-w-6xl border border-gray-300 shadow-md rounded-md bg-white">
            <div className="bg-green-600 rounded-t p-4">
                <h3 className="text-white text-lg font-normal">PAN Verification</h3>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-8 px-8">
                <div>
                    <label className="block text-[1rem] font-semibold text-gray-800 mb-1">
                        3. Type of Organisation / संगठन के प्रकार
                    </label>
                    <select
                        name="typeOfOrg"
                        value={form.typeOfOrg}
                        onChange={handleSelectChange}
                        disabled={isVerified}
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[1rem]"
                    >
                        <option value="">Type of Organisation / संगठन के प्रकार</option>
                        {orgTypes.map((org) => (
                            <option key={org.value} value={org.value}>
                                {org.label}
                            </option>
                        ))}
                    </select>
                    {errors.typeOfOrg && <p className="mt-1 text-[16px] font-extrabold text-red-600">{errors.typeOfOrg}</p>}
                </div>

                <div>
                    <label className="block text-[1rem] font-semibold text-gray-800 mb-1">4.1 PAN / पैन</label>
                    <input
                        type="text"
                        name="pan"
                        value={form.pan}
                        onChange={handleInputChange}
                        disabled={isVerified}
                        placeholder="ENTER PAN NUMBER"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[1rem]"
                    />
                    {errors.pan && <p className="mt-1 text-[16px] font-extrabold text-red-600">{errors.pan}</p>}
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 px-8">
                <div>
                    <label className="block text-[1rem] font-semibold text-gray-800 mb-1">
                        4.1.1 Name of PAN Holder / पैन धारक का नाम
                    </label>
                    <input
                        type="text"
                        name="panHolderName"
                        value={form.panHolderName}
                        onChange={handleInputChange}
                        disabled={isVerified}
                        placeholder="Enter Name"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[1rem]"
                    />
                    {errors.panHolderName && (
                        <p className="mt-1 text-[16px] font-extrabold text-red-600">{errors.panHolderName}</p>
                    )}
                </div>

                <div>
                    <label className="block text-[1rem] font-bold text-gray-800 mb-1">
                        4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निर्गमन तिथि
                    </label>
                    <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleDobChange}
                        disabled={isVerified}
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-[1rem]"
                    />
                    {errors.dob && <p className="mt-1 text-[16px] font-extrabold text-red-600">{errors.dob}</p>}
                </div>
            </div>

            {/* Consent */}
            <div className="flex items-start mb-5 px-8">
                <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={handleInputChange}
                    disabled={isVerified}
                    className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <p className="ml-2 text-[16px] text-gray-900">
                    I, the holder of the above PAN, hereby give my consent to Ministry of MSME...
                </p>
                {errors.consent && <p className="mt-1 text-[16px] font-extrabold text-red-600 ml-2">{errors.consent}</p>}
            </div>

            {/* Button */}
            <div className="px-8 pb-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isVerified}
                    className={`${isVerified ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        } text-white text-[1rem] font-medium px-4 py-2 rounded-sm shadow-sm`}
                >
                    PAN Validate
                </button>
            </div>

            {/* Error */}
            {serverError?.message && (
                <div className="px-8 pb-4">
                    <p className="text-red-600 font-bold">{serverError.message}</p>
                    {serverError.note && <p className="text-green-700 font-semibold mt-1">{serverError.note}</p>}
                </div>
            )}

            {/* Success */}
            {successMessage && (
                <div className="px-8 pb-6">
                    <p className="text-green-600 text-[16px] font-extrabold">
                        {successMessage} GSTIN (As per applicability of CGST Act 2017 and as notified by the ministry of MSME{" "}
                        <span className="text-blue-500 font-semibold">vide S.O. 1055(E) dated 05th March 2021</span>) is required
                        for Udyam Registration w.e.f. 01.04.2021. You are advised to apply for GSTIN suitably to avoid any
                        inconvenience.
                    </p>
                </div>
            )}
        </div>
    );
};

export default PanVerification;
