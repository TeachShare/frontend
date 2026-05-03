"use client";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/layout/Layout";
import { ConversationSidebar } from "@/components/sections/messages/ConversationSidebar";
import { ActiveThread } from "@/components/sections/messages/ActiveThread";
import { useConversations, useSocket } from "@/hooks/useMessages";
import { useTeacherProfile } from "@/hooks/useTeacher";

const MessagesContent = () => {
  const searchParams = useSearchParams();
  const partnerIdParam = searchParams.get('partnerId');
  
  const { data: conversationsRes, isLoading } = useConversations();
  const { sendMessage } = useSocket();
  const [activeConvId, setActiveConvId] = useState<number | null>(null);

  // If we have a partnerIdParam but they aren't in conversations yet, fetch their profile
  const { data: partnerProfileRes } = useTeacherProfile(partnerIdParam || "");

  const conversations = useMemo(() => {
    const list = [...(conversationsRes?.data || [])];
    
    if (partnerIdParam && partnerProfileRes?.data) {
        const id = parseInt(partnerIdParam);
        const exists = list.some((c: any) => c.id === id);
        
        if (!exists) {
            const partner = partnerProfileRes.data;
            list.unshift({
                id: partner.id,
                name: `${partner.first_name} ${partner.last_name}`,
                avatar: partner.profile_image_url,
                last_message: "New message...",
                timestamp: new Date().toISOString(),
                unread_count: 0
            });
        }
    }
    return list;
  }, [conversationsRes, partnerIdParam, partnerProfileRes]);
  
  // Synchronize active conversation with search param or default to first
  useEffect(() => {
    if (partnerIdParam) {
        setActiveConvId(parseInt(partnerIdParam));
    } else if (conversations.length > 0 && activeConvId === null) {
        setActiveConvId(conversations[0].id);
    }
  }, [partnerIdParam, conversations, activeConvId]);

  const currentConversation = conversations.find((c: any) => c.id === activeConvId);

  return (
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-50 dark:bg-transparent transition-colors duration-300 h-[calc(100vh-64px)]">
        <div className="flex-1 flex overflow-hidden p-6 lg:p-8 space-x-6 h-full">
          
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : (
            <>
              {/* Left Pane */}
              <ConversationSidebar 
                conversations={conversations} 
                activeConv={activeConvId?.toString() || ""} 
                setActiveConv={(id: string) => setActiveConvId(parseInt(id))} 
              />

              {/* Right Pane */}
              <ActiveThread 
                conversation={currentConversation}
                sendMessage={sendMessage}
              />
            </>
          )}

        </div>
      </main>
  );
};

const Page = () => {
  return (
    <Layout>
        <Suspense fallback={
            <div className="flex-1 flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        }>
            <MessagesContent />
        </Suspense>
    </Layout>
  );
};

export default Page;
