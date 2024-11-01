interface CustomButtonProps {
    btnText: string;
	handleClick: () => void;
}

const CustomButton = ({ handleClick, btnText }: CustomButtonProps) => {
	return (
		<button
			className="w-48 h-12 border-none text-[#f5f5f5] font-semibold text-xl bg-[#7f094b] hover:bg-[#a7517c] transition rounded-lg cursor-pointer"
			onClick={handleClick}>
			{btnText}
		</button>
	);
};

export default CustomButton;
