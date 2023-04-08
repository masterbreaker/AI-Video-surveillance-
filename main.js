status="";
objects=[];
video=""

function setup(){
    canvas=createCanvas(680,500);
    canvas.center()
}

function preload(){
    video=createVideo("video.mp4")
    video.hide();
}

function draw(){
    image(video,0,0,680,500);
    if(status!=""){
        objectDetector.detect(video,gotresult)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status : Objects detected";
            document.getElementById("numbers_of_object").innerHTML="Number of objects detected are: "+objects.length;

            fill("#f56218");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#f56218");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}

function modelloaded(){
    console.log("modelloaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results
    }
}