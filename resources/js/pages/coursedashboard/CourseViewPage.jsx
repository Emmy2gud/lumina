import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

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
        <div className="flex min-h-screen bg-gray-50">
            {/* Main Content Area */}
            <div className="flex-1 p-8 ml-64">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/dashboard/teacher"
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">
                            My Courses
                        </h1>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Courses
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <select
                                value={selectedFilter}
                                onChange={(e) =>
                                    setSelectedFilter(e.target.value)
                                }
                                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Course Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Instructor
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Category
                                    </th>
                                    {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">description</th> */}
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Last Updated
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {courses.data.map((course) => (
                                    <tr
                                        key={course.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="font-normal text-sm text-gray-900">
                                                        {course.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {/* {JSON.parse(course.features).map((feature, i) => (
          <li key={i}>{feature}</li>
        ))} */}
                                        {course.user.fullname}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
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
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            2024-04-05
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {/* <div className="flex justify-end space-x-3">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div> */}
                                            <div className="flex justify-end space-x-3  ">
                                                <Menu
                                                    as="div"
                                                    className="absolute inline-block text-left  -mt-2"
                                                >
                                                    <div>
                                                        <MenuButton className="inline-flex w-full justify-center border-0 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">
                                                            <MoreVertical
                                                                aria-hidden="true"
                                                                className="-mr-1 size-5 text-primary"
                                                            />
                                                        </MenuButton>
                                                    </div>

                                                    <MenuItems
                                                        transition
                                                        className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                                    >
                                                        <div className="py-1">
                                                            <MenuItem>
                                                                <Link
                                                                    href={``}
                                                                    className="flex px-4 py-2 text-sm font-semibold text-primary-500 data-focus:bg-gray-100  data-focus:outline-hidden  hover:bg-primary-300 hover:text-primary-500"
                                                                >
                                                                    <PenBox className="h-5 w-5 mr-1" />{" "}
                                                                    Edit
                                                                </Link>
                                                            </MenuItem>

                                                            <form
                                                                onSubmit={
                                                                    submit
                                                                }
                                                            >
                                                                <MenuItem>
                                                                   <form
                                                                    onSubmit={
                                                                        submit
                                                                    }
                                                                >
                                                                    <MenuItem>
                                                                        <button className="flex w-full px-4 py-2 text-sm text-red-600 text-left font-semibold   data-focus:outline-hidden hover:bg-red-300 hover:text-red-900">
                                                                            <Trash className="h-5 w-5 mr-1 opacity-80" />{" "}
                                                                            Delete
                                                                        </button>
                                                                    </MenuItem>
                                                                </form>
                                                                </MenuItem>



                                                                <div>
                                                                    <Link
                                                                        href={`/courses/${course.id}/sections/create`}
                                                                        className="flex px-4 py-2 text-sm font-semibold text-primary-500 data-focus:bg-gray-100  data-focus:outline-hidden  hover:bg-soft-purple hover:text-white"
                                                                    >
                                                                        <BookPlus className="h-5 w-5 mr-1 opacity-80" />{" "}
                                                                        Add
                                                                        section
                                                                    </Link>

                                                                    <Link
                                                                        href={`/courses/${course.id}/materials/create`}
                                                                        className="flex px-4 py-2 text-sm font-semibold text-primary-500 data-focus:bg-gray-100  data-focus:outline-hidden  hover:bg-soft-purple hover:text-white"
                                                                    >
                                                                        <BookPlus className="h-5 w-5 mr-1 opacity-80" />{" "}
                                                                        Add
                                                                        Materials
                                                                    </Link>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </MenuItems>
                                                </Menu>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewPage;
