import { NextResponse } from "next/server"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

interface LogEntry {
  action: "select" | "deselect"
  type: "gift" | "date"
  label: string
  time: string
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { gifts, dates, log } = await request.json()

    const giftList =
      gifts.length > 0
        ? gifts
            .map((g: string) => `<li style="padding:4px 0">${g}</li>`)
            .join("")
        : "<li>None selected</li>"

    const dateList =
      dates.length > 0
        ? dates
            .map((d: string) => `<li style="padding:4px 0">${d}</li>`)
            .join("")
        : "<li>None selected</li>"

    const logRows = (log as LogEntry[])
      .map(
        (entry, i) =>
          `<tr style="border-bottom:1px solid #eee">
            <td style="padding:4px 8px;color:#999">${i + 1}</td>
            <td style="padding:4px 8px">${entry.time}</td>
            <td style="padding:4px 8px">${entry.action === "select" ? "✅ Selected" : "❌ Deselected"}</td>
            <td style="padding:4px 8px">${entry.type}</td>
            <td style="padding:4px 8px;font-weight:bold">${entry.label}</td>
          </tr>`,
      )
      .join("")

    await resend.emails.send({
      from: "Dear Amy <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL!,
      subject: "🌸 Amy made her choices!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h1 style="color:#8675A9">🌸 Amy has picked!</h1>
          <h3 style="color:#4A4063">Gifts:</h3>
          <ul style="color:#4A4063">${giftList}</ul>
          <h3 style="color:#4A4063">Date:</h3>
          <ul style="color:#4A4063">${dateList}</ul>
          <hr style="border:none;border-top:1px solid #C3AED6;margin:20px 0" />
          <h3 style="color:#8675A9">Action Log</h3>
          <p style="color:#999;font-size:13px">Every selection and deselection in order:</p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;color:#4A4063">
            <thead>
              <tr style="background:#f5f0f8">
                <th style="padding:6px 8px;text-align:left">#</th>
                <th style="padding:6px 8px;text-align:left">Time</th>
                <th style="padding:6px 8px;text-align:left">Action</th>
                <th style="padding:6px 8px;text-align:left">Type</th>
                <th style="padding:6px 8px;text-align:left">Item</th>
              </tr>
            </thead>
            <tbody>${logRows}</tbody>
          </table>
          <p style="color:#C3AED6;margin-top:20px">— Dear Amy website</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ error: "Failed to send" }, { status: 500 })
  }
}
