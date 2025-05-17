//buat package.json/Inisialisasi Proyek
npm init -y

//instalasi Dependensi
npm install express prisma @prisma/client typescript ts-node @types/node @types/express

//Inisialisasi TypeScript
npx tsc --init

//Connect Prisma to a prisma Postgres Database
buat new project di akun prisma lalu conncent linknya

//Set Environment Variable Buat file .env di root proyek:
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNmQ4ZjJjZDktMjIyOS00NDgwLWIyNDktMDFjZTcyN2RkMWViIiwidGVuYW50X2lkIjoiZmE1YjVjYzExM2UwMzQzMzYyMWUwNDQ3ZWU0Y2M5NzgyMjhhNTMyOWEzZjkxNzYwMTliNTk3NWUwZGU5YWU5ZSIsImludGVybmFsX3NlY3JldCI6IjdmYjBjOWEyLTU4NDAtNGJiMS04ZThjLTA5MzExN2Y2NWJkZCJ9.QDPa5ISJzypPbwZxV-c-sBRPg55_YFXNv-ejXaBWVq8"

//Migrasi Database
npx prisma migrate dev --name init

