import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";

export default function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  // Fetch all conversations
  const { data: conversations, isLoading: conversationsLoading, refetch: refetchConversations } = trpc.messages.getConversations.useQuery({
    limit: 50,
    offset: 0,
  });

  // Fetch messages for selected conversation
  const { data: messages, isLoading: messagesLoading } = trpc.messages.getMessages.useQuery(
    { conversationId: selectedConversationId! },
    { enabled: !!selectedConversationId }
  );

  // Get selected conversation details
  const selectedConversation = conversations?.find(c => c.id === selectedConversationId);

  // Send reply
  const sendReplyMutation = trpc.messages.sendReply.useMutation({
    onSuccess: () => {
      setReplyText("");
      refetchConversations();
    },
  });

  const handleSelectConversation = (id: number) => {
    setSelectedConversationId(id);
  };

  const handleSendReply = () => {
    if (!selectedConversationId || !replyText.trim()) return;
    
    sendReplyMutation.mutate({
      conversationId: selectedConversationId,
      message: replyText,
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "未回覆";
      case "replied":
        return "已回覆";
      case "closed":
        return "已關閉";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">客戶訊息</h1>
          <p className="text-muted-foreground">管理和回覆客戶的聯絡訊息</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="p-0 overflow-hidden">
              <div className="bg-primary text-primary-foreground p-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  訊息列表
                </h2>
              </div>

              <div className="divide-y max-h-[600px] overflow-y-auto">
                {conversationsLoading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                    加載中...
                  </div>
                ) : conversations && conversations.length > 0 ? (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`w-full p-4 text-left transition-colors hover:bg-accent ${
                        selectedConversationId === conv.id ? "bg-accent" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-medium text-sm truncate">{conv.visitorName}</p>
                        <Badge className={getStatusBadgeColor(conv.status)}>
                          {getStatusLabel(conv.status)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">{conv.visitorEmail}</p>
                      <p className="text-xs text-muted-foreground truncate mb-2">{conv.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conv.updatedAt), { locale: zhTW, addSuffix: true })}
                      </p>
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    暫無訊息
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <div className="space-y-4">
                {/* Conversation Header */}
                <Card className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{selectedConversation.subject}</h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-muted-foreground">來自：</span>
                          <span className="font-medium ml-2">{selectedConversation.visitorName}</span>
                        </p>
                        <p>
                          <span className="text-muted-foreground">郵箱：</span>
                          <a href={`mailto:${selectedConversation.visitorEmail}`} className="font-medium ml-2 text-primary hover:underline">
                            {selectedConversation.visitorEmail}
                          </a>
                        </p>
                        <p>
                          <span className="text-muted-foreground">狀態：</span>
                          <Badge className={`ml-2 ${getStatusBadgeColor(selectedConversation.status)}`}>
                            {getStatusLabel(selectedConversation.status)}
                          </Badge>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Messages */}
                <Card className="p-6">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {messagesLoading ? (
                      <div className="text-center text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin mx-auto mb-2" />
                        加載訊息中...
                      </div>
                    ) : messages && messages.length > 0 ? (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-lg ${
                            msg.sender === "customer"
                              ? "bg-muted text-muted-foreground"
                              : "bg-primary/10 text-foreground"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-sm">
                              {msg.sender === "customer" ? msg.senderName : "您"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(msg.createdAt), { locale: zhTW, addSuffix: true })}
                            </p>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted-foreground">
                        暫無訊息
                      </div>
                    )}
                  </div>
                </Card>

                {/* Reply Form */}
                <Card className="p-6">
                  <div className="space-y-4">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="輸入您的回覆..."
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedConversationId(null)}
                      >
                        取消
                      </Button>
                      <Button
                        onClick={handleSendReply}
                        disabled={!replyText.trim() || sendReplyMutation.isPending}
                      >
                        {sendReplyMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            發送中...
                          </>
                        ) : (
                          "發送回覆"
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">選擇一條訊息開始回覆</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
