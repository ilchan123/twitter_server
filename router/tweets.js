import express from 'express'

const router = express.Router()

let tweets = [
    {
        id:'1',
        name:'김사과',
        username:'apple',
        text:'오지엉덮밥!',
        createdAt: Date.now().toString(),
        url:'https://r2.jjalbot.com/2023/03/Vmpor2ad_O.jpeg'
    },
    {
        id:'2',
        name:'반하나',
        username:'banana',
        text:'문방구 안녕하시요',
        createdAt: Date.now().toString(),
        url:'https://i.namu.wiki/i/hz7d5fA5FHkfWUU5JBg6DHEkDQ6p_BLMdO1uMMnz-fVm6ENhORHqo2OvECOoeBFK8Gjwe9CgGJw0EduN6hRg-Q.webp'
    },
    {
        id:'3',
        name:'오렝지',
        username:'orange',
        text:'시대의 주먹!',
        createdAt: Date.now().toString(),
        url:'https://aws-cdn.peanutoon.com/POCSTORAGE3/compression/jpeg/comic/4049/60644/EPI_COVER_IMG_060644_20191103_080656_143.jpeg'
    }
]


// 해당 아이디에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets?username=:username
router.get('/',(req,res,next)=>{
    const username = req.query.username
    const data = username ? tweets.filter((tweet)=> tweet.username == username) : tweets
    res.status(200).json(data)
})


// 글 번호에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets/:id
router.get('/:id',(req,res,next)=>{
    const id = req.params.id
    const tweet = tweets.find((tweet)=> tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
})

// 트윗하기
// POST
// http://127.0.0.1:8080/tweets
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/', (req, res, next)=>{
    const { username, name, text } =req.body
    const tweet = {
        id:'4',
        username: username,
        name: name,
        text: text,
        createdAt: Date.now().toString()
    }
    tweets = [tweet, ...tweets]
    res.status(201).json(tweets)
})

// 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.put('/:id', (req, res, next)=>{
    const id = req.params.id
    const text = req.body.text
    const tweet = tweets.find((tweet)=> tweet.id ===id)
    if(tweet){
        tweet.text = text
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }    
})

// 트윗 삭제하기
// DELETE
// http://127.0.0.1:8080/tweets/:id
router.delete('/:id', (req, res, next)=>{
    const id = req.params.id
    tweets = tweets.filter((tweet)=> tweet.id !== id)
    const tweet = tweets.find((tweet)=> tweet.id ===id)
    res.status(200).json(tweets)
})

export default router