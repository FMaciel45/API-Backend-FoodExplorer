require("express-async-errors");
require ("dotenv/config") // variáveis de ambiente -> + segurança
const express = require("express");
const cors = require ("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");
const routes = require("./routes");
const uploadConfig = require("./configs/upload");

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://sitefoodexplorer.netlify.app"],
  credentials: true
}))


app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    }) 
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "internal server error"
  })
})

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))