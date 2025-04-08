"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FolderPlus, Layers, Users, Folder } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { getUsers } from '@/services/userService'
import { useQuery } from '@tanstack/react-query'

const DashboardCards = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    useEffect(() => {
        if (data && data.length > 0) {

            const { id, name } = data[0];
            const firstUser = { id, name };

            localStorage.setItem("firstUser", JSON.stringify(firstUser));
        }
    }, [data]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error Loading.</div>;

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4">

            <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Post Project</CardTitle>
                    <Plus className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <Link href="/projects" className="w-full">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            Create
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Post Category</CardTitle>
                    <FolderPlus className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <Link href="/category" className="w-full">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                            Create
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
                    <Layers className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-semibold text-gray-800">124</p>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Categories</CardTitle>
                    <Folder className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-semibold text-gray-800">15</p>
                </CardContent>
            </Card>

            <Card className="bg-white shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
                    <Users className="h-5 w-5 text-orange-500" />
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-semibold text-gray-800">342</p>
                </CardContent>
            </Card>

        </div>
    )
}

export default DashboardCards
