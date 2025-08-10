import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { UploadIcon } from 'lucide-react';

const AddSectionPage = ({course}) => {

  const { data, setData, post, processing, errors } = useForm({
title: '',
order: 0,

  });

  function submit(e) {
    e.preventDefault();

    post(`/courses/${course.id}/sections`, {
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create New Course</h1>
              <p className="text-gray-600">
                Fill in the details below to create your course section
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form onSubmit={submit} className="space-y-6" encType='multipart/form-data'>
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>

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

export default AddSectionPage;
