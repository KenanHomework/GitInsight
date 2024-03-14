import { Image } from "@nextui-org/image";
import { FaHeart } from "react-icons/fa6";

export function Footer() {
  return (
    <div
      className={"w-full flex items-center justify-between px-[20%] pt-5 pb-6"}
    >
      <div className={"flex items-center gap-3"}>
        <Image src="/logo.png" alt="logo" width={25} height={25} />
        <h1 className={"text-second"}>© 2024</h1>
      </div>

      <div className={"flex items-center gap-2"}>
        <p>Made by</p>
        <FaHeart size={20} />
        <p>from</p>
        <span className={"font-semibold"}>Azerbaijan</span>
      </div>
    </div>
  );
}
