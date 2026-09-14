import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose, student, onSendQuery }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${student.name.split(' ')[0]}! Main aapka **CareerBridge AI Assistant** hoon. \n\nAap mujhse DSA prep, resume review, ya internship recommendations pooch sakte hain!`,
      actionSuggestions: [
        "Mere skills ke according kaunsi internship best hai?",
        "Mera DSA weak hai, kya karu?",
        "Mere resume mein kya improve karna chahiye?",
        "Java Developer banne ke liye kya seekhna chahiye?"
      ],
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (queryText) => {
    const textToSend = queryText || inputText;
    if (!textToSend.trim() || loading) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await onSendQuery(textToSend, student);
      const aiMsg = {
        sender: 'ai',
        text: response.reply,
        actionSuggestions: response.actionSuggestions,
        time: response.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Sorry, I couldn't reach the AI server. Please try asking again!",
          time: 'Now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full h-[620px] flex flex-col overflow-hidden animate-scale-in">
        
        {/* Chat Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm leading-tight">CareerBridge AI Assistant</h3>
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-[11px] text-blue-100">Personalized Career, Skills & Placement Guidance</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Student Context Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{student.name}</span>
            <span className="text-slate-300">•</span>
            <span>AI Readiness: <strong className="text-blue-600 font-bold">{student.aiReadinessScore}/100</strong></span>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            Active Session
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/40">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-indigo-600 text-white'
                }`}>
                  {m.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div className={`p-3.5 rounded-2xl ${
                  m.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  
                  {/* Action Suggestions from Image 2 */}
                  {m.actionSuggestions && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {m.actionSuggestions.map((sugg, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(sugg)}
                          className="text-[10px] text-left bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-lg transition border border-blue-200/60 flex items-center gap-1"
                        >
                          <Sparkles className="h-2.5 w-2.5 text-blue-500" />
                          <span>{sugg}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`block text-[9px] mt-1.5 ${
                    m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                  }`}>
                    {m.time}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Bot className="h-3.5 w-3.5 animate-spin" />
              </div>
              <span>AI is thinking & analyzing your profile...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g., Mera DSA weak hai, kya karu?)..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition shadow-sm"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
