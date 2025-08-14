// pages/udyam-form.js
'use client';

import Footer from "@/components/footer";
import Header from "@/components/header";
import UdyamRegistrationForm from "@/components/main";


export default function UdyamForm() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>
     <UdyamRegistrationForm/>
     <Footer/>
    </div>
  );
}
