
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, ThumbsUp, User, Send, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const discussions = [
  {
    id: 1,
    title: "How do I implement useState with TypeScript?",
    author: "Sarah Johnson",
    course: "Web Development 101",
    replies: 5,
    likes: 12,
    isAnswered: true,
    timestamp: "2 hours ago",
    preview: "I'm having trouble with TypeScript types when using useState...",
  },
  {
    id: 2,
    title: "Database normalization best practices",
    author: "Mike Chen",
    course: "Database Systems",
    replies: 8,
    likes: 20,
    isAnswered: true,
    timestamp: "5 hours ago",
    preview: "Can someone explain the difference between 2NF and 3NF?",
  },
  {
    id: 3,
    title: "Big O notation - need clarification",
    author: "Emily Davis",
    course: "Data Structures",
    replies: 3,
    likes: 7,
    isAnswered: false,
    timestamp: "1 day ago",
    preview: "I understand O(n) but O(log n) is confusing me...",
  },
  {
    id: 4,
    title: "Color theory in modern UI design",
    author: "James Wilson",
    course: "Design Principles",
    replies: 12,
    likes: 25,
    isAnswered: true,
    timestamp: "2 days ago",
    preview: "What are the current trends in color palettes for 2024?",
  },
  {
    id: 5,
    title: "React Router v6 navigation issues",
    author: "Anna Martinez",
    course: "Web Development 101",
    replies: 2,
    likes: 5,
    isAnswered: false,
    timestamp: "3 days ago",
    preview: "My navigation is not working after upgrading to v6...",
  },
];

export default function QAndA() {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleReplyClick = (discussion) => {
    setSelectedDiscussion(discussion);
    setReplyText("");
  };

  const handleCloseDialog = () => {
    setSelectedDiscussion(null);
    setReplyText("");
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty Reply",
        description: "Please write a response before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);


    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    toast({
      title: "Reply Sent Successfully",
      description: `Your response has been posted to "${selectedDiscussion?.title}"`,
    });

    handleCloseDialog();
  };

  return (

      <div className="min-h-screen space-y-6 animate-fade-in  md:p-8 ml-0 md:ml-20 lg:ml-70">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Q&A / Discussions</h1>
            <p className=" mt-1 text-text-muted">Engage with your students and answer questions</p>
          </div>
          <Button className="bg-violet-600 text-white hover:opacity-90 transition-opacity shadow-md">
            <MessageSquare className="h-4 w-4 mr-2" />
            Start Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none shadow-md bg-surface-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-muted">Total Threads</p>
                  <p className="text-3xl font-bold mt-2">48</p>
                </div>
                <div className="p-3 rounded-xl bg-teal-500/10">
                  <MessageSquare className="h-5 w-5 text-teal-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-surface-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-muted">Unanswered</p>
                  <p className="text-3xl font-bold mt-2">6</p>
                </div>
                <div className="p-3 rounded-xl bg-red-600/10">
                  <ThumbsUp className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-surface-primary">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-text-muted">Active Users</p>
                  <p className="text-3xl font-bold mt-2">92</p>
                </div>
                <div className="p-3 rounded-xl bg-violet-600/10">
                  <User className="h-5 w-5 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-md bg-surface-primary">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Discussion Threads</CardTitle>
                <CardDescription className="pt-1 text-text-muted">Recent questions from your students</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground border border-border-light" />
                  <Input placeholder="Search discussions..." className="pl-9 border border-border-light placeholder:text-text-muted focus:!border-violet-500"  />

                </div>
                <Select defaultValue="all" >
                  <SelectTrigger className="w-32 border border-border-light">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-primary border-0">
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="web">Web Dev</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="p-5 rounded-lg bg-card hover:bg-muted/30 transition-colors  border border-border-light group"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 ">
                      <AvatarFallback className="bg-violet-400 text-white text-sm">
                        {discussion.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {discussion.title}
                        </h3>
                        {discussion.isAnswered && (
                          <Badge className="border border-violet-600 text-white">
                            Answered
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-text-muted line-clamp-1">
                        {discussion.preview}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{discussion.author}</span>
                        <span>•</span>
                        <span className="text-text-muted">{discussion.course}</span>
                        <span>•</span>
                        <span className="text-text-muted">{discussion.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">

                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4  text-red-400" />
                          <span className=" text-red-400">{discussion.likes}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleReplyClick(discussion)}
                        className="bg-violet-400 text-white hover:opacity-90 transition-opacity"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reply Dialog */}
        <Dialog open={!!selectedDiscussion} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-surface-primary border-0">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Reply to Discussion</DialogTitle>
              <DialogDescription className="text-text-muted">
                Respond to your student's question
              </DialogDescription>
            </DialogHeader>

            {selectedDiscussion && (
              <div className="space-y-6">
                {/* Original Question */}
                <div className="p-4 rounded-lg bg-gray-200/10 border border-border-medium space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9 border-2 border-primary/20">
                      <AvatarFallback className="bg-violet-600 text-white text-xs">
                        {selectedDiscussion.author.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{selectedDiscussion.author}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{selectedDiscussion.timestamp}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {selectedDiscussion.title}
                      </h3>
                      <p className="text-sm text-text-muted ">
                        {selectedDiscussion.preview}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-12">
                    <Badge variant="outline" className="text-xs border border-border-medium text-violet-600">
                      {selectedDiscussion.course}
                    </Badge>
                    {selectedDiscussion.isAnswered && (
                      <Badge className="bg-violet-600 text-white border-accent/30 text-xs">
                        Answered
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Reply Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Response
                    </label>
                    <Textarea
                      placeholder="Write a helpful response to help your student..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[160px] resize-none border border-border-medium placeholder:text-text-muted  focus:!border-violet-500"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-text-muted">
                      Be clear, supportive, and provide actionable guidance
                    </p>
                  </div>

                  {/* Loading State */}
                  {isSubmitting && (
                    <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        <span>Posting your reply...</span>
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={handleCloseDialog}
                      disabled={isSubmitting}
                      className="border border-border-medium "
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitReply}
                      disabled={isSubmitting || !replyText.trim()}
                      className="bg-violet-600 hover:opacity-90 transition-opacity text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Reply"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

  );
}










