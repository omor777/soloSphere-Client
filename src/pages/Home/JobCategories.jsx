import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "../../components/JobCard/JobCard";

const fetchJobData = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
    return data || []
  } catch (error) {
    console.error(error);
  }
};

const JobCategories = () => {
  const {
    isPending,
    isError,
    data: jobs,
    error,
  } = useQuery({
    queryKey: ["JOBS"],
    queryFn: fetchJobData,
  });

//   console.log(jobs);

  return (
    <div className="my-20">
      <h1 className="text-4xl font-bold text-center">
        Browse Jobs By Categories
      </h1>
      <p className="text-center mx-auto max-w-2xl mt-4 mb-8">
        Three categories available for the time being. They are Web Development,
        Graphics Design and Digital Marketing. Browse them by clicking on the
        tabs below.
      </p>
      {isPending ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-spinner text-secondary loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center">
          <span className="text-center text-error">Error: {error.message}</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Tabs>
            <TabList>
              <Tab>Web Development</Tab>
              <Tab>Graphics Design</Tab>
              <Tab>Digital Marketing</Tab>
            </TabList>

            <TabPanel>
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {jobs
                  ?.filter((job) => job.category === "Web Development")
                  .map((job) => (
                    <JobCard job={job} key={job._id} />
                  ))}
              </div>
            </TabPanel>
            <TabPanel>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {jobs
                  ?.filter((job) => job.category === "Graphics Design")
                  .map((job) => (
                    <JobCard job={job} key={job._id} />
                  ))}
              </div>
            </TabPanel>
            <TabPanel>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {jobs
                  ?.filter((job) => job.category === "Digital Marketing")
                  .map((job) => (
                    <JobCard job={job} key={job._id} />
                  ))}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default JobCategories;
