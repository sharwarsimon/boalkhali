import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare, User, ArrowLeft, Image as ImageIcon, CheckCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useData } from '../context/DataContext.js';
import { api } from '../services/api.js';
import { Message, Conversation, User as UserType } from '../types.js';

interface ChatPageProps {
  initialConversationId?: string;
  navigate: (path: string) => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({ initialConversationId, navigate }) => {
  const { user } = useAuth();
  const { showToast } = useData();
  const [conversations, setConversations] = useState<{ conversation: Conversation; unreadCount: number; partner: UserType | undefined }[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(initialConversationId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadConversations = async () => {
      try {
        const convList = await api.getConversations();
        setConversations(convList);
        if (!activeConvId && convList.length > 0) {
          setActiveConvId(convList[0].conversation.id);
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
    const interval = setInterval(loadConversations, 5000);
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!activeConvId) return;

    const loadMessages = async () => {
      try {
        const msgList = await api.getMessages(activeConvId);
        setMessages(msgList);
      } catch (err) {
        console.error('Failed to load messages:', err);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvId) return;

    const text = newMessage.trim();
    setNewMessage('');
    setSending(true);

    try {
      const msg = await api.sendMessage({
        conversation_id: activeConvId,
        message: text,
      });
      setMessages((prev) => [...prev, msg]);
    } catch (err) {
      showToast('মেসেজ পাঠানো ব্যর্থ হয়েছে', 'error');
    } finally {
      setSending(false);
    }
  };

  if (!user) return null;

  const activeConv = conversations.find((c) => c.conversation.id === activeConvId);

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 h-[calc(100vh-80px)] flex flex-col">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex-1 flex overflow-hidden">
        {/* Left: Conversation List */}
        <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${activeConvId && 'hidden md:flex'}`}>
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              মেসেজ ও বার্তালাপ
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {conversations.length > 0 ? (
              conversations.map(({ conversation, partner, unreadCount }) => (
                <div
                  key={conversation.id}
                  onClick={() => setActiveConvId(conversation.id)}
                  className={`p-3.5 flex items-center gap-3 cursor-pointer hover:bg-orange-50/50 transition-colors ${
                    activeConvId === conversation.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <img
                    src={partner?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${partner?.name || 'user'}`}
                    alt="avatar"
                    className="w-11 h-11 rounded-2xl object-cover border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {partner?.name || 'বোয়ালখালী সেবা'}
                      </h4>
                      {unreadCount > 0 && (
                        <span className="bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {conversation.last_message || 'মেসেজ শুরু করুন'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-gray-400">
                কোনো বার্তালাপ নেই। যেকোনো সেবা থেকে মেসেজ পাঠান।
              </div>
            )}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className={`flex-1 flex flex-col bg-gray-50 ${!activeConvId && 'hidden md:flex'}`}>
          {activeConvId ? (
            <>
              {/* Chat Header */}
              <div className="p-3 sm:p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConvId(null)}
                    className="md:hidden p-1 text-gray-600 hover:text-orange-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={activeConv?.partner?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${activeConv?.partner?.name || 'chat'}`}
                    alt="avatar"
                    className="w-9 h-9 rounded-xl object-cover border"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {activeConv?.partner?.name || 'বোয়ালখালী প্রতিনিধি'}
                    </h3>
                    <span className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      অনলাইন
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                  const isMe = msg.sender_id === user.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                          isMe
                            ? 'bg-orange-600 text-white rounded-br-xs'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.message}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="মেসেজ লিখুন..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 border border-transparent rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:bg-white focus:border-orange-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="bg-orange-600 hover:bg-orange-700 active:scale-95 disabled:opacity-50 text-white p-2.5 rounded-2xl shadow-xs transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-2 text-gray-400">
              <MessageSquare className="w-12 h-12 text-gray-300" />
              <p className="text-sm font-semibold">কোনো বার্তালাপ নির্বাচন করা হয়নি</p>
              <p className="text-xs">বামের তালিকা থেকে যেকোনো বার্তালাপ নির্বাচন করুন</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
