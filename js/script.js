

var callback = function(){

//FULL PAGE JS

var myFullpage = new fullpage('#fullpage', {
  sectionsColor: ['fff', 'fff', 'fff'],
  anchors: ['firstPage', 'secondPage', 'thirdPage'],
  autoScrolling:true,

});

//SWIPER JS

var mySwiper = new Swiper('.swiper-container', {
// Optional parameters
direction: 'horizontal',
loop: true,

// If we need pagination
// pagination: {
//   el: '.swiper-pagination',
// },

// Navigation arrows
navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
},
})

//STICKY NAVBAR

window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//THREE.JS
myCanvas = document.getElementById('myCanvas');

//RENDERER
renderer = new THREE.WebGLRenderer({
    canvas: myCanvas, 
    antialias: true,
    alpha: true
});
renderer.setClearColor(0xffffff00, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000 );

//SCENE
scene = new THREE.Scene();

//LIGHTS

var light = new THREE.AmbientLight(0xDE284A, 0.9);
scene.add(light);

var light2 = new THREE.PointLight(0xfb8f4c, 0.6);
scene.add(light2);

var loader = new THREE.GLTFLoader();
var mesh;

loader.load('assets/ten_model.glb', function handle_load(gltf) {

    // console.log(gltf);
    mesh = gltf.scene;

// var newMaterial = new THREE.MeshStandardMaterial({color: 0xFF7676});
var newMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
mesh.traverse((o) => {
    if (o.isMesh) o.material = newMaterial;
});
scene.add( mesh );
mesh.position.z = -10;
if(window.innerWidth <= 768){
    mesh.scale.set(0.5,0.5,0.5);

}
else if(window.innerWidth > 768 && window.innerWidth <= 1224){
    mesh.scale.set(0.75,0.75,0.75);

}
else if(window.innerWidth > 1224){
    mesh.scale.set(1,1,1);
}
});


//RENDER LOOP
render();

var delta = 0;
var prevTime = Date.now();

function render() {

    delta += 0.1;

    if (mesh) {

        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.01;

}

renderer.render(scene, camera);

requestAnimationFrame(render);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    if(window.innerWidth <= 768){
        mesh.scale.set(0.5,0.5,0.5);
        mesh.position.x = 0
        mesh.position.y = 0
        mesh.position.z = -10;
    }
    else if(window.innerWidth > 768 && window.innerWidth <= 1224){
        mesh.scale.set(0.75,0.75,0.75);
        mesh.position.x = 2
        mesh.position.y = 0
        mesh.position.z = -10;
    }
    else if(window.innerWidth > 1224){
        mesh.scale.set(1,1,1);
        mesh.position.x = 2
        mesh.position.y = 0
        mesh.position.z = -10
    }

    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}


