import LogoDark from "../../assets/images/logos/monsterlogo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a className="text-decoration-none text-center w-100">
        <h4 className="m-0">Documents</h4>
      </a>
    </Link>
  );
};

export default Logo;
