import { Link } from "react-router-dom";
import React from "react";
import "../app.css";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    employmentType,
    jobDescription,
  } = data;

  return (
    <>
      <section className="card">
        <Link
          to={`/job/${_id}`}
          className="flex gap-4 flex-col sm:flex-row items-start"
        >
          <div className="w-45 h-45 overflow-hidden rounded-lg border">
            <img
              src={companyLogo}
              className="w-full h-full object-cover"
              alt="companyLogo"
            />
          </div>
          <div>
            <h4 className="text-primary mb-1">{companyName}</h4>
            <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2">
                <FiMapPin />
                {jobLocation}
              </span>
              <span className="flex items-center gap-2">
                <FiClock />
                {employmentType}
              </span>
              <span className="flex items-center gap-2">
                <FiDollarSign />
                {minPrice}-{maxPrice}k
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar />
                {postingDate}
              </span>
            </div>
            <p className="text-base text-primary/70 ">{jobDescription}</p>
          </div>
        </Link>
      </section>
    </>
  );
};

export default Card;
