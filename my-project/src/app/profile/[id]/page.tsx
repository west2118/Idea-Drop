import CollaborationProfileCard from "@/components/app/profile/CollaborationProfileCard";
import ProjectIdeasProfileCard from "@/components/app/profile/ProjectIdeasProfileCard";
import SkillsProfileCard from "@/components/app/profile/SkillsProfileCard";
import InterestsProfileCard from "@/components/app/profile/InterestsProfileCard";
import InfoProfileCard from "@/components/app/profile/InfoProfileCard";
import { getUserInfo } from "@/lib/actions/user.actions";
import { getUserIdeas } from "@/lib/actions/idea.actions";
import { getUserCollaborations } from "@/lib/actions/collaboration.actions";
import { getAuthUser } from "@/lib/actions/auth.actions";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const [dataUser, dataIdea, dataCollaboration, currentUser] = await Promise.all([
      getUserInfo(id),
      getUserIdeas(id),
      getUserCollaborations(id),
      getAuthUser(),
    ]);

    const isOwner = currentUser?._id === id;

    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - User Info */}
            <div className="lg:col-span-1 space-y-6">
              <InfoProfileCard user={dataUser as any} isOwner={isOwner} />
              <SkillsProfileCard skills={dataUser?.skills ?? []} />
              <InterestsProfileCard interests={dataUser?.interests ?? []} />
            </div>

            {/* Middle Column - Stats and Achievements */}
            <div className="lg:col-span-2 space-y-6">
              <ProjectIdeasProfileCard ideas={dataIdea.items as any} isOwner={isOwner} />
              <CollaborationProfileCard collaborations={dataCollaboration.items as any} isOwner={isOwner} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="p-8 text-center text-red-500">Failed to load profile. The user may not exist.</div>;
  }
}
