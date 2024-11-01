"use client";

const Loading = () => {
	return (
		<section className="flex flex-col items-center justify-center h-screen">
			<div className="loader">
				<div className="relative w-14 h-16 bg-[#3d314a] -z-10 loader__filmstrip">
					<style jsx>
						{`
							.loader__filmstrip::after,
							.loader__filmstrip::before {
								content: "";
								position: absolute;
								display: flex;
								height: 90%;
								border-left: 5px dashed #f5f1ed;
								animation: roll 20ms infinite;
							}
							.loader__filmstrip::after {
								right: 5px;
							}
							.loader__filmstrip::before {
								left: 5px;
							}
							@keyframes roll {
								0% {
									top: 0px;
								}
								100% {
									top: 6px;
								}
							}
						`}
					</style>
				</div>
				<p className="relative right-2 my-1 mx-auto text-[#3d314a] uppercase tracking-wide font-bold">
					loading...
				</p>
			</div>
		</section>
	);
};

export default Loading;
