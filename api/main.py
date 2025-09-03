from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import random
import time
from datetime import datetime
from typing import Optional
import uvicorn

app = FastAPI(title="NetCode Atlas API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inspirational quotes about technology and the internet
TECH_QUOTES = [
    "The internet is becoming the town square for the global village of tomorrow. - Bill Gates",
    "The web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past. - Tim Berners-Lee",
    "The computer was born to solve problems that did not exist before. - Bill Gates",
    "The internet is the first thing that humanity has built that humanity doesn't understand, the largest experiment in anarchy that we have ever had. - Eric Schmidt",
    "The goal is to turn data into information, and information into insight. - Carly Fiorina",
    "Protocols, not platforms. A lesson from the early internet that we need to remember. - Mike Masnick",
    "The domain name system is one of the most critical components of the internet infrastructure. - Paul Mockapetris",
    "The power of the web is in its universality. Access by everyone regardless of disability is an essential aspect. - Tim Berners-Lee",
    "Python is an experiment in how much freedom programmers need. Too much freedom and nobody can read another's code; too little and expressiveness is endangered. - Guido van Rossum",
    "JavaScript is the only language that I'm aware of that people feel they don't need to learn before they start using it. - Douglas Crockford",
    "CSS is like a game of chess; you need to think a few moves ahead. - Chris Coyier",
    "HTML is the foundation of the web. Without it, there would be no structure, no content, no web. - Jeremy Keith"
]

@app.get("/")
async def root():
    return {
        "message": "Welcome to NetCode Atlas API",
        "version": "1.0.0",
        "endpoints": {
            "/api/quote": "Get a random tech quote",
            "/api/latency": "Test API latency",
            "/api/health": "Check API health status"
        }
    }

@app.get("/api/quote")
async def get_random_quote(category: Optional[str] = None):
    """Get a random inspirational quote about technology and the internet"""
    if category:
        filtered_quotes = [q for q in TECH_QUOTES if category.lower() in q.lower()]
        if not filtered_quotes:
            raise HTTPException(status_code=404, detail=f"No quotes found for category: {category}")
        quote = random.choice(filtered_quotes)
    else:
        quote = random.choice(TECH_QUOTES)
    
    return {
        "quote": quote,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/latency")
async def test_latency():
    """Test API latency by returning the current timestamp"""
    start_time = time.time()
    return {
        "timestamp": datetime.utcnow().isoformat(),
        "latency_ms": round((time.time() - start_time) * 1000, 2)
    }

@app.get("/api/health")
async def health_check():
    """Check API health status"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/stats/dns")
async def dns_stats():
    """Get DNS-related statistics"""
    return {
        "total_dns_queries": "Over 3 trillion per day",
        "most_popular_resolver": "Google DNS (8.8.8.8)",
        "average_query_time": "20-100ms",
        "dns_security": {
            "dnssec_adoption": "~20% of domains",
            "doh_usage": "Growing rapidly",
            "dot_usage": "Enterprise adoption increasing"
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)