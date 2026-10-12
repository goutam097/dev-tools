export type UrlEncodingScope = "component" | "url";
export type UrlCodecAction = "encode" | "decode";

export function convertUrlText(
  value: string,
  action: UrlCodecAction,
  scope: UrlEncodingScope,
): string {
  if (action === "encode") {
    return scope === "component" ? encodeURIComponent(value) : encodeURI(value);
  }

  try {
    return scope === "component" ? decodeURIComponent(value) : decodeURI(value);
  } catch (error) {
    if (error instanceof URIError) {
      throw new Error(
        "The input contains an invalid or incomplete percent-encoded sequence. Check that every % is followed by two hexadecimal digits.",
      );
    }
    throw error;
  }
}
