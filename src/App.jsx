import React from "react";
import HeroSection from "./component/herosection";
import { Frame, Frame1, Frame2 } from "./assets/Route/mainAssetRoute";

function App() {
  return (
    <div className="flex items-center justify-center w-full md:p-9 ">
      <div className="flex flex-col max-w-[100%] items-center justify-center text-center px-4">
        <div className="absolute hidden md:block top-[100px] right-[220px]">
          <img src={Frame} alt="" srcset="" />
        </div>
        <div className="absolute hidden md:block bottom-30 right-20 ">
          <img src={Frame1} alt="" srcset="" />
        </div>

        <div className=" lg:ml-[-580px] lg:w-full w-[50px] ">
          <img src={Frame2} alt="" srcset="" className="" />
        </div>

        <h1 className=" text-[32px] md:text-[42px]  lg:text-[96px] font-sans font-[700] lg:mb-10">
          Learn At Your Own Pace.<br className="hiddin lg:block "></br>
          Anywhere, Anytime
        </h1>

        <HeroSection />
        <h2 className=" lg:text-[20px]  text-center font-poppins font-[400] mt-10 sm:mt-[300px] ">
          Join interactive live classes with expert instructors. Access recorded
          sessions, get personalized <br></br> feedback, and advance your skills
          in real-time with flexible learning built around your life,<br></br>{" "}
          master new skills on your schedule, from wherever you are.
        </h2>

        <div className="flex md:flex-nowrap flex-wrap justify-center mt-10 lg:mt-4 gap-6">
          <button className="bg-black rounded-full text-white shadow-sm py-4 px-16   shadow-[#1414149f] ">
            Join For Free
          </button>

          <button className="bg-white rounded-full shadow-sm py-4 px-16  shadow-[#1414149f] ">
            Explore Class
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
