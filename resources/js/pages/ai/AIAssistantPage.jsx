
import { useState, useRef, useEffect, use } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import { Send, Upload, DownloadCloud, FileText, Trash2, Bot, User, Plus, Loader, Search, ThumbsUp, Book, ThumbsDown } from 'lucide-react';


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



        <div className="pt-4 pb-4 w-full   mt-10">
            <div className="w-auto mx-auto px-0 md:px-6  ">
                <div className="flex flex-col md:flex-row h-[calc(100vh-96px)]">

                    <div className="w-full md:w-1/4 lg:w-1/5 bg-soft-purple border-r border-gray-200 md:h-full overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="font-bold text-lg text-white">AI Assistant</h2>
                            <form onSubmit={createNewChat}>

                                <button

                                    className="p-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>

                            </form>

                        </div>

                        <div className="relative p-4">
                            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-white" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search conversations"
                                className="w-full pl-8 pr-4 py-2 border placeholder:text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                            />
                        </div>

                        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-132px)]  ">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    onClick={() => selectSession(session.id)}
                                    className={'p-3 rounded-lg cursor-pointer'}
                                >
                                    <div className="flex items-center ">
                                        <Bot className="h-5 w-5 mr-3 text-white" />
                                        <div className="flex-1 min-w-0 ">
                                            <p className="font-medium truncate text-white">{session.title}</p>
                                            <p className="text-xs text-white">
                                                {new Date(session.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <form onSubmit={handledelete}>
                                        <button><Trash2 className='w-4 h-4 text-white'/></button>
                                        </form>

                                    </div>
                                </div>
                            ))}

                        </div>




                    </div>

                    {/* Main Chat Area */}
                    {currentSession ? (
                        <div className="flex-1 flex flex-col bg-white overflow-hidden">
                            {/* <div className="border-b p-2 bg-gray-50">
                                <p className="text-sm text-gray-600">
                                    Session ID: {currentSession.id} |
                                    Messages: {currentSession.messages?.length || 0}
                                </p>
                            </div> */}
                            {/* Message Area */}
                            <div className="flex-1 p-4 overflow-y-auto">
                                <div className="max-w-3xl mx-auto space-y-4">

                                    {currentSession.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                                }`}
                                        >
                                            <div className={`flex max-w-md md:max-w-lg lg:max-w-xl ${message.sender === 'user'
                                                    ? 'bg-primary  text-white text-xs rounded-t-lg rounded-bl-lg '
                                                    : 'bg-white-100 text-gray-800 rounded-t-lg rounded-br-lg  '
                                                } p-4 break-words `}>
                                                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'order-2 ml-3' : 'mr-3'}`}>
                                                    {message.sender === 'user' ? (
                                                        <User className="h-6 w-6" />
                                                    ) : (
                                                        <Bot className="h-6 w-6" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                {message.sender === 'ai'
            ? formatAIContent(message.message)
            : message.message
          }
                                                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-light' : 'text-gray-500'
                                                        }`}>
                                                        {formatTimestamp(message.created_at)}
                                                    </p>

                                                    {message.sender === 'ai' && (
                                                        <div className="flex mt-2 space-x-2">
                                                            <button className="p-1 hover:bg-gray-200 rounded-full">
                                                                <ThumbsUp className="h-4 w-4 text-gray-500" />
                                                            </button>
                                                            <button className="p-1 hover:bg-gray-200 rounded-full">
                                                                <ThumbsDown className="h-4 w-4 text-gray-500" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 text-gray-800 rounded-lg p-4 flex items-center">
                                                <Bot className="h-6 w-6 mr-3" />
                                                <div className="flex items-center">
                                                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-1"></div>
                                                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-2 mx-1"></div>
                                                    <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-3"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>


                            {/* {uploadedFiles.length > 0 && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <h3 className="font-medium text-sm mb-2">Uploaded Files</h3>
                  <div className="flex overflow-x-auto space-x-3 pb-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex-shrink-0 flex bg-white p-3 rounded-lg border border-gray-200 min-w-[200px]">
                        <div className="mr-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

                            {/* Input Area */}
                            <div className="p-4 border-t border-gray-200">
                                <form onSubmit={submit} className="max-w-3xl mx-auto" enctype="multipart/form-data">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            placeholder="Ask me anything..."
                                            className="w-full pl-4 pr-24 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            disabled={isLoading}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
                                            <label htmlFor="file-upload" className="cursor-pointer p-2 text-gray-500 hover:text-learnify-primary hover:bg-softPurple rounded-full">
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

                                                className="p-2 text-white bg-primary rounded-full hover:bg-learnify-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                            >

                                                <Send className="h-5 w-5" />

                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        The AI assistant can help with learning concepts but sometimes makes mistakes. Verify important information.
                                    </p>
                                </form>
                            </div>
                        </div>
                    ):(
                    <div className="flex-1 flex items-center justify-center bg-white">
                        <p className="text-gray-500 text-sm">No session selected. Please create or select a session to start.</p>
                    </div>
                    )

  }
                    {/* Right Sidebar - Resource Panel */}
                    <div className="hidden lg:block w-1/4 bg-white border-l border-gray-200 overflow-y-auto">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="font-bold text-lg">Learning Resources</h2>
                        </div>

                        <div className="p-4 space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Related Course Materials</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                                        <FileText className="h-5 w-5 text-primary mr-3" />
                                        <div>
                                            <p className="font-medium text-sm">React Fundamentals Cheatsheet</p>
                                            <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                                        <FileText className="h-5 w-5 text-primary mr-3" />
                                        <div>
                                            <p className="font-medium text-sm">JavaScript ES6 Reference Guide</p>
                                            <p className="text-xs text-gray-500">PDF • 1.8 MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="font-medium text-gray-900 mb-3">Suggested Learning</h3>
                                <div className="space-y-3">
            { currentSession && (
                  <div>
                {
                                         currentSession.messages.map((message) => (
                                            message.sender === 'ai' ? (
                                                <div className="flex items-start p-3 mb-4 bg-soft-purple rounded-lg cursor-pointer" key={message.id}>
                                                    <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3">
                                                        <Book className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{message.metadata?.suggestions?.join(', ')}:</p>
                                                        <p className="text-xs text-white">{message.metadata?.suggestions_description?.join(', ') || ''}</p>
                                                    </div>
                                                </div>
                                            ) : null
                                        ))
                                    }
                </div>

            )}





                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AIAssistantPage;
