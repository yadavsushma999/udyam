-- CreateTable
CREATE TABLE "public"."Registration" (
    "id" TEXT NOT NULL,
    "aadhaarNumber" VARCHAR(12) NOT NULL,
    "nameOnAadhaar" TEXT NOT NULL,
    "mobileNumber" VARCHAR(10) NOT NULL,
    "declaration" BOOLEAN NOT NULL DEFAULT false,
    "otpVerified" BOOLEAN NOT NULL DEFAULT false,
    "panNumber" VARCHAR(10),
    "panHolderName" TEXT,
    "dobOrDoi" TIMESTAMP(3),
    "typeOfOrg" INTEGER,
    "consent" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Registration_aadhaarNumber_idx" ON "public"."Registration"("aadhaarNumber");

-- CreateIndex
CREATE INDEX "Registration_panNumber_idx" ON "public"."Registration"("panNumber");
