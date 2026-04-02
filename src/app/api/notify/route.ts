import { NextResponse } from "next/server"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { gifts, dates } = await request.json()

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

    await resend.emails.send({
      from: "Dear Amy <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL!,
      subject: "🌸 Amy made her choices!",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px">
          <h1 style="color:#8675A9">🌸 Amy has picked!</h1>
          <h3 style="color:#4A4063">Gifts:</h3>
          <ul style="color:#4A4063">${giftList}</ul>
          <h3 style="color:#4A4063">Date Ideas:</h3>
          <ul style="color:#4A4063">${dateList}</ul>
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
