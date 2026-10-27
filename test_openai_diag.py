import os
import urllib.request
import urllib.error
import json

def run_diag():
    api_key = None
    env_file = '.env.local'
    if os.path.exists(env_file):
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('OPENAI_API_KEY='):
                    api_key = line.split('=', 1)[1].strip().strip('"\'')
                    break

    if not api_key:
        print("API Key Configured: FALSE (Not found in .env.local)")
        return

    print("API Key Configured: TRUE")
    print("API Key Prefix:", api_key[:7] + "..." + api_key[-4:])

    # TEST 1: Current code request (v1/responses endpoint with model gpt-5.6-luna)
    print("\n--- TEST 1: POST https://api.openai.com/v1/responses (model: gpt-5.6-luna) ---")
    body1 = json.dumps({
        "model": "gpt-5.6-luna",
        "instructions": "test prompt",
        "input": "test message",
        "max_output_tokens": 100
    }).encode('utf-8')

    req1 = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=body1,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )

    try:
        res1 = urllib.request.urlopen(req1)
        print("Test 1 Status:", res1.status)
        print("Test 1 Response Body:", res1.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print("Test 1 HTTP Error Code:", e.code)
        print("Test 1 HTTP Error Body:", e.read().decode('utf-8'))
    except Exception as e:
        print("Test 1 Error:", e)

    # TEST 2: Standard Chat Completions endpoint (v1/chat/completions with gpt-4o-mini or gpt-3.5-turbo)
    print("\n--- TEST 2: POST https://api.openai.com/v1/chat/completions (model: gpt-4o-mini) ---")
    body2 = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": "Você é o assistente Metrik."},
            {"role": "user", "content": "Olá Metrik!"}
        ],
        "max_tokens": 100
    }).encode('utf-8')

    req2 = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=body2,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )

    try:
        res2 = urllib.request.urlopen(req2)
        print("Test 2 Status:", res2.status)
        print("Test 2 Response Body:", res2.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        print("Test 2 HTTP Error Code:", e.code)
        print("Test 2 HTTP Error Body:", e.read().decode('utf-8'))
    except Exception as e:
        print("Test 2 Error:", e)

if __name__ == '__main__':
    run_diag()
