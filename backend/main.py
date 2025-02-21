import os
import subprocess
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from fastapi import BackgroundTasks
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import unquote

# Load environment variables
load_dotenv()
API_KEY = os.getenv("DEEPSEEK_API_KEY")

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "AI Testing Platform", "api_key_loaded": bool(API_KEY)}

# API Route: Performance Testing
import subprocess


from fastapi import FastAPI, Query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/test/performance")
async def test_performance(url: str = Query(...)):
    print(f"Received URL: {url}")  # Debugging output
    return {"message": "Success", "url": url}

# API Route: Functionality Testing
@app.post("/test/functionality")
def functionality_test(component: str):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run without opening a browser
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    driver.get("http://example.com")  # Replace with your website
    if component == "login":
        try:
            driver.find_element(By.NAME, "username")
            driver.find_element(By.NAME, "password")
            return {"message": "Login page exists"}
        except:
            return {"error": "Login page not found"}
    return {"message": "Functionality test completed"}

# API Route: Security Testing
@app.post("/test/security")
def security_test(endpoint: str, background_tasks: BackgroundTasks):
    def run_zap():
        subprocess.run(["zap.sh", "-cmd", "-quickurl", f"http://127.0.0.1:8000{endpoint}", "-quickout", "zap_report.html"])

    background_tasks.add_task(run_zap)
    return {"message": "Security scan started", "endpoint": endpoint}