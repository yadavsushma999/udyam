import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { otpSessionId, pan, panHolderName, dob, typeOfOrg, consent } = await req.json();

        // Basic required fields check
        if (!otpSessionId || !typeOfOrg) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Convert typeOfOrg to number safely
        const orgTypeNumber = parseInt(typeOfOrg, 10);
        if (isNaN(orgTypeNumber)) {
            return NextResponse.json(
                { message: "Invalid typeOfOrg value" },
                { status: 400 }
            );
        }

        // Convert dob to Date safely (null if invalid)
        let dobDate: Date | null = null;
        if (dob && dob.trim() !== "") {
            const parsedDate = new Date(`${dob}T00:00:00`);
            if (!isNaN(parsedDate.getTime())) {
                dobDate = parsedDate;
            }
        }

        // PAN duplicate check (only if provided)
        if (pan && pan.trim() !== "") {
            const existingPan = await prisma.registration.findFirst({
                where: { panNumber: pan.toUpperCase() },
            });

            if (existingPan) {
                return NextResponse.json(
                    {
                        alreadyExists: true,
                        message: "Udyam Registration has already been done through this PAN.",
                        note: "The enterprises having exports and wanting to avail of the benefits accruing to the MSME sector must provide their PAN. Having PAN would be made mandatory even otherwise for all, with effect from 01.04.2021."
                    },
                    { status: 409 }
                );
            }
        }

        // Update registration record
        const updated = await prisma.registration.updateMany({
            where: { otpSessionId, otpVerified: true },
            data: {
                panNumber: pan && pan.trim() !== "" ? pan.toUpperCase() : null,
                panHolderName: panHolderName || null,
                dobOrDoi: dobDate,
                typeOfOrg: orgTypeNumber,
                consent: !!consent
            },
        });

        if (updated.count === 0) {
            return NextResponse.json(
                { message: "No matching verified session found" },
                { status: 404 }
            );
        }

        // Success response
        return NextResponse.json({
            message:
                "Your PAN has been successfully verified. Some fields of the form will be disabled. Disabled fields will be automatically filled after verification from PAN data. GSTIN"
        });

    } catch (error) {
        console.error("Save PAN Error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
