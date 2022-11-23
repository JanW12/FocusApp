
const express =  require('express')
const httpServer = express();
const dialer = require('dialer').Dialer
const cors = require('cors');
const bodyParser = require('body-parser');

const config = {
    url: 'https://uni-call.fcc-online.pl',
    login: 'focus27',
    password: 'hnhoi2nkl3v'
}

dialer.configure(null)


httpServer.listen(3000, function(){
    console.log('Example app listening on port 3000')
})
httpServer.get('/call/:number1/:number2', (req, res) => {
    const number1 = req.params.number1;
    const number2 = req.params.number2;
    dialer.call(number1,number2);
    res.json({success: true});
    })

    
    httpServer.use(bodyParser.json());
    httpServer.use(cors());
    httpServer.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
    });    

    httpServer.post('/call/', async (req, res) => {
        const number1 = req.body.number;
        const number2 = '555555555' // tutaj dejemy swój numer
        console.log('Dzwonie', number1, number2)
        bridge = await dialer.call(number1, number2);
        let interval = setInterval(async () => {
        let status = await bridge.getStatus();
        console.log(status)
        if (
        status === "ANSWERED" ||
        status === "FAILED" ||
        status === "BUSY" ||
        status === "NO ANSWER"
        ) {
        console.log("stop");
        clearInterval(interval);
        }
        }, 2000);
        res.json({ success: true });
        })