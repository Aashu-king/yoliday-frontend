"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';


interface UserDropdownInterface {
    name: string,
    id: string
}

interface CategoryDropdownInterface {
    name: string,
    id: string
}

const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8080/user/dropdown');
    return res.data.data;
};

const fetchCategories = async () => {
    const res = await axios.get('http://localhost:8080/category/dropdown');
    return res.data.data;
};

const createProject = async (data: ProjectFormData) => {
    const response = await axios.post('http://localhost:8080/project', data);
    return response.data;
};

const projectSchema = z.object({
    title: z.string().min(1, 'Title is required').regex(/^[a-zA-Z0-9 ]{3,100}$/, 'Title must be 3-100 characters'),
    description: z.string().optional(),
    category: z.string().uuid('Invalid category ID'),
    author: z.string().uuid('Invalid author ID'),
    projectImages: z.array(
        z.object({
            base64Image: z.string(),
            fileName: z.string(),
            caption: z.string().optional(),
        })
    ).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function CreateProjectForm() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const projectImages = watch('projectImages') || [];

    const {
        data: users = [],
        isLoading: usersLoading,
        error: usersError,
    } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });

    const {
        data: categories = [],
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });



    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const base64Files: ProjectFormData['projectImages'] = [];

        for (const file of Array.from(files)) {
            const base64 = await convertToBase64(file);
            base64Files.push({ base64Image: base64, fileName: file.name });
        }

        setSelectedFiles(Array.from(files));
        setValue('projectImages', base64Files);
    };

    const removeImage = (index: number) => {
        const updatedSelected = selectedFiles.filter((_, i) => i !== index);
        const updatedImages = projectImages.filter((_, i) => i !== index);

        setSelectedFiles(updatedSelected);
        setValue('projectImages', updatedImages);
    };


    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const {
        mutate: submitProject,
        isPending: isSubmitting,
    } = useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            toast.success(data.message || 'Project created successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            const msg = error.response?.data?.message || 'Something went wrong';
            toast.error(msg);
        },
    });

    const onSubmit = (data: ProjectFormData) => {
        submitProject(data);
    };

    if (usersLoading || categoriesLoading) return <p>Loading dropdowns...</p>;
    if (usersError || categoriesError) return <p>Failed to load dropdowns</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
            <div>
                <label htmlFor="title">Project Title</label>
                <Input id="title" {...register('title')} />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <Textarea id="description" {...register('description')} />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                <Select onValueChange={(value) => setValue('category', value)} defaultValue={watch('category')}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select an category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category: UserDropdownInterface) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>
            <div>
                <label htmlFor="author" className="block text-sm font-medium mb-1">Author</label>
                <Select onValueChange={(value) => setValue('author', value)} defaultValue={watch('author')}>
                    <SelectTrigger id="author">
                        <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user: CategoryDropdownInterface) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
            </div>
            <div>
                <label htmlFor="projectImages" className="block mb-2 font-medium">Project Images</label>

                <div className="relative">
                    <Input
                        type="file"
                        id="projectImages"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="opacity-0 absolute w-full h-full cursor-pointer z-10"
                    />
                    <div className="border px-4 py-2 rounded-md bg-white shadow-sm pointer-events-none">
                        Click to select images
                    </div>
                </div>

                {errors.projectImages && (
                    <p className="text-red-500 text-sm">{errors.projectImages.message}</p>
                )}
            </div>
            {projectImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                    {projectImages.map((img, idx) => (
                        <div key={idx} className="rounded-lg border shadow-sm p-2 flex flex-col items-center bg-muted relative">
                            <div className="relative w-full h-40">
                                <Image
                                    src={img.base64Image}
                                    alt={img.fileName}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </div>
                            <p className="text-xs mt-2 text-center break-words">{img.fileName}</p>
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}



            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
        </form>
    );
}
