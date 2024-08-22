import { Category, User } from "@prisma/client";

type ProductColumnType = {
  id: string;
  name: string;
  images: string[];
  price: number;
  category: Category;
  createdAt: Date;
};

type OrderColumnType = {
  id: string;
  user: User | null;
  status: string;
  amount: number;
  createdAt: Date;
};

type Cart = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageString: string;
  }>;
};
