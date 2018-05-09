# QUESTIONSETTING

UCL Location Based Quiz - Question Setting App

The addition of any questions to the Location Based Quiz app (see https://github.com/JorgeCerme/LOCATIONBASEDQUIZAPP.git) can be achieved by the use of this question setting browser app that is connected to a database. 

Getting Started

To run servers, open command terminal in BitVise SSH Client:

App-Server
cd /home/studentuser/code
cd phonegapappsF
sudo su
(insert Password)
cd zcesjce
Phonegap serve

Questions-Server
cd /home/studentuser/code
cd QUESTIONSETTING
node server.js


Deployment

Web Browser: https://developer.cege.ucl.ac.uk:31091  
Open and fill in the text boxes.
Click on the map for choosing the location, there is no need to know the longitude and latitude values as they will fill up once clicked in the map.
Submit when all text fields are properly filled.
Make sure correct option and the option where this corresponds to, are written exactly the same, a space difference will cause a non detection of the correct answer and all of them will be wrong.


Built With

    Notepad++ - The script framework used
    Bitvise SSH Client - Dependency Management
    pgAdmin III PostgreSQL - Used to conect and generate table in database

(README.md template from: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
