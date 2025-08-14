import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { aadhaarNumber, entrepreneurName, declaration } = body;

        if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
            return NextResponse.json(
                { errors: { aadhaarNumber: ["Invalid Aadhaar number. Must be exactly 12 digits."] } },
                { status: 400 }
            );
        }


        const invalidDemoNumbers = ["123412341234", "999999999999", "000000000000"];
        if (invalidDemoNumbers.includes(aadhaarNumber)) {
            return NextResponse.json(
                { errors: 
                    { 
                        aadhaarNumber: [ " 1)There is error in Aadhaar Validation/Authentication.", "Error Code: 998", "2) Your Aadhaar has not been validated hence you cannot register Udyam.", "3) Please Visit Your Nearest Aadhaar Enrolment Centre" ] 
                    } 
                }, { status: 400 }
            );
        }

        if (Math.random() < 0.15) {
            return NextResponse.json(
                { errors: { aadhaarNumber: ["Aadhaar server is temporarily unavailable. Please try again later."] } },
                { status: 503 }
            );
        }

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpSessionId = `OTP-${Date.now()}`;
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

        const registration = await prisma.registration.create({
            data: {
                aadhaarNumber,
                nameOnAadhaar: entrepreneurName,
                declaration,
                otpVerified: false,
                otpSessionId,
                otpCode, 
                otpExpiry,
            },
        });

        return NextResponse.json({
            message: "OTP Sent Successfully (Demo)",
            otp: otpCode, 
            otpSessionId,
            registrationId: registration.id,
            expiry: otpExpiry.toISOString(),
        });

    } catch (error) {
        console.error("Aadhaar validation error:", error);
        return NextResponse.json(
            { errors: { general: ["Internal server error. Please try again."] } },
            { status: 500 }
        );
    }
}
