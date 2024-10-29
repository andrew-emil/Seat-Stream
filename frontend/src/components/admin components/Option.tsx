import { motion } from "framer-motion";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface OptionComponentProps {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
	btnText: string;
	url: string[];
	LinksText: string[];
}

const Option = ({ state, setState, btnText, LinksText, url }: OptionComponentProps) => {
	const menuVariant = {
		open: { rotate: 180 },
		closed: { rotate: 0 },
	};

	const wrapperVariant = {
		open: {
			scaleY: 1,
			opacity: 1,
			transition: {
				duration: 0.3,
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
		closed: {
			scaleY: 0,
			opacity: 0,
			transition: {
				duration: 0.3,
				when: "afterChildren",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariant = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: -10 },
	};

	return (
		<motion.div
			animate={state ? "open" : "closed"}
			className="relative">
			<button
				onClick={() => setState((prev) => !prev)}
				aria-expanded={state}
				className="flex items-center text-lg lg:text-xl text-[#f5f5f5] hover:text-[#e91e63] transition mb-3 lg:mb-0">
				<span>{btnText}</span>
				<motion.span variants={menuVariant} className="ml-2">
					<IoIosArrowDown size={18} />
				</motion.span>
			</button>
			<motion.ul
				initial="closed"
				animate={state ? "open" : "closed"}
				variants={wrapperVariant}
				className="absolute bg-[#3e3a3a] mt-2 p-3 rounded-lg shadow-lg flex flex-col gap-2 overflow-hidden w-40 border border-[#8b858d] z-10">
				{LinksText.map((linkName, index) => (
					<motion.li
						key={index}
						variants={itemVariant}
						onClick={() => setState((prev) => !prev)}
						className="text-[#f5f5f5] hover:text-[#e91e63] transition cursor-pointer">
						<Link href={url[index]}>{linkName}</Link>
					</motion.li>
				))}
			</motion.ul>
		</motion.div>
	);
};

export default Option;
