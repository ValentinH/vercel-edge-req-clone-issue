This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## What's the issue
The following code works well locally but fails once deployed to Vercel:
```ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: 'edge',
  regions: ['fra1'],
};

export default async function handler(req: NextRequest) {
  const payload = await req.clone().json();
  const payload2 = await req.json();

  return NextResponse.json({ payload, payload2 });
}

```

The issue is due to the second `req.json()` that crashes on Vercel with:
```
SyntaxError: Unexpected end of JSON input
    at (src/pages/api/test-edge.ts:10:19)
    at (node_modules/next/dist/esm/server/web/adapter.js:144:19)
```

It seems that the `req.clone()` function doesn't work as intended. See https://developer.mozilla.org/en-US/docs/Web/API/Request/clone.
Especially:
> In fact, the main reason clone() exists is to allow multiple uses of body objects (when they are one-use only.)
