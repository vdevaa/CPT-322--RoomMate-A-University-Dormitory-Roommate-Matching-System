STEP 1 - go to project folder | 
cd "...\roommate-backend"
Your file location

STEP 2 - build and start containers | 
docker compose up -d --build

STEP 3 - verify API is running | 
curl http://localhost:8438/api/health

STEP 4 - seed example residents | 
docker compose exec api npm run seed

STEP 5 - login to test | 
curl -X POST http://localhost:8438/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"kirin@example.com\",\"password\":\"Password123!\"}"

STEP 6 - open Mongo shell if you want to see data | 
docker compose exec mongo mongosh -u root -p rootpass --authenticationDatabase admin

inside mongosh | 

use roommate_db
show collections
db.users.find().pretty()

db.profiles.find().pretty()
