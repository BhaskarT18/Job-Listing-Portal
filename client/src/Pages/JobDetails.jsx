import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeading";

const JobDetails = () => {
  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });

    if (url) {
      Swal.fire({
        icon: "success",
        title: `Entered URL: ${url}`,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  };
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    // fetch job details
    fetch(`http://localhost:8000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title="Single Job Details" />
      <h2>JobDetails: {id}</h2>
      <h3>Job Title : {job.jobTitle}</h3>
      <h3>Job Description : {job.jobDescription}</h3>
      <button
        className="bg-blue text-white px-4 py-2 rounded-md mt-4"
        onClick={handleApply}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
