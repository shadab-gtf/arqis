"use client"
import CommonHeading from "@/utils/CommonHeading";
import React, { useState } from "react";
import Image from "next/image";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function Form() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const validateForm = () => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";  
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormData(initialFormData);
      setErrors({});
    }
  };

  return (
    <div className="custom-container">
      <CommonHeading
        customClass={`text-[#FFD38F]`}
        heading={`Exploring Queries, Fueling Solutions`}
      />
      <form className="mt-[25px]" onSubmit={handleSubmit}>
        <div className="input-container mb-[15px]">
          <input
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="input-container mb-[15px]">
          <input
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="mail id"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="input-container mb-[15px]">
          <input
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="phone number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="input-container mb-[15px]">
          <textarea 
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] resize-vertical ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4} 
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className="input-container inline-flex pt-[15px]">
          <button
            type="submit"
            className="uppercase text-white cursor-pointer" 
          >
            Submit Now
          </button>
          <Image
            src={`/assets/icons/arrow-tilt-white.png`}
            className="me-10 object-contain"  
            alt="arrow title"
            height={35}
            width={35}
          />
        </div>
      </form>
      <div className="relative mt-[80px]">
        <div className="overlay-container absolute top-0 left-0 h-[100%] w-[100%] bg-[#1131207d]"></div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2645145.4820160638!2d6.537027373847533!3d49.651475074050936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sarqis!5e0!3m2!1sen!2sin!4v1759478016585!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        className="w-[100%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
    </div>
  );
}
