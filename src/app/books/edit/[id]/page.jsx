"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { updateBook } from "@/redux/features/bookSlice";
import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

export default function EditBookPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = useParams();

    const { books, loading, error } = useSelector((state) => state.books);

    const book = books.find((b) => b._id === id);

    const form = useForm({
        defaultValues: {
            title: "",
            author: "",
            tags: "",
            status: "Want to Read",
        },
    });

    useEffect(() => {
        if (book) {
            form.reset({
                title: book.title,
                author: book.author,
                tags: book.tags?.join(", ") || "", 
                status: book.status,
            });
        }
    }, [book]);

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        };

        const result = await dispatch(updateBook({ id, formData }));

        if (updateBook.fulfilled.match(result)) {
            router.push("/dashboard");
        }
    };

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Book not found. <span className="text-blue-500 cursor-pointer underline" onClick={() => router.push("/dashboard")}>Go back</span></p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 sm:px-0 sm:py-0">
            <Card className="w-full max-w-[450px] shadow-md rounded-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Edit Book</CardTitle>
                    <CardDescription>Update your book details</CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <Controller
                            name="title"
                            control={form.control}
                            rules={{ required: "Title is required" }}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input {...field} placeholder="Enter book title..." className="bg-gray-50" />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="author"
                            control={form.control}
                            rules={{ required: "Author is required" }}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Author</FieldLabel>
                                    <Input {...field} placeholder="Enter author name..." className="bg-gray-50" />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="tags"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Tags <span className="text-gray-400 text-xs">(comma separated)</span></FieldLabel>
                                    <Input {...field} placeholder="fiction, thriller, horror..." className="bg-gray-50" />
                                </Field>
                            )}
                        />

                        <Controller
                            name="status"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <FieldLabel>Status</FieldLabel>
                                    <select
                                        {...field}
                                        className="w-full border rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    >
                                        <option value="Want to Read"> Want to Read</option>
                                        <option value="Reading">Reading</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </Field>
                            )}
                        />

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 cursor-pointer"
                                onClick={() => router.push("/dashboard")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white"
                            >
                                {loading ? "Updating..." : "Update Book"}
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}