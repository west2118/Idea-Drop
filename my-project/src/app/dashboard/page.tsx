import MyIdeaCardDashboard from "@/components/app/dashboard/MyIdeaCardDashboard";
import CollaborationsCardDashboard from "@/components/app/dashboard/CollaborationsCardDashboard";
import IdeasFeedDashboard from "@/components/app/dashboard/IdeasFeedDashboard";
import { getIdeasFeed, getIdeaFavoriteCount } from "@/lib/actions/idea.actions";
import { getMyCollaborations } from "@/lib/actions/collaboration.actions";

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const activeTab = resolvedSearchParams.tab || "Latest";

  // Fetch data concurrently
  const [ideaResponse, collaborationResponse, countResponse] = await Promise.all([
    getIdeasFeed(activeTab).catch(() => ({ items: [] })),
    getMyCollaborations().catch(() => ({ items: [] })),
    getIdeaFavoriteCount().catch(() => ({ ideas: 0, favorites: 0 })),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <IdeasFeedDashboard
          ideas={ideaResponse.items}
          activeTab={activeTab}
        />

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* My Ideas */}
          <MyIdeaCardDashboard
            ideaCount={countResponse.ideas ?? 0}
            favoriteCount={countResponse.favorites ?? 0}
          />

          {/* Collaborations */}
          <CollaborationsCardDashboard
            collaborations={collaborationResponse.items ?? []}
          />
        </div>
      </div>
    </div>
  );
}
