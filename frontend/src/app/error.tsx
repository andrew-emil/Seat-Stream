"use client";

import Link from "next/link";

interface ErrorPageProps {
	error: Error;
	reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
	return (
		<div className="fix-height pt-7 text-center flex justify-center items-center flex-col m-4">
			<div className="text-3xl text-error-500 font-semibold">
				Something went wrong
			</div>
			<h2 className="text-gray-700 my-3 text-xl">
				Error Message: {error.message}
			</h2>
			<button
				onClick={() => reset()}
				className="bg-primary-700 hover:bg-primary-300 text-white font-bold py-2 px-4 rounded-full">
				Try again
			</button>
			<Link
				className="text-xl underline text-secondary-400 block mt-6"
				href="/">
				Go to home page
			</Link>
		</div>
	);
}
