
import { useState, useRef, useEffect, use } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import { Send, Upload, DownloadCloud, FileText, Trash2, Bot, User, Plus, Loader, Search, ThumbsUp, Book, ThumbsDown, SparklesIcon, MessageCircle, Zap, Brain, Star } from 'lucide-react';


const AIAssistantPage = ({ sessions, activeSession, messages = [] }) => {

    console.log(sessions);
  // Split into paragraphs first

    const [currentSession, setCurrentSession] = useState(activeSession);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);


    const messagesEndRef = useRef(null);
    const {delete:destroy}=useForm();
    const { data, setData, post, processing } = useForm({
        message: '',
        session_id: currentSession ? currentSession.id : null,
        file: null,


    });
    const submit = (e) => {
        e.preventDefault();
        post('/ai/messages', {
          preserveScroll: true,
          onSuccess: () => {

            setData('message', '');
            setData('file', null);
          }
        });
    }
    const handledelete = (e) => {
        e.preventDefault();
        destroy(`/ai/${currentSession.id}`);
    }

    useEffect(() => {
        if (!currentSession && sessions.length > 0) {
            setCurrentSession(sessions[0]);
        }
    }, [sessions]);

    const selectSession = (sessionId) => {
        const session = sessions.find(s => s.id === sessionId);
        if (session) {
            setCurrentSession(session);
            setData('session_id', session.id);
        }
    };

    const createNewChat = () => {

        post('/ai-assistant/session');

    };


    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    const removeFile = (fileId) => {
        setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    };


    const formatAIContent = (content) => {
      // Remove extra newlines at start and end
      content = content.trim();

      // Split content into segments (text vs code blocks)
      const segments = content.split(/(```[\s\S]*?```)/g);

      return (
        <div className="space-y-6">
          {segments.map((segment, index) => {
            // Handle code blocks
            if (segment.startsWith('```') && segment.endsWith('```')) {
              // Extract language if specified
              const firstLineEnd = segment.indexOf('\n');
              const firstLine = segment.slice(3, firstLineEnd).trim();

              // Determine if there's a language specified
              let language = '';
              let codeContent = '';

              if (firstLine && !firstLine.includes(' ')) {
                // Language specified
                language = firstLine;
                codeContent = segment.slice(firstLineEnd + 1, -3).trim();
              } else {
                // No language specified
                codeContent = segment.slice(3, -3).trim();
              }

              return (
                <div key={`code-${index}`} className="bg-neutral-800 p-4 rounded-md overflow-x-auto">
                  {language && (
                    <div className="text-xs text-text-muted mb-2 font-mono">{language}</div>
                  )}
                  <pre className="text-sm font-mono text-neutral-200">{codeContent}</pre>
                </div>
              );
            }

            // Handle regular text
            const cleanText = segment.trim();
            if (!cleanText) return null;

            // Process the text to handle markdown formatting
            const processedText = processText(cleanText);

            return (
              <div key={`text-${index}`} className="text-text-secondary leading-relaxed">
                {processedText}
              </div>
            );
          })}
        </div>
      );
    };


    const processText = (text) => {
      // Split by paragraphs
      const paragraphs = text.split(/\n{2,}/);

      return paragraphs.map((paragraph, pIndex) => {
        // Skip empty paragraphs
        if (!paragraph.trim()) return null;

        // Check if it's a heading
        if (paragraph.startsWith('# ')) {
          return <h1 key={`h1-${pIndex}`} className="text-2xl font-bold mt-6 mb-4">{cleanMarkdown(paragraph.substring(2))}</h1>;
        } else if (paragraph.startsWith('## ')) {
          return <h2 key={`h2-${pIndex}`} className="text-xl font-bold mt-5 mb-3">{cleanMarkdown(paragraph.substring(3))}</h2>;
        } else if (paragraph.startsWith('### ')) {
          return <h3 key={`h3-${pIndex}`} className="text-lg font-bold mt-4 mb-2">{cleanMarkdown(paragraph.substring(4))}</h3>;
        }

        // Check if it's a numbered list
        if (/^\d+\.\s/.test(paragraph)) {
          const lines = paragraph.split('\n');
          const listItems = lines.map((line, lIndex) => {
            // Extract the list item content (remove the number and dot)
            const match = line.match(/^\d+\.\s(.+)$/);
            if (match) {
              return <li key={`li-${pIndex}-${lIndex}`} className="ml-5 mb-1">{cleanMarkdown(match[1])}</li>;
            }
            return <li key={`li-${pIndex}-${lIndex}`} className="ml-5 mb-1">{cleanMarkdown(line)}</li>;
          });

          return <ol key={`ol-${pIndex}`} className="list-decimal my-4">{listItems}</ol>;
        }

        // Check if it's a bullet list
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          const lines = paragraph.split('\n');
          const listItems = lines.map((line, lIndex) => {
            // Extract the list item content (remove the bullet)
            const match = line.match(/^[-*]\s(.+)$/);
            if (match) {
              return <li key={`li-${pIndex}-${lIndex}`} className="ml-5 mb-1">{cleanMarkdown(match[1])}</li>;
            }
            return <li key={`li-${pIndex}-${lIndex}`} className="ml-5 mb-1">{cleanMarkdown(line)}</li>;
          });

          return <ul key={`ul-${pIndex}`} className="list-disc my-4">{listItems}</ul>;
        }

        // Check if it's a blockquote
        if (paragraph.startsWith('> ')) {
          const quoteContent = paragraph.substring(2).replace(/\n>\s?/g, '\n');
          return (
            <blockquote key={`quote-${pIndex}`} className="border-l-4 border-border-medium pl-4 py-1 my-4 italic">
              {cleanMarkdown(quoteContent)}
            </blockquote>
          );
        }

        // Regular paragraph with line breaks
        const lines = paragraph.split('\n');

        // If there are multiple lines, use fragments with breaks
        if (lines.length > 1) {
          return (
            <p key={`p-${pIndex}`} className="my-3">
              {lines.map((line, lIndex) => (
                <>
                  {lIndex > 0 && <br />}
                  {cleanMarkdown(line)}
                </>
              ))}
            </p>
          );
        }

        // Single line paragraph
        return (
          <p key={`p-${pIndex}`} className="my-3">
            {cleanMarkdown(paragraph)}
          </p>
        );
      });
    };

    // Function to clean markdown formatting from text
    const cleanMarkdown = (text) => {
      // Remove bold/italic markers
      let cleaned = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/__(.*?)__/g, '$1')     // Bold
        .replace(/\*(.*?)\*/g, '$1')     // Italic
        .replace(/_(.*?)_/g, '$1')       // Italic
        .replace(/~~(.*?)~~/g, '$1')     // Strikethrough
        .replace(/`(.*?)`/g, '$1');      // Inline code

      return cleaned;
    };



    return (
        <div className="min-h-screen bg-gradient-background ">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
                <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] gap-6 mt-20">

                    {/* Enhanced Left Sidebar - Chat History */}
                    <div className="w-full lg:w-80 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden ">
                        <div className="p-6 border-b border-secondary-100 bg-gradient-primary-to-secondary">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-primary-to-secondary rounded-xl shadow-lg">
                                        <MessageCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="font-bold text-xl  bg-clip-text text-white">Conversations</h2>
                                </div>
                                <form onSubmit={createNewChat}>
                                    <button
                                        className="group p-3 bg-gradient-primary text-white rounded-xl hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300"
                                        title="New chat"
                                    >
                                        <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="relative p-4">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-secondary-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-11 pr-4 py-3 bg-card border border-secondary-200 text-secondary-700 placeholder:text-secondary-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                            />
                        </div>

                        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-180px)] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                            {sessions.map((session, index) => (
                                <div
                                    key={session.id}
                                    onClick={() => selectSession(session.id)}
                                    className={`group p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 ${
                                        currentSession?.id === session.id
                                            ? 'bg-gradient-primary shadow-xl shadow-primary/25 scale-[1.02]'
                                            : 'bg-card hover:bg-card/80 border border-secondary-200'
                                    }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center flex-1 min-w-0">
                                            <div className={`flex-shrink-0 mr-3 p-2.5 rounded-xl transition-all duration-300 ${
                                                currentSession?.id === session.id
                                                    ? 'bg-white/20 shadow-lg'
                                                    : 'bg-card-primary group-hover:shadow-md'
                                            }`}>
                                                <Bot className={`h-4 w-4 transition-colors duration-300 ${
                                                    currentSession?.id === session.id ? 'text-white' : 'text-primary'
                                                }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-medium truncate text-sm transition-colors duration-300 ${
                                                    currentSession?.id === session.id ? 'text-white' : 'text-secondary-700 group-hover:text-secondary-900'
                                                }`}>{session.title}</p>
                                                <p className={`text-xs mt-1 transition-colors duration-300 ${
                                                    currentSession?.id === session.id ? 'text-primary/10' : 'text-secondary-500'
                                                }`}>
                                                    {new Date(session.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <form onSubmit={handledelete} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                                                <Trash2 className='w-4 h-4' />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                            {sessions.length === 0 && (
                                <div className="text-center py-12 px-4">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-4 bg-card-primary rounded-2xl shadow-inner">
                                            <MessageCircle className="h-8 w-8 text-primary" />
                                        </div>
                                    </div>
                                    <p className="text-secondary-500 text-sm font-medium">No conversations yet</p>
                                    <p className="text-secondary-400 text-xs mt-1">Start your first AI chat!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Main Chat Area */}
                    {currentSession ? (
                        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                            {/* Message Area */}
                            <div className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                                <div className="max-w-4xl mx-auto space-y-8">
                                    {currentSession.messages.length === 0 && (
                                        <div className="text-center py-20">
                                            <div className="flex justify-center mb-6">
                                                <div className="relative">
                                                    <div className="p-6 bg-gradient-primary-to-secondary rounded-3xl shadow-xl">
                                                        <Brain className="h-16 w-16 text-primary" />
                                                    </div>
                                                    <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                                                        <SparklesIcon className="h-6 w-6 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">Welcome to AI Learning Assistant</h3>
                                            <p className="text-secondary-600 font-medium text-lg mb-2">Your intelligent study companion</p>
                                            <p className="text-secondary-500 text-sm max-w-md mx-auto">Ask questions about your courses, get help with concepts, or explore personalized learning recommendations</p>
                                            <div className="flex flex-wrap justify-center gap-3 mt-8">
                                                {[
                                                    "Explain quantum physics",
                                                    "Help with calculus problems",
                                                    "Create a study plan",
                                                    "Quiz me on biology"
                                                ].map((suggestion, index) => (
                                                    <button
                                                        key={index}
                                                        className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 rounded-full border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300 hover:shadow-md text-sm font-medium"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {currentSession.messages.map((message, index) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <div className={`flex gap-4 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                                                    message.sender === 'user'
                                                        ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-blue-500/25'
                                                        : 'bg-card/10 shadow-secondary-200/50'
                                                }`}>
                                                    {message.sender === 'user' ? (
                                                        <User className="h-6 w-6 text-white" />
                                                    ) : (
                                                        <Bot className="h-6 w-6 text-secondary-600" />
                                                    )}
                                                </div>

                                                <div className="flex-1 max-w-2xl">
                                                    <div className={`p-5 rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl ${
                                                        message.sender === 'user'
                                                            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white border-blue-400/20 rounded-br-md shadow-blue-500/20'
                                                            : 'bg-card/80 backdrop-blur-sm border-secondary-200/50 text-secondary-700 rounded-bl-md'
                                                    }`}>
                                                        {message.sender === 'ai'
                                                            ? formatAIContent(message.message)
                                                            : <p className="text-base leading-relaxed">{message.message}</p>
                                                        }
                                                    </div>

                                                    <div className={`flex items-center gap-3 mt-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <p className={`text-xs font-medium ${
                                                            message.sender === 'user' ? 'text-secondary-400' : 'text-secondary-500'
                                                        }`}>
                                                            {formatTimestamp(message.created_at)}
                                                        </p>
                                                        {message.sender === 'ai' && (
                                                            <div className="flex gap-2">
                                                                <button className="p-2 text-secondary-400 hover:text-success hover:bg-success/10 rounded-xl transition-all duration-200 hover:scale-110">
                                                                    <ThumbsUp className="h-4 w-4" />
                                                                </button>
                                                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110">
                                                                    <ThumbsDown className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-500">
                                            <div className="flex gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-card/10 flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <Bot className="h-6 w-6 text-secondary-600" />
                                                </div>
                                                <div className="bg-white/80 backdrop-blur-sm border border-secondary-200/50 rounded-2xl rounded-bl-md p-5 shadow-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex gap-1">
                                                            <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                                            <div className="h-3 w-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                            <div className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                                        </div>
                                                        <span className="text-secondary-500 text-sm font-medium">AI is thinking...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Enhanced Input Area */}
                            <div className="p-6 border-t border-secondary-200/50 bg-gradient-background backdrop-blur-sm">
                                <form onSubmit={submit} className="max-w-4xl mx-auto">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Ask me anything about your learning journey..."
                                            className="w-full pl-6 pr-32 py-5 bg-card/80 backdrop-blur-sm border-2 border-secondary-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 hover:border-primary/30 transition-all duration-300 text-secondary-700 placeholder:text-secondary-400 shadow-lg hover:shadow-xl text-base"
                                            disabled={isLoading}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 space-x-3">
                                            <label htmlFor="file-upload" className="cursor-pointer p-3 text-secondary-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 hover:scale-110">
                                                <Upload className="h-5 w-5" />
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => setData('file', e.target.files[0])}
                                                    className="hidden"
                                                />
                                            </label>
                                            <button
                                                type="submit"
                                                className="p-3 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-xl hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                                disabled={isLoading}
                                            >
                                                <Send className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <p className="text-xs text-secondary-500 font-medium flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-yellow-500" />
                                            AI-powered learning assistant • Verify important information
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <kbd className="px-2 py-1 bg-slate-100 rounded text-secondary-600 font-mono">Enter</kbd>
                                            <span>to send</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-white/60 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl">
                            <div className="text-center max-w-md">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="p-6 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 rounded-3xl shadow-xl">
                                            <Plus className="h-12 w-12 text-primary" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full shadow-lg animate-pulse">
                                            <Star className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-secondary-700 mb-3">Ready to Start Learning?</h3>
                                <p className="text-secondary-500 font-medium mb-6">Create or select a conversation to begin your AI-powered learning journey</p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <button
                                        onClick={createNewChat}
                                        className="px-6 py-3 bg-gradient-primary text-white rounded-xl hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 font-medium"
                                    >
                                        Start New Chat
                                    </button>
                                    <button className="px-6 py-3 bg-card/80 backdrop-blur-sm border border-secondary-200/50 text-secondary-700 rounded-xl hover:shadow-lg hover:bg-white transition-all duration-300 font-medium">
                                        Browse History
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Enhanced Right Sidebar - Learning Resources */}
                    <div className="hidden lg:flex flex-col w-80 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100/50 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                                        <Book className="h-5 w-5 text-white" />
                                    </div>
                                    <h2 className="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Learning Hub</h2>
                                </div>
                                <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 px-3 py-4 rounded-2xl shadow-lg">
                                    <SparklesIcon className="w-4 h-4 text-white" />
                                    <span className="font-bold text-sm text-white text-nowrap">AI FlashCards</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                            <div>
                                <h3 className="font-bold text-secondary-700 mb-5 flex items-center gap-3">
                                    <div className="p-2 bg-card-primary rounded-lg">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    Course Materials
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: 'React Fundamentals', type: 'PDF • 2.4 MB', color: 'from-blue-50 to-blue-100', iconColor: 'text-primary' },
                                        { title: 'JavaScript ES6 Guide', type: 'PDF • 1.8 MB', color: 'from-green-50 to-green-100', iconColor: 'text-green-600' },
                                        { title: 'Python Data Science', type: 'PDF • 3.1 MB', color: 'from-purple-50 to-purple-100', iconColor: 'text-purple-600' },
                                        { title: 'Machine Learning Basics', type: 'PDF • 4.2 MB', color: 'from-orange-50 to-orange-100', iconColor: 'text-orange-600' }
                                    ].map((item, idx) => (
                                        <div key={idx} className={`p-4 bg-gradient-to-br ${item.color} rounded-2xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer border border-white/50 hover:scale-[1.02] group`}>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm text-secondary-700 group-hover:text-secondary-900 transition-colors">{item.title}</p>
                                                    <p className="text-xs text-secondary-500 mt-1 font-medium">{item.type}</p>
                                                </div>
                                                <div className={`p-2 bg-white/60 rounded-lg group-hover:bg-white transition-colors`}>
                                                    <FileText className={`h-4 w-4 ${item.iconColor}`} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200/50">
                                <h3 className="font-bold text-secondary-700 mb-5 flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                                        <Zap className="h-5 w-5 text-purple-600" />
                                    </div>
                                    AI Suggestions
                                </h3>
                                {currentSession?.messages?.some(m => m.sender === 'ai') ? (
                                    <div className="space-y-4">
                                        <div className="p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer hover:scale-[1.02] group">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg group-hover:shadow-lg transition-shadow">
                                                    <Book className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-secondary-700 group-hover:text-secondary-900 transition-colors">Continue Learning Path</p>
                                                    <p className="text-xs text-secondary-600 mt-1 font-medium leading-relaxed">Explore advanced topics and related concepts from your current course</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:scale-[1.02] group">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg group-hover:shadow-lg transition-shadow">
                                                    <Brain className="h-4 w-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-secondary-700 group-hover:text-secondary-900 transition-colors">Practice Quiz</p>
                                                    <p className="text-xs text-secondary-600 mt-1 font-medium leading-relaxed">Test your knowledge with AI-generated questions</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 px-4">
                                        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl inline-block mb-4">
                                            <Zap className="h-8 w-8 text-secondary-500" />
                                        </div>
                                        <p className="text-sm text-secondary-500 font-medium">Start a conversation to unlock</p>
                                        <p className="text-xs text-slate-400 mt-1">personalized learning suggestions</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AIAssistantPage;










