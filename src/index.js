import express from 'express';
import prisma from '../prisma/client';

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Selamat datang di Dompet Digital NUFAZA E-WALLET!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  
