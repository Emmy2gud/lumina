import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Plus, Trash2, Clock, GraduationCap } from "lucide-react";

const QuestionForm = ({ section }) => {
    console.log(section);
    const [questionCount, setQuestionCount] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        duration: 30,
        passing_score	: 60,
        coursetitle: "",
        questions: [
            {
                question: "",
                points: 10,
                options: [
                    { option: "", is_correct: false },
                    { option: "", is_correct: false },
                    { option: "", is_correct: false },
                    { option: "", is_correct: false },
                ],
            },
        ],
    });

    function submit(e) {
        e.preventDefault();
        post(`/sections/${section.id}/quizzes`);
    }

    const addQuestion = () => {
        setData("questions", [
            ...data.questions,
            {
                text: "",
                points: 10,
                options: [
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                    { text: "", isCorrect: false },
                ],
            },
        ]);
        setQuestionCount((prev) => prev + 1);
    };

    const removeQuestion = (index) => {
        const newQuestions = data.questions.filter((_, i) => i !== index);
        setData("questions", newQuestions);
        setQuestionCount((prev) => prev - 1);
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <Card className="w-full border-primary">
                <CardHeader>
                    <CardTitle>Quiz Details</CardTitle>
                    <CardDescription>
                        Enter the basic information about your quiz
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Quiz Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                placeholder="Enter quiz title"
                                className=" border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coursetitle">Select Course</Label>
                            <Input
                                id="course"
                                value={data.coursetitle}
                                onChange={(e) =>
                                    setData("coursetitle", e.target.value)
                                }
                                placeholder="Select associated course"
                                className=" border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes)</Label>
                            <div className="relative">
                                <Clock className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="duration"
                                    type="number"
                                    className=" pl-9 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                    value={data.duration}
                                    onChange={(e) =>
                                        setData("duration", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="passingScore">
                                Passing Score (%)
                            </Label>
                            <div className="relative">
                                <GraduationCap className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    id="passingScore"
                                    type="number"
                                    className=" pl-9 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                    value={data.passing_score	}
                                    onChange={(e) =>
                                        setData("passing_score	", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Quiz Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Enter quiz description"
                            className=" min-h-[100px] border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {data.questions.map((question, qIndex) => (
                <Card key={qIndex} className="w-full border-primary">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Question {qIndex + 1}</CardTitle>


                        {questionCount > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuestion(qIndex)}
                            >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-1 ">
                                <div className="space-y-2 ">
                                    <Label>Question Text</Label>
                                    <Textarea
                                        value={question.question}
                                        className="mt-2 min-h-6.5 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                        onChange={(e) => {
                                            const updatedQuestions = [
                                                ...data.questions,
                                            ];
                                            updatedQuestions[qIndex].question =
                                                e.target.value;
                                            setData(
                                                "questions",
                                                updatedQuestions
                                            );
                                        }}
                                        placeholder="Enter your question"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                class="block border rounded-sm border-primary mt-7 min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-primary sm:text-sm/6"
                                placeholder="type your points..."
                                value={question.points}
                                onChange={(e) => {
                                    const updatedQuestions = [
                                        ...data.questions,
                                    ];
                                    updatedQuestions[qIndex].points =
                                        e.target.value;
                                    setData("questions", updatedQuestions);
                                }}
                            />
                        </div>
                            </div>

                            <div className="space-y-4">
                                <Label>Answer Options</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    {question.options.map(
                                        (option, optIndex) => (
                                            <div
                                                key={optIndex}
                                                className="flex items-center gap-3"
                                            >
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`question-${qIndex}`}
                                                        checked={
                                                            option.is_correct
                                                        }
                                                        onChange={() => {
                                                            const updatedQuestions =
                                                                [
                                                                    ...data.questions,
                                                                ];
                                                            updatedQuestions[
                                                                qIndex
                                                            ].options.forEach(
                                                                (opt, idx) => {
                                                                    opt.is_correct =
                                                                        idx ===
                                                                        optIndex;
                                                                }
                                                            );
                                                            setData(
                                                                "questions",
                                                                updatedQuestions
                                                            );
                                                        }}
                                                        className="w-4 h-4 text-primary border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                                    />
                                                </label>
                                                <Input
                                                    value={option.option}
                                                    onChange={(e) => {
                                                        const updatedQuestions =
                                                            [...data.questions];
                                                        updatedQuestions[
                                                            qIndex
                                                        ].options[
                                                            optIndex
                                                        ].option= e.target.value;
                                                        setData(
                                                            "questions",
                                                            updatedQuestions
                                                        );
                                                    }}
                                                    placeholder={`Option ${
                                                        optIndex + 1
                                                    }`}
                                                    className="flex-1 text-primary border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="space-y-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={addQuestion}
                    className="w-full border-primary hover:bg-primary hover:text-white"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                </Button>

                <Button type="submit" className="w-full text-white">
                    Save Quiz
                </Button>
            </div>
        </form>
    );
};

export default QuestionForm;
