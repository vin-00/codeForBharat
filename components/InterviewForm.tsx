'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

// Define the form schema with validation
const formSchema = z.object({
  role: z.string().min(2, { message: 'Role is required' }),
  level: z.enum(['entry', 'mid', 'senior'], {
    required_error: 'Please select an experience level',
  }),
  type: z.enum(['behavioural', 'technical', 'mixed'], {
    required_error: 'Please select an interview type',
  }),
  techstack: z.string().min(2, { message: 'Tech stack is required' }),
  amount: z.coerce
    .number()
    .min(1, { message: 'Minimum 1 question required' })
    .max(20, { message: 'Maximum 20 questions allowed' }),
  visibility: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface InterviewFormProps {
  userId?: string;
}

const InterviewForm = ({ userId }: InterviewFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      level: 'mid',
      type: 'mixed',
      techstack: '',
      amount: 5,
      visibility: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!userId) {
      toast.error('You must be logged in to create an interview');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/vapi/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          userid: userId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Interview generated successfully!');
        router.push('/');
      } else {
        toast.error('Failed to generate interview. Please try again.');
      }
    } catch (error) {
      console.error('Error generating interview:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[85%] mx-auto p-8 bg-gradient-to-br from-dark-300 via-dark-200/90 to-dark-300 rounded-2xl border border-dark-100 shadow-xl relative overflow-hidden" style={{ backgroundColor: 'rgba(103, 93, 146, 0.05)' }}>
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'var(--bg-pattern)' }}></div>
      
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-light-400 to-primary-100 rounded-t-2xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-primary-100 mb-2 text-center">Create Your Interview</h2>
        <p className="text-primary-300 text-center mb-8">Customize your interview experience with the options below</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 divide-y divide-dark-100">
          <div className="pt-8">
            {/* Role Field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-100 text-lg font-medium">Job Role</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-dark-100/50 border-dark-100 focus:border-primary-200 text-primary-100 h-12 rounded-xl" 
                      placeholder="e.g. Frontend Developer" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-destructive-100" />
                </FormItem>
              )}
            />
          </div>

          {/* Experience Level Field */}
          <FormItem className="space-y-4 mt-8">
            <FormLabel className="text-primary-100 text-lg font-medium">Experience Level</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['entry', 'mid', 'senior'].map((level) => (
                <label
                  key={level}
                  className={`flex items-center justify-center space-x-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${form.watch('level') === level ? 'border-primary-200 bg-dark-100/70' : 'border-dark-100 bg-dark-100/30 hover:bg-dark-100/50'}`}
                >
                  <input
                    type="radio"
                    value={level}
                    {...form.register('level')}
                    className="h-5 w-5 text-primary-200 focus:ring-primary-200 hidden"
                  />
                  <span className={`text-lg capitalize ${form.watch('level') === level ? 'text-primary-100 font-medium' : 'text-primary-300'}`}>
                    {level === 'entry' ? 'Entry Level' : level === 'mid' ? 'Mid Level' : 'Senior Level'}
                  </span>
                </label>
              ))}
            </div>
            {form.formState.errors.level && (
              <p className="text-destructive-100 text-sm">{form.formState.errors.level.message}</p>
            )}
          </FormItem>

          {/* Interview Type Field */}
          <FormItem className="space-y-4 mt-8">
            <FormLabel className="text-primary-100 text-lg font-medium">Interview Type</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['behavioural', 'technical', 'mixed'].map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center space-x-3 cursor-pointer p-4 rounded-xl border-2 transition-all ${form.watch('type') === type ? 'border-primary-200 bg-dark-100/70' : 'border-dark-100 bg-dark-100/30 hover:bg-dark-100/50'}`}
                >
                  <input
                    type="radio"
                    value={type}
                    {...form.register('type')}
                    className="h-5 w-5 text-primary-200 focus:ring-primary-200 hidden"
                  />
                  <span className={`text-lg capitalize ${form.watch('type') === type ? 'text-primary-100 font-medium' : 'text-primary-300'}`}>
                    {type}
                  </span>
                </label>
              ))}
            </div>
            {form.formState.errors.type && (
              <p className="text-destructive-100 text-sm">{form.formState.errors.type.message}</p>
            )}
          </FormItem>

          {/* Tech Stack Field */}
          <FormField
            control={form.control}
            name="techstack"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel className="text-primary-100 text-lg font-medium">Tech Stack</FormLabel>
                <FormControl>
                  <Input 
                    className="bg-dark-100/50 border-dark-100 focus:border-primary-200 text-primary-100 h-12 rounded-xl" 
                    placeholder="e.g. React, Node.js, MongoDB" 
                    {...field} 
                  />
                </FormControl>
                <p className="text-sm text-primary-300 mt-2 flex items-center gap-2">
                  <Info size={16} />
                  Separate technologies with commas
                </p>
                <FormMessage className="text-destructive-100" />
              </FormItem>
            )}
          />

          {/* Number of Questions Field */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="mt-8">
                <FormLabel className="text-primary-100 text-lg font-medium">Number of Questions</FormLabel>
                <div className="flex items-center space-x-4">
                  <FormControl>
                    <Input 
                      type="number" 
                      className="bg-dark-100/50 border-dark-100 focus:border-primary-200 text-primary-100 h-12 rounded-xl w-24 text-center" 
                      min={1} 
                      max={20} 
                      {...field} 
                    />
                  </FormControl>
                  <div className="flex-1 h-2 bg-dark-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-200 to-primary-100" 
                      style={{ width: `${(field.value / 20) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-primary-300 w-16 text-right">Max: 20</span>
                </div>
                <FormMessage className="text-destructive-100" />
              </FormItem>
            )}
          />

          {/* Visibility Field */}
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="mt-8 flex flex-row items-center justify-between rounded-xl p-4 border border-dark-100 bg-dark-100/30 transition-all duration-300 hover:border-primary-200/50">
                <div className="space-y-0.5">
                  <FormLabel className="text-primary-100 text-lg font-medium">
                    {field.value ? "Public Interview" : "Private Interview"}
                  </FormLabel>
                  <p className="text-sm text-primary-300">
                    {field.value 
                      ? "This interview will be visible to other users" 
                      : "This interview will only be visible to you"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium transition-colors ${field.value ? "text-success-100" : "text-destructive-100"}`}>
                    {field.value ? "Public" : "Private"}
                  </span>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={`data-[state=checked]:bg-primary-200 ${field.value ? "bg-success-100/20" : "bg-destructive-100/20"}`}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full mt-8 text-dark-300 font-bold py-4 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-primary-200/30 relative overflow-hidden group" 
            disabled={isSubmitting}
            style={{
              background: 'linear-gradient(90deg, #cac5fe 0%, #8a82d8 50%, #dddfff 100%)',
              backgroundSize: '200% 100%',
              animation: 'gradientShift 3s ease infinite',
            }}
          >
            <style jsx>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300 inline-block">
              {isSubmitting ? 'Generating Interview...' : 'Generate Interview'}
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white"></div>
          </Button>
        </form>
      </Form>
    </div>
    </div>
  );
};

export default InterviewForm;