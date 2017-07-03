let express = require('express');
let app = express();
let ad = require('./home/ad');

// 如果访问这个接口就返回相应的数据
app.get('/api/ad', (req, res) => {
    res.send(ad);
});



app.listen(3000, () => {
    console.log('监听3000端口')
});
// 获取数据
// fetch(url, {
//     Accept: "application/json"
// }).then(res => res.json()).then(data => {
//     console.log(data)
// })