// app/messages/page.tsx
"use client";
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { ConversationSidebar } from "@/components/sections/messages/ConversationSidebar";
import { ActiveThread } from "@/components/sections/messages/ActiveThread";
import { conversationsData } from "@/dummy-datas/messages";

const Page = () => {
  const [activeConv, setActiveConv] = useState<string>("Daryl");
  const currentConversation = conversationsData.find((c) => c.id === activeConv);

  return (
    <Layout>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-50 dark:bg-transparent transition-colors duration-300">
        <div className="flex-1 flex overflow-hidden p-6 lg:p-8 space-x-6">
          
          {/* Left Pane */}
          <ConversationSidebar 
            conversations={conversationsData} 
            activeConv={activeConv} 
            setActiveConv={setActiveConv} 
          />

          {/* Right Pane */}
          <ActiveThread 
            conversation={currentConversation} 
          />

        </div>
      </main>
    </Layout>
  );
};

export default Page;