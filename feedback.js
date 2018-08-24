//引入核心模块
var http=require('http')
var fs=require('fs')
var template=require('art-template')
var url=require('url')
var server=http.createServer()
var date=new Date()
//留言数据
var con=[
    {
        name:'张三',
        content:'你好啊',
        date:'2018-8-22  08:10'
    }
]
server.on('request',function (req,res) {
   var urlObj=url.parse(req.url,true)
    var pathName=urlObj.pathname
    var wwwDir='E:/demo/Nodejs练习/www'
    //处理首页请求
    if(pathName==='/'){
        fs.readFile(wwwDir+'/views/index.html',function (err,data) {
            if(err){
                return res.end('404 not found...')
            }
            data=data.toString()
            var com={comments:con}
           var str=template.render(data,com)
            res.end(str)
        })
    }else if(pathName.indexOf('/public')===0){
        fs.readFile('.'+pathName,function (err,data) {
            if(err){
                return res.end('404 not found..')
            }
            res.end(data)
        })
    }else if(pathName==='/post'){
        fs.readFile(wwwDir+'/views/post.html',function (err,data) {
            if(err){
                return res.end('404 not found..')
            }
            res.end(data)
        })
    }
    else if(pathName=='/pinglun'){
        var comment=urlObj.query
        var year=date.getFullYear()
        var month=date.getMonth()
        month=month>10?month:'0'+month
        var day=date.getDay()
        day=day>10?day:'0'+day
        var hour=date.getHours()
        hour=hour>10?hour:'0'+hour
        var minute=date.getMinutes()
        minute=minute>10?minute:'0'+minute
        comment.date=year+"-"+month+"-"+day+"  "+hour+":"+minute
        //将处理后的评论信息加入数组中
        con.unshift(comment)
        //重定向到首页
        res.statusCode=302
        res.setHeader('Location','/')
        res.end()
    }
    else{
        res.end('404 not found..')
    }
})

server.listen(3000,function () {
    console.log('服务器启动成功')
})