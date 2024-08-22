"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ProductColumnType } from "@/lib/types";

export const columns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const flattenUrls = row.original.images
        .flatMap((urlString) => urlString.split(",").map((url) => url.trim()))
      return (
        <Image
          src={flattenUrls[0]}
          height={64}
          width={64}
          alt="Product image"
          className="rounded-md object-cover h-16 w-16"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span>{row.original.category.title}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>{formatPrice(row.original.price)}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span>
        {new Intl.DateTimeFormat("en-US").format(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/products/${row.original.id}`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/products/${row.original.id}/delete`}>
              Delete
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
