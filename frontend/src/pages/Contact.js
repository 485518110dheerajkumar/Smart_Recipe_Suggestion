import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We’ll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="dark:bg-gray-900 transition-colors duration-300 min-h-screen ">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 py-16 mt-5 mb-5">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-3xl p-10">

          {/* Left Side: Illustration */}
          <div className="flex justify-center items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
              alt="Contact illustration"
              className="w-80 h-80 object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right Side: Contact Form */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-extrabold text-red-500 mb-4 text-center md:text-left">
              Get in Touch
            </h1>
            <p className="text-gray-600 mb-8 text-center md:text-left">
              Have questions, feedback, or suggestions? We’d love to hear from you!  
              Fill out the form below, and we’ll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all duration-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
};

export default Contact;
