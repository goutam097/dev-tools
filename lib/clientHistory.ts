"use client";

export async function saveHistory(toolType: string, inputData: string, outputData: string) {
  try {
    await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool_type: toolType, input_data: inputData, output_data: outputData }),
    });
  } catch {
    // Ignore client logging failures to keep tools responsive.
  }
}