import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 bg-white">
      <div className="max-w-(--max-width)">
        <Link href={"/"} className="flex gap-2 items-center w-fit">
          <Image src={"/icon-512.png"} alt="logo" width={20} height={20} />
          <div className="text-2xl font-bold">LinkPocket</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
