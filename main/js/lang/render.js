var nl = nl || {};
(function (nl, win, doc) {


    var render = nl.render = {};
    var webgl = render.webgl = nl.extend(nl.Object);
    webgl.prototype.init = function (config) {
        this.super("init", [config]);
        this._glCanvas = config.glCanvas;
        this._glContext = this._glCanvas.getContext("webgl") || this._glCanvas.getContext("experimental-webgl");
        this._renderInit = config.renderInit;
        this._render = config.render;
    }
    webgl.prototype.getGLCanvas = function () {
        return this._glCanvas;
    }
    webgl.prototype.getGLContext = function () {
        return this._glContext;
    }
    webgl.prototype.createVertexShader = function (script) {
        var gl = this._glContext;
        var shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, script);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        } else {
            throw "Create VERTEX_SHADER failed";
        }
    }
    webgl.prototype.createFragmentShader = function (script) {
        var gl = this._glContext;
        var shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, script);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        } else {
            throw "Create FRAGMENT_SHADER failed";
        }
    }
    webgl.prototype.createProgram = function (vertexShader, fragmentShader) {
        var gl = this._glContext;
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var info = gl.getProgramInfoLog(program);
            throw "Create WEBGL program failed:" + info;
        } else {
            return program;
        }
    }
    webgl.prototype.createVbo = function (data) {
        var gl = this._glContext;
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return vbo;
    }
    webgl.prototype.createIbo = function (data) {
        var gl = this._glContext;
        var ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        return ibo;
    }
    webgl.prototype.postVertexAttrib = function (program, attName, attStride, vbo) {
        var gl = this._glContext;
        var vertexAttrib = gl.getAttribLocation(program, attName);
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.enableVertexAttribArray(vertexAttrib);
        gl.vertexAttribPointer(vertexAttrib, attStride, gl.FLOAT, false, 0, 0);
    }
    webgl.prototype.renderInit = function () {
        this._renderInit();
    }
    webgl.prototype.render = function () {
        this._render();
    }
    

    var canvas = render.canvas = nl.extend(nl.Object);
    canvas.prototype.init = function (config) {
        this.super("init", [config]);
        this._canvas = config.canvas;
        this._context = config.canvas.getContext("2d");
    }


    
    // webgl.prototype.clearColor = function (r, g, b, a) {
    //     var gl = this._glContext;
    //     gl.clearColor(r, g, b, a);
    //     gl.clear(gl.COLOR_BUFFER_BIT);
    // }


    // webgl.prototype.render = function () {
    //
    // }

})(nl, window, document);