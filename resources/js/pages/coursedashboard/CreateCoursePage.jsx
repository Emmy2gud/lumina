import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UploadIcon } from 'lucide-react';

const CreateCoursePage = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    category: '',
    thumbnail:null,
    requirements:'',
    benefits:'',
    features:'',

  });

  function submit(e) {
    e.preventDefault();
    post('/courses', {
        forceFormData: true,
      });

    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
    }, 1000);
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
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 md:pt-0 flex">
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create New Course</h1>
              <p className="text-gray-600">
                Fill in the details below to create your new course
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form onSubmit={submit} className="space-y-6" encType='multipart/form-data'>
                <div className="space-y-2">
                  {/* <Label htmlFor="title">Course Title</Label> */}

                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Enter course title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 font-medium ">{errors.title}</p>
                  )}
                  {/* <p className="text-sm text-gray-400">
                    Give your course a clear and descriptive title.
                  </p> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Provide a detailed description of your course"
                    className="block min-h-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 font-medium ">{errors.description}</p>
                  )}


                  {/* <p className="text-sm text-gray-400">
                    Describe what students will learn from this course.
                  </p> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Benefits</Label>
                  <Textarea
                    id="description"
                    value={data.benefits}
                    onChange={(e) => setData('benefits', e.target.value)}
                    placeholder="Provide a detailed description of your course"
                    className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  {errors.benefits && (
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.benefits}</p>
                  )}

                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={data.category}
                    onValueChange={(value) => setData('category', value)}
                  >
                    <SelectTrigger className="border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-soft-purple border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                 {
    courseCategories.map((category) => (
        <SelectItem key={category.id} className=" text-white" value={category.title}>
            {category.title}
        </SelectItem>
    ))
}


                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm font-medium text-destructive">{errors.category}</p>
                  )}
                  <p className="text-sm text-gray-400">
                    Choose the category that best fits your course.
                  </p>
                </div>

<div className="space-y-2">
  <Label htmlFor="thumbnailImage">Thumbnail Image</Label>
  <div className="relative">

    <input
      id="thumbnailImage"
      type="file"
      accept="image/*"
      onChange={(e) => setData('thumbnail', e.target.files[0])}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />

    {/* Visible styled element */}
    <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm hover:border-primary transition-colors">
      <UploadIcon className="w-5 h-5 text-gray-400" />
      <span className="text-sm text-gray-500">
        {data.thumbnail ? data.thumbnail.name : 'Click to upload thumbnail'}
      </span>
    </div>
  </div>
  {errors.thumbnail && (
    <p className="text-sm text-red-500 font-medium">{errors.thumbnail}</p>
  )}
</div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Requirements</Label>
                  <Input
                    id="videoUrl"
                    value={data.requirements}
                    onChange={(e) => setData('requirements', e.target.value)}
                    className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Enter intro video URL"
                  />
                  {errors.requirements && (
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.requirements}</p>
                  )}
                  {/* <p className="text-sm text-gray-400">
                    Add an optional introduction video for your course.
                  </p> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Features">Features</Label>
                  <Input
                    id="Features"
                    value={data.features}
                    onChange={(e) => setData('features', e.target.value)}
                    className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Enter features"
                  />
                  {errors.features && (
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.features}</p>
                  )}
                  {/* <p className="text-sm text-gray-400">
                    Add courses features that will be covered in the course.

                  </p> */}
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    className="border-primary text-primary"
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary text-white"
                    type="submit"
                    disabled={processing}
                  >
                    {processing ? 'Creating...' : 'Create Course'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
