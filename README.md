# WOD Fetcher
Fetch all workouts from website

The app fetches all the workouts posted on a CrossFit gym's website and creates searchable files of the workout.

To run the script, type the following on the command line from within the project folder:

`node script.js <parameter>`

The parameter options are:
all		= Fetch all workouts from january 1st, 2017 until today
year	= Fetch all workouts from the current year
month	= Fetch all workouts from the current month
day		= fetch today's workout.

The script will get the workout for each day from 2017 until the current date and write the output to a text file in the /WODs directory with the current date as the file name.