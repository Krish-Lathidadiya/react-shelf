import { CTA_PARAGRAPH } from "@/lib/constants";
import Button from "@/components/Common/Button";
export default function CTAsection() {
  return (
    <div className="flex flex-col mx-auto items-center mt-[120px] gap-6">
      {/* Heading */}
      <h2 className="font-bold text-2xl text-center">
        Manage and Create Your React Components
        <span className={`text-sky-500`}> Effortlesslt!</span>
      </h2>
      {/* paragraph */}
      <p className="text-center text-[15px] w-[510px] max-sm:w-full text-slate-500">
        {CTA_PARAGRAPH}
      </p>
      {/* button */}
      <Button buttonType="primary" className="px-9 py-3 font-medium">
        {`Let's get started!`}
      </Button>
    </div>
  );
}
