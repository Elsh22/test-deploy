import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "../../components/Form/TopBar";
import Provider from '../../components/Form/Provider';
import ToasterContext from '../../components/Form/ToasterContext';

const inter = Inter({ subsets: ["latin"] });

const Layout2 = ({ children }) => {
  return (
    <div><ToasterContext /><div className="mt-20"><TopBar /></div>{children}</div>
  );
}
export default Layout2;