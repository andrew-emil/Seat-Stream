import Link from "next/link";

const AdminDashboard = () => {
	return (
		<div className="min-h-screen text-[#f5f5f5] p-5">
			<h1 className="text-4xl mb-6">Admin Dashboard</h1>

            <div className="flex justify-center align-center sm:align-start">
                <div className="grid grid-row-1 gap-6">
				{/* Movies management */}
				<Link href="/admin/movies">
					<div className="block p-6 bg-[#7f094b] hover:bg-[#a7517c] rounded-lg text-center">
						<h2 className="text-2xl mb-2">Manage Movies</h2>
						<p>View, add, edit, and delete movies.</p>
					</div>
				</Link>

				{/* Showtime management */}
				<Link href="/admin/showtime">
					<div className="block p-6 bg-[#7f094b] hover:bg-[#a7517c] rounded-lg text-center">
						<h2 className="text-2xl mb-2">Manage Showtime</h2>
						<p>View, add, edit, and delete showtime.</p>
					</div>
				</Link>

				{/* Reservations management */}
				<Link href="/admin/reservations">
					<div className="block p-6 bg-[#7f094b] hover:bg-[#a7517c] rounded-lg text-center">
						<h2 className="text-2xl mb-2">Manage Reservations</h2>
						<p>View and manage customer reservations.</p>
					</div>
				</Link>
			</div>
            </div>
			
		</div>
	);
};

export default AdminDashboard;
