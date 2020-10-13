# JobHunter - Your new job is only a click away.

This is a Django & React project that lets you search through GitHub's Jobs API filtering by location and/or description. After cloning the repo, follow the instructions below to run the project.

## Django

1. Navigate into the `backend/` folder. I suggest you create a virtual environment and activate it. Install the dependencies with `pip install -r requirements.txt`.
1. Run the migrations with `./manage.py migrate`.
1. Start the server with `./manage.py runserver`.
1. Make sure it's running on `http://localhost:8000/`, or else you'll have to change the address in the frontend project.

## React

1. Navigate into the `frontend/` folder. Run `npm install` to install the required packages.
1. Run `npm start` to start the server.
1. Make sure it's running on `http://localhost:3000/`, or else you'll have to change the allowed hosts setting in the backend project.
1. Access the server URL and filter by your desired choices.

## Caveats

- Keep in mind that GitHub's Jobs API seems to be extremely limited at this time (Oct 12th, 2020) and doesn't return many results. Only a few locations display results.
- The API doesn't provide a proper pagination, even though it limits its results to 50 items per request. I had to implement my own pagination system based on that, but there are still a few edge cases not covered by it.
- Although the overall functionality is working, a few improvements in code organization are still under development.
- There are no tests yet.
