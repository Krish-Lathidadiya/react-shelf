import Link from "next/link";
import Button from "@/components/Common/Button";
import { auth ,currentUser} from "@clerk/nextjs/server";

export default async function Buttons() {
  const { userId } = auth();
  const user=await currentUser();
  console.log(user);

  return (
    <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
      {!userId ? (
        <>
          <Link href="/sign-in">
            <Button buttonType="primary" className="max-sm:w-full p-[8px] px-6">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              buttonType="primary-transparent"
              className="max-sm:w-full hover:bg-sky-500 p-[8px] px-6"
            >
              Sign Up
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/dashboard">
            <Button
              buttonType="primary"
              className="max-sm:w-full p-[8px] px-6 "
            >
              Dashboard
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
