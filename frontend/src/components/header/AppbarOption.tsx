import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";

import "./responsiveAppbar.css";

interface AppbarOptionProps {
	text: string;
	Icon: IconType;
	url: string;
	onClick: () => void;
}

const AppbarOption = ({ text, Icon, url, onClick }: AppbarOptionProps) => {
	const itemVariants = {
		open: { opacity: 1, y: 0 },
		closed: { opacity: 0, y: -10 },
	};

	return (
		<motion.li variants={itemVariants} className="item">
			<Link
				href={url}
				onClick={onClick}
				className="flex items-center gap-2 text-gray-800 transition w-full">
				<Icon className="icon" />
				<span>{text}</span>
			</Link>
		</motion.li>
	);
};

export default AppbarOption;
