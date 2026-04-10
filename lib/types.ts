export type ToolId =
  | "json"
  | "jwt"
  | "base64"
  | "regex"
  | "uuid"
  | "markdown"
  | "gradient"
  | "image-base64"
  | "html-formatter"
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
