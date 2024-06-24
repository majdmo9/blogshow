import Image from "next/image";
import SocialIcons from "./SocialIcons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-[50px] py-[20px] flex justify-between text-[#626262] dark:text-[#a6a6a6] gap-[50px] md:gap-0 flex-col md:flex-row">
      <div className="flex-1 flex flex-col gap-[14px]">
        <figure className="flex gap-3 items-center">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} className="rounded-[50%]" />
          <h1 className="text-2xl font-semibold">BlogShow</h1>
        </figure>
        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias corrupti reprehenderit illum soluta nulla quisquam. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eligendi, optio!
        </p>
        <div className="mt-[10px]">
          <SocialIcons />
        </div>
      </div>
      <div className="flex-1 flex gap-[50px] lg:gap-[100px] text-[14px] justify-between w-full md:justify-end md:w-fit">
        <div className="flex flex-col gap-[10px] font-light">
          <span className="font-bold">Links</span>
          <Link href="/">Homeapge</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className="flex flex-col gap-[10px] font-light">
          <span className="font-bold">Tags</span>
          <Link href="/">Culture</Link>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
        </div>
        <div className="flex flex-col gap-[10px] font-light">
          <span className="font-bold">Social</span>
          <Link href="/">Instagram</Link>
          <Link href="/">Facebook</Link>
          <Link href="/">Youtube</Link>
          <Link href="/">Tiktok</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
