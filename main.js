objects = [];
status="";

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() 
{ 
    image(video, 0, 0, 480, 380); 
    if(status != "") 
    { 
    for (i = 0; i < objects.length; i++) 
    {
        objectDetector.detect(video, gotResult);  
    document.getElementById("status").innerHTML = "Status : Object Detected";     fill("#FF0000"); 
    percent = floor(objects[i].confidence * 100); 
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
    noFill(); 
    stroke("#FF0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
    if(objects[i].label == value)
    {
        video.stop();
        objectDetector.detect(gotResult);  
        document.getElementById("number_of_objects").innerHTML = "Object Mentioned Found"; 
    }
} 
} 
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    value = document.getElementById("object").value;
}

function modelLoaded()
{
    status = true;
    console.log("Model Loaded!");
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results)
{
    if (error) {
        console.log(error);
    }
    objects = results;
    console.log(results);
}
