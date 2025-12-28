import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Upload,
    BookOpen,
    Award,
    Calendar,
    Eye,
    EyeOff,
} from "lucide-react";
import { Link,useForm,usePage} from "@inertiajs/react";


const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { auth } = usePage().props;
    // Profile form state
    const [formData, setFormData] = useState({
        fullName: "John Smith",
        email: "john.smith@example.com",
        role: "student",
        bio: "A passionate learner focused on web development and UI design.",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        skills: ["JavaScript", "React", "CSS", "HTML", "UI Design"],
        profilePhoto:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    });

;



const {data, setData, post, processing, errors} = useForm({
    fullname:auth.user.fullname || '',
    role:auth.user.role || '',
    bio: auth.user.bio ||'',
    profile: null ||'',
})
const submit = (e) => {
    e.preventDefault();
    post(`/profiles/${auth.user.id}`, data);
};

    // Handle removing a skill
    const handleRemoveSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((skill) => skill !== skillToRemove),
        });
    };

    // Sample certificates
    const certificates = [
        {
            id: 1,
            title: "React Fundamentals",
            issueDate: "August 15, 2023",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=100&h=70",
        },
        {
            id: 2,
            title: "UI Design Principles",
            issueDate: "September 22, 2023",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=100&h=70",
        },
    ];


    const accountActivity = [
        {
            id: 1,
            action: "Course completion",
            details: "Completed React Fundamentals",
            date: "October 12, 2023",
        },
        {
            id: 2,
            action: "Account login",
            details: "Login from new device (Chrome on Windows)",
            date: "October 10, 2023",
        },
        {
            id: 3,
            action: "Password changed",
            details: "Password successfully updated",
            date: "September 28, 2023",
        },
        {
            id: 4,
            action: "Course enrollment",
            details: "Enrolled in UI Design Principles",
            date: "September 20, 2023",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="md:col-span-1">
                            <div className="bg-surface-primary rounded-2xl shadow-lg p-6 border border-slate-200 sticky top-24">

                                <div className="text-center mb-8">
                                    <div className="relative w-28 h-28 mx-auto mb-4">
                                        <img
                                            src={formData.profilePhoto}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover border-4 border-purple-400/50 shadow-xl"
                                        />

                                    </div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-1">
                                        {formData.fullName}
                                    </h2>
                                    <p className="text-slate-600 capitalize text-sm font-medium tracking-wide">
                                        {formData.role}
                                    </p>

                                    {!isEditing && (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                    <Link href="/dashboard">
                                        <button
                                            className="mt-6 mx-2 inline-flex items-center justify-center rounded-xl bg-slate-100 border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 hover:border-slate-400 transition-all duration-300"
                                        >
                                            Dashboard
                                        </button>
                                    </Link>
                                </div>

                                {/* Navigation */}
                                <nav className="space-y-2 border-t border-slate-200 pt-6 mt-6">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`flex items-center w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                                            activeTab === "profile"
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <User className="h-5 w-5 mr-3" />
                                        Profile Information
                                    </button>

                                    <button
                                        onClick={() =>
                                            setActiveTab("certificates")
                                        }
                                        className={`flex items-center w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                                            activeTab === "certificates"
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <Award className="h-5 w-5 mr-3" />
                                        Certificates
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("security")}
                                        className={`flex items-center w-full px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                                            activeTab === "security"
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        <Lock className="h-5 w-5 mr-3" />
                                        Security
                                    </button>
                                </nav>

                                {/* Account Stats */}
                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4 text-sm tracking-wide uppercase">
                                        Account Stats
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">
                                                Enrolled Courses
                                            </span>
                                            <span className="font-bold text-slate-900 text-lg">
                                                3
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">
                                                Completed Courses
                                            </span>
                                            <span className="font-bold text-slate-900 text-lg">
                                                2
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">
                                                Certificates Earned
                                            </span>
                                            <span className="font-bold text-slate-900 text-lg">
                                                2
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600 text-sm">
                                                Account Created
                                            </span>
                                            <span className="font-bold text-slate-900 text-lg">
                                                Aug 2023
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2">
                            {/* Profile Information Tab */}
                            {activeTab === "profile" && (
                                <div className="bg-surface-primary rounded-2xl shadow-lg p-8 border border-slate-200">


                                    <form onSubmit={submit}>
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                            Profile Information
                                        </h2>
                                        {isEditing ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setIsEditing(false)
                                                    }
                                                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all duration-300"
                                                >
                                                    Cancel
                                                </button>
                                                <button

                                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    setIsEditing(true)
                                                }
                                                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all duration-300 md:hidden"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                        <div className="space-y-6">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Full Name
                                                </label>
                                                {isEditing ? (
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <User className="h-5 w-5 text-purple-400" />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            value={data.fullname}
                                                            onChange={(e) =>setData('fullname', e.target.value)}
                                                            className="block w-full pl-10 py-2.5 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"

                                                        />

{errors.fullname && (
    <p className="text-sm text-red-600 font-medium">{errors.fullname}</p>
  )}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <User className="h-5 w-5 text-purple-400 mr-3" />
                                                        <span className="text-slate-900 font-medium">
                                                            {formData.fullName}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div>

                                                {isEditing  ? (
                                                    <div className="relative hidden">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <Mail className="h-5 w-5 text-purple-400" />
                                                        </div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            onChange={(e) =>setData('email', e.target.value)}
                                                            className="w-full pl-10 py-2.5 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"

                                                        />
                                                    </div>
                                                ) : (

                                                    <div>

<label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Email Address
                                                </label>
                                        <div className="flex items-center">

                                                        <Mail className="h-5 w-5 text-purple-400 mr-3" />
                                                        <span className="text-slate-900 font-medium">
                                                            {formData.email}
                                                        </span>
                                                    </div>
                                                    </div>

                                                )}
                                            </div>

                                            {/* Role */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Account Type
                                                </label>
                                                {isEditing ? (
                                                    <div className="relative">
                                                        <select
                                                            name="role"
                                                            value={data.role}
                                                            onChange={(e)=>setData('role',e.target.value)}
                                                            className="block w-full py-2.5 pl-3 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        >
                                                            <option value="student">
                                                                Student
                                                            </option>
                                                            <option value="teacher">
                                                                Teacher
                                                            </option>
                                                        </select>

                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <BookOpen className="h-5 w-5 text-purple-400 mr-3" />
                                                        <span className="text-slate-900 font-medium capitalize">
                                                            {formData.role}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bio */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Bio
                                                </label>
                                                {isEditing ? (
                                                    <textarea
                                                        name="bio"
                                                        value={data.bio}
                                                        onChange={(e) =>setData('bio', e.target.value)}
                                                        rows={4}
                                                        className="block w-full py-2.5 px-3 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                                        placeholder="Tell others about yourself..."
                                                    ></textarea>


                                                ) : (
                                                    <p className="text-slate-700 leading-relaxed">
                                                        {formData.bio}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Skills */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Skills
                                                </label>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {formData.skills.map(
                                                        (skill) => (
                                                            <div
                                                                key={skill}
                                                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md ${
                                                                    isEditing
                                                                        ? "pr-1"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {skill}
                                                                {isEditing && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleRemoveSkill(
                                                                                skill
                                                                            )
                                                                        }
                                                                        className="ml-1.5 text-white hover:text-red-200 focus:outline-none font-bold"
                                                                    >
                                                                        &times;
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                {isEditing && (
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={data.skills}
                                                            onChange={(e) =>setData('skills', e.target.value)}
                                                            placeholder="Add a skill (press Enter)"
                                                            className="block w-full py-2.5 px-3 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"


                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* profile upload */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Profile Photo
                                                </label>
                                                {isEditing ? (
                                              <div class="relative inline-flex items-center w-full gap-2 my-6 text-sm border rounded border-slate-300 text-slate-600">
                                              <input id="file-upload" name="file-upload" type="file"   className="w-full h-full peer order-2 [&::file-selector-button]:hidden " />
                                              <label for="file-upload" class="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-semibold tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-purple-500/50 focus:shadow-lg focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-purple-600 peer-disabled:bg-purple-600"> Upload a file </label>
                                            </div>


                                                ) : (
                                                    <img
                                                        src={
                                                            formData.profilePhoto
                                                        }
                                                        alt="Profile"
                                                        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-purple-400/50 shadow-lg"
                                                    />
                                                )}
                                                 </div>
                                        </div>
                                    </form>

                                    {/* Account Activity */}
                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <h3 className="font-bold text-slate-900 text-lg mb-4">
                                            Recent Account Activity
                                        </h3>
                                        <div className="space-y-3">
                                            {accountActivity.map((activity) => (
                                                <div
                                                    key={activity.id}
                                                    className="flex items-start bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg p-4 border border-slate-200"
                                                >
                                                    <div className="bg-gradient-to-br from-purple-600/30 to-indigo-600/30 p-2.5 rounded-lg mr-3">
                                                        <Calendar className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-slate-900">
                                                            {activity.action}
                                                        </h4>
                                                        <p className="text-sm text-slate-600 mt-1">
                                                            {activity.details}
                                                        </p>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            {activity.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Certificates Tab */}
                            {activeTab === "certificates" && (
                                <div className="bg-surface-primary rounded-2xl shadow-lg p-8 border border-slate-200">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                                        Your Certificates
                                    </h2>

                                    <div className="space-y-6">
                                        {certificates.map((cert) => (
                                            <div
                                                key={cert.id}
                                                className="flex items-center bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:shadow-lg"
                                            >
                                                <img
                                                    src={cert.image}
                                                    alt={cert.title}
                                                    className="w-16 h-16 object-cover rounded-lg mr-4 border border-slate-200"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-slate-900">
                                                        {cert.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        Issued on{" "}
                                                        {cert.issueDate}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="p-2 text-purple-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                                        <Eye className="h-5 w-5" />
                                                    </button>
                                                    <button className="p-2 text-purple-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                                        <Download className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {certificates.length === 0 && (
                                            <div className="text-center py-12">
                                                <Award className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                                <h3 className="font-semibold text-slate-700 mb-1 text-lg">
                                                    No Certificates Yet
                                                </h3>
                                                <p className="text-slate-600">
                                                    Complete a course to earn
                                                    your first certificate!
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 p-6 rounded-xl border border-purple-200">
                                        <h3 className="font-semibold text-slate-900 mb-2">
                                            Share Your Achievements
                                        </h3>
                                        <p className="text-sm text-slate-700 mb-4">
                                            Showcase your certificates on your
                                            resume or social media profiles to
                                            highlight your skills.
                                        </p>
                                        <div className="flex space-x-3">
                                            <button className="bg-[#0e76a8] text-white p-2 rounded-full hover:opacity-90">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.553v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452z" />
                                                </svg>
                                            </button>
                                            <button className="bg-[#1da1f2] text-white p-2 rounded-full hover:opacity-90">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === "security" && (
                                <div className="bg-surface-primary rounded-2xl shadow-lg p-8 border border-slate-200">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                                        Security Settings
                                    </h2>

                                    <form>
                                        <div className="space-y-6">
                                            {/* Current Password */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Current Password
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Lock className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="currentPassword"
                                                        value={
                                                            formData.currentPassword
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="block w-full pl-10 pr-10 py-2.5 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        placeholder="••••••••"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowPassword(
                                                                    !showPassword
                                                                )
                                                            }
                                                            className="text-slate-600 hover:text-slate-900 focus:outline-none transition-colors"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-5 w-5" />
                                                            ) : (
                                                                <Eye className="h-5 w-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* New Password */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Lock className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="newPassword"
                                                        value={
                                                            formData.newPassword
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="block w-full pl-10 pr-10 py-2.5 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                                <p className="mt-2 text-xs text-slate-600">
                                                    Password must be at least 8
                                                    characters and include
                                                    uppercase, lowercase,
                                                    number, and symbol.
                                                </p>
                                            </div>

                                            {/* Confirm New Password */}
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-900 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Lock className="h-5 w-5 text-purple-600" />
                                                    </div>
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        name="confirmPassword"
                                                        value={
                                                            formData.confirmPassword
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="block w-full pl-10 pr-10 py-2.5 bg-surface-primary border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                                                >
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <h3 className="font-bold text-slate-900 text-lg mb-4">
                                            Two-Factor Authentication
                                        </h3>
                                        <p className="text-slate-700 mb-4">
                                            Add an extra layer of security to
                                            your account by enabling two-factor
                                            authentication.
                                        </p>
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-slate-100 border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all duration-300">
                                            Enable 2FA
                                        </button>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <h3 className="font-bold text-slate-900 text-lg mb-4">
                                            Session Management
                                        </h3>
                                        <p className="text-slate-700 mb-4">
                                            View and manage your active sessions
                                            across different devices.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">
                                                        Current Device
                                                    </h4>
                                                    <p className="text-xs text-slate-600 mt-1">
                                                        Chrome on Windows • IP:
                                                        192.168.1.xxx
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                                                    Active
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">
                                                        Mobile App
                                                    </h4>
                                                    <p className="text-xs text-slate-600 mt-1">
                                                        iPhone • Last active: 2
                                                        days ago
                                                    </p>
                                                </div>
                                                <button className="text-sm text-red-600 hover:text-red-800 font-semibold">
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;










