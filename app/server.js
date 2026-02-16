const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
    var region;
    try{
        const response = await fetch("http://169.254.169.254/latest/meta-data/placement/region", {
            signal: AbortSignal.timeout(2000)
        });
        region = await response.text();
    }
    catch(error){
        region = process.env.AWS_REGION || 'local';
    }

    return res.json({
        "region": region,
        "message": `Hello from Region ${region}`
    })
});

app.get("/health", (req, res) => {
    res.status(200).json({
        "status": "healthy"
    });
})


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));