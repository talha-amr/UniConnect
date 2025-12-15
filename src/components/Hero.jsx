import React from 'react';

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#1A2641] flex items-center justify-center py-[6rem]  md:py-[7vw]">
      <div className="my-container w-full">
        {/* Main Hero Card */}
        <div className="bg-[#FFFFFF] rounded-3xl p-8  md:p-12 relative overflow-hidden">
          {/* Speech Bubble Tail */}
          
          {/* Content Container */}
          <div className="text-center space-y-6">
            {/* People Illustration */}
            <div className="flex justify-center items-end mb-8">
              <img 
                src="/src/images/people.png" 
                alt="People illustration" 
                className="h-32 md:h-40 lg:h-48 object-contain"
              />
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2641] tracking-tight">
              WELCOME TO UNICONNECT
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600">
              Your Campus, Your Voice. Simplified.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button className="bg-[#F4B942] hover:bg-[#E5A832] text-[#1A2641] font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
                SUBMIT A COMPLAINT
              </button>
              <button className="bg-[#2A3B5C] hover:bg-[#3A4B6C] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
                TRACK STATUS
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* Easy Submission */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#1A2641] rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1A2641]">Easy Submission</h3>
            <p className="text-gray-600 text-sm">
              Easy to send complaint to and entry submission to progress.
            </p>
          </div>

          {/* Real-time Tracking */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#1A2641] rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1A2641]">Real-time Tracking</h3>
            <p className="text-gray-600 text-sm">
              Trackers power real-time tracking tracking and management.
            </p>
          </div>

          {/* Anonymous Option */}
          <div className="bg-[#FFFFFF] rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-[#1A2641] rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1A2641]">Anonymous Option</h3>
            <p className="text-gray-600 text-sm">
              Anonymous option and compose to fulfill University of seniors.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            © 2025 UniConnect. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;