from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List

memos = []

app = FastAPI()


class Memo(BaseModel):
    id: int
    content: str






@app.post("/memo")
def create_memo(memo:Memo):
    memos.append(memo)
    return '메모 추가에 성공했습니다.'

@app.get("/memo")
def read_memo():
    return memos

@app.put("/memo/{id}")
def update_memo(memo:Memo):
    for m in memos:
        if m.id ==memo.id:
            m.content = memo.content
            return '성공'
    return '그런 메모는 없음'

@app.delete("/memo/{id}")
def delete_memo(id):
    for index, memo in enumerate(memos):
        if memo.id ==id:
            del memos[index]
            return '성공'
    return '그런 메모는 없음'

app.mount("/", StaticFiles(directory='static',html=True),name='static')
