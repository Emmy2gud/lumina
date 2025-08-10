
import { useState } from 'react';


import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { File, Upload, UploadIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
const UploadMaterialPage = ({course}) => {
    console.log(course)


  const [selectedFile, setSelectedFile] = useState(null);

const { data, setData, post, processing, errors } = useForm({

    title: '',
    description: '',
    relatedCourse:null,
    file_upload: '',
    file_type: '',
    file_size: '',

  });
  const submit = (e) => {
    e.preventDefault();

    post( `/courses/${course.id}/materials`);
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-16 md:pt-0 flex">

        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Upload Teaching Material</h1>
              <p className="text-gray-600">
                Share resources and materials with your students
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={submit} className="space-y-6" encType='multipart/form-data'>
                <div className="space-y-2">
                  <Label htmlFor="title">Material Title</Label>

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
                    <p className="text-sm text-red-500 font-medium text-destructive">{errors.description}</p>
                  )}


                  {/* <p className="text-sm text-gray-400">
                    Describe what students will learn from this course.
                  </p> */}
                </div>


             <div className="space-y-2">
                  <Label htmlFor="relatedCourse">Category</Label>
                  <Select
                    value={data.relatedCourse}
                    onValueChange={(value) => setData('relatedCourse', value)}
                  >
                    <SelectTrigger className="border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-soft-purple border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                      <SelectItem className='hover:bg-primary' value={course.title}>{course.title}</SelectItem>

                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm font-medium text-destructive">{errors.category}</p>
                  )}
                  <p className="text-sm text-gray-400">
                    Choose the category that best fits your course.
                  </p>
                </div>
                {/* create select input for related course without using select component */}
                {/* <div className="space-y-2">
                    <Label htmlFor="relatedCourse">Related Course</Label>
        <select
          id="relatedCourse"
            value={data.relatedCourse}
            onChange={(e) => setData('relatedCourse', e.target.value)}
            className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
        >
            <option value="" disabled>Select a course</option>
            <option value={course.id}>{course.title}</option>
        </select>
        {errors.relatedCourse && (
            <p className="text-sm text-red-500 font-medium text-destructive">{errors.relatedCourse}</p>
        )}
                </div> */}



<div className="relative my-6">
        <input
          id="id-dropzone01"
          name="file-upload"
          type="file"
          className="hidden"

          accept="application/pdf"


          onChange={(e) => {
            setData('file_upload', e.target.files[0]);
            handleFileChange(e);
          }
          }
        />
        <label
          for="id-dropzone01"
          className="relative flex cursor-pointer flex-col items-center gap-4 rounded border border-dashed border-slate-300 px-3 py-6 text-center text-sm font-medium transition-colors"
        >
          <span className="inline-flex h-12 items-center justify-center self-center rounded-full bg-slate-100/70 px-3 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="File input icon"
              role="graphics-symbol"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
          </span>
          <span className="text-slate-500">
            Drag & drop or
            <span className="text-primary"> upload a file</span>
          </span>
        </label>
      </div>

    {/* div for file type and size input*/}
    <div className="space-y-2">
                    <Label htmlFor="fileType">File Type</Label>
                    <Input
                      id="fileType"
                      value={data.file_type}
                      onChange={(e) => setData('file_type', e.target.value)}
                      className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="Enter file type (e.g., PDF, DOCX)"
                    />
                    {errors.file_type && (
                        <p className="text-sm text-red-500 font-medium text-destructive">{errors.file_type}</p>
                        )}

                </div>
                <div className="space-y-2">
                    <Label htmlFor="fileSize">File Size</Label>
                    <Input
                      id="fileSize"
                      value={data.file_size}
                      onChange={(e) => setData('file_size', e.target.value)}
                      className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                      placeholder="Enter file size (e.g., 10MB)"
                    />
                    {errors.file_size && (
                        <p className="text-sm text-red-500 font-medium text-destructive">{errors.file_size}</p>
                        )}

                </div>



                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                    className="border-primary text-primary"
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/materials')}
                    >
                      Cancel
                    </Button>
                    <Button
                        className="bg-primary text-white"
                      type="submit"
                      disabled={processing}
                    >
                      {processing ? 'Uploading...' : 'Upload Material'}
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

export default UploadMaterialPage;
