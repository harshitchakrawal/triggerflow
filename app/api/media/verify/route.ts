import { NextResponse } from 'next/server';

// ─── Step 1 ───────────────────────────────────────────────
function extractShortcode(url) {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error('Invalid Instagram URL format');
  return match[1];
}

// ─── Step 2 ───────────────────────────────────────────────
async function fetchAllMedia(accountId, accessToken) {
  const media = [];
  let endpoint =
    `https://graph.instagram.com/v19.0/${accountId}/media` +
    `?fields=id,shortcode,permalink&limit=100&access_token=${accessToken}`;

  while (endpoint) {
    const res = await fetch(endpoint, { cache: 'no-store' });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Instagram API error: ${err.error?.message ?? res.statusText}`);
    }

    const data = await res.json();
    media.push(...(data.data ?? []));
    endpoint = data.paging?.next ?? null;
  }

  return media;
}

// ─── Handler ──────────────────────────────────────────────
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { url } = body;

  if (!url) {
    return NextResponse.json(
      { success: false, error: 'Missing required field: url' },
      { status: 400 }
    );
  }

  // Step 1 — Extract shortcode
  let shortcode;
  try {
    shortcode = extractShortcode(url);
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }

  const accountId   = process.env.INSTAGRAM_ACCOUNT_ID;
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accountId || !accessToken) {
    return NextResponse.json(
      { success: false, error: 'Instagram credentials not configured' },
      { status: 500 }
    );
  }

  try {
    // Step 2 — Fetch media
    const mediaList = await fetchAllMedia(accountId, accessToken);

    // Step 3 — Match shortcode
    const match = mediaList.find((item) => item.shortcode === shortcode);

    // Step 4 — Return result
    if (!match) {
      return NextResponse.json(
        { success: false, error: 'Media not found in account', shortcode },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success:   true,
      mediaId:   match.id,
      shortcode: match.shortcode,
      permalink: match.permalink,
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 502 });
  }
}