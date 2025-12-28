import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    BookOpen,
    Clock,
    Users,
    Star,
    PlayCircle,
    Award,
    Download,
    WandSparkles,
} from "lucide-react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import CourseContent from "../../components/course/CourseContent";
import CourseSections from "../../components/course/CourseSections";

const CourseDetailsPage = ({ course, instructor }) => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("overview");

    // Q&A state for section tab
    const [questions, setQuestions] = useState([
        {
            id: 1,
            user: { name: "Michael", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200" },
            time: "2h ago",
            text: "Can you clarify the difference between state and props?",
            answer: {
                text: "Great question — props are read-only and passed from parent; state is internal to a component and can change.",
                time: "1h ago",
            },
        },
        {
            id: 2,
            user: { name: "Sarah", avatar: "https://images.unsplash.com/photo-1545996124-1d1d1f3b8d5f?auto=format&fit=crop&q=80&w=200&h=200" },
            time: "4h ago",
            text: "Is there a recommended way to structure large components?",
            answer: null,
        },
    ]);

    const [newQuestion, setNewQuestion] = useState("");
    const [attachments, setAttachments] = useState([]);
    const textareaRef = useRef(null);

    useEffect(() => {
        // reset textarea height when question cleared
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    }, [newQuestion]);

    const insertEmoji = (emoji) => {
        setNewQuestion((s) => (s ? s + emoji : emoji));
        // focus textarea
        setTimeout(() => textareaRef.current && textareaRef.current.focus(), 50);
    };

    const handleAttach = (file) => {
        if (!file) return;
        setAttachments((prev) => [...prev, { name: file.name, size: file.size }]);
    };

    const handleSendQuestion = () => {
        if (!newQuestion.trim()) return;
        const q = {
            id: Date.now(),
            user: { name: "You", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200" },
            time: "Just now",
            text: newQuestion.trim(),
            answer: null,
        };
        setQuestions((s) => [q, ...s]);
        setNewQuestion("");
        setAttachments([]);
    };

    // Calculate total course content
    const totalVideos = course.sections.reduce((acc, section) => {
        return (
            acc +
            section.lessons.filter((lesson) => lesson.type === "video").length
        );
    }, 0);

    const totalExercises = course.sections.reduce((acc, section) => {
        return (
            acc +
            section.lessons.filter(
                (lesson) =>
                    lesson.type === "exercise" || lesson.type === "project"
            ).length
        );
    }, 0);

    return (
        <div className="min-h-screen bg-card">
            <div className="pt-24 pb-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Left 2/3 */}
                        <div className="lg:col-span-2">
                            {/* Course Content */}
                            <CourseContent course={course} />

                            <div className="bg-card mt-8 rounded-lg overflow-hidden border border-secondary-100">
                                <div className="flex overflow-x-auto">
                                    <button
                                        onClick={() => setActiveTab("overview")}
                                        className={`px-6 py-4 font-medium whitespace-nowrap ${
                                            activeTab === "overview"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-secondary-700 hover:text-primary"
                                        }`}
                                    >
                                        Overview
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveTab("curriculum")
                                        }
                                        className={`px-6 py-4 font-medium whitespace-nowrap ${
                                            activeTab === "curriculum"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-secondary-700 hover:text-primary"
                                        }`}
                                    >
                                        Curriculum
                                    </button>
                                    <button
                                        onClick={() =>
                                            setActiveTab("instructor")
                                        }
                                        className={`px-6 py-4 font-medium whitespace-nowrap ${
                                            activeTab === "instructor"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-secondary-700 hover:text-primary"
                                        }`}
                                    >
                                        Instructor
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("reviews")}
                                        className={`px-6 py-4 font-medium whitespace-nowrap ${
                                            activeTab === "reviews"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-secondary-700 hover:text-primary"
                                        }`}
                                    >
                                        Reviews
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("section")}
                                        className={`px-6 py-4 font-medium whitespace-nowrap ${
                                            activeTab === "section"
                                                ? "text-primary border-b-2 border-primary"
                                                : "text-secondary-700 hover:text-primary"
                                        }`}
                                    >
                                        Sections Overview
                                    </button>
                                </div>

                                <div className="p-6">
                                    {/* Overview Tab */}
                                    {activeTab === "overview" && (
                                        <div>
                                            <h2 className="text-xl font-bold mb-4">
                                                About This Course
                                            </h2>
                                            <p className="text-secondary-700 mb-6 whitespace-pre-line">
                                                {course.description}
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-3">
                                                        What you'll learn
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {JSON.parse(
                                                            course.benefits
                                                        ).map((benefit, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start"
                                                            >
                                                                <div className="mt-1 mr-2 text-primary">
                                                                    •
                                                                </div>
                                                                <span>
                                                                    {benefit}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-lg mb-3">
                                                        Requirements
                                                    </h3>
                                                    <ul className="space-y-2">
                                                        {JSON.parse(
                                                            course.requirements
                                                        ).map((feature, i) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start"
                                                            >
                                                                <div className="mt-1 mr-2 text-primary">
                                                                    •
                                                                </div>
                                                                <span>
                                                                    {feature}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <h3 className="font-semibold text-lg mb-3">
                                                Course Materials
                                            </h3>
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center justify-between p-3 bg-card-primary rounded-md">
                                                    <div className="flex items-center">
                                                        <BookOpen className="h-5 w-5 text-danger mr-3" />

                                                        {/* <Download className="h-5 w-5 text-blue-500 mr-3" /> */}

                                                        <div>
                                                            <p className="font-medium">
                                                                React
                                                                fundamentals
                                                            </p>
                                                            <p className="text-xs text-secondary-500">
                                                                104kb
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="text-primary hover:text-secondary">
                                                        <Download className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-card-primary p-4 rounded-md">
                                                <h3 className="font-semibold text-lg mb-2">
                                                    Certificate of Completion
                                                </h3>
                                                <p className="text-secondary-700">
                                                    Upon completing this course,
                                                    you'll receive a certificate
                                                    that you can share with your
                                                    network and potential
                                                    employers.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Curriculum Tab */}
                                    {activeTab === "curriculum" && (
                                        <div>
                                            <h2 className="text-xl font-bold mb-4">
                                                Course Curriculum
                                            </h2>
                                            <div className="flex flex-wrap gap-4 mb-6">
                                                <div className="flex items-center">
                                                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                                    <span>
                                                        {course.sections.length}{' '}
                                                        sections
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <PlayCircle className="h-5 w-5 mr-2 text-primary" />
                                                    <span>
                                                        {totalVideos} videos
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="h-5 w-5 mr-2 text-primary" />
                                                    <span>
                                                        {course.duration} total
                                                        duration
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Award className="h-5 w-5 mr-2 text-primary" />
                                                    {course.sections.map(
                                                        (section) => (
                                                            <div
                                                                key={section.id}
                                                            >
                                                                <span>
                                                                    {
                                                                        section
                                                                            .quizzes
                                                                            .length
                                                                    }
                                                                    quizzes
                                                                </span>
                                                                {/* {course.sections.reduce((sum, section) => sum + section.quizzes.length, 0)} quizzes */}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                                <div className="flex items-center">
                                                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                                                    <span>
                                                        {totalExercises}{' '}
                                                        exercises/projects
                                                    </span>
                                                </div>
                                            </div>

                                            <CourseSections
                                                sections={course.sections}
                                            />
                                        </div>
                                    )}

                                    {/* Instructor Tab */}
                                    {activeTab === "instructor" && (
                                        <div>
                                            <h2 className="text-xl font-bold mb-6">
                                                Meet Your Instructor
                                            </h2>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={instructor.profile}
                                                        alt={
                                                            instructor.fullname
                                                        }
                                                        className="w-24 h-24 rounded-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">
                                                        {instructor.fullname}
                                                    </h3>
                                                    <p className="text-secondary-700 mb-4">
                                                        {instructor.bio}
                                                    </p>

                                                    <div className="flex flex-wrap gap-4 text-sm text-secondary-700">
                                                        <div className="flex items-center">
                                                            <Star className="h-4 w-4 mr-1 text-warning fill-warning" />
                                                            <span>
                                                                4.8 Instructor
                                                                Rating
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Users className="h-4 w-4 mr-1" />
                                                            <span>
                                                                58,423 Students
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <BookOpen className="h-4 w-4 mr-1" />
                                                            <span>
                                                                12 Courses
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Reviews Tab */}
                                    {activeTab === "reviews" && (
                                        <div>
                                            <h2 className="text-xl font-bold mb-6">
                                                Student Reviews
                                            </h2>
                                            <div className="flex flex-col md:flex-row gap-6 mb-8">
                                                <div className="md:w-1/3 bg-card-primary p-6 rounded-lg text-center">
                                                    <div className="text-5xl font-bold text-primary mb-2">
                                                        {course.rating}
                                                    </div>
                                                    <div className="flex justify-center mb-2">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-5 w-5 ${
                                                                        i <
                                                                        Math.floor(
                                                                            course.rating
                                                                        )
                                                                            ? "text-warning fill-warning"
                                                                            : i <
                                                                              course.rating
                                                                            ? "text-warning fill-warning opacity-50"
                                                                            : "text-secondary-300"
                                                                    }`}
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                    <p className="text-secondary-700">
                                                        Course Rating •{' '}
                                                        {course.reviews} Reviews
                                                    </p>
                                                </div>

                                                <div className="md:w-2/3">
                                                    <h3 className="font-semibold mb-4">
                                                        Rating Distribution
                                                    </h3>
                                                    {[5, 4, 3, 2, 1].map(
                                                        (star) => {
                                                            // Simulate distribution data
                                                            const percentage =
                                                                star === 5
                                                                    ? 78
                                                                    : star === 4
                                                                    ? 15
                                                                    : star === 3
                                                                    ? 5
                                                                    : star === 2
                                                                    ? 1
                                                                    : 1;

                                                            return (
                                                                <div
                                                                    key={star}
                                                                    className="flex items-center mb-2"
                                                                >
                                                                    <div className="flex items-center w-16">
                                                                        <span className="mr-2">
                                                                            {
                                                                                star
                                                                            }
                                                                        </span>
                                                                        <Star className="h-4 w-4 text-warning fill-warning" />
                                                                    </div>
                                                                    <div className="flex-1 h-2 bg-secondary-200 rounded-full mx-2">
                                                                        <div
                                                                            className="h-2 bg-warning rounded-full"
                                                                            style={{
                                                                                width: `${percentage}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="w-12 text-right text-sm text-secondary-700">
                                                                        {
                                                                            percentage
                                                                        }
                                                                        %
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>

                                            {/* Sample Reviews */}
                                            <div className="space-y-6">
                                                <div className="border-b border-secondary-100 pb-6">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                                                                MJ
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold">
                                                                    Michael
                                                                    Johnson
                                                                </h4>
                                                                <p className="text-sm text-secondary-500">
                                                                    2 weeks ago
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className="h-4 w-4 text-warning fill-warning"
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-secondary-700">
                                                        This course exceeded my
                                                        expectations. The
                                                        content is comprehensive
                                                        and well-structured. The
                                                        instructor explains
                                                        complex concepts in an
                                                        easy-to-understand
                                                        manner. I'm now
                                                        confident in building
                                                        React applications from
                                                        scratch.
                                                    </p>
                                                </div>

                                                <div className="border-b border-secondary-100 pb-6">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white mr-3">
                                                                ST
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold">
                                                                    Sarah
                                                                    Thompson
                                                                </h4>
                                                                <p className="text-sm text-secondary-500">
                                                                    1 month ago
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${
                                                                            i <
                                                                            4
                                                                                ? "text-warning fill-warning"
                                                                                : "text-secondary-300"
                                                                        }`}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-secondary-700">
                                                        Great course overall.
                                                        The content is very
                                                        detailed and relevant.
                                                        The only thing that
                                                        could be improved is
                                                        more real-world
                                                        examples. Otherwise, I
                                                        learned a lot and would
                                                        recommend it to other
                                                        developers.
                                                    </p>
                                                </div>

                                                <div>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-info flex items-center justify-center text-white mr-3">
                                                                AR
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold">
                                                                    Alex
                                                                    Rodriguez
                                                                </h4>
                                                                <p className="text-sm text-secondary-500">
                                                                    2 months ago
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            {[...Array(5)].map(
                                                                (_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`h-4 w-4 ${
                                                                            i <
                                                                            5
                                                                                ? "text-warning fill-warning"
                                                                                : "text-secondary-300"
                                                                        }`}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <p className="text-secondary-700">
                                                        One of the best React
                                                        courses I've taken. The
                                                        instructor's teaching
                                                        style is clear and
                                                        engaging. The projects
                                                        are challenging but fun,
                                                        and they really help
                                                        solidify the concepts. I
                                                        feel much more confident
                                                        in my React skills now.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Q&A section */}
                                    {activeTab === "section" && (
                                        <div>
                                            <h2 className="text-xl font-bold mb-4">💬 Questions & Answers</h2>

                                            {/* Input box */}
                                            <div className="bg-card p-4 rounded-lg mb-6 shadow-sm">
                                                <div className="flex gap-3">
                                                    <img src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"} alt="you" className="w-10 h-10 rounded-full object-cover" />
                                                    <div className="flex-1">
                                                        <textarea
                                                            ref={textareaRef}
                                                            value={newQuestion}
                                                            onChange={(e) => setNewQuestion(e.target.value)}
                                                            onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                                                            placeholder="Ask a question about this lesson..."
                                                            className="w-full resize-none overflow-hidden rounded-xl border border-secondary-100 bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                                                            rows={1}
                                                        />

                                                        <div className="mt-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2 text-secondary-500">
                                                                <label className="flex items-center gap-2 cursor-pointer hover:text-secondary-700">
                                                                    <input type="file" className="hidden" onChange={(e) => handleAttach(e.target.files && e.target.files[0])} />
                                                                    <svg className="w-5 h-5 text-secondary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 9.828a4 4 0 10-5.656-5.656L6.344 10.172a6 6 0 108.486 8.486L20 13.657"/></svg>
                                                                    <span className="text-xs">Attach</span>
                                                                </label>

                                                                <button onClick={() => insertEmoji('😊')} className="flex items-center gap-1 text-secondary-500 hover:text-secondary-700 text-sm">
                                                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01"/></svg>
                                                                    <span className="sr-only">Insert emoji</span>
                                                                </button>
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center gap-2">
                                                                    {attachments.map((a, idx) => (
                                                                        <div key={idx} className="text-xs bg-card-muted px-2 py-1 rounded-md">{a.name}</div>
                                                                    ))}
                                                                </div>

                                                                <button
                                                                    onClick={handleSendQuestion}
                                                                    disabled={!newQuestion.trim()}
                                                                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${newQuestion.trim() ? 'bg-primary text-white' : 'bg-secondary-200 text-secondary-500 cursor-not-allowed'}`}>
                                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-9.197-5.266A1 1 0 003 6.89v10.22a1 1 0 001.555.831l9.197-5.266a1 1 0 000-1.664z"/></svg>
                                                                    <span>Send</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Questions list */}
                                            <div className="space-y-4">
                                                {questions.map((q) => (
                                                    <div key={q.id} className="bg-card rounded-lg p-4 shadow-sm border border-secondary-100 hover:shadow-md transition">
                                                        <div className="flex items-start gap-3">
                                                            <img src={q.user.avatar} alt={q.user.name} className="w-10 h-10 rounded-full object-cover" />
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        <div className="font-semibold text-secondary-900">{q.user.name}</div>
                                                                        <div className="text-xs text-secondary-500">{q.time}</div>
                                                                    </div>
                                                                    <div className="text-sm text-secondary-500">{/* optional flags */}</div>
                                                                </div>

                                                                <div className="mt-3 text-secondary-700 whitespace-pre-wrap">{q.text}</div>

                                                                <hr className="my-3 border-secondary-100" />

                                                                {q.answer ? (
                                                                    <div className="bg-card-primary p-3 rounded-lg">
                                                                        <div className="text-sm text-secondary-700">{q.answer.text}</div>
                                                                        <div className="text-xs text-secondary-500 mt-2">Answered • {q.answer.time}</div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-xs text-secondary-500">No answer yet</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right 1/3 */}
                        <div className="lg:col-span-1">
                            <div className="bg-card p-6 rounded-lg shadow-sm border border-secondary-100 sticky top-24">
                                <div className="relative aspect-video mb-6 overflow-hidden rounded-md">
                                    <img
                                        src={`/storage/${course.thumbnail}`}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <button className="bg-card/20 hover:bg-card/30 p-4 rounded-full transition-colors">
                                            <PlayCircle className="h-10 w-10 text-white" />
                                        </button>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                        Preview
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-3xl font-bold text-primary">
                                            {course.discountPrice}
                                        </span>
                                        <span className="text-lg text-secondary-500 line-through">
                                            {course.price}
                                        </span>
                                    </div>
                                    <button className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-secondary transition-colors mb-3">
                                        Enroll Now
                                    </button>
                                    <button className="w-full border border-primary text-primary py-3 rounded-md font-medium hover:bg-card-primary transition-colors">
                                        Add to Wishlist
                                    </button>
                                    <p className="text-center text-sm text-secondary-500 mt-3">
                                        30-Day Money-Back Guarantee
                                    </p>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <h3 className="font-semibold text-lg">
                                        This course includes:
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center">
                                            <PlayCircle className="h-5 w-5 text-primary mr-3" />
                                            <span>
                                                {course.duration} on-demand
                                                video
                                            </span>
                                        </li>
                                        {/* <li className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-3" />
                      <span>{course.materials.length} downloadable resources</span>
                    </li> */}
                                        <li className="flex items-center">
                                            <Award className="h-5 w-5 text-primary mr-3" />
                                            <span>
                                                Certificate of completion
                                            </span>
                                        </li>
                                        <li className="flex items-center">
                                            <Clock className="h-5 w-5 text-primary mr-3" />
                                            <span>Full lifetime access</span>
                                        </li>
                                        <li className="flex items-center">
                                            <Users className="h-5 w-5 text-primary mr-3" />
                                            <span>Access on mobile and TV</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="border-t border-secondary-100 pt-6">
                                    <h3 className="font-semibold text-lg mb-3">
                                        Share this course:
                                    </h3>
                                    <div className="flex space-x-3">
                                        <button className="bg-learnify-primary text-white p-2 rounded-full hover:opacity-90">
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                            </svg>
                                        </button>
                                        <button className="bg-learnify-secondary text-white p-2 rounded-full hover:opacity-90">
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </button>
                                        <button className="bg-learnify-tertiary text-white p-2 rounded-full hover:opacity-90">
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.553v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452z" />
                                            </svg>
                                        </button>
                                        <button className="bg-danger text-white p-2 rounded-full hover:opacity-90">
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.1.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsPage;










