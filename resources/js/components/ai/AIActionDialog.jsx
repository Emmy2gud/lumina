import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Copy, RefreshCw, Check, Sparkles, Plus } from "lucide-react";



export function AIActionDialog({
  open,
  onOpenChange,
  contentType,
  pageType,
  title,
  description,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");
  const { toast } = useToast();

  // Input state
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [context, setContext] = useState("");

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Simulate AI generation (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Mock generated content based on page type
    if (pageType === "quiz") {
      setGeneratedContent([
        { id: "1", content: "What is the primary purpose of React Hooks?", type: "multiple-choice" },
        { id: "2", content: "Which hook is used for managing state in functional components?", type: "multiple-choice" },
        { id: "3", content: "True or False: useEffect runs after every render by default.", type: "true-false" },
      ]);
    } else if (pageType === "lesson") {
      setGeneratedContent([
        { id: "summary", content: "This lesson covers the fundamentals of React Hooks, including useState, useEffect, and custom hooks. Students will learn through hands-on examples and practical exercises.", type: "summary" },
        { id: "rewrite", content: "An engaging exploration of React Hooks that transforms functional components. Discover how hooks revolutionize state management and side effects in modern React applications.", type: "rewrite" },
        { id: "objectives", content: "1. Understand the purpose of React Hooks\n2. Implement useState for state management\n3. Use useEffect for side effects\n4. Create custom hooks for reusable logic", type: "objectives" },
      ]);
    } else if (pageType === "section") {
      setGeneratedContent([
        { id: "1", content: "Introduction to useState Hook - Learn the basics of state management", type: "lesson-idea" },
        { id: "2", content: "Deep Dive into useEffect - Master side effects and lifecycle", type: "lesson-idea" },
        { id: "3", content: "Custom Hooks Workshop - Build reusable hook patterns", type: "lesson-idea" },
      ]);
    } else {
      setGeneratedContent([
        { id: "1", content: "A comprehensive course covering modern React development with hooks, context API, and advanced patterns. Perfect for developers looking to master React functional components.", type: "description" },
      ]);
    }

    setIsGenerating(false);
  };

  const handleInsert = (content) => {
    toast({
      title: "AI Content Added Successfully",
      description: "The generated content has been inserted into your page.",
      duration: 3000,
    });
    onOpenChange(false);
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to Clipboard",
      description: "Content has been copied successfully.",
      duration: 2000,
    });
  };

  const handleRegenerate = () => {
    setGeneratedContent([]);
    handleGenerate();
  };

  const renderInputSection = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="topic">Topic / Subject</Label>
        <Input
          id="topic"
          placeholder="e.g., React Hooks, Database Design"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty Level</Label>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger id="difficulty">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="context">Additional Context (Optional)</Label>
        <Textarea
          id="context"
          placeholder="Provide specific requirements, learning objectives, or constraints..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="min-h-[80px]"
        />
      </div>

      <Button
        onClick={handleGenerate}
        className="w-full bg-gradient-secondary hover:opacity-90 shadow-md"
        disabled={!topic || isGenerating}
      >
        <Wand2 className="h-4 w-4 mr-2" />
        {isGenerating ? "Generating..." : "Generate with AI"}
      </Button>
    </div>
  );

  const renderLoadingState = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-muted-foreground mb-6">
        <div className="relative">
          <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
        </div>
        <span className="text-sm font-medium">AI is generating your content...</span>
      </div>

      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
      <Skeleton className="h-32 w-full mt-6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );

  const renderQuizResults = () => (
    <div className="space-y-4">
      {generatedContent.map((question, index) => (
        <Card key={question.id} className="border-border/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    Question {index + 1}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">{question.type}</span>
                </div>
                <p className="text-sm text-foreground">{question.content}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleInsert(question.content)}
                className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-2 pt-4 border-t border-border">
        <Button onClick={() => handleInsert()} className="flex-1 bg-gradient-primary hover:opacity-90">
          <Check className="h-4 w-4 mr-2" />
          Add All Questions
        </Button>
        <Button
          variant="outline"
          onClick={() => handleCopy(generatedContent.map(q => q.content).join("\n\n"))}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy All
        </Button>
      </div>
    </div>
  );

  const renderLessonResults = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="rewrite">Rewrite</TabsTrigger>
        <TabsTrigger value="objectives">Objectives</TabsTrigger>
      </TabsList>

      {generatedContent.map((item) => (
        <TabsContent key={item.id} value={item.type} className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4 border border-border min-h-[200px]">
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
              {item.content}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handleInsert(item.content)} className="flex-1 bg-gradient-primary hover:opacity-90">
              <Check className="h-4 w-4 mr-2" />
              Insert
            </Button>
            <Button variant="outline" onClick={() => handleCopy(item.content)}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" onClick={handleRegenerate}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );

  const renderSectionResults = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {generatedContent.map((lesson, index) => (
          <Card key={lesson.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded inline-block mb-2">
                    Lesson Idea {index + 1}
                  </div>
                  <p className="text-sm text-foreground font-medium">{lesson.content}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleInsert(lesson.content)}
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(lesson.content)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCourseResults = () => (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-4 border border-border min-h-[200px]">
        <p className="text-sm text-foreground leading-relaxed">
          {generatedContent[0]?.content}
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => handleInsert(generatedContent[0]?.content)} className="flex-1 bg-gradient-primary hover:opacity-90">
          <Check className="h-4 w-4 mr-2" />
          Insert
        </Button>
        <Button variant="outline" onClick={() => handleCopy(generatedContent[0]?.content)}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button variant="outline" onClick={handleRegenerate}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>
    </div>
  );

  const renderResults = () => {
    if (pageType === "quiz") return renderQuizResults();
    if (pageType === "lesson") return renderLessonResults();
    if (pageType === "section") return renderSectionResults();
    return renderCourseResults();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {generatedContent.length === 0 && !isGenerating && renderInputSection()}
          {isGenerating && renderLoadingState()}
          {generatedContent.length > 0 && !isGenerating && renderResults()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
