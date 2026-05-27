import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, LogOut } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { zhTW } from "date-fns/locale";

export default function Messages() {
  const [password, setPassword] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"bookings" | "messages">("bookings");

  // Check admin authentication
  const { data: authStatus } = trpc.admin.isAuthenticated.useQuery();

  // Admin login
  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        setPassword("");
        window.location.reload();
      }
    },
  });

  // Admin logout
  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  // Fetch bookings
  const { data: bookings, isLoading: bookingsLoading } = trpc.admin.getBookings.useQuery(
    { limit: 50, offset: 0 },
    { enabled: authStatus?.authenticated ?? false }
  );

  // Fetch conversations
  const { data: conversations, isLoading: conversationsLoading } = trpc.admin.getConversations.useQuery(
    { limit: 50, offset: 0 },
    { enabled: authStatus?.authenticated ?? false }
  );

  // Fetch messages for selected conversation
  const { data: messageData, isLoading: messagesLoading } = trpc.admin.getMessages.useQuery(
    { conversationId: selectedConversationId! },
    { enabled: !!selectedConversationId && (authStatus?.authenticated ?? false) }
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ password });
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "open":
        return "bg-orange-100 text-orange-800";
      case "replied":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Not authenticated - show login form
  if (!authStatus?.authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">管理後台</h1>
            <p className="text-muted-foreground">輸入密碼以訪問留言管理</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">密碼</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  登入中...
                </>
              ) : (
                "登入"
              )}
            </Button>
          </form>

          {loginMutation.isError && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
              密碼錯誤，請重試
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Authenticated - show admin panel
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">管理後台</h1>
            <p className="text-muted-foreground mt-1">查看和管理所有客戶留言</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 mr-2" />
            登出
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "bookings" ? "default" : "outline"}
            onClick={() => setActiveTab("bookings")}
          >
            預約洽談 ({bookings?.length || 0})
          </Button>
          <Button
            variant={activeTab === "messages" ? "default" : "outline"}
            onClick={() => setActiveTab("messages")}
          >
            聯絡留言 ({conversations?.length || 0})
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1">
            {activeTab === "bookings" ? (
              <div className="space-y-2">
                <h2 className="font-semibold mb-4">預約列表</h2>
                {bookingsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : bookings && bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <Card
                      key={booking.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedBookingId === booking.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedBookingId(booking.id)}
                    >
                      <div className="font-semibold text-sm">{booking.name}</div>
                      <div className="text-xs opacity-75">{booking.email}</div>
                      <div className="text-xs opacity-75 mt-1">{booking.date}</div>
                      <Badge className="mt-2 text-xs" variant="secondary">
                        {booking.status}
                      </Badge>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">暫無預約</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="font-semibold mb-4">對話列表</h2>
                {conversationsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : conversations && conversations.length > 0 ? (
                  conversations.map((conv: any) => (
                    <Card
                      key={conv.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedConversationId === conv.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedConversationId(conv.id)}
                    >
                      <div className="font-semibold text-sm">{conv.visitorName}</div>
                      <div className="text-xs opacity-75 truncate">{conv.subject}</div>
                      <div className="text-xs opacity-75 mt-1">{conv.visitorEmail}</div>
                      <Badge className="mt-2 text-xs" variant="secondary">
                        {conv.status}
                      </Badge>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">暫無對話</p>
                )}
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {activeTab === "bookings" ? (
              selectedBookingId ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4">預約詳情</h2>
                  {bookings?.find((b: any) => b.id === selectedBookingId) && (
                    <Card className="p-6">
                      {bookings?.find((b: any) => b.id === selectedBookingId) ? (() => {
                        const booking = bookings!.find((b: any) => b.id === selectedBookingId);
                        return (
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">姓名</label>
                              <p className="text-lg">{booking?.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">郵箱</label>
                              <p className="text-lg">{booking?.email}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">電話</label>
                              <p className="text-lg">{booking?.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">預約日期</label>
                              <p className="text-lg">{booking?.date}</p>
                            </div>
                            {booking?.message && (
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">訊息</label>
                                <p className="text-lg">{booking?.message}</p>
                              </div>
                            )}
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">狀態</label>
                              <Badge className="mt-2">{booking?.status}</Badge>
                            </div>
                          </div>
                        );
                      })() : null}
                    </Card>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <MessageSquare className="w-12 h-12 opacity-50 mr-4" />
                  <p>選擇一個預約以查看詳情</p>
                </div>
              )
            ) : selectedConversationId ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">對話詳情</h2>
                <Card className="p-6 space-y-4">
                  {messagesLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  ) : messageData && messageData.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {messageData.map((msg: any, idx: number) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-md ${
                            msg.sender === "admin"
                              ? "bg-blue-100 text-blue-900 ml-8"
                              : "bg-gray-100 text-gray-900 mr-8"
                          }`}
                        >
                          <div className="font-semibold text-sm">
                            {msg.senderName}
                          </div>
                          <div className="text-xs opacity-75 mb-2">
                            {msg.senderEmail}
                          </div>
                          <p className="text-sm">{msg.message}</p>
                          <div className="text-xs opacity-50 mt-2">
                            {msg.createdAt
                              ? formatDistanceToNow(new Date(msg.createdAt), {
                                  locale: zhTW,
                                  addSuffix: true,
                                })
                              : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">暫無訊息</p>
                  )}
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <MessageSquare className="w-12 h-12 opacity-50 mr-4" />
                <p>選擇一個對話以查看詳情</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
