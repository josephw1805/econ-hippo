import { deleteCategory, deleteProduct } from "@/app/actions";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteRoute({ params }: { params: { id: string } }) {
  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            product.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard/category">Cancel</Link>
          </Button>
          <form action={deleteCategory}>
            <input hidden name="categoryId" value={params.id} readOnly />
            <SubmitButton text="Continue" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
