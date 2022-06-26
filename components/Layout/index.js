import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="footer-layout">
      <Header />
      <div className="pr-2 pl-2 footer-layout-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
