import express from "express"
import cors from "cors"


const app = express()

app.use(cors())

app.get("/api/fetchlanguage", async (req, res) => {
    const ip = req.ip

    if (ip === "127.0.0.1" || ip === "::1") {
        return next()
    }

    const apiUrl = `https://freeipapi.com/api/json/${ip}`
    const response = await fetch(apiUrl)
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`)
    }
    const data = await response.json()
    return res.json({ language: data.countryCode.toLowerCase()})
})

app.listen(5000)

module.exports = app;