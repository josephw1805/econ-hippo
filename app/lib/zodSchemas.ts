import { z } from "zod";

export const productSchema = z.object({
  name: z.string({ message: "name is required" }),
  description: z.string({ message: "description is required" }),
  status: z.enum(["draft", "published", "archived"]),
  price: z.coerce.number({ message: "price is required" }).min(1),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["Electronic", "Pop", "Rock"]),
  isFeatured: z.boolean().optional(),
});

export const bannerSchema = z.object({
  title: z.string(),
  imageString: z.string(),
});
