import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    initials: "SJ",
    lastMsg: "Please review the curriculum changes",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Alex Thompson",
    initials: "AT",
    lastMsg: "I have a question about the exam format",
    time: "15m ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Admin Office",
    initials: "AO",
    lastMsg: "Your leave request has been approved",
    time: "1h ago",
    unread: 1,
  },
  {
    id: 4,
    name: "Mr. James Wilson",
    initials: "JW",
    lastMsg: "The lab materials are ready for pickup",
    time: "3h ago",
    unread: 0,
  },
];

const threadMessages: Record<
  number,
  { from: string; msg: string; mine: boolean; time: string }[]
> = {
  1: [
    {
      from: "Dr. Sarah Johnson",
      msg: "Hi, I wanted to discuss the upcoming curriculum changes.",
      mine: false,
      time: "10:30 AM",
    },
    {
      from: "You",
      msg: "Sure, I'm available this afternoon.",
      mine: true,
      time: "10:32 AM",
    },
    {
      from: "Dr. Sarah Johnson",
      msg: "Please review the curriculum changes I emailed you.",
      mine: false,
      time: "10:35 AM",
    },
  ],
  2: [
    {
      from: "Alex Thompson",
      msg: "Hello, I have a question about the exam format.",
      mine: false,
      time: "9:00 AM",
    },
    {
      from: "You",
      msg: "Of course! What would you like to know?",
      mine: true,
      time: "9:15 AM",
    },
  ],
  3: [
    {
      from: "Admin Office",
      msg: "Your leave request has been approved.",
      mine: false,
      time: "8:00 AM",
    },
  ],
  4: [
    {
      from: "Mr. James Wilson",
      msg: "The lab materials are ready for pickup.",
      mine: false,
      time: "Yesterday",
    },
    {
      from: "You",
      msg: "Thanks, I'll pick them up tomorrow morning.",
      mine: true,
      time: "Yesterday",
    },
  ],
};

export default function Messages({
  navigate,
}: { navigate: (p: Page) => void }) {
  const [selected, setSelected] = useState(1);
  const [input, setInput] = useState("");
  const [threads, setThreads] = useState(threadMessages);

  const handleSend = () => {
    if (!input.trim()) return;
    setThreads((prev) => ({
      ...prev,
      [selected]: [
        ...(prev[selected] || []),
        { from: "You", msg: input.trim(), mine: true, time: "Just now" },
      ],
    }));
    setInput("");
  };

  const activeConv = conversations.find((c) => c.id === selected);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => navigate("dashboard")}
        data-ocid="nav.back_button"
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
      </div>
      <div
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex"
        style={{ height: "70vh" }}
      >
        {/* Conversations */}
        <div className="w-72 border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-slate-700">
              Conversations
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`w-full flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors border-b border-gray-50 ${
                  selected === c.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {c.initials}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      {c.name}
                    </p>
                    <span className="text-xs text-slate-400">{c.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {c.lastMsg}
                  </p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Thread */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
              {activeConv?.initials}
            </div>
            <p className="font-semibold text-slate-900">{activeConv?.name}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {(threads[selected] || []).map((m, _mi) => (
              <div
                key={`msg-${m.time}-${m.mine}`}
                className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-sm px-4 py-2 rounded-2xl text-sm ${
                    m.mine
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {m.msg}
                  <p
                    className={`text-xs mt-1 ${m.mine ? "text-blue-200" : "text-slate-400"}`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleSend}
              className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
