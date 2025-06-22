import React from 'react';
import { getCurrentUser, getUserById } from '@/lib/actions/auth.action';
import { getInterviewByUserId, getFeedbackByInterviewId } from '@/lib/actions/general.actions';
import { redirect } from 'next/navigation';
import InterviewCard from '@/components/InterviewCard';
import { db } from '@/firebase/admin';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getUserTakenInterviews(userId: string): Promise<Interview[]> {
  try {
    // Get all feedback documents for this user
    const feedbackSnapshot = await db.collection('feedback')
      .where('userId', '==', userId)
      .get();
    
    if (feedbackSnapshot.empty) {
      return [];
    }
    
    // Extract interview IDs from feedback
    const interviewIds = feedbackSnapshot.docs.map(doc => {
      const data = doc.data();
      return data.interviewId;
    });
    
    // Get unique interview IDs
    const uniqueInterviewIds = [...new Set(interviewIds)];
    
    // Fetch all interviews
    const interviews = await Promise.all(
      uniqueInterviewIds.map(async (id) => {
        const interviewDoc = await db.collection('interviews').doc(id).get();
        if (interviewDoc.exists) {
          return { id: interviewDoc.id, ...interviewDoc.data() } as Interview;
        }
        return null;
      })
    );
    
    // Filter out null values and interviews created by the user
    return interviews
      .filter((interview): interview is Interview => 
        interview !== null && interview.userId !== userId
      )
      .sort((a, b) => {
        // Sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  } catch (error) {
    console.error('Error fetching taken interviews:', error);
    return [];
  }
}

const UserProfilePage = async ({ params }: RouteParams) => {
  const { id } = await params;
  const currentUser = await getCurrentUser();
  
  // Redirect if not authenticated
  if (!currentUser) {
    redirect('/sign-in');
  }
  
  // Get profile user (could be current user or another user)
  const profileUser = await getUserById(id);
  
  if (!profileUser) {
    redirect('/');
  }
  
  // Check if viewing own profile
  const isOwnProfile = currentUser.id === profileUser.id;
  
  // Get created interviews
  let createdInterviews = await getInterviewByUserId(profileUser.id);
  
  if(!isOwnProfile){
    createdInterviews = createdInterviews ? createdInterviews.filter((item) => item.visibility === true) : [];
  }

  // Get taken interviews (only for own profile)
  const takenInterviews = isOwnProfile ? await getUserTakenInterviews(profileUser.id) : [];
  
  // Get user's initial for avatar
  const userInitial = profileUser.name ? profileUser.name.charAt(0).toUpperCase() : '?';
  const avatarColor = profileUser.avatarColor || 'bg-blue-500'; // Default to blue if no color is set
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="card-border w-full mb-12">
        <div className="dark-gradient rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className={`w-28 h-28 rounded-full ${avatarColor} flex items-center justify-center text-white text-4xl font-semibold shadow-lg border-4 border-primary-500/30`}>
              {userInitial}
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl font-bold text-primary-100 mb-2">{profileUser.name}</h1>
              {isOwnProfile && <p className="text-light-400 mb-4">{profileUser.email}</p>}
              
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="bg-dark-gradient-2 rounded-lg p-4 border border-primary-500/20 shadow-md">
                  <div className="text-primary-300 text-sm mb-1">Created</div>
                  <div className="text-2xl font-bold text-primary-100">{createdInterviews ? createdInterviews.length : 0}</div>
                </div>
                
                {isOwnProfile && (
                  <div className="bg-dark-gradient-2 rounded-lg p-4 border border-primary-500/20 shadow-md">
                    <div className="text-primary-300 text-sm mb-1">Taken</div>
                    <div className="text-2xl font-bold text-primary-100">{takenInterviews.length}</div>
                  </div>
                )}
                
                <div className="bg-dark-gradient-2 rounded-lg p-4 border border-primary-500/20 shadow-md">
                  <div className="text-primary-300 text-sm mb-1">Profile</div>
                  <div className="text-sm font-medium text-light-300">
                    {isOwnProfile ? 'Your Account' : 'User Profile'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-semibold text-primary-100">Created Interviews</h2>
          </div>
          <div className="flex-grow h-px bg-gradient-to-r from-primary-500/20 to-transparent"></div>
        </div>
        {createdInterviews && createdInterviews.length > 0 ? (
          <div className="interviews-section">
            {createdInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                id={interview.id}
                userId={interview.userId}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))}
          </div>
        ) : (
          <div className="blue-gradient-dark rounded-lg border-2 border-primary-200/30 p-8 text-center">
            <p className="text-light-400 mb-4">No interviews created yet.</p>
            {isOwnProfile && <Button asChild className="btn-primary">
              <Link href="/interview">Create an Interview</Link>
            </Button> }
            
          </div>
        )}
      </div>
      
      {isOwnProfile && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-semibold text-primary-100">Taken Interviews</h2>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-primary-500/20 to-transparent"></div>
          </div>
          {takenInterviews.length > 0 ? (
            <div className="interviews-section">
              {takenInterviews.map((interview) => (
                <InterviewCard
                  key={interview.id}
                  id={interview.id}
                  userId={interview.userId}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))}
            </div>
          ) : (
            <div className="blue-gradient-dark rounded-lg border-2 border-primary-200/30 p-8 text-center">
              <p className="text-light-400 mb-4">No interviews taken yet.</p>
              <Button asChild className="btn-primary">
                <Link href="/">Find Interviews</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;