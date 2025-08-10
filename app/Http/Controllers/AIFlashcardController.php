<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Smalot\PdfParser\Parser;

class AIFlashcardController extends Controller
{
    public function generateFlashcards(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,txt|max:5120',
            'count' => 'required|integer|min:2|max:20', // Limit to 2-20 flashcards
        ]);

        $file = $request->file('file');
        $flashcardCount = $request->input('count');
        $fileContent = $this->extractFileContent($file);

        $flashcards = $this->generateFlashcardsFromContent(
            $fileContent,
            $file->getClientOriginalName(),
            $flashcardCount
        );

        return response()->json([
            'success' => true,
            'flashcards' => $flashcards,
            'file_name' => $file->getClientOriginalName()
        ]);
    }

    private function extractFileContent($file)
    {
        if ($file->getMimeType() === 'application/pdf') {
            $parser = new Parser();
            $pdf = $parser->parseFile($file->getRealPath());
            return $pdf->getText();
        }

        return file_get_contents($file->getRealPath());
    }

    private function generateFlashcardsFromContent($content, $fileName, $count)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
            'HTTP-Referer' => config('app.url'),
            'X-Title' => config('app.name')
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            "model" => "deepseek/deepseek-prover-v2:free",
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are an AI flashcard generator. Analyze the content and create exactly {$count} high-quality flashcards in Q&A format. Focus on key concepts. Respond in JSON format:
                    {
                        \"flashcards\": [
                            {\"question\": \"...\", \"answer\": \"...\"},
                            {\"question\": \"...\", \"answer\": \"...\"}
                        ],
                        \"summary\": \"Brief 1-2 sentence summary of the content\"
                    }"
                ],
                ["role" => "user", "content" => "File: {$fileName}\n\nContent:\n{$content}"]
            ],
            "response_format" => ["type" => "json_object"]
        ]);

        $content = $response->json('choices.0.message.content', '');
        $content = str_replace(['```json', '```'], '', $content);

        return json_decode($content, true) ?? ['flashcards' => [], 'summary' => ''];
    }
}
