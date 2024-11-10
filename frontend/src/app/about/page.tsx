// import useTypingEffect from "@/hooks/useTypingEffect";
"use client";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import Link from "next/link";

import "./about.css";



const AboutPage = () => {
	const title = "About us";
	const content =
		"Seat Stream Cinemas is the Middle East's largest cinema chain, operating over 200 cinemas across the region with a commitment to delivering the best movie experiences for everyone";

	const animatedTitle = useTypingEffect(title, 50);
	const animatedContent = useTypingEffect(content, 50);

	return (
		<main className="flex flex-col h-screen w-full justify-start items-start p-2 cursor m-2">
			<h1 className="text-[#f5f5f5] font-bold block cursor">{animatedTitle}</h1>
			<h3 className="text-gray-400 font-semibold block text-wrap cursor">
				{animatedContent}
			</h3>
			<Link
				href="/"
				className="text-lg underline text-[#2196f3] block mt-6">
				Go to Home page
			</Link>
		</main>
	);
};

export default AboutPage;
