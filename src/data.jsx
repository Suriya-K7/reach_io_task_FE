import { FaBug, FaPowerOff, FaHome, FaMoneyCheckAlt } from "react-icons/fa";
import {
  BsFillDiagram3Fill,
  BsDatabaseFillAdd,
  BsPersonVcard,
} from "react-icons/bs";

/*static data*/
export const navBarLink = [
  {
    id: 0,
    name: "Home",
    icon: <FaHome />,
    link: "/",
  },
  {
    id: 1,
    name: "Dashboard",
    icon: <BsFillDiagram3Fill />,
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Add Expense",
    icon: <BsDatabaseFillAdd />,
    link: "/addexpense",
  },
  {
    id: 3,
    name: "Profile",
    icon: <BsPersonVcard />,
    link: "/profile",
  },
  {
    id: 6,
    name: "Donate",
    icon: <FaMoneyCheckAlt />,
    link: "/supportdev",
  },
  {
    id: 4,
    name: "Report Bug",
    icon: <FaBug />,
    link: "/reportbug",
  },
  {
    id: 5,
    name: "Log-Out",
    icon: <FaPowerOff />,
    link: "/",
  },
];
