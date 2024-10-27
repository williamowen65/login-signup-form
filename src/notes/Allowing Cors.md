If you're handling requests directly in a Firebase Cloud Function without Express, you can still set up CORS manually. Here’s how you can do it:

### Example Code:

```javascript
const functions = require("firebase-functions");

exports.yourFunction = functions.https.onRequest((req, res) => {
    // Define the allowed origins
    const allowedOrigins = ["https://example.com", "https://another-allowed-domain.com"];
    
    const origin = req.headers.origin;

    // Check if the request's origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
        res.set("Access-Control-Allow-Origin", origin);
    }

    // Handle preflight requests (OPTIONS method)
    if (req.method === "OPTIONS") {
        // Set preflight response headers
        res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        return res.status(204).send(""); // Respond with no content
    }

    // Your function logic here
    res.send("Hello, world!");
});
```

### Explanation:
1. **Allowed Origins**: Define which URLs are permitted to access your Cloud Function.
2. **Check Request Origin**: When a request comes in, the function checks if the `origin` header matches any of the allowed origins.
3. **Set CORS Headers**: If it matches, the appropriate CORS headers are set.
4. **Handle Preflight Requests**: For `OPTIONS` requests, set the allowed methods and headers, and respond with status `204`.

### Deploy:
After making the changes, deploy your function:

```bash
firebase deploy --only functions
```

This approach manually handles CORS without needing Express, allowing you to control which domains can access your Firebase Cloud Function.