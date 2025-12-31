import { useState } from 'react';
import {
  ChevronLeft,
  Home,
  BookOpen,
  LayoutDashboard,
  FileText,
  FilePlus,
  FileCheck,
  TrendingUp,
  Settings,
  LogOut,
  ChevronRight,
  PlusCircle,
  Edit,
  BookPlus,
  FileQuestion,
  ClipboardCheck,
  ChevronDown,
  Package,
  MessageCircle,
  Sparkles,
  Bot,
  Menu,
  X,
  Trophy
} from 'lucide-react';
import { usePage,Link } from '@inertiajs/react';
import { useSidebar } from '../../contexts/SidebarContext';

const Sidebar = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenuPath, setOpenMenuPath] = useState(null);
    const { auth, categories, cartCount, cart } = usePage().props;


  const isActive = (path) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === path;
    }
    return false;
  };

  const teacherNavItems = [
    {
      id: 1,
      title: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      dropicon: null
    },
    {
      id: 3,
      title: 'Course Management',
      icon: LayoutDashboard,
      subItems: [
        { title: 'Create Course', path: '/courses/create', icon: PlusCircle },
        { title: 'View Sections', path: '/sections/view', icon: BookPlus },
        { title: 'View Lessons', path: '/lessons/view', icon: BookPlus },
        { title: 'View Courses', path: '/courses', icon: BookPlus },
      ],
      dropicon: ChevronDown
    },
    {
      id: 4,
      title: 'Materials',
      icon: FileText,
      subItems: [
        { title: 'View Materials', path: '/materials', icon: BookPlus },
      ],
      dropicon: ChevronDown
    },
    {
      id: 5,
      title: 'Quizzes & Assessments',
      icon: FileQuestion,
      subItems: [
        { title: 'View Submissions', path: '/quiz/submissions', icon: FileCheck },
      ],
      dropicon: ChevronDown
    },
    {
      id: 13,
      title: 'Q&A / Discussions',
      path: '/q&asection',
      icon: MessageCircle,
      dropicon: null
    },
    {
      id: 6,
      title: 'Analytics',
      path: '/analytics',
      icon: TrendingUp,
      dropicon: null
    },
  ];

  const studentNavItems = [
    { id: 7, title: 'Dashboard', path: '/dashboard/student', icon: Home },
    { id: 8, title: 'My Courses', path: '/student/courses', icon: BookOpen },
    { id: 10, title: 'Quiz Assessment', path: '/student/submissions', icon: ClipboardCheck },
    { id: 12, title: 'LeaderBoard', path: '/leaderboard', icon: Trophy },
        {
      id: 13,
      title: 'AI Teaching Assistant',
      path: "/ai",
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500'
    },
  ];


  const navItems = auth.user.role === 'teacher' ? teacherNavItems : studentNavItems;

  const bottomNavItems = [
    { title: 'Settings', path: '/settings', icon: Settings },
    { title: 'Logout', path: '/logout', icon: LogOut },
  ];

  function handleDropdownClick(e, itemId) {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuPath(prev => prev === itemId ? null : itemId);
  }

  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className=" font-bold text-sm text-white ">L</span>
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 text-lg ">Lumina</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-indigo-600 transition-all duration-200 hidden lg:block"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-5 px-3">


        <nav className="space-y-1">
          {navItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <Link
                href={item.path || '#'}
                onClick={item.subItems ? (e) => handleDropdownClick(e, item.id) : handleNavClick}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                    : 'text-slate-700 hover:bg-slate-100'
                } ${collapsed ? 'justify-center' : 'justify-between'}`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`${
                    isActive(item.path) ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'
                  } ${collapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-colors`} />
                  {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                </div>
                {!collapsed && item.dropicon && (
                  <item.dropicon className={`h-4 w-4 transition-transform duration-200 ${
                    openMenuPath === item.id ? 'rotate-180' : ''
                  }`} />
                )}
              </Link>

              {openMenuPath === item.id && item.subItems && !collapsed && (
                <div className="ml-4 pl-4 border-l-2 border-slate-200 space-y-1 mt-1">
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.path}
                      onClick={handleNavClick}
                      className={`flex items-center p-2.5 rounded-lg transition-all duration-200 ${
                        isActive(subItem.path)
                          ? 'bg-indigo-50 text-indigo-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                      }`}
                    >
                      <subItem.icon className="w-4 h-4 mr-2" />
                      <span className="text-xs">{subItem.title}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>


      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-200 p-3">
        <div className="space-y-1 mb-3">
          {bottomNavItems.map((item) => (
            <a
              key={item.title}
              href={item.path}
              onClick={handleNavClick}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-slate-200 text-slate-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              } ${collapsed ? 'justify-center' : 'space-x-3'}`}
            >
              <item.icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </a>
          ))}
        </div>

        {/* User Profile */}
        {!collapsed && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">
                  {auth.user.fullname}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {auth.user.name}
                </p>
                <p className="text-sm text-slate-500 truncate">
                  {auth.user.role === 'teacher' ? '👨‍🏫 Teacher' : '👨‍🎓 Student'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-1 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50"
      >
        <Menu size={24} className="text-slate-700" />

      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-2xl z-50 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-72'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <SidebarContent />
      </div>

    </>
  );
};

export default Sidebar;
