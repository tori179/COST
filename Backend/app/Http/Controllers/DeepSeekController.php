<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DeepSeekController extends Controller
{
    public function callApi(Request $request)
    {
$response = Http::withHeaders([
    'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
    'Content-Type' => 'application/json',
])->post('https://api.deepseek.com/api/v1/chat/completions', [
    'model' => 'deepseek-chat',
    'messages' => [
        ['role' => 'user', 'content' => $request->input('prompt')],
    ],
    'temperature' => 0.7
]);

        return response()->json($response->json());
    }
}
