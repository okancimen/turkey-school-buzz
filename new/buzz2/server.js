const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS and Serve Static Files
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection (Points to the existing DB)
const dbPath = path.join(__dirname, '../fetchnews/education_news.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("DB Connection Error:", err.message);
    else console.log("Connected to SQLite database.");
});

// API Endpoint: Get Clustered News
app.get('/api/news', (req, res) => {
    // Fetch all news ordered by date
    db.all(`
        SELECT * FROM news 
        ORDER BY published_date DESC, id DESC
        LIMIT 100
    `, [], (err, rows) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }

        try {
            // Manual Grouping by Cluster ID
            const clusters = {};

            rows.forEach(row => {
                const cId = row.cluster_id;

                if (!clusters[cId]) {
                    // Initialize cluster
                    clusters[cId] = {
                        id: cId,
                        mainStory: row,
                        relatedStories: []
                    };
                } else {
                    // Add to existing cluster
                    clusters[cId].relatedStories.push(row);
                }
            });

            // Convert object to array and sort by latest story in cluster
            const newsList = Object.values(clusters).sort((a, b) => {
                return new Date(b.mainStory.published_date) - new Date(a.mainStory.published_date);
            });

            res.json(newsList);

        } catch (error) {
            console.error("Processing Error:", error);
            res.status(500).json({ error: error.message });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
