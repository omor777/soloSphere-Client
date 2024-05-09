import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const fetchJobData = async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/jobs/s/${id}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const JobDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: localStorage.getItem("userEmail") || "",
    },
  });

  const { id } = useParams();

  const { isPending, data: job } = useQuery({
    queryKey: ["SINGLE_JOB"],
    queryFn: () => fetchJobData(id),
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-3xl text-center font-bold">Loading...</span>
      </div>
    );
  }

  const {
    _id,
    deadline,
    job_title,
    category,
    description,
    min_price,
    max_price,
    buyer,
  } = job ?? {};
  // console.log(job);

  const handleBidJob = async (data) => {
    const { price, comment, email } = data;

    if (email === buyer?.email) {
      return toast.error("Action not permitted!");
    }

    if (min_price > parseFloat(price)) {
      return toast.error("Offer more or at least minimum price");
    }

    const deadline = startDate;

    const bidJob = {
      jobId: _id,
      price: parseInt(price),
      deadline,
      comment,
      job_title,
      category,
      email,
      buyer_email: buyer?.email,
      status: "Pending",
      buyer,
    };

    // console.log(bidJob);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bids`,
        bidJob
      );
      if (data.insertedId) {
        navigate('/my-bids')
        toast.success("Bid successful");
      }
    } catch (error) {
      toast.error('You already applied this job')
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline: {new Date(deadline).toLocaleDateString()}
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {job_title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">Name: {buyer.name}</p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {buyer.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src="" alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit(handleBidJob)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                {...register("price")}
                id="price"
                type="text"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            {/* jfldfjldfjdlfjdlfjdfldjfldfjdlfdl */}
            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                {...register("email")}
                id="emailAddress"
                type="email"
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                {...register("comment")}
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
