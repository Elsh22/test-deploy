import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Image from 'next/image';
import img1 from '../../../../assets/Miscellaneous/1.png';
import img2 from '../../../../newassest/Benford2.jpg';
import img3 from '../../../../newassest/Benford.jpg';
import img4 from '../../../../newassest/Jacob.JPG';
import img5 from '../../../../newassest/Com.jpg';
import img6 from '../../../../newassest/Comm.jpg'

const Example = () => {
  return (
    <div>
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
    >
      <div className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={card.url}
          alt={card.title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p>
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: img1,
    id: 1,
  },
  {
    url: img2,
    id: 2,
  },
  {
    url: img3,
    id: 3,
  },
  {
    url: img4,
    id: 4,
  },
  {
    url: img5,
    id: 5,
  },
  {
    url: img6,
    id: 6,
  },
];