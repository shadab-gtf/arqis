"use client";
import CommonHeading from "@/utils/CommonHeading";
import React, { useState } from "react";
import Image from "next/image";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

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
      newErrors.email = "Phone number is required";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div className="lg:pt-0 pt-[50px]">
      <CommonHeading
        customClass={`text-[#FFD38F]`}
        heading={`Step Into Your Future`}
      />
      <form className="mt-[30px]" onSubmit={handleSubmit}>
        <div className="input-container mb-[15px]">
          <input
            className={`bg-[#fff] w-[100%] placeholder:uppercase py-[15px] px-[20px] placeholder:text-[#000] ${
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
            className={`bg-[#fff] w-[100%] placeholder:uppercase py-[15px] px-[20px] placeholder:text-[#000] ${
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
            className={`bg-[#fff] w-[100%] placeholder:uppercase py-[15px] px-[20px] placeholder:text-[#000] ${
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
          <select
            className={`bg-[#fff] w-[100%] placeholder:uppercase py-[15px] px-[20px] placeholder:text-[#000] ${
              errors.phone ? "border-red-500" : ""}`}
            placeholder="phone number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          >
            <option value={"1 Year"}>1 Year</option>
            <option value={"2 Year"}>2 Year</option>
            <option value={"3 Year"}>3 Year</option>
          </select>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="input-container mb-[15px]">
          <input
            className={`bg-[#fff] w-[100%] placeholder:uppercase py-[15px] px-[20px] placeholder:text-[#000] ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Message"
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

         <div className="input-container mb-[15px]">
          <input
            className={`bg-[#fff] w-[100%] placeholder:uppercase py-[15px] px-[20px] placeholder:text-[#000] ${
              errors.message ? "border-red-500" : ""
            }`}
            placeholder="Message"
            type="file"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className="input-container inline-flex pt-[15px]">
          <button type="submit" className="uppercase  tracking-[1.2] text-white cursor-pointer">
            Submit Now
          </button>
          <Image
            src={`/assets/icons/arrow-tilt-white.png`}
            className="me-10 objrct-contain"
            alt="arrow title"
            height={35}
            width={35}
          />
        </div>
      </form>
    </div>
  );
}
