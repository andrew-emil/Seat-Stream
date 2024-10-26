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

const Option = (props: OptionComponentProps) => {
	const menuVariant = {
		open: { rotate: 180 },
		close: { rotate: 0 },
	};

	const wrapperVariant = {
		open: {
			scaleY: 1,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.2,
			},
		},
		closed: {
			scaleY: 0,
			transition: {
				when: "afterChildren",
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariant = {
		open: {
			opacity: 1,
			y: 0,
			transition: {
				when: "beforeChildren",
			},
		},
		closed: {
			opacity: 0,
			y: -15,
			transition: {
				when: "afterChildren",
			},
		},
	};

	return (
		<motion.div
			animate={props.state ? "open" : "close"}
			className="mt-5 flex items-center justify-center flex-col lg:items-start relative">
			<button
				onClick={() => props.setState((prev) => !prev)}
				className="flex items-center mb-5 text-xl text-[#f5f5f5] hover:text-[#2196f3] transition">
				<span>{props.btnText}</span>
				<motion.span className="ml-5" variants={menuVariant}>
					<IoIosArrowDown />
				</motion.span>
			</button>
			{props.state && (
				<motion.ul
					initial={wrapperVariant.closed}
					variants={wrapperVariant}
					animate={{ scaleY: 1 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col h-auto overflow-hidden gap-3 w-full">
					{props.LinksText.map((linkName, index) => (
						<motion.li
							variants={itemVariant}
							className=" text-[#f5f5f5] hover:text-[#2196f3] transition w-full cursor-pointer relative left-[30px]">
							<Link href={props.url[index]}>{linkName}</Link>
						</motion.li>
					))}
				</motion.ul>
			)}
		</motion.div>
	);
};

export default Option;
