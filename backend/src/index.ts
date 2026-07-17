import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { walletRoutes } from './routes/wallet.js'
import { transactionRoutes } from './routes/transaction.js'
import { feedbackRoutes } from './routes/feedback.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

app.use('/api/wallet', walletRoutes)
app.use('/api/transaction', transactionRoutes)
app.use('/api/feedback', feedbackRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`FaucetX backend running on port ${PORT}`)
})

export default app
