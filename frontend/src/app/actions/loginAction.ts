"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  //TODO: add login Api

  const _headers = await headers();
  const referer = _headers.get("referer");

  const lastPage = referer ? new URL(referer).pathname : "/";

  redirect(lastPage);
}
