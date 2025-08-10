
import { useState } from 'react';
import { Link,usePage} from "@inertiajs/react";
import {
  ChevronLeft,
  Home,
  BookOpen,
  LayoutDashboard,
  FileText,
  Upload,
  FilePlus,
  FileCheck,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight,
  PlusCircle,
  Edit,
  FolderPlus,
  BookPlus,
  FileQuestion,
  ClipboardCheck,
  ChevronDown
} from 'lucide-react';

const Sidebar = () => {
    const { auth } = usePage().props;
  const [collapsed, setCollapsed] = useState(false);
  const [openMenuPath, setOpenMenuPath] = useState(null);



  const isActive = (path) => location.pathname === path;

  // Navigation items based on user role
  const teacherNavItems = [
    {id:1, title: 'Dashboard', path: '/dashboard/teacher', icon: Home, dropicon:null },
    {id:2, title: 'My Courses', path: '/courses/my-courses', icon: BookOpen, dropicon:null },
    {
        id:3,
      title: 'Course Management',

      icon: LayoutDashboard,
      subItems: [
        { title: 'Create Course', path: '/courses/create', icon: PlusCircle },
        { title: 'Edit Courses', path: '/courses/edit', icon: Edit },
        { title: 'View Sections', path: '/sections/view', icon: BookPlus },
        { title: 'View Lessons', path: '/lessons/view', icon: BookPlus },
        { title: 'View Courses', path: '/courses', icon: BookPlus },
      ],
      dropicon: ChevronDown
    },

    {
        id:4,
      title: 'Materials',
      icon: FileText,
      subItems: [

        { title: 'View Materials', path: '/materials', icon: BookPlus },
      ],
      dropicon: ChevronDown
    },
    {
        id:5,
      title: 'Quizzes & Assessments',

      icon: FileQuestion,
      subItems: [

        { title: 'View Submissions', path: '/quiz/submissions', icon: FileCheck },
      ]
      ,
      dropicon: ChevronDown
    },
    { id:6,title: 'Analytics', path: '/analytics', icon: TrendingUp, dropicon:null },
  ];

  const studentNavItems = [
    {id:7, title: 'Dashboard', path: '/dashboard/student', icon: Home},
    {id:8, title: 'My Courses', path: '/courses/enrolled', icon: BookOpen },
    {id:9, title: 'Materials', path: '/materials/view', icon: FileText },
    {id:10, title: 'Take Quiz', path: '/quiz/take', icon: ClipboardCheck },

    {id:11, title: 'My Progress', path: '/analytics/progress', icon: TrendingUp },
  ];

  const navItems = auth.user.role === 'teacher' ? teacherNavItems : studentNavItems;

  // Bottom navigation items for all users
  const bottomNavItems = [

    { title: 'Settings', path: '/settings', icon: Settings },
    { title: 'Logout', path: '/logout', icon: LogOut },
  ];



  function handleDropdownClick(path) {
    setOpenMenuPath(prev => prev === path ? null : path);

  }



  return (
    <div
      className={`sidebar-container h-screen bg-white fixed top-0 left-0 z-40 transition-all duration-300 shadow-md overflow-auto ${
        collapsed ? 'w-20' : 'w-70'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar header with logo */}
        <div className="flex items-center justify-between p-6 ">

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-sidebar-accent text-gray-500 hover:text-primary"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1  py-4">
        <div className="text-xl px-6 pb-2 font-normal">Overview</div>
          <nav className="px-4 space-y-1.5">
            {navItems.map((item) => (
              <div key={item.title} className="space-y-1">
                <Link
                 href={item.path}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(item.path)
                      ? 'bg-soft-purple text-white font-normal'
                      : 'text-gray-600 hover:bg-sidebar-accent hover:text-primary'
                  } ${collapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  <item.icon className={`${collapsed ? 'w-6 h-6 text-gray-500' : 'w-5 h-5 '}`} />
                  <div className='flex justify-between '>
                  {!collapsed && <span className='text-sm'>{item.title}</span>}

                  <button onClick={() => handleDropdownClick(item.id)}>
                  {item.dropicon && <item.dropicon className="h-4 w-4 ml-auto" />}
                  </button>

                  </div>

                </Link>

                {openMenuPath === item.id && item.subItems && (
                  <div className="ml-8 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                    key={subItem.title}
                    href={subItem.path}
                    className={`flex items-center p-2 rounded-lg ${
                      isActive(subItem.path)
                        ? 'bg-soft-purple text-white font-medium'
                        : 'text-gray-500 hover:bg-sidebar-accent hover:text-primary'
                    } space-x-2`}
                      >
                    <subItem.icon className="w-4 h-4 " />
                    <span className="text-xs ">{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                  </div>
                ))}
              </nav>
            </div>


        <div className="p-1 ">
            {/* <div className="text-xl px-6 pb-2 font-normal">Settings</div> */}
          <div className="space-y-1 px-4">
            {bottomNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-soft-purple text-primary font-medium'
                    : 'text-gray-600 hover:bg-sidebar-accent hover:text-primary'
                } ${collapsed ? 'justify-center' : 'space-x-3'}`}
              >
                <item.icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* User info at bottom */}
        {!collapsed && (
          <div className="p-4 border-t border-primary">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">JS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  John Smith
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {auth.user.role === 'teacher' ? 'Teacher' : 'Student'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
