import { UserButton, UserProfile } from "@clerk/nextjs";
import Sidebar from "./Sidebar";
export default function Dashboard() {
  return (
    <div>
      <Sidebar/>
      <UserButton />
    </div>
  );
}
