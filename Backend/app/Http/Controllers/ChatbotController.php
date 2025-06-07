<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function handleChat(Request $request)
    {
        $userMessage = $request->input('message');
        if (!$userMessage) {
            return response()->json(['error' => 'Thiếu message'], 400);
        }
        try {
            $response = Http::post('http://localhost:8888/chat', [
                'message' => $userMessage
            ]);
            if ($response->successful()) {
                return response()->json(['reply' => $response['response']]);
            } else {
                return response()->json(['error' => 'Chatbot server lỗi'], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không kết nối được chatbot server'], 500);
        }
    }
}