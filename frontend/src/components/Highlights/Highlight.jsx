'use client';
import React, { useState } from "react";
import Image from "next/image";
import img1 from "../../assets/DMCSPORTS/7on7(1).jpg";
import img2 from "../../assets/DMCMIXER8/DMCMIXER20.jpg";
import img3 from "../../newassest/suitday.jpg";
import img4 from "../../assets/GBMs/GBM 2 DMCxVACU 10-15-25-20.png";
import img5 from "../../assets/IntershipWorkshop/IntWork20.png";
import img6 from "../../assets/DMCSPORTS/DSC01192.jpg";

const events = [
  {
    id: 5,
    title: "DMC Get Fitted Suit Day",
    imgSrc: img3,
    description:
      "A special event where members received professional attire to enhance their career readiness.",
    videoUrl: "https://drive.google.com/file/d/1UIVgO5oqk-ahEtBWf4E6rS6aF4Nd6Ljp/preview",
  },
  {
    id: 1,
    title: "General Body Meeting with Virginia Credit Union",
    imgSrc: img4,
    description:
      "An engaging session with VACU that highlighted financial literacy and support.",
    videoUrl: "https://drive.google.com/file/d/1BggVKnHJAXKKl7MCd8EEoUKJSVxFda2G/preview",
  },
  {
    id: 2,
    title: "Internship Workshop",
    imgSrc: img5,
    description:
      "A workshop dedicated to professional networking and building an impactful LinkedIn profile.",
    videoUrl: "https://drive.google.com/file/d/1UbGG55vKIolyhGWtipMRS0Mr404RdhII/preview",
  },
  {
    id: 3,
    title: "DMC 7 on 7 football",
    imgSrc: img1,
    description:
      "A fun-filled day of football games, showcasing teamwork and sportsmanship.",
    videoUrl: "https://drive.google.com/file/d/1RB4XWhtfQZKUirPwWNwkV27oBt0TDhPN/preview",
  },
  {
    id: 4,
    title: "DMC Mixer",
    imgSrc: img2,
    description:
      "A mixer event that brought together students and professionals for networking.",
    videoUrl: "https://drive.google.com/file/d/1gHdVsuv4e2fyipT3fbZJfi5nUcj7ACrR/preview",
  },
  {
    id: 6,
    title: "DMC Basketball",
    imgSrc: img6,
    description:
      "A fun-filled day of basketball games, showcasing teamwork and sportsmanship.",
    videoUrl: "https://drive.google.com/file/d/11DRpJ8PIrarpE4WVcjVCXUxj6eU5OMhB/preview",
  },
];

const Highlight = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  return (
    <section className="bg-black text-white px-6 md:px-16 py-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 text-center mb-4">
        Video Highlights
      </h1>
      <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
        Catch some of our most memorable moments on video.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="highlight-box bg-neutral-900 rounded-2xl overflow-hidden shadow-[0_0_20px_#FFD700] hover:shadow-[0_0_40px_#FFD700] cursor-pointer transition-all duration-300"
            onClick={() => openModal(event)}
          >
            <div className="relative w-full h-64 md:h-56 lg:h-60 rounded-2xl overflow-hidden">
              <Image
                src={event.imgSrc}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-neutral-900 rounded-2xl p-6 md:p-8 max-w-3xl w-full relative shadow-[0_0_50px_#FFD700] border-4 border-yellow-400"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-yellow-400 font-bold text-2xl hover:text-yellow-500"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-4">
              {selectedEvent.title}
            </h2>
            <div className="w-full aspect-video">
              <iframe
                src={selectedEvent.videoUrl}
                width="100%"
                height="100%"
                allow="autoplay"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Highlight;
