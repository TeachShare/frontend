"use client";
import React from "react";
import { StatCard } from "./StatCard";

const DashboardStatGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Resources shared"
        value="48"
        subtext="All-time uploads"
        trend="+6"
      />
      <StatCard
        title="Total downloads"
        value="1.9k"
        subtext="Compared to last 30 days"
        trend="+18%"
      />
      <StatCard
        title="Achievements"
        value="7"
        subtext='"Collaborative Planner" unlocked'
        badge="New badge"
      />
      <StatCard
        title="Community shares"
        value="23"
        subtext="Your resources reshared by others"
        trend="+4"
      />
    </div>
  );
};

export default DashboardStatGrid;
