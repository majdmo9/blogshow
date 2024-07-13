"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ContactUsPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name || !email || !message) {
      toast.error("All fields are required!");
      return;
    }
    // Simulate sending the message
    toast.success("Message sent successfully!");
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-2 p-6">
      <h1 className="text-3xl md:text-4xl lg:text-6xl mb-4">Contact Us</h1>
      <input
        type="text"
        placeholder="Name"
        className="mb-4 p-4 text-xl bg-transparent border-b-2 outline-none rounded-sm"
        onChange={e => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-4 p-4 text-xl bg-transparent border-b-2 outline-none rounded-sm"
        onChange={e => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Message"
        className="mb-4 p-4 text-xl outline-none h-40 rounded-sm bg-transparent border-b-2"
        onChange={e => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="bg-orange-600 hover:bg-orange-500 transition-all py-2 px-10 rounded-sm text-white font-semibold tracking-wider w-fit ml-auto"
      >
        Send
      </button>
    </div>
  );
};

export default ContactUsPage;
