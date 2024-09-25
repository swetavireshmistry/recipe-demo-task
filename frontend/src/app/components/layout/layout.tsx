'use client';

import { useEffect, useState, ReactNode } from "react";
import DataBg from "../elements/DataBg";
import BackToTop from "../elements/BackToTop";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import { LayoutProps } from "@/types/types";

export default function Layout({
  breadcrumbTitle,
  wrapperCls,
  children,
}: LayoutProps) {
  const [scroll, setScroll] = useState<boolean>(false);
  const [isMobileMenu, setMobileMenu] = useState<boolean>(false);
  const [isPopup, setPopup] = useState<boolean>(false);
  const [isSidebar, setSidebar] = useState<boolean>(false);

  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
    !isMobileMenu
      ? document.body.classList.add("mobile-menu-visible")
      : document.body.classList.remove("mobile-menu-visible");
  };

  const handlePopup = () => setPopup(!isPopup);
  const handleSidebar = () => setSidebar(!isSidebar);

  useEffect(() => {
    const WOW = require("wowjs");
    window.wow = new WOW.WOW({
      live: false,
    });
    window.wow.init();
    const onScroll = () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [scroll]);

  return (
    <>
      <DataBg />
      <div className={`page-wrapper ${wrapperCls ? wrapperCls : ""}`} id="#top">
        <Header
          scroll={scroll}
          isMobileMenu={isMobileMenu}
          handleMobileMenu={handleMobileMenu}
          handlePopup={handlePopup}
          isSidebar={isSidebar}
          handleSidebar={handleSidebar}
        />
        {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
        {children}
        <Footer />
      </div>
      <BackToTop scroll={scroll} />
    </>
  );
}
