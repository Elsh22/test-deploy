"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./Highlight.css";
import img1 from "../../newassest/sports4.jpg";
import img2 from "../../newassest/Ourmissionpicture.jpg";
import img4 from "../../newassest/creditunion_handup.jpg";
import img5 from "../../newassest/darrellgettinglinkedin.jpg";

const events = [
  {
    id: 5,
    title: "DMC Get Fitted Suit Day",
    imgSrc: img4,
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
    videoUrl: "https://drive.google.com/file/d/1eOwJoj9_UVN0_1uXOCPijmwYEMddWZV8/preview",    
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
    title: "DMC Basketball games",
    imgSrc: img1,
    description:
      "A fun-filled day of basketball games, showcasing teamwork and sportsmanship.",
    videoUrl: "https://drive.google.com/file/d/1fztFYrfzcGyw-7Ne_iNTowR-FHfZL-QG/preview ",
  },
  {
    id: 4,
    title: "DMC Mixer",
    imgSrc: img2,
    description:
      "A mixer event that brought together students and professionals for networking.",
    videoUrl: "https://drive.google.com/file/d/1IrtvsugCM3E5MhykBckUDGn_CA0-RO0E/preview",
  },
];

const Highlight = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="highlights-container">
      <h1 className="highlights-title">Video Highlights</h1>
      <p className="highlights-description">
        Catch some of our most memorable moments on video.
      </p>

      <div className="highlights-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className="highlight-box"
            onClick={() => openModal(event)}
          >
            <div className="image-container">
              <Image
                src={event.imgSrc}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="highlight-title">{event.title}</p>
            <p className="highlight-description">{event.description}</p>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              X
            </button>
            <h2 className="modal-title">{selectedEvent.title}</h2>
            <div className="modal-video">
              <iframe
                src={selectedEvent.videoUrl}
                width="100%"
                height="360"
                allow="autoplay"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
