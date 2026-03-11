import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromCookie } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { sanitizeHistoryField, sanitizeToolType } from "@/lib/validation";

export const runtime = "nodejs";

type InsertPayload = {
  tool_type?: unknown;
  input_data?: unknown;
  output_data?: unknown;
};

export async function GET() {
  const user = await getCurrentUserFromCookie();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const history = await db
    .collection("history")
    .find({ user_id: user.id })
    .sort({ created_at: -1 })
    .limit(50)
    .toArray();

  const formattedHistory = history.map((item) => ({
    id: item._id.toString(),
    tool_type: String(item.tool_type),
    input_data: String(item.input_data),
    output_data: String(item.output_data),
    created_at: new Date(item.created_at).toISOString(),
  }));

  return NextResponse.json(formattedHistory);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUserFromCookie();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: InsertPayload;
  try {
    body = (await req.json()) as InsertPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const toolType = sanitizeToolType(body.tool_type);
  const inputData = sanitizeHistoryField(body.input_data, 20_000);
  const outputData = sanitizeHistoryField(body.output_data, 20_000);

  if (!inputData && !outputData) {
    return NextResponse.json({ error: "No history content provided" }, { status: 400 });
  }

  const db = await getDb();
  await db.collection("history").insertOne({
    user_id: user.id,
    tool_type: toolType,
    input_data: inputData,
    output_data: outputData,
    created_at: new Date(),
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
