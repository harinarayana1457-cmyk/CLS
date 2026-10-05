import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Sparkles,
  PhoneCall
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-3xl h-[600px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Chat list */}
        <div className="w-full md:w-72 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Campus In-App Deals</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Verified @{currentCampus.domain} Peers</p>
            </div>
            <button onClick={onClose} className="md:hidden text-slate-400 cursor-pointer">
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
                  onClick={() => setActiveConvId(c.id)}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-white dark:bg-slate-800 shadow-xs border-l-4 border-emerald-600' : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <img src={c.peerAvatar} alt={c.peerName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.peerName}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{lastMsg?.time}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 truncate">{c.itemTitle}</div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{lastMsg?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat View */}
        <div className="flex-1 flex flex-col justify-between bg-white dark:bg-slate-900">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-850/80">
            <div className="flex items-center gap-3">
              <img src={activeConv.peerAvatar} alt={activeConv.peerName} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{activeConv.peerName}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold border dark:border-emerald-800 flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{activeConv.peerRole} • {activeConv.itemTitle}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setExchangeConfirmed(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  exchangeConfirmed 
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{exchangeConfirmed ? 'Meetup Locked' : 'Lock Meetup'}</span>
              </button>
              <button
                onClick={onClose}
                className="hidden md:inline-flex p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Meetup Zone Alert */}
          {exchangeConfirmed && (
            <div className="bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Meetup Confirmed at <strong>Moffitt Library 3rd Floor</strong>. Show Code <strong>#TRV-8821</strong></span>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="text-center my-2">
              <span className="text-[10px] px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full font-medium">
                End-to-End Encrypted Campus Chat • Meet only in Verified Safe Zones
              </span>
            </div>

            {activeConv.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs ${
                    isMe 
                      ? 'bg-emerald-600 text-white rounded-br-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs'
                  }`}>
                    <div>{m.text}</div>
                    <div className={`text-[9px] mt-1 text-right ${isMe ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Message ${activeConv.peerName} about ${activeConv.itemTitle}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
