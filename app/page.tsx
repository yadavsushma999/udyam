// pages/udyam-form.js
'use client';

import Footer from "@/components/footer";
import Header from "@/components/header";
import UdyamRegistrationForm from "@/components/main";
import { useState } from "react";

export default function UdyamForm() {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [entrepreneurName, setEntrepreneurName] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle validation and OTP generation logic here
    alert('Validate & Generate OTP clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
     <UdyamRegistrationForm/>
     <Footer/>
    </div>
  );
}
