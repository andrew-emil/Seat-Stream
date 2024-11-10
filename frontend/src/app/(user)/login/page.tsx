import LoginForm from "@/components/forms/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "./login.css";

const LoginPage = async () => {
	const cookieStore = await cookies();
  	const accessToken =  cookieStore.get('ACCESS-TOKEN')?.value;

	if (accessToken) redirect("/");

	return (
		<main className="form-container">
			<LoginForm />
		</main>
	);
};

export default LoginPage;
