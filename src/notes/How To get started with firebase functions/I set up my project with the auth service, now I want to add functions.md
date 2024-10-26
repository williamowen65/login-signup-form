Certainly! Using modular imports allows for cleaner, more efficient code, especially when you only need specific parts of the Firebase Functions SDK. Here are the examples rewritten using ES module syntax:

### 1. **HTTPS Triggers**
   ```javascript
   import { onRequest } from "firebase-functions/v2/https";

   export const api = onRequest((req, res) => {
     res.send("Hello from Firebase HTTPS function!");
   });
   ```

### 2. **Authentication Triggers**
   - **`onCreate`**
     ```javascript
     import { onCreate, onDelete } from "firebase-functions/v2/auth";

     export const newUserSignup = onCreate((user) => {
       // Perform actions like sending a welcome email
     });

     export const userDeleted = onDelete((user) => {
       // Cleanup user data when an account is deleted
     });
     ```

### 3. **Realtime Database Triggers**
   - **`onWrite`, `onCreate`**
     ```javascript
     import { onWrite, onCreate } from "firebase-functions/v2/database";

     export const onDataChange = onWrite('/path', (change, context) => {
       // Handle data changes
     });

     export const onDataAdded = onCreate('/path', (snapshot, context) => {
       // Handle new data
     });
     ```

### 4. **Cloud Firestore Triggers**
   - **`onWrite`, `onCreate`**
     ```javascript
     import { onWrite, onCreate } from "firebase-functions/v2/firestore";

     export const onDocumentChange = onWrite('collection/{docId}', (change, context) => {
       // Respond to document changes
     });

     export const onDocumentCreate = onCreate('collection/{docId}', (snapshot, context) => {
       // Handle new documents
     });
     ```

### 5. **Cloud Storage Triggers**
   - **`onFinalize`**
     ```javascript
     import { onFinalize } from "firebase-functions/v2/storage";

     export const onFileUpload = onFinalize((object) => {
       // Perform actions when a new file is uploaded
     });
     ```

### 6. **Analytics Triggers**
   - **`onLog`**
     ```javascript
     import { onLog } from "firebase-functions/v2/analytics";

     export const logAnalyticsEvent = onLog('event_name', (event) => {
       // Handle analytics event
     });
     ```

### 7. **Pub/Sub Triggers**
   - **`onPublish`**
     ```javascript
     import { onPublish } from "firebase-functions/v2/pubsub";

     export const processMessage = onPublish('topic-name', (message) => {
       // Process the message
     });
     ```

### 8. **Task Queue Triggers**
   - **`onDispatch`**
     ```javascript
     import { onDispatch } from "firebase-functions/v2/tasks";

     export const processTask = onDispatch('queue-name', (task) => {
       // Process the task
     });
     ```

### 9. **Remote Config Triggers**
   - **`onUpdate`**
     ```javascript
     import { onUpdate } from "firebase-functions/v2/remoteConfig";

     export const onConfigUpdate = onUpdate((versionMetadata) => {
       // Handle config updates
     });
     ```

With these modular imports, the code is more streamlined, and only the required parts of the Firebase SDK are imported, reducing the bundle size and improving performance.