
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

const CreateCoursePage = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      thumbnailUrl: '',
      videoUrl: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      console.log('Course data submitted:', data);

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Course created successfully!",
        description: "Your new course has been created.",
      });

      navigate('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: "Failed to create course",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="pt-16 md:pt-0 flex">


        <div className="flex-1 p-4 md:p-8 ml-0 md:ml-20 lg:ml-64">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Edit Course</h1>
              <p className="text-gray-600">
                Update your course details below.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input   className="block  border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="Enter course title" {...field} />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-400">
                          Give your course a clear and descriptive title.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide a detailed description of your course"

                            className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-400">
                          Describe what students will learn from this course.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >

<FormControl>
                              <SelectTrigger className="border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-soft-purple  border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                              <SelectItem className='hover:bg-primary' value="programming">Programming</SelectItem>
                              <SelectItem className='hover:bg-primary'  value="design">Design</SelectItem>
                              <SelectItem className='hover:bg-primary'  value="business">Business</SelectItem>
                              <SelectItem className='hover:bg-primary'  value="marketing">Marketing</SelectItem>
                              <SelectItem className='hover:bg-primary'  value="personal-development">Personal Development</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormDescription className="text-sm text-gray-400">
                          Choose the category that best fits your course.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail Image URL</FormLabel>
                        <FormControl>
                          <Input
                          className="block  border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="Enter thumbnail image URL"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-400">
                          Provide a URL for your course thumbnail image.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Introduction Video URL (optional)</FormLabel>
                        <FormControl>
                          <Input
                          className="block border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="Enter intro video URL"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-sm text-gray-400">
                          Add an optional introduction video for your course.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                    className="border-primary text-primary"
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/courses')}
                    >
                      Cancel
                    </Button>
                    <Button
                     className="bg-primary text-white"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating...' : 'Create Course'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
