import React from 'react';
import Image from 'next/image';
import './Highlight.css';
import img1 from '../../newassest/pitchingkid.jpg';
import img2 from '../../newassest/kidsNexttounderground.jpg';
import img3 from '../../newassest/moreresourcefairsauce.jpg';
import img4 from '../../newassest/DMCGettingCheckfromVACU.jpg';
import img5 from '../../newassest/darrellgettinglinkedin.jpg';

const events = [
    { id: 1, title: 'Jacobs Chances', imgSrc: img1 },
    { id: 2, title: 'College Day', imgSrc: img2 },
    { id: 3, title: 'Resource Fair', imgSrc: img3 },
    { id: 4, title: 'General Body Meeting With Virginia Credit Union', imgSrc: img4 },
    { id: 5, title: 'Linkedin Workshop', imgSrc: img5 },
];

const Highlight = () => {
    return (
        <div className="highlights-container">
            <h1 className="highlights-title">Highlights</h1>
            <p className="highlights-description">Here are some key highlights from our recent events.</p>
            
            <div className="highlights-grid">
                {events.map(event => (
                    <div key={event.id} className="highlight-box">
                        <div className="image-container">
                            <Image
                                src={event.imgSrc}
                                alt={event.title}
                                fill                    // New Next.js 13 prop for responsive images
                                sizes="(max-width: 768px) 100vw, 50vw"  // Optional for responsive loading
                            />
                        </div>
                        <p className="highlight-title">{event.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Highlight;
