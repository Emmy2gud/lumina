import { useState } from 'react';

import { Search, Filter, Edit, Trash2, Share2, ArrowLeft, Eye } from 'lucide-react';

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
    MoreHorizontal,
    MoreVertical,
    PenBox,
    Trash,
    BookPlus,
    ShieldQuestion,
} from "lucide-react";
import { Link, useForm } from "@inertiajs/react";


const LessonViewPage = ({lessons}) => {
console.log(lessons)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
            <Link to="/dashboard/teacher" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Courses Lessons</h1>
          </div>

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
                onChange={(e) => setSelectedFilter(e.target.value)}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">content</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">action</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
{lessons.map((lesson) => (
                  <tr  className="hover:bg-gray-50 transition-colors">

                  <td className="px-6 py-4 text-sm text-gray-600">{lesson.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lesson.content}</td>


                  <td className="px-6 py-4 text-right">

                    <div className="flex justify-end space-x-3  ">
                        <Menu
                              as="div"
                              className={"absolute top-100 md:top-86 mb-2 md:mt-0 z-10 inline-block  "}
                          >
                              <div>
                                  <MenuButton className="inline-flex w-full   justify-center border-0 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">
                                      <MoreVertical
                                          aria-hidden="true"
                                          className="-mr-1 size-5 text-gray-400 md:text-primary"
                                      />
                                  </MenuButton>
                              </div>

                              <MenuItems
                                  transition
                                  className=" md:absolute md:right-0  mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                              >
                                  <div className="py-1 ">
                                      <MenuItem>
                                          <Link
                                              href={``}
                                              className="flex px-4 py-2 text-sm font-semibold text-primary-500 data-focus:bg-gray-100  data-focus:outline-hidden  hover:bg-primary-300 hover:text-primary-500"
                                          >
                                              <PenBox className="h-5 w-5 mr-1 opacity-80" /> Edit
                                          </Link>
                                      </MenuItem>

                                      <form onSubmit={submit}>
                                          <MenuItem>
                                              <button className="flex w-full px-4 py-2 text-sm text-red-600 text-left font-semibold   data-focus:outline-hidden hover:bg-red-300 hover:text-red-900">
                                                  <Trash className="h-5 w-5 mr-1 opacity-80" />{" "}
                                                  Delete
                                              </button>
                                          </MenuItem>
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

export default LessonViewPage;

