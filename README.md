# GameHub

If cors error is thrown, try:
    > check if wsl ip matches line 21 in server.js
    > grant all privileges to root on host 'any'
    > change localhost to 127.0.0.1 in server.js in line 14

display: flex; in app.scss might need to be removed (TBD)


How to run:
Import database from GameHub/gamehub_db directory.
Open terminal in GameHub directory, type:
    npm i
    cd server
    npm start
Open new terminal, type:
    cd frontend
    npm run dev
Go to http://localhost:5173/