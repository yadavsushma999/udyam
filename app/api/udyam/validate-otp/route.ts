import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const { otp, otpSessionId } = await req.json();

    if (!otp || !otpSessionId) {
        return NextResponse.json(
            { message: "Missing OTP or session ID" },
            { status: 400 }
        );
    }

    // Find matching registration
    const registration = await prisma.registration.findFirst({
        where: { otpSessionId },
    });

    if (!registration) {
        return NextResponse.json(
            { message: "Invalid session. Please restart verification." },
            { status: 400 }
        );
    }

    // Check expiry
    if (registration.otpExpiry && new Date(registration.otpExpiry) < new Date()) {
        return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    // Check OTP
    if (registration.otpCode !== otp) {
        return NextResponse.json({ message: "Incorrect OTP,Re-enter correct OTP" }, { status: 400 });
    }

    // Mark as verified
    await prisma.registration.update({
        where: { id: registration.id },
        data: { otpVerified: true },
    });

    return NextResponse.json({
        message: "Your Aadhaar has been successfully verified. You can continue Udyam Registration process.",
    });
}
