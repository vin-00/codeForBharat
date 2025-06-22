import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();
  // Get user's initial for avatar and color
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
  const avatarColor = user?.avatarColor || 'bg-blue-500'; // Default to blue if no color is set

  return (
    <>
        <h3>Interview Generation</h3>
        <Agent userName={user?.name || ''} userInitial={userInitial} avatarColor={avatarColor} userId={user?.id} type='generate' />
    </>
  )
}

export default page