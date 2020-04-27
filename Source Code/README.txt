I have been testing/running this quiz app with an extension in Visual Studio Code 
    called Live Server.  It allows you to launch a development local server and 
    features a live rebuild so any changes you make a automatically reflected on
    the site

I you don't have or want to use Viual Studio Code there are other ways to run the 
    app. The other way I have used is Python SimpleHTTPServer.

    -->Open a terminal in the folder where the code for the app is located.
    -->Use the following command to open up a local server:
            python -m SimpleHTTPServer
    
    -->Open a browser and enter the following address:
            http://127.0.0.1:8000
    
    -->This will allow you to use the app.  Use Ctrl-C to kill the server.

While I have used SimpleHTTPServer to run the app I haven't used it entensively and 
    do not know if it updates the app to changes automatically.  When you make changes
    to the app you may have to start the local server over to see the changes applied.