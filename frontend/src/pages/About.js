import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
    <div className="dark:bg-gray-900 transition-colors duration-300 min-h-screen ">
      <Navbar />
      <section className="min-h-screen  flex items-center justify-center px-6 py-16 mt-5 mb-5">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center bg-white shadow-2xl rounded-3xl p-10">
          
          {/* Left: Image Section */}
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              alt="Smart Recipe Illustration"
              className="w-80 h-80 object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right: Text Section */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 mb-4">
              About <span className="text-rose-600">Smart Recipe</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Welcome to <span className="font-semibold text-red-500">Smart Recipe</span> — 
              your intelligent cooking companion! Our goal is to simplify your kitchen experience 
              using data-driven recipe suggestions, smart ingredient tracking, and personalized 
              meal recommendations powered by AI.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-rose-600 mb-2">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  To make cooking easier, healthier, and more enjoyable by combining 
                  smart technology with creativity in the kitchen. Whether you are a 
                  beginner or an expert, Smart Recipe helps you cook smarter — not harder.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-rose-600 mb-2">
                  Meet the Developer
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Hi, I'm Dheeraj Kumar. the creator of Smart Recipe — passionate about merging 
                  technology and gastronomy. This app represents my vision of how 
                  AI can transform daily life and make healthy eating accessible for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
};

export default About;
