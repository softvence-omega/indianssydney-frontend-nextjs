"use client";

import React from "react";

import GrowthMetrics from "./GrowthMetrics";
import TopPerformingTags from "./TopPerformingTags";
import AITranscription from "./AITranscription";
import ContentMetrics from "./ContentMetrics";
import PredictiveInsight from "./PredictiveInsight";
import UserEngagement from "./UserEngagement";
import AutomatedTranslations from "./AutomatedTranslations";
import CommunityModeration from "./CommunityModeration";
import TopRecommendedArticles from "./TopRecommendedArticles";

// Main Dashboard Component
const AnalyticsDashboard: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          AI-powered insights and performance metrics
        </p>
      </div>

      {/* Predictive Insight */}
      <PredictiveInsight />

      {/* Main Grid */}
      <div>
        <div className="grid">
        <UserEngagement />
        <TopRecommendedArticles />

        </div>
        <ContentMetrics />
        <AITranscription />
        <AutomatedTranslations />
        <CommunityModeration />
        <TopPerformingTags />
        <GrowthMetrics />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
