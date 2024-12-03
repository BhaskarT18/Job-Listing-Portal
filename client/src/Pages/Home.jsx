import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter jobs by title
  // Filter jobs by title and category
const filteredItem = jobs.filter((job) => {
  const jobTitle = job.jobTitle || "";       // Fallback to an empty string if undefined
  const jobLocation = job.jobLocation || ""; // Fallback to an empty string if undefined
  
  return (
    jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
    (!selectedCategory || jobLocation.toLowerCase() === selectedCategory.toLowerCase())
  );
});


  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };
  // calculate the index of the first and last item
  const calculatePageRange = () => {
    const start = (currentPage - 1) * itemPerPage;
    const end = start + itemPerPage;
    return { start, end };
  };
  // function for next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItem.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // function for previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const filterData = (jobs, selected, query) => {
    if (!jobs.length) return [];

    let filterJobs = jobs;

    if (query) {
      filterJobs = filteredItem;
    }

    if (selected) {
      filterJobs = filterJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          return (
            jobLocation.toLowerCase() === selected.toLowerCase() ||
            parseInt(maxPrice) === parseInt(selected) ||
            postingDate >= selected || experienceLevel.toLowerCase() === selected.toLowerCase() ||
            salaryType.toLowerCase() === selected.toLowerCase() ||
            employmentType.toLowerCase() === selected.toLowerCase()
          );
        }
      );
    }
    //slice the data based on current page
    const { start, end } = calculatePageRange();
    filterJobs = filterJobs.slice(start, end);

    return filterJobs.map((data, index) => <Card key={index} data={data} />);
  };
  const result = filterData(jobs, selectedCategory, query);

  return (
    <>
      <div>
        {/* main content */}
        <Banner query={query} handleInputChange={handleInputChange} />
        <div className="bg-[#f5f1f1ec] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
          {/* left side */}
          <div className="bg-white p-4 rounded">
            <Sidebar handleChange={handleChange} handleClick={handleClick} />
          </div>

          {/* job card */}
          <div className="col-span-2 bg-white p-4 rounded-sm">
            {isLoading ? (
              <p>Loading..</p>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <>
                <h3>{result.length} jobs</h3> <p>No data found</p>
              </>
            )}

            {/* {pagination here} */}
            {result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-4">
                <button onClick={previousPage} disabled={currentPage===1} className="hover:underline">previous</button>
                <span className="mx-2">
                  page {currentPage} of{" "}
                  {Math.ceil(filteredItem.length / itemPerPage)}{" "}
                </span>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(filteredItem.length / itemPerPage)
                  }
                  className="hover:underline"
                >
                  next
                </button>
              </div>
            ) : (
              " "
            )}
          </div>

          {/* right side */}
          <div className=" bg-white p-4 rounded"><Newsletter/></div>
        </div>
      </div>
    </>
  );
};

export default Home;
