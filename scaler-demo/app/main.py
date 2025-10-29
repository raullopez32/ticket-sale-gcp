from fastapi import FastAPI
from pydantic import BaseModel
import asyncio, uuid, time

app = FastAPI(title="scaler-demo")
seen=set()

class Purchase(BaseModel):
    user_id:str; amount:float; requestId:str|None=None

@app.get("/healthz")
async def healthz(): return {"ok":True}

@app.post("/tickets/purchase")
async def purchase(p:Purchase):
    t=time.time()
    rid=p.requestId or str(uuid.uuid4())
    if rid in seen:
        return {"status":"duplicate","requestId":rid,"latency_ms":int((time.time()-t)*1000)}
    await asyncio.sleep(0.12)
    seen.add(rid)
    return {"status":"ok","requestId":rid,"latency_ms":int((time.time()-t)*1000)}
