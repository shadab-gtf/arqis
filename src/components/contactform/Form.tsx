"use client"
import CommonHeading from "@/utils/CommonHeading";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  agreeToTerms: boolean;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  agreeToTerms: false,
};

export default function Form() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const checkRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (formData.agreeToTerms) {
      gsap.fromTo(
        checkRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(checkRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
  }, [formData.agreeToTerms]);

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
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] ${errors.name ? "border-red-500" : ""
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
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] ${errors.email ? "border-red-500" : ""
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
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] ${errors.phone ? "border-red-500" : ""
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
            className={`bg-[#fff] w-[100%] placeholder:uppercase placeholder:text-sm py-[15px] px-[20px] placeholder:text-[#000] resize-vertical ${errors.message ? "border-red-500" : ""
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

        <div className="flex gap-3 items-start mt-4 mb-6 cursor-pointer group" onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}>
          <div className="relative flex items-center justify-center w-5 h-5 border border-white/30 group-hover:border-white/60 transition-colors shrink-0 mt-1">
            <input
              type="checkbox"
              className="hidden"
              checked={formData.agreeToTerms}
              readOnly
            />
            <svg
              ref={checkRef}
              className="w-4 h-4 text-[#FFD38F] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-white text-[12px] leading-[1.6] opacity-80 select-none">
            I authorize company representatives to Call, SMS, Email, RCS or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
          </p>
        </div>

        <div className="input-container submit-btn inline-flex pt-[15px]">
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
      <div className="relative mt-[40px] md:mt-[80px]">
        <div className="overlay-container absolute top-0 left-0 h-[100%] w-[100%] bg-[#1131207d]"></div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8547.008683927574!2d77.39223358218186!3d28.508260165814473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce885cca2777d%3A0x1560d3a299adc010!2sGulshan%20One29!5e0!3m2!1sen!2sin!4v1773809691700!5m2!1sen!2sin"
          style={{ border: 0 }}
          allowFullScreen
          className="w-[100%] h-[300px] md:h-[450px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
