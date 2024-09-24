## System Design
### Architecture Diagram

<img src=".docs/images/img.png" alt="Quiz App Logo" width="700x"/>

### Component description

**1. Client (Mobile/Web)**: User Interface (UI) and Interaction Layer

**2. Load balancer**: Distributes incoming network requests across multiple servers

**3. Websocket servers**: Handle real-time communication between clients and the backend. It keeps a constant connection for two-way data transfer, allowing instant updates for quiz answers and leaderboard changes.

**4. API servers**: Handle requests for user data, the question list, and the leaderboard when the user first join the quiz.

**5. Redis cluster**: Stores user and leaderboard data. A cluster is used to improve performance and reliability, allowing for quick access to information and handling larger amounts of data as the app grows

**6. MongoDB cluster**: Stores user scores for the long term. It can handle heavy write operations, and eventual consistency is acceptable as a requirement since the app primarily relies on Redis

**7. Kafka message queue & workers**: A message queue that handles writes to MongoDB. It helps manage backpressure by buffering requests, ensuring the system remains responsive under heavy load


### Data flow

**1. User join a quiz**
- When a user joins a quiz, their request is sent to the **API Server**. The server processes this request, retrieves the necessary quiz data (questions, leaderboard, etc.), and sends it back to the client.

**2. WebSocket Connection**: 
- The client establishes a WebSocket connection with the WebSocket server. Upon joining the quiz, the user is assigned to a room identified by the quizID
- The room allows the server to efficiently send data updates to every user connected to that specific quiz room.

**3. User Answers Questions**:
- As the user answers questions, these responses are sent to the WebSocket server in real-time. The server receives the answers and validates them

**4. Updating Scores**:
- The WebSocket server processes the answers and then writes the updated score to Redis using the ZINCRBY command
- Sends request to the Kafka message queue to handle the write operation to the MongoDB cluster.
- Aggregate leaderboard data and send it to all clients subscribed to the leaderboard of the current quiz. To reduce the frequency of notifications about updates, implement a throttling mechanism with a 500ms delay. This helps manage the load when there are a large number of concurrent users
