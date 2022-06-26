import React, { useState, useContext, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { VideoContext } from "../../context/VideoContext";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { room } = useContext(VideoContext);
  const toggle = () => setIsOpen(!isOpen);
  const handleLeave = () => {
    room.disconnect();
    router.push("/");
  };
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="pt-0 pb-0 pl-0">
        <Link href="/">
          <div className="p-2">
            <img
              alt=""
              className="pointer"
              style={{ height: "70px" }}
              src="/images/realtor-com.png"
            />
          </div>
        </Link>
        <span className="font-weight-bold ml-3 text-white h4 d-none d-md-block">
          Programmable Video Demo
        </span>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!room && (
              <Fragment>
                <NavItem
                  className={
                    router.pathname === "/invite"
                      ? "active mr-2 mobile-dropdown-margin"
                      : "mr-2 mobile-dropdown-margin"
                  }
                >
                  <Link href="/invite">
                    <NavLink className="pointer text-white nav-hover mobile-dropdown-padding">
                      Invite Users
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  className={
                    router.pathname === "/join"
                      ? "active mobile-dropdown-margin"
                      : "mobile-dropdown-margin"
                  }
                >
                  <Link href="/join">
                    <NavLink className="pointer text-white nav-hover mobile-dropdown-padding">
                      Join Room
                    </NavLink>
                  </Link>
                </NavItem>
              </Fragment>
            )}
            {room && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  className="active mobile-dropdown-margin mobile-dropdown-padding"
                >
                  <span className="font-weight-bold">{room.localParticipant.identity}</span> is
                  joined to the room <span className="font-weight-bold">{room.name}</span>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={handleLeave}>Leave Room</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
