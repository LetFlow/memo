from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List

memos = []

app = FastAPI()


class Memo(BaseModel):
    id: int
    content: str






@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'

@app.get("/memos")
def read_memo():
    return memos

app.mount("/", StaticFiles(directory='static',html=True),name='static')