'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const HorizontalScrollCarousel = ({ cards }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div className="relative h-[450px] w-[400px] md:w-[450px] overflow-hidden rounded-xl shadow-lg group flex-shrink-0 bg-black">
      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={card.url}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
};

export default HorizontalScrollCarousel;
