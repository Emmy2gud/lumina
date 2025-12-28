<?php

namespace App\Http\Controllers;

use App\Models\AIChatSession;
use Illuminate\Http\Request;

class AIChatSessionController extends Controller
{
    public function index()
    {

        $sessions = AIChatSession::with(['messages' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        $activeSessionId = session('session_id');
        $activeSession = $activeSessionId ? $sessions->find($activeSessionId) : $sessions->first();

        return inertia('ai/AIAssistantPage', [
            'sessions' => $sessions,
            'activeSession' => $activeSession,
            'messages' => $activeSession ? $activeSession->messages : [],
        ]);
    }

    public function createSession(Request $request)
    {

        $session = AIChatSession::create([
            'user_id' => auth()->id(),
            'course_id' => $request->course_id,
            'context_type' => $request->context_type,
            'title' => 'New Chat ',
            // 'date' => now()->format('M d y'),
        ]);

        // Redirect to the AI assistant page with the session ID
        return redirect('/ai')->with([
            'session_id' => $session->id,
            'welcome_message' => "Hello! I'm your Learnify AI assistant. How can I help you today?",
        ]);
    }

    public function show($id)
    {
        $session = AIChatSession::with('messages')
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        return response()->json([
            'session' => $session,
        ]);
    }

    public function destroy(AIChatSession $aIChatSession)
    {

        $aIChatSession->delete();

        return redirect('/ai')->with('success', 'Post deleted successfully!');
    }
}
