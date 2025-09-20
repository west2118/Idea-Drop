import React from "react";
import IdeaDetailPage from "./idea/details/page";
import CollaborationPage from "./collaboration/page";
import ProfilePage from "./profile/page";
import DiscoverPage from "./discover/page";
import NotificationsPage from "./notification/page";
import SettingsPage from "./settings/page";
import LandingPage from "./landing-page/page";
import { UserSyncProvider } from "@/components/sections/UserSyncProvider";

const page = () => {
  return <LandingPage />;
};

export default page;
