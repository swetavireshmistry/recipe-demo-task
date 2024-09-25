import { BreadcrumbProps } from "@/types/types";
import Link from "next/link";

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbTitle }) => {
  return (
    <>
      {/* Page Title */}
      <section className="page-title" style={{ backgroundImage: 'url(assets/images/background/6.jpg)' }}>
        <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/background/pattern-7.png)' }}></div>
        <div className="auto-container">
          <h2>{breadcrumbTitle}</h2>
          <ul className="page-breadcrumb">
            <li><Link href="/">home</Link></li>
            <li>{breadcrumbTitle}</li>
          </ul>
        </div>
      </section>
      {/* End Page Title */}
    </>
  );
};

export default Breadcrumb;
