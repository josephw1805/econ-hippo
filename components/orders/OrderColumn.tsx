"use client";

import { OrderColumnType } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "id",
    header: "Order",
  },
  {
    accessorKey: "user",
    header: "Customer",
    cell: ({ row }) => (
      <>
        <p className="font-medium">
          {row.original.user?.firstName} {row.original.user?.lastName}
        </p>
        <p className="hidden md:flex text-sm text-muted-foreground">
          {row.original.user?.email}
        </p>
      </>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>{formatPrice(row.original.amount / 100)}</span>,
  },
];
