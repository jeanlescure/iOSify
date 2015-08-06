var renderer;
var scene;
var camera;
var light;
var texture_image;
var texture;
var material;
var cube_mesh;
var cube;
var rotVal = 0.0;
Math.TAU = Math.PI * 2.0;

function init() {
  THREE.ImageUtils.crossOrigin = '';
  var texture_image = new Image();
  texture_image.src = texture_image_data;
  texture = new THREE.Texture();
  texture_image.onload = function () {
      texture.image = texture_image;
      texture.needsUpdate = true;
  };
  texture.minFilter = THREE.LinearFilter;
  
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true
  });
  renderer.setClearColor( 0xffffff );

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 85;

  scene = new THREE.Scene();
  scene.add(camera);

  window.onresize = function() {
    renderer.setSize(window.innerWidth-4, window.innerHeight-4);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.onresize();
  
  var shader = new THREE.TransformationShader();
  shader.uniforms.tDiffuse.value = texture;
   
  material = new THREE.ShaderMaterial(shader);

  cube_mesh = new THREE.Mesh( new THREE.BoxGeometry( 20, 20, 20 ), material );

  cube = new THREE.Object3D();
  cube.add(cube_mesh);
  cube.position.z = -200;

  scene.add(cube);
  
  renderer.render(scene, camera);
}

function animate() {
  if (rotVal < Math.TAU){
    rotVal += .03;
  }else{
    rotVal = 0.0;
  }
  
  material.uniforms.rotationX.value = rotVal;
  material.uniforms.rotationY.value = rotVal;
  material.uniforms.rotationZ.value = rotVal;
  material.uniforms.translationX.value = 10 * Math.sin(rotVal);
  material.uniforms.translationY.value = 10 * Math.cos(rotVal);

  render();
  requestAnimationFrame( animate, renderer.domElement );
}
  
function render() {
  cube_mesh.geometry.dispose();
  renderer.render( scene, camera );
}

window.onload = function(){
  init();
  animate();
}