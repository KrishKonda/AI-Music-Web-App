song="";
song2="";
leftWristY=0;
leftWristX=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;
status_song1="";
status_song2="";
score_rightWrist=0;
function preload(){
    song=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function draw(){
image(video,0,0,600,500);
fill("#ff0000");
stroke("#ff0000");
song.play();
status_song1=song.isPlaying();
if(score_leftWrist>0.2){
    circle(leftWristX,leftWristY,20);
    song2.stop();
    if(status_song1==false){
        song.play();
        document.getElementById("song").innerHTML="Song:Peter Pan";
    }
}
status_song2=song2.isPlaying();
if(score_rightWrist>0.2){
    circle(rightWristX,rightWristY,20);
    song.stop();
    if(status_song2==false){
        song2.play();
        document.getElementById("song").innerHTML="Song:Harry Potter";
    }
}
}

function modelLoaded(){
    console.log("Posenet is initialized");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    score_leftWrist=results[0].pose.keypoints[9].score;
    score_rightWrist=results[0].pose.keypoints[10].score;
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("leftWristX="+leftWristX+",leftWristY="+leftWristY);
console.log("rightWristX="+rightWristX+",rightWristY="+rightWristY);
}
}