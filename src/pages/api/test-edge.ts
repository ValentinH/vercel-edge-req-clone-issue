import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
  regions: ['fra1'],
};

export default async function handler(req: NextRequest) {
  const payload = await req.clone().json();
  const payload2 = "" // await req.json();

  return NextResponse.json({ payload, payload2 });
}
