"use client";

import { CustomButton } from "@/app/_components/StyledComponents";
import { useFormStatus } from "react-dom";

interface Props {
  title: string;
}

export default function SubmitButton({ title }: Props) {
  const { pending } = useFormStatus();
  return (
    <CustomButton type={"submit"} loading={pending}>
      {title}
    </CustomButton>
  );
}
