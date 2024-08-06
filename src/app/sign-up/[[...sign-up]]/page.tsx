import { SignUp } from "@clerk/nextjs";
export default function SingUpPage() {
  return (
    <div className={`py-10 w-full h-screen flex justify-center items-center`}>
      <SignUp />
    </div>
  );
}
