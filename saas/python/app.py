from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import praw

load_dotenv()

app = FastAPI(title="Reddit Fetcher")

class FetchRequest(BaseModel):
    subreddit: str
    query: Optional[str] = None
    limit: int = 50

@app.get("/health")
async def health():
    return {"ok": True}

@app.post("/fetch")
async def fetch(req: FetchRequest):
    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        user_agent=os.getenv("REDDIT_USER_AGENT", "SaaSProblemFinder/0.1"),
    )

    posts = []
    if req.query:
        for submission in reddit.subreddit(req.subreddit).search(req.query, limit=req.limit, sort="new"):
            posts.append({
                "title": submission.title,
                "text": submission.selftext,
                "upvotes": int(submission.score),
                "comments": int(submission.num_comments),
                "created_utc": int(submission.created_utc),
                "id": submission.id,
                "url": submission.url,
            })
    else:
        for submission in reddit.subreddit(req.subreddit).hot(limit=req.limit):
            posts.append({
                "title": submission.title,
                "text": submission.selftext,
                "upvotes": int(submission.score),
                "comments": int(submission.num_comments),
                "created_utc": int(submission.created_utc),
                "id": submission.id,
                "url": submission.url,
            })

    return {"data": posts}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))