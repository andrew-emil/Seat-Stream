import Link from "next/link";

const NotFoundPage = () => {
	return (
		<section className="fix-height flex justify-center items-center flex-col">
			<h1 className="text-7xl text-gray-200 font-bold">404</h1>
			<p className="text-gray-500 text-3xl mt-2 mb-5">Page Not Found</p>
			<Link className="text-xl underline text-[#2196f3]" href="/">
				Go to home page
			</Link>
		</section>
	);
};

export default NotFoundPage;
