import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

const SocialIcons = ({ isEmail = false }: { isEmail?: boolean }) => {
  return (
    <div className="flex items-center gap-2 flex-1">
      <Link href="#">
        <FacebookIcon className="text-blue-600" />
      </Link>

      <figure>
        <Link href="#">
          <InstagramIcon className="text-pink-700" />
        </Link>
      </figure>
      <Link href="#">
        <YouTubeIcon className="text-[#ff0000]" />
      </Link>
      {isEmail ? (
        <Link href="mailto:info@majdmousa.com" className="text-[#202020] dark:text-[#f6f6f6]">
          <p>info@majdmousa.com</p>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SocialIcons;
