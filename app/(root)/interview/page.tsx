import InterviewForm from '@/components/InterviewForm'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'
import { redirect } from 'next/navigation'

const page = async () => {
  const user = await getCurrentUser();
  
  // Redirect if not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="w-full mx-auto py-12 px-4 bg-dark-300">
      <h1 className="text-4xl font-bold text-primary-100 mb-4 text-center">Interview Generation</h1>
      <p className="text-center text-primary-300 mb-12 max-w-2xl mx-auto">
        Create a customized interview experience tailored to your specific needs and requirements.
      </p>
      <InterviewForm userId={user.id} />
    </div>
  )
}

export default page