import React, { useState, useRef, useEffect } from "react";

const initialFormState = {
  name: "",
  lastName: "",
  email: "",
  message: "",
  inquiryType: "", // radio
  consent: false, // checkbox
};

const initialErrors = {
  name: "",
  lastName: "",
  email: "",
  message: "",
  inquiryType: "",
  consent: "",
};

function ContactForm() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [success, setSuccess] = useState(false);
  const [ariaLiveMessage, setAriaLiveMessage] = useState("");
  const successTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const validate = () => {
    const newErrors = { ...initialErrors };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Lastname is required.";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
      valid = false;
    }

    if (!form.inquiryType) {
      newErrors.inquiryType = "Please select an inquiry type.";
      valid = false;
    }

    if (!form.consent) {
      newErrors.consent = "You must consent before submitting.";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      const errorMessages = Object.values(newErrors)
        .filter(Boolean)
        .join(" ");
      setAriaLiveMessage(errorMessages);
    } else {
      setAriaLiveMessage("");
    }

    return valid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setForm(initialFormState);
      setAriaLiveMessage("Form submitted successfully.");

      successTimeoutRef.current = setTimeout(() => {
        setSuccess(false);
        setAriaLiveMessage("");
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-greenLight flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-greenMedium relative"
        aria-describedby="form-status"
      >
        <h1 className="text-3xl font-semibold mb-6 text-graydark">
          Contact Us
        </h1>
        {/* Name */}
        <div className="flex mb-6">
        <div className="w-1/2 pr-2 flex flex-col">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            Name <span className="text-greenMedium">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full rounded-md border px-3 py-2 text-graydark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenMeduim focus:border-greenMeduim ${errors.name
                ? "border-red-600 focus:ring-red-600"
                : "border-graylight"
              }`}
            placeholder="Your name"
            tabIndex={1}
            required
          />
          {errors.name && (
            <p
              id="name-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.name}
            </p>
          )}
          </div>
          <div className="w-1/2 pl-2 flex flex-col">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-medium mb-1"
          >
            LastName <span className="text-greenMedium">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            aria-invalid={errors.lastName ? "true" : "false"}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={`w-full rounded-md border px-3 py-2 text-graydark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenMeduim focus:border-greenMeduim ${errors.lastName
                ? "border-red-600 focus:ring-red-600"
                : "border-graylight"
              }`}
            placeholder="Your LastName"
            tabIndex={2}
            required
          />
          {errors.lastName && (
            <p
              id="lastName-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.lastName}
            </p>
          )}
          </div>
          </div>

        <div className="mb-6">
          {/* Email */}
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email <span className="text-greenMedium">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full rounded-md border px-3 py-2 text-graydark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenMeduim focus:border-greenMeduim ${errors.email
                ? "border-red-600 focus:ring-red-600"
                : "border-graylight"
              }`}
            placeholder="you@example.com"
            tabIndex={3}
            required
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Inquiry Type (Radio) */}
        <fieldset className="mb-5">
          <legend className="block text-gray-700 font-medium mb-1">
            Query Type <span className="text-greenMedium">*</span>
          </legend>
          <div className="flex flex-col justify-between w-full gap-2 lg:flex-row">

            <label
              htmlFor="general"
              className={`inline-flex items-center cursor-pointer w-full rounded-md border px-3 py-2 text-graydark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenMeduim focus:border-greenMeduim relative ${errors.email
                ? "border-red-600 focus:ring-red-600"
                : "border-graylight"
              }`}
            tabIndex={4}
            >
              <input
                type="radio"
                id="general"
                name="inquiryType"
                value="General Inquiry"
                checked={form.inquiryType === "General Inquiry"}
                onChange={handleChange}
                aria-invalid={errors.inquiryType ? "true" : "false"}
                aria-describedby={
                  errors.inquiryType ? "inquiryType-error" : undefined
                }
            className={`form-radio peer hidden `}
                required
              />
              <img src="/images/icon-radio-selected.svg"  className="absolute top-[30%] left-1 size-4 peer-checked:block hidden peer-checked:opacity-100 " />
              <div className="size-4 border-1 rounded-full absolute top-[30%] left-2 peer-checked:opacity-0"></div>
              <span className="ml-5 text-graydark">General Inquiry</span>
            </label>

            <label
              htmlFor="support"
              className={`inline-flex items-center cursor-pointer w-full rounded-md border px-3 py-2 text-graydark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenMeduim focus:border-greenMeduim relative ${errors.email
                ? "border-red-600 focus:ring-red-600"
                : "border-graylight"
              }`}
            tabIndex={5}
            >
              <input
                type="radio"
                id="support"
                name="inquiryType"
                value="Support Request"
                checked={form.inquiryType === "Support Request"}
                onChange={handleChange}
                aria-invalid={errors.inquiryType ? "true" : "false"}
                aria-describedby={
                  errors.inquiryType ? "inquiryType-error" : undefined
                }
                
            className={`form-radio peer hidden`}
                required
              />
              <img src="/images/icon-radio-selected.svg"  className="absolute top-[30%] left-2 size-4 peer-checked:block hidden peer-checked:opacity-100 " />
              <div className="size-4 border-1 rounded-full absolute top-[30%] left-1 peer-checked:opacity-0"></div>
              <span className="ml-5 text-graydark">Support Request</span>
            </label>
          </div>
          {errors.inquiryType && (
            <p
              id="inquiryType-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.inquiryType}
            </p>
          )}
        </fieldset>

        {/* Message */}
        <div className="my-6 ">
          <label
            htmlFor="message"
            className="block text-gray-700 font-medium mb-1"
          >
            Message <span className="text-greenMedium">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full rounded-md border px-3 py-2 text-graydark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-greenMeduim focus:border-greenMeduim resize-y ${errors.message
                ? "border-red-600 focus:ring-red-600"
                : "border-graylight"
              }`}
            placeholder="Write your message here..."
            tabIndex={6}
            required
          />
          {errors.message && (
            <p
              id="message-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div className="mb-6">
          <label
            htmlFor="consent"
            className="inline-flex items-center cursor-pointer text-graydark relative"
              tabIndex={7}
          >
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              aria-invalid={errors.consent ? "true" : "false"}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="form-checkbox text-greenMedium focus:ring-greenMeduim peer hidden"
              required
            />
            <img src="/images/icon-checkbox-check.svg" alt="Check Icon" 
            className="size-4 mr-3 absolute top-1 left-1 peer-checked:block hidden peer-checked:opacity-100" />
            <div
              className="size-4 mr-3 absolute top-1 left-1 border-1 peer-checked:opacity-0"></div>
            
            <span className="ml-6">
              I consent to being contacted by the team.
              <span className="text-greenMedium">*</span>
            </span>
          </label>
          {errors.consent && (
            <p
              id="consent-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {errors.consent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-greenMedium text-white font-semibold py-3 rounded-md hover:bg-[#0e8d74] focus:outline-none focus:ring-4 focus:ring-[#0e8d74] transition"
          tabIndex={8}
        >
          Send Message
        </button>

        {/* ARIA live region for announcements */}
        <div
          id="form-status"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {ariaLiveMessage}
        </div>

        {/* Success Toast */}
        {(success &&
          <div
            role="alert"
            aria-live="assertive"
            className="absolute top-6 right-6 bg-greenMedium text-white px-5 py-3 rounded-md shadow-lg animate-fadeIn "
          >
            Message sent successfully!
          </div>
        )}
      </form>
    </div>
  );
}

export default ContactForm;