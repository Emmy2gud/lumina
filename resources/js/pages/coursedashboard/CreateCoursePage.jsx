import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, UploadIcon } from 'lucide-react';
import { AIActionDialog } from '@/components/ai/AIActionDialog';

const CreateCoursePage = () => {

      const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("quiz");

  function   handleTemplateClick(type) {
    if (type === "section") {
      setSelectedType("section");
    } else {
      setSelectedType(type);
    }
    setAiDialogOpen(true);
  };
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    category: '',
    thumbnail:null,
    requirements:'',
    benefits:'',
    features:'',

  });

  // local UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (data.thumbnail) {
      const url = URL.createObjectURL(data.thumbnail);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [data.thumbnail]);

  function submit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    post('/courses', {
      forceFormData: true,
      onFinish: () => setIsSubmitting(false),
    });
  }
    const courseCategories = [
        { title: "Web Development" },
        { title: "Data Science" },
        { title: "Machine Learning"},
        { title: "Mobile Development" },
        { title: "Cloud Computing"},
        { title: "Cyber Security"},
        { title: "AI & ML"},
        { title: "Game Development" },
    ];
  return (
    <div className="min-h-screen bg-surface-secondary py-12">
      <div className="pt-16 md:pt-0 flex">
        <div className="max-w-6xl mx-auto ml-75 ">
   <div className="backdrop-blur-lg  ">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Create New Course
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Fill in the details below to create your new course. Make it clear and descriptive so students know what to expect.
            </p>
          </div>

          <div className="flex justify-center">
            <button
     onClick={() => handleTemplateClick( "quiz" )}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-pulse" />
                <span className="text-lg">AI Question Generator</span>
                <div className="w-2 h-2 bg-surface-primary rounded-full animate-ping"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

        <AIActionDialog
          open={aiDialogOpen}
          onOpenChange={setAiDialogOpen}
          contentType={selectedType === "quiz" ? "quiz" : "section"}
          pageType={selectedType}
          title={`Generate ${selectedType === "quiz" ? "Quiz Questions" : selectedType === "lesson" ? "Lesson Plan" : "Lesson Ideas"}`}
          description={`Create ${selectedType} content using AI based on your requirements`}
        />
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Main form column */}
          <div className="md:col-span-8">
            <div className="bg-surface-primary p-8 rounded-2xl shadow-md border border-gray-100">
              <form onSubmit={submit} className="space-y-6" encType='multipart/form-data'>
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-text-secondary">Course Title</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-2 w-full px-4 py-3 rounded-xl border-border-light shadow-sm bg-surface-primary text-base"
                    placeholder="e.g. Complete React Developer Course"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 font-medium mt-2">{errors.title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-text-secondary">Course Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Write a compelling summary of what students will learn"
                    className="mt-2 w-full min-h-[160px] px-4 py-3 rounded-xl border-border-light shadow-sm bg-surface-primary text-base"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 font-medium mt-2">{errors.description}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="benefits" className="text-sm font-medium text-text-secondary">Benefits</Label>
                    <Textarea
                      id="benefits"
                      value={data.benefits}
                      onChange={(e) => setData('benefits', e.target.value)}
                      placeholder="What will students gain?"
                      className="mt-2 w-full min-h-[120px] px-4 py-3 rounded-xl border-border-light shadow-sm bg-surface-primary text-base"
                    />
                    {errors.benefits && (
                      <p className="text-sm text-red-500 font-medium mt-2">{errors.benefits}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="features" className="text-sm font-medium text-text-secondary">Features (comma separated)</Label>
                    <Input
                      id="Features"
                      value={data.features}
                      onChange={(e) => setData('features', e.target.value)}
                      className="mt-2 w-full px-4 py-3 rounded-xl border-border-light shadow-sm bg-surface-primary text-base"
                      placeholder="e.g. 12 hours, quizzes, projects"
                    />
                    {errors.features && (
                      <p className="text-sm text-red-500 font-medium mt-2">{errors.features}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="requirements" className="text-sm font-medium text-text-secondary">Requirements</Label>
                    <Input
                      id="requirements"
                      value={data.requirements}
                      onChange={(e) => setData('requirements', e.target.value)}
                      className="mt-2 w-full px-4 py-3 rounded-xl border-border-light shadow-sm bg-surface-primary text-base"
                      placeholder="e.g. Basic JavaScript knowledge"
                    />
                    {errors.requirements && (
                      <p className="text-sm text-red-500 font-medium mt-2">{errors.requirements}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-text-secondary">Category</Label>
                    <Select
                      value={data.category}
                      onValueChange={(value) => setData('category', value)}
                    >
                      <SelectTrigger className="mt-2 w-full rounded-xl border-border-light shadow-sm bg-surface-primary">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-gray-100 shadow-sm">
                        {courseCategories.map((category) => (
                          <SelectItem key={category.title} value={category.title} className="text-sm">
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm font-medium text-red-500 mt-2">{errors.category}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    className="border border-border-light text-text-secondary bg-surface-primary"
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary text-white px-6"
                    type="submit"
                    disabled={processing || isSubmitting}
                  >
                    {processing || isSubmitting ? 'Creating...' : 'Create Course'}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right column - thumbnail + preview + tips */}
          <aside className="md:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-surface-primary p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-3">Course Thumbnail</h3>
                <div className="relative">
                  <input
                    id="thumbnailImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setData('thumbnail', e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-2xl"
                  />

                  <div className="flex items-center justify-between gap-3 px-4 py-4 rounded-xl border border-dashed border-border-light hover:border-primary transition-colors">
                    <div className="flex items-center gap-3">
                      <UploadIcon className="w-6 h-6 text-text-muted" />
                      <div>
                        <div className="text-sm font-medium">Upload thumbnail</div>
                        <div className="text-xs text-gray-500">PNG or JPG, recommended 1280×720</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Browse</div>
                  </div>

                  {previewUrl && (
                    <div className="mt-4">
                      <img src={previewUrl} alt="preview" className="w-full rounded-xl object-cover h-40" />
                    </div>
                  )}

                  {errors.thumbnail && (
                    <p className="text-sm text-red-500 font-medium mt-2">{errors.thumbnail}</p>
                  )}
                </div>
              </div>

              <div className="bg-surface-primary p-6 rounded-2xl shadow-sm border border-gray-100 text-sm text-text-secondary">
                <h4 className="font-medium mb-2">Tips for a great course</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Write a clear, outcome-focused description.</li>
                  <li>Use an eye-catching thumbnail image.</li>
                  <li>Break content into short lessons and include exercises.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
     </div>
  );
};

export default CreateCoursePage;










