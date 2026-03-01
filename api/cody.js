// api/cody.js — Vercel Serverless Function
// Proxy cho Cody AI: Gemini, Groq, OpenRouter
// Env vars cần set trong Vercel Dashboard:
//   GEMINI_API_KEY
//   GROQ_API_KEY
//   OPENROUTER_API_KEY

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { provider, model, systemPrompt, messages } = req.body;

  if (!provider || !messages) {
    return res.status(400).json({ error: 'Missing provider or messages' });
  }

  try {
    let text = '';

    // ── GEMINI ────────────────────────────────────────────────────────────────
    if (provider === 'gemini') {
      const key = process.env.GEMINI_API_KEY;
      if (!key) return res.status(500).json({ error: 'GEMINI_API_KEY not set' });

      // Build Gemini contents — merge systemPrompt vào first user message
      const contents = messages.map((m, i) => {
        let text = m.content;
        if (i === 0 && m.role === 'user' && systemPrompt) {
          text = `[System: ${systemPrompt}]\n\n${text}`;
        }
        return {
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text }]
        };
      });

      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!r.ok) {
        const err = await r.json();
        throw new Error(err?.error?.message || `Gemini ${r.status}`);
      }

      const data = await r.json();
      text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }

    // ── GROQ ──────────────────────────────────────────────────────────────────
    else if (provider === 'groq') {
      const key = process.env.GROQ_API_KEY;
      if (!key) return res.status(500).json({ error: 'GROQ_API_KEY not set' });

      const msgs = [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model,
          messages: msgs,
          temperature: 0.8,
          max_tokens: 1024,
        })
      });

      if (!r.ok) {
        const err = await r.json();
        throw new Error(err?.error?.message || `Groq ${r.status}`);
      }

      const data = await r.json();
      text = data.choices?.[0]?.message?.content || '';
    }

    // ── OPENROUTER ────────────────────────────────────────────────────────────
    else if (provider === 'openrouter') {
      const key = process.env.OPENROUTER_API_KEY;
      if (!key) return res.status(500).json({ error: 'OPENROUTER_API_KEY not set' });

      const msgs = [
        ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`,
          'HTTP-Referer': 'https://codymuse.qzz.io',
          'X-Title': 'CodyMuse'
        },
        body: JSON.stringify({
          model,
          messages: msgs,
          temperature: 0.85,
          max_tokens: 1024,
        })
      });

      if (!r.ok) {
        const err = await r.json();
        throw new Error(err?.error?.message || `OpenRouter ${r.status}`);
      }

      const data = await r.json();
      text = data.choices?.[0]?.message?.content || '';
    }

    else {
      return res.status(400).json({ error: `Unknown provider: ${provider}` });
    }

    return res.status(200).json({ text });

  } catch (err) {
    console.error('[Cody API Error]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
