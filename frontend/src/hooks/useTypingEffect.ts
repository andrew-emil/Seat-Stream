"use client";
import { useState, useEffect } from "react";

export const useTypingEffect = (text: string, speed: number) => {
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
};
