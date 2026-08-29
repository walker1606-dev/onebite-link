import { NextRequest, NextResponse } from "next/server";

function getMetaContent(html: string, key: string): string | null {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const keyMatch = tag.match(/(?:property|name)=["']([^"']+)["']/i);
    if (!keyMatch || keyMatch[1].toLowerCase() !== key.toLowerCase()) continue;

    const contentMatch = tag.match(/content=["']([^"']*)["']/i);
    if (contentMatch) return contentMatch[1];
  }

  return null;
}

function getTitleTag(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1] : null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:") {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://onebite.link)",
      },
      signal: AbortSignal.timeout(5000),
    });
    const html = await response.text();

    const title = getMetaContent(html, "og:title") ?? getTitleTag(html);
    const description =
      getMetaContent(html, "og:description") ??
      getMetaContent(html, "description");
    const rawImage = getMetaContent(html, "og:image");
    const image = rawImage
      ? new URL(rawImage, targetUrl).toString()
      : null;

    return NextResponse.json({
      url: targetUrl.toString(),
      title: title ? decodeHtmlEntities(title.trim()) : targetUrl.hostname,
      description: description ? decodeHtmlEntities(description.trim()) : "",
      image,
    });
  } catch {
    return NextResponse.json({
      url: targetUrl.toString(),
      title: targetUrl.hostname,
      description: "",
      image: null,
    });
  }
}
