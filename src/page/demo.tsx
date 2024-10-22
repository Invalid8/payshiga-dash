import React from "react";
import DemoVideo from "@/assets/demo.mp4";

const DemoVideoPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Demo Video</h1>
      <div className="w-full max-w-3xl">
        <video
          className="w-full h-auto"
          controls
          src={DemoVideo} // Replace with your actual video URL
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default DemoVideoPage;
