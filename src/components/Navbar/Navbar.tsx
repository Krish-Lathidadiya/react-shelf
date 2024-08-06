import Buttons from "./Buttons";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between  max-sm:flex-col gap-3">
      <Logo />
      <Buttons />
    </nav>
  );
}
