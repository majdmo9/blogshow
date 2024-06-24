"use client";
import { useState } from "react";
import Image from "next/image";

const AboutPage = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col gap-2 p-6">
      <h1 className="text-3xl md:text-4xl lg:text-6xl mb-4">About Us</h1>
      <figure className="h-[400px] mb-4 mr-auto">
        <Image src="/images/logo.png" alt="About Us" width={800} height={800} className="rounded-sm w-full h-full object-contain" />
      </figure>
      <p className="text-xl mb-4">
        Welcome to our company! We are a dynamic team of professionals dedicated to bringing you the best in web tech. Our journey started in 2024,
        with a vision to revolutionize the web tech landscape through innovative solutions and unparalleled customer service.
      </p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">Our Mission</h2>
      <p className="text-lg mb-4">
        Our mission is to empower individuals and organizations by providing cutting-edge that enhance productivity and drive success. We believe in
        the power of technology to transform lives and are committed to continuous improvement and excellence.
      </p>
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">Our Values</h2>
      <ul className="list-disc list-inside text-lg mb-4">
        <li>
          <strong>Integrity:</strong> We conduct our business with the highest standards of ethics and transparency.
        </li>
        <li>
          <strong>Innovation:</strong> We strive to be at the forefront of technological advancements, constantly exploring new ideas and solutions.
        </li>
        <li>
          <strong>Customer Focus:</strong> Our customers are at the heart of everything we do, and we are dedicated to exceeding their expectations.
        </li>
        <li>
          <strong>Collaboration:</strong> We believe in the power of teamwork and value the diverse perspectives of our employees, partners, and
          clients.
        </li>
      </ul>
      <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">Our Team</h2>
      <p className="text-lg mb-4">
        Our team is composed of talented professionals with a wealth of experience in [industry]. We pride ourselves on our collaborative culture and
        our ability to innovate and adapt in a rapidly changing environment. Meet some of our key team members:
      </p>
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        <div className="flex flex-col items-center">
          <Image src="/images/p2.jpg" alt="Team Member 1" width={200} height={200} className="object-cover rounded-sm h-full mb-2" />
          <h3 className="text-xl font-semibold">John Doe</h3>
          <p className="text-md">CEO</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/images/p1.jpg" alt="Team Member 2" width={200} height={200} className="object-cover h-full rounded-sm mb-2" />
          <h3 className="text-xl font-semibold">Jane Smith</h3>
          <p className="text-md">CTO</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/images/p3.jpg" alt="Team Member 3" width={200} height={200} className="object-cover h-full rounded-sm mb-2" />
          <h3 className="text-xl font-semibold">Alex Johnson</h3>
          <p className="text-md">COO</p>
        </div>
      </div>
      {showMore && (
        <>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">Our Journey</h2>
          <p className="text-lg mb-4">
            Our journey began with a small team and a big dream. Over the years, we have grown exponentially, expanding our reach and refining our
            expertise. Each milestone has been a testament to our resilience, creativity, and unwavering commitment to our goals.
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">Future Plans</h2>
          <p className="text-lg mb-4">
            Looking ahead, we are excited about the future. Our plans include expanding our product line, entering new markets, and continuing to
            innovate to meet the evolving needs of our customers. We are committed to making a positive impact on the world through our work and our
            values.
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">Join Us</h2>
          <p className="text-lg mb-4">
            We are always looking for passionate and talented individuals to join our team. If you are interested in being a part of a dynamic and
            forward-thinking organization, we would love to hear from you.
          </p>
        </>
      )}
      <button
        onClick={() => setShowMore(prev => !prev)}
        className="bg-[#25D366] py-2 px-4 mt-4 rounded-sm text-black dark:text-white font-semibold tracking-wider"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default AboutPage;
