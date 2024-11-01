import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

interface OptionComponentProps {
	isOpen: boolean;
	toggle: () => void;
	btnText: string;
	links: {
		text: string;
		href: string;
	}[];
}

const MenuOption = ({
	isOpen,
	toggle,
	btnText,
	links,
}: OptionComponentProps) => {
	const menuIconVariants = {
		open: { rotate: 180 },
		closed: { rotate: 0 },
	};

	const menuVariants = {
		open: {
			scaleY: 1,
			opacity: 1,
			transition: { duration: 0.3, staggerChildren: 0.1 },
		},
		closed: { scaleY: 0, opacity: 0, transition: { duration: 0.3 } },
	};

	const itemVariants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: -10 },
	};

	return (
		<div className="relative w-full lg:w-auto">
			<button
				onClick={toggle}
				aria-expanded={isOpen}
				className="flex items-center justify-between w-full lg:w-auto text-lg lg:text-xl text-[#f5f5f5] hover:text-[#e91e63] transition mb-2 lg:mb-0">
				<span>{btnText}</span>
				<motion.span
					variants={menuIconVariants}
					animate={isOpen ? "open" : "closed"}
					className="ml-2">
					<IoIosArrowDown size={18} />
				</motion.span>
			</button>
			<motion.ul
				initial="closed"
				animate={isOpen ? "open" : "closed"}
				variants={menuVariants}
				className="absolute bg-[#3e3a3a] mt-2 p-3 rounded-lg shadow-lg flex flex-col gap-2 overflow-hidden w-full lg:w-48 border border-[#8b858d] z-10">
				{links.map((link, index) => (
					<motion.li key={index} variants={itemVariants}>
						<Link
							href={link.href}
							onClick={toggle}
							className="block text-[#f5f5f5] hover:text-[#e91e63] transition px-2 py-1">
							{link.text}
						</Link>
					</motion.li>
				))}
			</motion.ul>
		</div>
	);
};

export default MenuOption;
