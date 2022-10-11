import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    title: "Upload Document",
    href: "/upload-document",
    icon: "bi bi-cloud-arrow-up",
  },
  {
    title: "My Documents",
    href: "/",
    icon: "bi bi-layout-split",
  },
  {
    title: "Configuration",
    href: "/configure",
    icon: "bi bi-gear",
  },
];

const Sidebar = ({ showMobilemenu }) => {
  let curl = useRouter();
  const location = curl.pathname;


  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex align-items-center sidebar-brand px-3">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <img src="/images/bottom-line.svg" className="img-fluid" />
      <div className="pt-4">
        <Nav vertical className="sidebarNav dms-sidebar">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3 w-100"
                      : "nav-link text-secondary py-3 w-100"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
