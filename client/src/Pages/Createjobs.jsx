import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const Createjobs = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data); // To check the submitted form data
    fetch("http://localhost:8000/add-job", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Moved `body` outside of `headers`
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result); // Log the result or handle it as needed
        if (result.acknowledged === true) {
          alert("Job Added Successfully");
        }

        reset();
      })
      .catch((error) => {
        console.error("Error:", error); // Optional: catch any errors
      });
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "Nodejs", label: "Nodejs" },
    { value: "React", label: "React" },
    { value: "Express", label: "Express" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Java", label: "Java" },
    { value: "Redux", label: "Redux" },
  ];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* {form} */}
      <div className="bg-[#fafafa] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* {first row} */}
          <div className="create-job-flex">
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={"Web developer"}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* {Second row} */}
          <div className="create-job-flex">
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary </label>
              <input
                type="text"
                placeholder="$120k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* {3rd row} */}
          <div className="create-job-flex">
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* {4rd row} */}
          <div className="create-job-flex">
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex: 2024-10-24"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Select your experience</option>
                <option value="No Experience">Fresher</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* {5rd row} */}
          <div className="create-job-flex">
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Require Skill Sets</label>
              <CreatableSelect
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
                className="create-job-input"
              />
            </div>
          </div>

          {/* {6rd row} */}
          <div className="create-job-flex">
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo url Ex: https://example.com"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg-:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value="">Select your type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* {7rd row} */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="create-job-input pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Write your job description"
              {...register("jobDescription")}
            />
          </div>

          {/* last row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="text"
              className="create-job-input"
              placeholder="your mail"
              {...register("postedBy")}
            />
          </div>

          <input
            type="submit"
            className="block bg-blue mt-12 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Createjobs;
