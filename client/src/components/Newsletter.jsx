import React from "react";
import {
  FaEnvelopeOpenText,
  FaRocket,
} from "react-icons/fa6";

const Newsletter = () => {
  return (
    <div>
      {/* Newsletter Subscription Section */}
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className="text-black/75 text-base mb-4">
          Stay updated with the latest job opportunities delivered straight to your inbox. <br /> Subscribe to receive job alerts and career tips to help you land your next role faster.
        </p>
        <div className="w-full space-y-2">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value="Subscribe"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue text-white cursor-pointer rounded-sm font-semibold"
          />
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-black/75 text-base mb-4">
          Upload your resume to increase visibility among employers. Highlight your skills and achievements to stand out and get noticed by recruiters more quickly.
        </p>
        <div className="w-full space-y-2">
          <input
            type="submit"
            value="Upload your resume"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue text-white cursor-pointer rounded-sm font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
