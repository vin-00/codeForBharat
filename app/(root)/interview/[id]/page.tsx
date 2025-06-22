import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.actions';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

import { getTechLogos } from '@/lib/utils';

const page = async ({params} : RouteParams) => {

    const { id } = await params;
    const interview = await getInterviewById(id);
    const user = await getCurrentUser();
    const techstack = interview?.techstack;
    if(!interview) redirect('/');

    // Get user's initial for avatar and color
    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const avatarColor = user?.avatarColor || 'bg-blue-500'; // Default to blue if no color is set


  return (
    <>
        <div className='flex flex-row gap-4 justify-between' >
            <div className='flex flex-row gap-4 items-center max-sm:flex-col' >
                <div className='flex flex-row gap-4 items-center' >
                <Image 
                    src={techstack?.length ? (await getTechLogos([techstack[Math.floor(Math.random() * techstack.length)]]))[0].url : '/tech.svg'} 
                    alt="tech logo" 
                    width={90} 
                    height={90} 
                    className="rounded-full object-fit size-[90px]" 
                />
                    <h3 className='capitalize' >{interview.role} </h3>
                </div>

                <DisplayTechIcons techStack={interview.techstack}  />

            </div>

            <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize' >{interview.type}</p>

        </div>

        <Agent userName={user?.name || ''} userInitial={userInitial} avatarColor={avatarColor} userId={user?.id} interviewId={id} type="interview" questions={interview.questions} />

    </>
  )
}

export default page