module.exports.go = (server) => {
    const Primus = require('primus');
    const primus = new Primus (server, {});

    //check if primus connection ok, then console.log
    primus.on('connection', (spark) => {
        console.log('connected 🐥');

        //check if data received from client, then console.log
        spark.on('data', (data) => {
            console.log("data received from client: 🙋🏼", data );
            //if data action is 'scoreUpdate' then emit to all clients
            if(data.action === 'scoreUpdate'){
                primus.write({
                    action: 'scoreUpdate', 
                    team: data.team,
                    score: data.score
                });
            }
        });
    });
}