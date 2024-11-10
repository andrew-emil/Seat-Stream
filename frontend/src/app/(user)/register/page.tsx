import RegisterForm from "@/components/forms/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import "./register.css";

const RegisterPage = () => {
	const token = cookies().get("ACCESS-TOKEN")?.value;

	if (token) redirect("/");
	return (
		<main className="signup-container">
			<RegisterForm />
		</main>
	);
};

export default RegisterPage;
