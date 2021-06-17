const express = require('express')
const bodyParser= require('body-parser')

const app =  express()
let session = require('express-session')

app.engine('html', require('express-art-template'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.use(session({
    secret:'aaa',
    resave:false,
    saveUninitialized:true
}))
// app.get('/',(req,res) => {
//     console.log(req.query)
//     // render方法作用
//     // 1.读取你要渲染的html页面
//     // 2.渲染：将数据和页面整合到一起
//     // 3.将渲染结果发送给客户端
//     res.render('index.html',{
//         foo:'bar',
//         search:req.query.search//通过地址栏传递文本输入的内容，例如 ?search=abc
//     })
// })

app.get('/',(req,res) => {  //首页
    res.render('index.html',{
        user:req.session.user
    })
})

app.get('/login',(req, res) => {  //来到登录
    res.render('login.html')
})

app.post('/login', (req, res) => {
    const user = req.body
    console.log(req.body,'req body')
    if (user.username === 'zym' && user.password === '123') {
        req.session.user = user //使用 session 记录用户登录状态
        console.log(222)
        return res.redirect('/')

    }
    res.render('login.html')
})

app.post('/transfer',(req,res) => {
    // 校验登录状态
    if (!req.session.user) {
        return res.status(401).send('未授权')
    }
    // 执行转账操作
    res.send('success')
})
app.listen(3000,()=>{
    console.log('success')
})