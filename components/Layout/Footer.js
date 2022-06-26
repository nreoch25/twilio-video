const Footer = () => {
  return (
    <footer
      className="mt-3 text-white p-2 pl-3 text-center"
      style={{ backgroundColor: "#343A40", fontSize: "12px" }}
    >
      © {new Date().getFullYear()} Realtor.com Inc, All Rights Reserved
    </footer>
  );
};

export default Footer;
