<?php

namespace App\Http\Controllers;

use App\Models\AIChatMessage;
use App\Models\AIChatSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser;

class AIChatController extends Controller
{


    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required_without:file|string|nullable',
            'session_id' => 'required|exists:a_i_chat_sessions,id',
            'file' => 'nullable|file|mimes:pdf,txt,jpg,png|max:5120',
        ]);

        $user = auth()->user();
        $session = AIChatSession::where('user_id', $user->id)
            ->findOrFail($request->session_id);

        $metadata = null;
        $fileContent = null;


        //file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $metadata = [
                'file_name' => $file->getClientOriginalName(),
                'file_type' => $file->getMimeType(),
                'file_path' => $file->store('upload', 'public')
            ];

            // Extract text from PDF
            if ($file->getMimeType() === 'application/pdf') {
                $parser = new Parser();
                $pdf = $parser->parseFile($file->getRealPath());
                $fileContent = $pdf->getText();
            }
        }

        // Prepare user message
        $userMessage = $request->message ?: ($request->hasFile('file')
            ? 'File upload: ' . $metadata['file_name']
            : '');

$aiMessage = $userMessage;

        if ($fileContent) {
            //append file name and type to user message
            $aiMessage .=  "\n\nFile Content from " . $metadata['file_name'] . ":\n" . $fileContent;
        }

        // Save user message
        AIChatMessage::create([
            'user_id' => $user->id,
            'session_id' => $session->id,
            'sender' => $userMessage ? 'user':'ai',
            'message' => $userMessage,
            'metadata' => $metadata
        ]);


        $aiResponse = $this->getAIResponse($aiMessage);


// Save AI response
AIChatMessage::create([
    'user_id' => $user->id,
    'session_id' => $session->id,
    'sender' => 'ai',
    'message' => $aiResponse['content'],
    'metadata' => [
        'suggestions' => $aiResponse['suggestions'] ?? [],
        'suggestions_description' => $aiResponse['suggestions_description'] ?? [],

    ]
]);



        return redirect('/ai');

    }

    private function getAIResponse($prompt)
    {


        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'HTTP-Referer' => config('app.url'),
            'X-Title' => config('app.name')
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            "model" => "openai/gpt-3.5-turbo",
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are an AI learning assistant . Respond in this exact JSON format:
                    {
                        \"content\": \"your main response here and  please make your response very lengthy more than 500 words \",
                        \"suggestions\": [\"topic 1\", \"topic 2\"],
                        \"suggestions_description\": [\"step 1\", \"step 2\"]
                    }
                    Include ONLY this JSON object with no additional text or formatting."
                ],
                ["role" => "user", "content" => $prompt]
            ],
            "response_format" => ["type" => "json_object"]
        ]);

        $content = $response->json('choices.0.message.content', '');

        // Clean the response content first
        $content = str_replace(['```json', '```'], '', $content);

        $result = json_decode($content, true) ?? [];

        return [
            'content' => $result['content'] ?? $content,
            'suggestions' => $result['suggestions'] ?? [],
            'suggestions_description' => $result['suggestions_description'] ?? [],

        ];
    }

    private function buildLearningPrompt($message, $fileName)
    {
        $prompt = "You are an AI learning assistant. ";

        if ($fileName) {
            $prompt .= "The student uploaded: $fileName. ";
            $prompt .= "Focus on creating a learning path relevant to this file. ";
        }

        $prompt .= "Student message: $message\n\n";
        $prompt .= "Respond STRICTLY in this JSON format ONLY:\n";
        $prompt .= "Provide:\n";
        $prompt .= "- Helpful response\n";
        $prompt .= "- 3-5 learning suggestions  \n";
        $prompt .= "- 3-5 step learning path\n";
        $prompt .= "Format as JSON with: content, suggestions, learning_path";

        return $prompt;
    }


}
