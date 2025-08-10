import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UploadIcon } from 'lucide-react';



const AddLessonsPage = ({section}) => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    file_upload: '',
    duration: '',



  });

  function submit(e) {
    e.preventDefault();
    post(`/sections/${section.id}/lessons`, {
        forceFormData: true,
      });

    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
    }, 1000);
}

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 md:pt-0 flex">
        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add Lessons for your courses</h1>
              <p className="text-gray-600">
                Fill in the details below to create your new lessons
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form onSubmit={submit} className="space-y-6" encType='multipart/form-data'>
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>

                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Enter course title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.title}</p>
                  )}
                  {/* <p className="text-sm text-gray-400">
                    Give your course a clear and descriptive title.
                  </p> */}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder="Provide a detailed description of your course"
                    className="block min-h-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  />
                  {errors.content && (
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.content}</p>
                  )}


                  {/* <p className="text-sm text-gray-400">
                    Describe what students will learn from this course.
                  </p> */}
                </div>


<div className="space-y-2">
  <Label htmlFor="video">video upload</Label>
  <div className="relative">

    <input
      id="video"
      type="file"
      accept="video/*"
      onChange={(e) => setData('file_upload', e.target.files[0])}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />

    {/* Visible styled element */}
    <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm hover:border-primary transition-colors">
      <UploadIcon className="w-5 h-5 text-gray-400" />
      <span className="text-sm text-gray-500">
        {data.file_upload ? data.file_upload.name : 'Click to upload thumbnail'}
      </span>
    </div>
  </div>
  {errors.file_upload && (
    <p className="text-sm text-red-500 font-medium">{errors.file_upload}</p>
  )}
</div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Duration</Label>
                  <Input
                    id="videoUrl"
                    value={data.duration}
                    onChange={(e) => setData('duration', e.target.value)}
                    className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="Enter leson video "
                  />
                  {errors.duration && (
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.duration}</p>
                  )}
                  {/* <p className="text-sm text-gray-400">
                    Add an optional introduction video for your course.
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

export default AddLessonsPage;
