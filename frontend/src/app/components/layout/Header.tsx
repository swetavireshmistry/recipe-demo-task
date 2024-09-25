'use client';
import Link from "next/link";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";
import { HeaderProps } from "@/types/types";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from "react";

export default function Header({
  scroll,
  isMobileMenu,
  handleMobileMenu,
}: HeaderProps): JSX.Element {

  useEffect(() => {
    console.log("isMobileMenu", isMobileMenu);

  }, [isMobileMenu])

  return (
    <>
      <header className={`main-header header-style-three ${scroll ? "fixed-header" : ""}`}>
        {/* Header Lower */}
        <div className="header-lower">
          <div className="auto-container clearfix">
            <div className="d-flex justify-content-between align-items-center">
              <div className="pull-left logo-box">
                <div className="logo">
                  <Link href="/">
                    <img src="\assets\images\logo.png" alt="Logo" title="Logo" />
                  </Link>
                </div>
              </div>
              {<div className="nav-outer clearfix">
                {/* Mobile Navigation Toggler */}
                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <MenuIcon />
                </div>
                {/* Main Menu */}
                <nav className="main-menu navbar-expand-md d-flex justify-content-end ">
                  <Menu />
                </nav>
              </div>}
            </div>
          </div>
        </div>
        {/* End Header Lower */}
        <div className="sticky-header">
          <div className="auto-container clearfix position-relative">
            <div className="logo pull-left">
              <Link href="/" title="">
                <img src="/assets/images/logo-small.png" alt="" title="" />
              </Link>
            </div>
            {<div className="nav-outer clearfix sticky-menu">
                {/* Mobile Navigation Toggler */}
                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <MenuIcon />
                </div>
                {/* Main Menu */}
                <nav className="main-menu navbar-expand-md d-flex justify-content-end ">
                  <Menu />
                </nav>
              </div>}
          </div>
        </div>
        <MobileMenu handleMobileMenu={handleMobileMenu} />
      </header>
    </>
  );
}

