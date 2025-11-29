
import { useState, useRef, useEffect, use } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import { Send, Upload, DownloadCloud, FileText, Trash2, Bot, User, Plus, Loader, Search, ThumbsUp, Book, ThumbsDown, SparklesIcon } from 'lucide-react';


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
                <div key={`code-${index}`} className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                  {language && (
                    <div className="text-xs text-gray-400 mb-2 font-mono">{language}</div>
                  )}
                  <pre className="text-sm font-mono text-gray-200">{codeContent}</pre>
                </div>
              );
            }

            // Handle regular text
            const cleanText = segment.trim();
            if (!cleanText) return null;

            // Process the text to handle markdown formatting
            const processedText = processText(cleanText);

            return (
              <div key={`text-${index}`} className="text-gray-800 leading-relaxed">
                {processedText}
              </div>
            );
          })}
        </div>
      );
    };

    // Function to process regular text and convert markdown to JSX
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
            <blockquote key={`quote-${pIndex}`} className="border-l-4 border-gray-300 pl-4 py-1 my-4 italic">
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
        <div className="pt-4 pb-4 w-full mt-10">
            <div className="w-auto mx-auto px-0 md:px-6">
                <div className="flex flex-col md:flex-row h-[calc(100vh-96px)] gap-4 md:gap-0">

                    {/* Left Sidebar - Chat History */}
                    <div className="w-full md:w-1/4 lg:w-1/5 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 md:h-full overflow-hidden rounded-t-2xl md:rounded-none">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                            <h2 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Conversations</h2>
                            <form onSubmit={createNewChat}>
                                <button
                                    className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300"
                                    title="New chat"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>
                            </form>
                        </div>

                        <div className="relative p-4">
                            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search chats..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-140px)]">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() => selectSession(session.id)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                                        currentSession?.id === session.id
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg'
                                            : 'bg-slate-700/40 hover:bg-slate-700/60'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center flex-1 min-w-0">
                                            <div className={`flex-shrink-0 mr-3 p-2 rounded-lg ${
                                                currentSession?.id === session.id
                                                    ? 'bg-white/20'
                                                    : 'bg-purple-500/20'
                                            }`}>
                                                <Bot className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate text-white text-sm">{session.title}</p>
                                                <p className="text-xs text-white/70 mt-1">
                                                    {new Date(session.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <form onSubmit={handledelete} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 text-white/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all">
                                                <Trash2 className='w-4 h-4' />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                            {sessions.length === 0 && (
                                <div className="text-center py-8">
                                    <p className="text-slate-400 text-sm font-light">No conversations yet</p>
                                </div>
                            )}
                        </div>




                    </div>

                    {/* Main Chat Area */}
                    {currentSession ? (
                        <div className="flex-1 flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-50 overflow-hidden rounded-2xl md:rounded-none">
                            {/* Message Area */}
                            <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                                <div className="max-w-4xl mx-auto space-y-6">
                                    {currentSession.messages.length === 0 && (
                                        <div className="text-center py-12">
                                            <div className="flex justify-center mb-4">
                                                <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
                                                    <Bot className="h-12 w-12 text-purple-600" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Start a Conversation</h3>
                                            <p className="text-gray-600 font-light">Ask me anything about your courses or learning goals</p>
                                        </div>
                                    )}

                                    {currentSession.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex gap-4 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                                                    message.sender === 'user'
                                                        ? 'bg-gradient-to-br from-purple-600 to-indigo-600'
                                                        : 'bg-slate-200'
                                                }`}>
                                                    {message.sender === 'user' ? (
                                                        <User className="h-5 w-5 text-white" />
                                                    ) : (
                                                        <Bot className="h-5 w-5 text-slate-600" />
                                                    )}
                                                </div>

                                                <div className={`flex-1 ${message.sender === 'user' ? '' : ''}`}>
                                                    <div className={`p-4 rounded-2xl shadow-sm ${
                                                        message.sender === 'user'
                                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                                                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                                                    }`}>
                                                        {message.sender === 'ai'
                                                            ? formatAIContent(message.message)
                                                            : <p className="text-sm leading-relaxed">{message.message}</p>
                                                        }
                                                    </div>

                                                    <div className={`flex items-center gap-3 mt-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                        <p className={`text-xs font-light ${message.sender === 'user' ? 'text-gray-500' : 'text-gray-500'}`}>
                                                            {formatTimestamp(message.created_at)}
                                                        </p>
                                                        {message.sender === 'ai' && (
                                                            <div className="flex gap-2">
                                                                <button className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-gray-100 rounded-lg transition-all">
                                                                    <ThumbsUp className="h-4 w-4" />
                                                                </button>
                                                                <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-lg transition-all">
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
                                        <div className="flex justify-start">
                                            <div className="flex gap-4">
                                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                                                    <Bot className="h-5 w-5 text-slate-600" />
                                                </div>
                                                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                                                    <div className="h-2 w-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                                                    <div className="h-2 w-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                                    <div className="h-2 w-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-6 border-t border-gray-200 bg-white rounded-b-2xl md:rounded-none">
                                <form onSubmit={submit} className="max-w-4xl mx-auto">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Ask me anything..."
                                            className="w-full pl-6 pr-28 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-all"
                                            disabled={isLoading}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-2">
                                            <label htmlFor="file-upload" className="cursor-pointer p-2.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all">
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
                                                className="p-2.5 text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={isLoading}
                                            >
                                                <Send className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 font-light">
                                        💡 The AI assistant can help with learning concepts but sometimes makes mistakes. Always verify important information.
                                    </p>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-slate-50 rounded-2xl md:rounded-none">
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl">
                                        <Plus className="h-12 w-12 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-light">Create or select a conversation to start chatting</p>
                            </div>
                        </div>
                    )}
                    {/* Right Sidebar - Learning Resources */}
                    <div className="hidden lg:flex flex-col w-1/4 bg-white border-l border-gray-200 overflow-hidden rounded-r-2xl">
                        <div className="p-6 border-b border-gray-200 flex justify-between">
                            <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Resources</h2>
                            <div className='flex gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 px-2 py-1 rounded-sm'>
                                <SparklesIcon className='w-4 h-5 text-center align-middle mt-1 text-white'/>
                              <h2 className="font-bold text-lg text-white"> FlashCard </h2>
                            {/* <h2 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> FlashCard </h2> */}
                            </div>

                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                    Course Materials
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { title: 'React Fundamentals', type: 'PDF • 2.4 MB' },
                                        { title: 'JavaScript ES6 Guide', type: 'PDF • 1.8 MB' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl hover:shadow-md transition-all cursor-pointer border border-purple-100">
                                            <p className="font-medium text-sm text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{item.type}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Book className="h-5 w-5 text-indigo-600" />
                                    Suggestions
                                </h3>
                                {currentSession?.messages?.some(m => m.sender === 'ai') ? (
                                    <div className="space-y-3">
                                        <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 hover:shadow-md transition-all cursor-pointer">
                                            <p className="font-medium text-sm text-gray-900">Continue Learning</p>
                                            <p className="text-xs text-gray-600 mt-2 font-light">Explore related topics from our courses</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 font-light">Start a conversation to see personalized suggestions</p>
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
