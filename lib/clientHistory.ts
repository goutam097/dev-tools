"use client";

export async function saveHistory(toolType: string, inputData: string, outputData: string) {
  try {
    const sessionResponse = await fetch("/api/auth/me", {
      cache: "no-store",
      credentials: "same-origin",
    });
    if (sessionResponse.status === 401) return;
    if (!sessionResponse.ok) {
      console.error(`Could not confirm the account session for ${toolType} history.`, sessionResponse.status);
      return;
    }

    const historyResponse = await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ tool_type: toolType, input_data: inputData, output_data: outputData }),
    });
    if (!historyResponse.ok) {
      console.error(`Could not save ${toolType} history.`, historyResponse.status);
    }
  } catch (error) {
    console.error(`Could not save ${toolType} history.`, error);
  }
}