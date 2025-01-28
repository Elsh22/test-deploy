"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./Highlight.css";
import img1 from "../../newassest/jacobchancespicture.jpg";
import img2 from "../../newassest/kidsNexttounderground.jpg";
import img3 from "../../newassest/moreresourcefairsauce.jpg";
import img4 from "../../newassest/DMCGettingCheckfromVACU.jpg";
import img5 from "../../newassest/darrellgettinglinkedin.jpg";
import img6 from "../../newassest/jasonwinning.jpg";
import img7 from "../../newassest/kidfistpump.jpg";
import img8 from "../../newassest/collegeday.jpg";
import img9 from "../../newassest/resourcefaircoffee.jpg";
import img10 from "../../newassest/resourcefairfun.jpg";
import img11 from "../../newassest/MoeNHusseinVACU.jpg";
import img12 from "../../newassest/linkedin1.jpg";
import img13 from "../../newassest/linkedin333.jpg";

const events = [
  {
    id: 1,
    title: "Jacobs Chance`s",
    imgSrc: img1,
    description:
      "Jacob’s Chance event focused on youth development and building community connections.",
    blogContent:
      "The Jacobs Chance event was a powerful celebration of youth development and community connection. Participants engaged in meaningful activities designed to inspire and empower young individuals, fostering personal growth and leadership skills. The event also served as a platform to strengthen community ties, bringing together members to share experiences, build relationships, and support one another. It was a day filled with inspiration, collaboration, and a shared commitment to creating positive change for the next generation.",
    extraImages: [img6, img7],
  },
  {
    id: 2,
    title: "College Day",
    imgSrc: img2,
    description:
      "A memorable day for students exploring academic pathways and networking opportunities.",
    blogContent:
      "College Day was an inspiring and impactful event that provided students with opportunities to explore academic pathways and build valuable connections. Attendees engaged with representatives from various programs, gaining insights into potential career paths, academic resources, and strategies for success. The event also encouraged meaningful conversations, allowing students to connect with peers and professionals who could guide and support their journeys. It was a day dedicated to growth, discovery, and the power of networking, leaving students feeling motivated, informed, and confident about their future goals.",
    extraImages: [img8],
  },
  {
    id: 3,
    title: "Resource Fair",
    imgSrc: img3,
    description: "A day connecting attendees with essential resources and opportunities.",
    blogContent:
      "We had an incredible opportunity to share resources and present opportunities for growth and success. Our members connected with a variety of on-campus resources, learning more about the people and programs dedicated to supporting them on their college journey. It was inspiring to see our community come together, ask thoughtful questions, and discover new ways to make the most of the opportunities available to them. This event was all about fostering connections, building relationships, and empowering our members to thrive, and we are so proud of everyone who participated!",
    extraImages: [img9, img10],
  },
  {
    id: 4,
    title: "General Body Meeting with Virginia Credit Union",
    imgSrc: img4,
    description:
      "An engaging session with VACU that highlighted financial literacy and support.",
    blogContent:
      "The General Body meeting with Virginia Credit Union showcased the power of community, learning, and support. Over 150 members attended, creating a space for growth and connection driven by a shared purpose to make an impact. A key highlight was an inspiring panel discussion with top CEOs who shared their journeys, challenges, and advice for success. DMC members, proudly wearing their hoodies, engaged thoughtfully, gaining valuable guidance on career growth, leadership, and community impact. The evening featured a delicious meal catered by Jamaica House, fostering unity and camaraderie over food and conversation. A standout moment was Virginia Credit Union’s generous 15000 dollar donation to support DMC’s future initiatives, reflecting their belief in the organization’s mission and fueling opportunities for impactful programs. This event was a celebration of empowerment, collaboration, and meaningful connections, setting the stage for even greater accomplishments.",
    extraImages: [img11]
  },
  {
    id: 5,
    title: "LinkedIn Workshop",
    imgSrc: img5,
    description:
      "A workshop dedicated to professional networking and building an impactful LinkedIn profile.",
    blogContent:
      "We had an amazing evening dedicated to helping our members elevate their professional profiles. Attendees gained valuable LinkedIn tips to enhance their online presence and captured stunning headshots to strengthen their personal brand. It was inspiring to see everyone take meaningful steps toward building a stronger professional image and setting themselves up for success. Thank you to everyone who participated and made this workshop a success!",
    extraImages: [img12, img13],
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
      <h1 className="highlights-title">Highlights</h1>
      <p className="highlights-description">
        Here are some key highlights from our recent events.
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
            <div className="modal-image">
              <Image
                src={selectedEvent.imgSrc}
                alt={selectedEvent.title}
                width={300}
                height={300}
              />
            </div>
            <p className="modal-blog">{selectedEvent.blogContent}</p>
            <div className="extra-images">
              {selectedEvent.extraImages?.map((image, index) => (
                <div key={index} className="extra-image-container">
                  <Image
                    src={image}
                    alt={`Extra image ${index + 1}`}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
