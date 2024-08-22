import {
  FileText,
  Home,
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
} from "lucide-react";

export const dashboardNavLinks = [
  {
    url: "/dashboard",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/dashboard/category",
    icon: <Shapes />,
    label: "Category",
  },
  {
    url: "/dashboard/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/dashboard/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
];

export const storeNavLinks = [
  {
    url: "/",
    icon: <Home />,
    label: "Home",
  },
  {
    url: "/about",
    icon: <FileText />,
    label: "About",
  },
];
