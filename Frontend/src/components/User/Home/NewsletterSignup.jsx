import React from "react";

export default function NewsletterSignup() {
  return (
    <div className="bg-gray-100 py-16 flex flex-col items-center mt-5">
      <h2 className="text-3xl font-bold mb-4">Want First Dibs?</h2>
      <p className="text-center text-gray-600 max-w-lg">
        Join our email list and be the first to know about new limited edition
        products, material innovations, and lots of other fun updates.
      </p>

      <div className="flex flex-col md:flex-row items-center mt-6 gap-4">
        <input
          type="email"
          placeholder="Enter Your Email Address"
          className="border-b-2 border-black bg-transparent py-2 px-4 text-gray-700
               placeholder-gray-400 focus:outline-none w-full md:w-auto border-0
               focus:border-2 focus:border-black"
        />
        <button className="bg-black text-white px-6 py-3 uppercase font-bold w-full md:w-auto">
          Sign Up
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-4">
        Note: You can opt-out at any time. See our{" "}
        <a href="#" className="text-black font-semibold underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="text-black font-semibold underline">
          Terms
        </a>
        .
      </p>
    </div>
  );
}
