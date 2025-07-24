from fastapi import FastAPI, BackgroundTasks
import subprocess

app = FastAPI()

def run_refresh():
    try:
        # It's better to run the node script directly
        subprocess.run(['node', '-e', 'require("./cron.js").refreshAll()'], check=True, cwd='backend')
    except subprocess.CalledProcessError as e:
        print(f"Error refreshing data: {e}")
    except FileNotFoundError:
        print("Error: 'node' command not found. Make sure Node.js is installed.")

@app.post("/api/refresh")
async def refresh_data(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_refresh)
    return {"message": "Refresh started in the background."}

@app.get("/")
def read_root():
    return {"Hello": "World"}
