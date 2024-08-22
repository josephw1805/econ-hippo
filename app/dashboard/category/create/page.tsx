"use client";

import { createCategory } from "@/app/actions";
import { SubmitButton } from "@/components/custom/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { categorySchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function CreateRoute() {
  const [image, setImages] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createCategory, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: categorySchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/category">
            <ChevronLeft />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">New Category</h1>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
          <CardDescription>
            In this form you can create your category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Category title"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Image</Label>
              <input
                hidden
                value={image}
                key={fields.imageString.key}
                name={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt="Category Image"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-cover border rounded-lg"
                />
              ) : (
                <UploadDropzone
                  endpoint="categoryImageRoute"
                  onClientUploadComplete={(res) => {
                    setImages(res[0].url);
                  }}
                  onUploadError={() => {
                    alert("Something went wrong");
                  }}
                />
              )}
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Category" />
        </CardFooter>
      </Card>
    </form>
  );
}
