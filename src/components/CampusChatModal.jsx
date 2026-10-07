import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export function CampusChatModal({ currentCampus, initialListing, onClose }) {
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      peerName: initialListing?.seller?.name || 'Marcus Chen',
      peerRole: 'EECS Senior • 5.0 ★',
      peerAvatar: initialListing?.seller?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      itemTitle: initialListing?.title || 'TI-Nspire CX II CAS Color Graphing Calculator',
      unread: false,
      messages: [
        {
          id: 'm1',
          sender: 'peer',
          text: `Hey! Saw you are interested in the ${initialListing?.title || 'item'}. Are you free to meet up today?`,
          time: '2:15 PM'
        },
        {
          id: 'm2',
          sender: 'me',
          text: 'Hey Marcus! Yes, can we meet at Moffitt Library 3rd floor around 4:30 PM?',
          time: '2:18 PM'
        },
        {
          id: 'm3',
          sender: 'peer',
          text: 'Perfect! I will be by the glass discussion tables near the staircase. I have the charger and cover ready.',
          time: '2:20 PM'
        }
      ]
    },
    {
      id: 'conv-2',
      peerName: 'David Okafor',
      peerRole: 'Data Science Sophomore • 4.88 ★',
      peerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      itemTitle: 'Compact Mini Fridge 3.2 Cu. Ft.',
      unread: true,
      messages: [
        {
          id: 'dm1',
          sender: 'peer',
          text: 'Hey, I still have the mini fridge! I have a moving dolly so I can roll it directly to your dorm entrance.',
          time: '1:45 PM'
        }
      ]
    }
  ]);

  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [mobileView, setMobileView] = useState(initialListing ? 'chat' : 'list'); // 'list' | 'chat'
  const [inputMessage, setInputMessage] = useState('');
  const [exchangeConfirmed, setExchangeConfirmed] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConvId) {
        return {
          ...c,
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputMessage('');

    // Simulate smart auto-reply from student peer
    setTimeout(() => {
      const replies = [
        "Sounds great! Looking forward to it. Safe trade code ready on my phone.",
        "Got it! See you at the safe meetup spot on campus.",
        "Awesome, happy to help a fellow student save some cash this semester!"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            messages: [
              ...c.messages,
              {
                id: `m-reply-${Date.now()}`,
                sender: 'peer',
                text: randomReply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return c;
      }));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl h-[90vh] sm:h-[600px] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Chat list (Mobile: shown when mobileView === 'list', Desktop: always md:flex) */}
        <div className={`w-full md:w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 ${
          mobileView === 'list' ? 'flex flex-1' : 'hidden md:flex'
        }`}>
          <div className="p-3.5 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-100/60 dark:bg-slate-900">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Campus In-App Deals</h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">Verified @{currentCampus.domain} Peers</p>
            </div>
            <button 
              type="button"
              onClick={onClose} 
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {conversations.map((c) => {
              const isSelected = c.id === activeConvId;
              const lastMsg = c.messages[c.messages.length - 1];
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveConvId(c.id);
                    setMobileView('chat');
                  }}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-white dark:bg-slate-800 shadow-xs border-l-4 border-emerald-500' 
                      : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/60 bg-transparent'
                  }`}
                >
                  <img src={c.peerAvatar} alt={c.peerName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{c.peerName}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{lastMsg?.time}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 truncate">{c.itemTitle}</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate mt-0.5">{lastMsg?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat View (Mobile: shown when mobileView === 'chat', Desktop: always flex) */}
        <div className={`flex-1 flex flex-col justify-between bg-white dark:bg-slate-900 ${
          mobileView === 'chat' ? 'flex' : 'hidden md:flex'
        }`}>
          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/90 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Mobile Back Button to list */}
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className="md:hidden p-1.5 -ml-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full cursor-pointer"
                aria-label="Back to conversations"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <img src={activeConv.peerAvatar} alt={activeConv.peerName} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm truncate">{activeConv.peerName}</span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold border dark:border-emerald-800 flex items-center shrink-0">
                    <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate">{activeConv.itemTitle}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setExchangeConfirmed(true)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  exchangeConfirmed 
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{exchangeConfirmed ? 'Meetup Locked' : 'Lock Meetup'}</span>
                <span className="sm:hidden">{exchangeConfirmed ? 'Locked' : 'Lock'}</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Meetup Zone Alert */}
          {exchangeConfirmed && (
            <div className="bg-emerald-50 dark:bg-emerald-950/70 px-3.5 py-2 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">Meetup: <strong>SJT Gazebo</strong> • Code <strong>#TRV-8821</strong></span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-white dark:bg-slate-900">
            <div className="text-center my-1 sm:my-2">
              <span className="text-[10px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full font-medium">
                Encrypted Chat • Meet only in Campus Safe Zones
              </span>
            </div>

            {activeConv.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs md:max-w-sm rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-br-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1">{m.time}</span>
                </div>
              );
            })}
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="p-2.5 sm:p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-slate-50 dark:bg-slate-900 pb-safe sm:pb-3">
            <input
              type="text"
              placeholder={`Message ${activeConv.peerName}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 sm:p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
