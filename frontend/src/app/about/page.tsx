// import useTypingEffect from "@/hooks/useTypingEffect";
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import "./about.css";

function useTypingEffect(text: string, speed: number) {
	const [displayedText, setDisplayedText] = useState<string>("");

	useEffect(() => {
		let currentIndex = 0;

		const typingInterval = setInterval(() => {
			if (currentIndex < text.length) {
				setDisplayedText((prev) => prev + text[currentIndex]);
				currentIndex++;
			} else {
				clearInterval(typingInterval);
			}
		}, speed);

		return () => clearInterval(typingInterval);
	}, [text, speed]);

	return displayedText;
}

const AboutPage = () => {
	const title = "About us";
	const content =
		"Seat Stream Cinemas is the Middle East's largest cinema chain, operating over 200 cinemas across the region with a commitment to delivering the best movie experiences for everyone";
	const link = "Go to see movies";

	const animatedTitle = useTypingEffect(title, 50);
	const animatedContent = useTypingEffect(content, 50);
	const animatedLink = useTypingEffect(link, 50);

	return (
		<main className="flex flex-col h-screen w-full justify-start items-start p-2 cursor">
			<h1 className="text-[#f5f5f5] font-bold block cursor">{animatedTitle}</h1>
			<h3 className="text-gray-400 font-semibold block text-wrap cursor">
				{animatedContent}
			</h3>
			<Link
				href="/"
				className="text-lg underline text-[#2196f3] block mt-6 cursor">
				{animatedLink}
			</Link>
		</main>
	);
};

export default AboutPage;
