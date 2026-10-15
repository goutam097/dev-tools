export type ToolId =
  | "json"
  | "json-to-typescript"
  | "url-encoder-decoder"
  | "timestamp"
  | "jwt"
  | "base64"
  | "regex"
  | "uuid"
  | "markdown"
  | "gradient"
  | "image-base64"
  | "html-formatter"
  | "csv-cleaner"
  | "cron-builder"
  | "json-schema"
  | "css-grid"
  | "meta-tags"
  | "qr-code"
  | "history";

export type User = {
  id: string;
  username: string;
};

export type HistoryItem = {
  id: string;
  tool_type: string;
  input_data: string;
  output_data: string;
  created_at: string;
};
