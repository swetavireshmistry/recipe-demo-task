import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <>
            {/* Footer Style Three */}
            <footer className="footer-style-three">
                <div className="auto-container">
                    {/* Widgets Section */}
                    <div className="widgets-section">
                        <div className="row clearfix">
                            {/* Footer Column */}
                            <div className="footer-column col-lg-12 col-md-12 col-sm-12">
                                <div className="footer-widget logo-widget">
                                    <div className="logo">
                                        <Link href="/"><img src="/assets/images/logo-2.png" alt="" /></Link>
                                    </div>
                                    <div className="copyright">&copy; 2024 <Link href="/">foodily</Link> All Rights Reserved.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
