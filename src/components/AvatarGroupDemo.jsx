import React from "react";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import profile4 from "../assets/profile4.jpg";

const AVATARS = [
  {
    src: profile1,
    name: "Purunjay Bhardwaj",
    link: "https://www.linkedin.com/in/purunjaybhardwaj/",
  },
  {
    src: profile2,
    name: "Yashraj Sharma",
    link: "https://www.linkedin.com/in/yashraj-sharma-579941285/",
  },
  {
    src: profile3,
    name: "Nipun Chawla",
    link: "https://www.linkedin.com/in/nipun-chawla-569047210/",
  },
  {
    src: profile4,
    name: "Taran Pahuja",
    link: "https://www.linkedin.com/in/taran-pahuja-50b667278/",
  },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex -space-x-4">
      {AVATARS.map((avatar, index) => (
        <a
          key={index}
          href={avatar.link}
          target="_blank"
          rel="noopener noreferrer"
          title={avatar.name}
        >
          <img
            src={avatar.src}
            alt={avatar.name}
            className="w-12 h-12 rounded-full border-2 border-[#0080FF] hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </a>
      ))}
    </div>
  );
}