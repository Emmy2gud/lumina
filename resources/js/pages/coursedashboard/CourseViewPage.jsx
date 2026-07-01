import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    MoreVertical,
    PenBox,
    Trash,
    BookPlus,
} from "lucide-react";
import {
    Search,
    Filter,
    Edit,
    Trash2,
    Share2,
    ArrowLeft,
    Eye,
} from "lucide-react";
import { Link, usePage, useForm } from "@inertiajs/react";

const CourseViewPage = ({ courses }) => {
    console.log(courses);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const { delete: destroy } = useForm();

    function submit(e) {
        e.preventDefault();
        destroy(``);
    }

    return (
        <div className="flex min-h-screen bg-surface-secondary">
            {/* Main Content Area */}
            <div className="flex-1 p-8 ">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/dashboard/teacher"
                            className="p-2 hover:bg-surface-tertiary rounded-full transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-primary" />
                        </Link>
                                 <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary ">Create Courses</h1>
              <p className="text-secondary">
                Fill in the details below to create your course section
              </p>
            </div>

                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Courses
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-surface-primary p-6 rounded-xl shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-text-muted" />
                            <select
                                value={selectedFilter}
                                onChange={(e) =>
                                    setSelectedFilter(e.target.value)
                                }
                                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="all">All Courses</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
         <Card className="border border-border/40 bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
    <table className="w-full">
                    <thead>
                        <tr className="border-b border-border/30 bg-gradient-to-r from-muted/30 to-muted/20">
                            <th className="p-4 text-left">
                                <Checkbox />
                            </th>


                                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                                    Course Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                                    Instructor
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                                    Category
                                </th>
                                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">description</th> */}
                                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                                    Last Updated
                                </th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-text-secondary">
                                    Actions
                                </th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {courses.data.map((course) => (
                            <tr
                                key={course.id}
                                className="hover:bg-surface-secondary transition-colors"
                            >
                                <th className="p-4 text-left">
                                    <Checkbox />
                                </th>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div>
                                            <div className="font-normal text-sm text-text-primary">
                                                {course.title}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-text-secondary">
                                    {/* {JSON.parse(course.features).map((feature, i) => (
          <li key={i}>{feature}</li>
        ))} */}
                                    {course.user.fullname}
                                </td>
                                <td className="px-6 py-4 text-sm text-text-secondary">
                                    {course.category}
                                </td>

                                <td className="px-6 py-4">
                                    {/* <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        course.status === 'Published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>

                        {course.status}
                      </span> */}

                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}
                                    >
                                        published
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-text-secondary">
                                    2024-04-05
                                </td>

                                <td className="px-6 py-4 justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="p-1 h-auto"
                                            >
                                                <MoreVertical className="size-5 text-gray-500" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent className="w-40 border border-border bg-white">
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={``}
                                                    className="flex items-center gap-2 font-medium"
                                                >
                                                    <PenBox className="h-5 w-5 mr-1" />{" "}
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuItem>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            section.course_id,
                                                            section.id,
                                                        )
                                                    }
                                                    className="flex w-full items-center gap-2 font-semibold text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash className="h-4 w-4 opacity-80" />
                                                    Delete
                                                </button>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/courses/${course.id}/sections/create`}
                                                    className="flex items-center gap-2 font-medium"
                                                >
                                                    <BookPlus className="h-5 w-5 mr-1 opacity-80" />{" "}
                                                    Add section
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={`/courses/${course.id}/materials/create`}
                                                    className="flex items-center gap-2 font-medium"
                                                >
                                                    <BookPlus className="h-5 w-5 mr-1 opacity-80" />{" "}
                                                    Add Materials
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

           {/* Pagination */}
                    <div className="flex items-center justify-between p-6 border-t border-border/30 bg-muted/5">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        href="#"
                                        isActive
                                        className="bg-gradient-primary border-0 text-white"
                                    >
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
         </Card>


            </div>
        </div>
    );
};

export default CourseViewPage;
