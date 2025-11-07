import React, { useState, useEffect } from "react";
import {
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
} from "../assets/Route/mainAssetRoute";

// Probably overcomplicated but hey, it works.
export default function HeroSection() {
  const [activeImg, setActiveImg] = useState(0);
  const [screen, setScreen] = useState("lg");

  // List of images (maybe too many props but easier to tweak later)
  const gallery = [
    { src: Image1, rotate: -12, left: -220, top: 20, price: "$479", title: "Advanced Design Class" },
    { src: Image2, rotate: -6, left: -80, top: -10, price: "$569", title: "Product Design Class" },
    { src: Image3, rotate: -3, left: 40, top: -40, price: "$398", title: "Advanced Product Design Class" },
    { src: Image6, rotate: 12, left: 180, top: -25, price: "$199", title: "Advanced Product Design" },
    { src: Image4, rotate: 6, left: 290, top: 0, price: "$299", title: "Advanced Product Design Class" },
    { src: Image5, rotate: 17, left: 430, top: 35, price: "$809", title: "Advanced Product Design Class" },
  ];

  // Handle screen resizing
  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      if (width < 640) setScreen("sm");
      else if (width < 1024) setScreen("md");
      else setScreen("lg");
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  // Rotate images automatically (1s feels fast but user didn’t say)
  useEffect(() => {
    let idx = activeImg;
    const id = setInterval(() => {
      idx = (idx + 1) % gallery.length;
      setActiveImg(idx);
    }, 1000);
    return () => clearInterval(id);
  }, [activeImg, gallery.length]);

  const handlePick = (i) => {
    if (i !== activeImg) setActiveImg(i); // avoid re-setting
  };

  // previous and next helpers
  const prev = (activeImg - 1 + gallery.length) % gallery.length;
  const next = (activeImg + 1) % gallery.length;

  const renderOverlay = (item) => (
    <div className="flex items-center flex-col text-center">
      <div className="flex">
        <p className="text-[12px] text-start">{item.title}</p>
        <h1 className="font-bold text-[12px] whitespace-nowrap ml-1">{item.price}</h1>
      </div>
      <button className="bg-white mt-2 font-bold text-black rounded-full shadow-sm py-2 px-6 whitespace-nowrap text-[12px] shadow-[#1414149f]">
        Explore Class
      </button>
    </div>
  );

  return (
    <div
      className={`relative flex justify-center mt-10 ${
        screen === "lg" ? "-ml-[400px]" : ""
      }`}
    >
      {gallery.map((item, i) => {
        const isActive = i === activeImg;

        // For small screens, only one image makes sense.
        if (screen === "sm") {
          if (!isActive) return null;
          return (
            <div
              key={i}
              className="relative flex justify-center items-center transition-all duration-700 cursor-pointer rounded-xl shadow-md"
              style={{
                width: 250,
                height: 250,
                backgroundImage: `url(${item.src})`,
                backgroundSize: "center", // changed from center, looks better imo
                backgroundPosition: "center",
                transform: "scale(1.05)",
              }}
              onClick={() => handlePick(i)}
            >
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white rounded-lg px-4 py-2 text-sm">
                {renderOverlay(item)}
              </div>
            </div>
          );
        }

        // Medium screens: 3 images visible
        if (screen === "md") {
          const isPrev = i === prev;
          const isNext = i === next;
          if (![isPrev, isActive, isNext].includes(true)) return null;

          let transformClass = "";
          if (isPrev) transformClass = "translate-x-[-120%] scale-90 opacity-70";
          else if (isNext) transformClass = "translate-x-[120%] scale-90 opacity-70";
          else transformClass = "translate-x-0 scale-110 opacity-100";

          return (
            <div
              key={i}
              className={`absolute transition-all duration-700 cursor-pointer rounded-xl border shadow-md transform ${transformClass}`}
              style={{
                width: isActive ? 250 : 200,
                height: isActive ? 250 : 200,
                backgroundImage: `url(${item.src})`,
                backgroundSize: "center",
                backgroundPosition: "center",
                zIndex: isActive ? 99 : 10,
              }}
              onClick={() => handlePick(i)}
            >
              {isActive && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ffffff44] text-white rounded-lg px-2 py-2 text-sm">
                  {renderOverlay(item)}
                </div>
              )}
            </div>
          );
        }

        // Big screens get the layered mess (fun part)
        return (
          <div
            key={i}
            className="absolute border cursor-pointer rounded-xl transition-all duration-500"
            style={{
              left: item.left,
              top: item.top,
              zIndex: isActive ? 99 : i + 1,
              width: isActive ? 250 : 200,
              height: isActive ? 250 : 200,
              backgroundImage: `url(${item.src})`,
              backgroundSize: "center",
              backgroundPosition: "center",
              transform: isActive
                ? "rotate(0deg) scale(1.1)"
                : `rotate(${item.rotate}deg) scale(1)`,
            }}
            onClick={() => handlePick(i)}
          >
            {isActive && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ffffff65] text-white rounded-lg px-4 py-2 transition-opacity duration-500" style={{ width: "70%" }}>
                {renderOverlay(item)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
