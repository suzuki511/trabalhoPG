"use strict";

var canvas;
var gl;

var numPositions  = 36;
var texSize = 64;

var flag = true;

var image1 = new Array();
for (var i =0; i<texSize; i++)  image1[i] = new Array();
for (var i =0; i<texSize; i++)
    for ( var j = 0; j < texSize; j++)
       image1[i][j] = new Float32Array(100);
for (var i =0; i<texSize; i++) for (var j=0; j<texSize; j++) {
    var c = (((i & 0x8) == 0) ^ ((j & 0x8) == 0));
    image1[i][j] = [c, c, c, 1];
}

var image2 = new Uint8Array(4*texSize*texSize);

for (var i = 0; i < texSize; i++)
    for (var j = 0; j < texSize; j++)
       for(var k =0; k<4; k++)
            image2[4*texSize*i+4*j+k] = 220*image1[i][j][k];

var positionsArray1 = [];
var colorsArray1 = [];
var texCoordsArray1 = [];

var positionsArray2 = [];
var colorsArray2 = [];
var texCoordsArray2 = [];

var lightPosition = vec4(1.0,  0.05, 0.05, 0.1);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
var materialAmbient =  vec4(-0.05,  0.05, -0.05, 0.1);
var materialShininess = 30.0;




var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

var vertices = [
    vec4(-0.05, -0.05, 0.05, 0.1),
    vec4(-0.05,  0.05, 0.05, 0.1),
    vec4(0.05,  0.05, 0.05, 0.1),
    vec4(0.05, -0.05, 0.05, 0.1),
    vec4(-0.05, -0.05, -0.05, 0.1),
    vec4(-0.05,  0.05, -0.05, 0.1),
    vec4(0.05,  0.05, -0.05, 0.1),
    vec4(0.05, -0.05, -0.05, 0.1)
];

var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0),  // white
    vec4(0.0, 1.0, 1.0, 1.0)   // cyan
];

window.onload = init;

var xAxis = 2;
var yAxis = 1;
var zAxis = 0;
var axis = zAxis;

var theta = vec3(3.0, 1.0, 2.0);

var theta1 = vec3(4.0, 1.0, 0.0);

var thetaLoc;
var modelViewMatrixLoc;

function configureTexture(image) {
    var texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
}

function quad(a, b, c, d, positionsArray, colorsArray, texCoordsArray) {
    positionsArray.push(vertices[a]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);

    positionsArray.push(vertices[b]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[1]);

    positionsArray.push(vertices[c]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[2]);

    positionsArray.push(vertices[a]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[0]);

    positionsArray.push(vertices[c]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[2]);

    positionsArray.push(vertices[d]);
    colorsArray.push(vertexColors[a]);
    texCoordsArray.push(texCoord[3]);
}

function colorCube(positionsArray, colorsArray, texCoordsArray) {
    quad(1, 0, 3, 2, positionsArray, colorsArray, texCoordsArray);
    quad(2, 3, 7, 6, positionsArray, colorsArray, texCoordsArray);
    quad(3, 0, 4, 7, positionsArray, colorsArray, texCoordsArray);
    quad(6, 5, 1, 2, positionsArray, colorsArray, texCoordsArray);
    quad(4, 5, 6, 7, positionsArray, colorsArray, texCoordsArray);
    quad(5, 4, 0, 1, positionsArray, colorsArray, texCoordsArray);
}

function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var ambientProduct = mult(lightAmbient, materialAmbient);

    colorCube(positionsArray1, colorsArray1, texCoordsArray1);
    colorCube(positionsArray2, colorsArray2, texCoordsArray2);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray1.concat(colorsArray2)), gl.STATIC_DRAW);
    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsArray1.concat(positionsArray2)), gl.STATIC_DRAW);
    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray1.concat(texCoordsArray2)), gl.STATIC_DRAW);
    var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texCoordLoc);

    configureTexture(image2);
    gl.uniform1i(gl.getUniformLocation(program, "uTextureMap"), 0);

    thetaLoc = gl.getUniformLocation(program, "uTheta");
    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");

    gl.uniform4fv( gl.getUniformLocation(program,"uAmbientProduct"),ambientProduct );
    gl.uniform4fv( gl.getUniformLocation(program, "uLightPosition"), lightPosition );
    gl.uniform1f( gl.getUniformLocation(program, "uShininess"),materialShininess );

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var modelViewMatrix1 = mat4();
    modelViewMatrix1 = mult(translate(-0.5, 0.0, 0.0), modelViewMatrix1);
    var modelViewMatrix2 = mat4();
    modelViewMatrix2 = mult(translate(0.3, 0.0, 0.0), modelViewMatrix2);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix1));
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays(gl.TRIANGLES, 0, numPositions); // Para o primeiro cubo

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix2));
    gl.uniform3fv(thetaLoc, theta1);
    gl.drawArrays(gl.TRIANGLES, 0, numPositions); // Para o segundo cubo

    if(flag){
        theta[axis] += 0.02;
        theta1[axis] -= 0.05;
    } 
    requestAnimationFrame(render);
}
