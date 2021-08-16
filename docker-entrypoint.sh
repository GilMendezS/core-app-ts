#!/bin/sh
echo "Running migrations"
npx sequelize-cli db:migrate
echo "Running seeders"
npx sequelize-cli db:seed:all
npm run dev
