"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      setFeedback("Email service is not configured. Please try again later.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const templateParams = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      time: new Date().toLocaleString(),
    };

    try {
      setStatus("sending");
      setFeedback("Sending your inquiry...");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFeedback("Your inquiry was sent successfully. We will contact you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Failed to send inquiry. Please try again after some time.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name *
        </label>
        <input type="text" name="name" required placeholder="Enter your full name" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address *
          </label>
          <input type="email" name="email" required placeholder="your@email.com" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
          </label>
          <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Service Required
        </label>
        <select name="service" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
          <option value="">Select a Service</option>
          <option>Website Development</option>
          <option>eCommerce Development</option>
          <option>Custom Web Application</option>
          <option>SEO Services</option>
          <option>Website Maintenance</option>
          <option>API Development</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Subject *
        </label>
        <input type="text" name="subject" required placeholder="Project Discussion" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Message *
        </label>
        <textarea name="message" rows={6} required placeholder="Tell us about your project or inquiry..." className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none" />
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" required className="mt-1" />
        <p className="text-sm text-slate-600">
          I agree to the Privacy Policy and consent
          to being contacted regarding my inquiry.
        </p>
      </div>
      <button type="submit" disabled={status === "sending"} className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition duration-300">
        {status === "sending" ? "Sending..." : "Send Inquiry"}
      </button>
      {status !== "idle" && (
        <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}
