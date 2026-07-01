import { useState } from "react";
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
    Search,
    Filter,
    Edit,
    Trash2,
    Share2,
    ArrowLeft,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    MoreVertical,
    PenBox,
    Trash,
    BookPlus,
    ShieldQuestion,
} from "lucide-react";
import { Link, useForm } from "@inertiajs/react";


const LessonViewPage = ({ lessons }) => {
    console.log(lessons);

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
                                                             <div className="">
              <h1 className="text-2xl md:text-3xl font-bold text-primary "> Courses Lessons</h1>
              <p className="text-secondary">
                  Review Lessons you have created
              </p>
            </div>


                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-surface-primary p-6 rounded-xl shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 " />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 " />
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
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border/30 bg-gradient-to-r from-muted/30 to-muted/20">
                                    <th className="p-4 text-left">
                                        <Checkbox

                                        />
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                        Title
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                        Content
                                    </th>
                                    <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden md:table-cell">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessons.data.map((lesson) => (
                                    <tr className="hover:bg-surface-secondary transition-colors">
                                                          <td className="p-4">
                                                                                        <Checkbox

                                                                                        />
                                                                                    </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">
                                            {lesson.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-text-secondary">
                                            {lesson.content}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild >
                                                    <Button
                                                        variant="ghost"
                                                        className="p-1 h-auto"
                                                    >
                                                        <MoreVertical className="size-5 text-primary-500" />
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className="w-40 border border-border bg-white">
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={``}
                                                            className="flex items-center gap-2 font-medium"
                                                        >
                                                            <PenBox className="h-4 w-4 opacity-80" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <form
                                                            onSubmit={submit}
                                                            className="w-full"
                                                        >
                                                            <button className="flex w-full items-center gap-2 text-red-600 font-semibold">
                                                                <Trash className="h-4 w-4 opacity-80" />
                                                                Delete
                                                            </button>
                                                        </form>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

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

export default LessonViewPage;
