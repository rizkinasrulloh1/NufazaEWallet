//buat package.json/Inisialisasi Proyek
npm init -y

//instalasi Dependensi
npm install express prisma @prisma/client typescript ts-node @types/node @types/express

//Inisialisasi TypeScript
npx tsc --init

//Connect Prisma to a prisma Postgres Database
buat new project di akun prisma lalu conncent linknya

//Set Environment Variable Buat file .env di root proyek:
DATABASE_URL= "prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNDIzMTc2ZTEtMTllNS00ZmZjLTljZWUtYmQ2ODI1MWJkZGJmIiwidGVuYW50X2lkIjoiNDM4YzVlMWNmZWE4ZWQ5MjRlNmFkZWNlYmNkZDA1MjI2Y2U3NjgzMmRlYzE1ZWNhYmZmODY1ZDgzMzg3NmZhMyIsImludGVybmFsX3NlY3JldCI6IjM4MjA4MzAxLTY5NjAtNDQ1ZC1hMDE5LTZjYjZhMTgzMDYwNiJ9.hQJfxu3b15_LFcrz0IUu0hmE6wO04Gv4pMfvz_ny8Hk"


//Migrasi Database
npx prisma migrate dev --name init

