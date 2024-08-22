import * as z from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  price: z.coerce.number().min(0),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string(),
  isFeatured: z.boolean().optional(),
});

export const categorySchema = z.object({
  title: z.string(),
  imageString: z.string(),
});
