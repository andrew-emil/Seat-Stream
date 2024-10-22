"use client";
import Link from "next/link";

interface ErrorPageProps {
	error: Error;
	reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
	return (
		<div className="fix-height pt-7 text-center flex justify-center items-center flex-col">
			<div className="text-3xl text-[#cf0a0a] font-semibold">
				Something went wrong
			</div>
			<h2 className="text-gray-700 my-3 text-xl">
				Error Message: {error.message}
			</h2>
			<button
				onClick={() => reset()}
				className="bg-[#7f094b] hover:bg-[#a7517c] text-white font-bold py-2 px-4 rounded-full">
				Try again
			</button>
			<Link className="text-xl underline text-[#2196f3] block mt-6" href="/">
				Go to home page
			</Link>
		</div>
	);
};

export default ErrorPage;
