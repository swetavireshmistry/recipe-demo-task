'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "@/store/types";
import { MobileMenuProps } from "@/types/types";
import { logout } from "@/store/slices/authSlice";
import CloseIcon from '@mui/icons-material/Close';

const MobileMenu: React.FC<MobileMenuProps> = ({ handleMobileMenu }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
    subMenuKey: "",
  });

  const { userId } = useSelector((state) => state.auth)

  const handleLogout = () => {
    if (userId) {
      dispatch(logout());
      router.push('/');
    }
  }

  const handleToggle = (key: string, subMenuKey = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({
        status: false,
        key: "",
        subMenuKey: "",
      });
    } else {
      setIsActive({
        status: true,
        key,
        subMenuKey,
      });
    }
  };

  return (
    <>
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={handleMobileMenu}></div>
        <div className="close-btn" onClick={handleMobileMenu}><CloseIcon /></div>

        <nav className="menu-box">
          <div className="nav-logo">
            <Link href="/"><img src="assets/images/logo-2.png" alt="" title="" /></Link>
          </div>
          <div className="menu-outer">
            <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
              <ul className="navigation">
                <li className={isActive.key === '1' ? "dropdown current" : "dropdown"}>
                  <Link href="/">Home</Link>
                  <div className={isActive.key === '1' ? "dropdown-btn open" : "dropdown-btn"} onClick={() => handleToggle('1')}></div>
                </li>
                <li className={isActive.key === '1' ? "dropdown current" : "dropdown"}>
                  <Link href="/recipes/create">Add New Recipe</Link>
                  <div className={isActive.key === '1' ? "dropdown-btn open" : "dropdown-btn"} onClick={() => handleToggle('1')}></div>
                </li>
                <li className={isActive.key === '1' ? "dropdown current" : "dropdown"} onClick={handleLogout}>
                  <Link href={userId ? '' : '/login'}>
                    {userId ? "Logout" : "Login"}
                  </Link>
                  <div className={isActive.key === '1' ? "dropdown-btn open" : "dropdown-btn"} onClick={() => handleToggle('1')}></div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
