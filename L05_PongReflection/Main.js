"use strict";
var L05_PongReflection;
(function (L05_PongReflection) {
    var ƒ = FudgeCore;
    let keysPressed = {};
    window.addEventListener("load", hndLoad);
    let viewport;
    let ball = new ƒ.Node("Ball");
    let paddleLeft = new ƒ.Node("PaddleLeft");
    let paddleRight = new ƒ.Node("PaddleRight");
    let ballSpeed = new ƒ.Vector3(0.1, -0.1, 0);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        let pong = createPong();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        viewport.draw();
        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start();
    }
    function update(_event) {
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_UP])
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_DOWN])
            paddleRight.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_LEFT])
            paddleRight.cmpTransform.local.translate(new ƒ.Vector3(-0.3, 0, 0));
        if (keysPressed[ƒ.KEYBOARD_CODE.ARROW_RIGHT])
            paddleRight.cmpTransform.local.translate(ƒ.Vector3.X(0.3));
        if (keysPressed[ƒ.KEYBOARD_CODE.W])
            paddleLeft.cmpTransform.local.translate(new ƒ.Vector3(0, 0.3, 0));
        if (keysPressed[ƒ.KEYBOARD_CODE.S])
            paddleLeft.cmpTransform.local.translate(ƒ.Vector3.Y(-0.3));
        ;
        let sclRect = paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaling.copy;
        let posRect = paddleRight.cmpTransform.local.translation.copy;
        let hit = detectHit(ball.cmpTransform.local.translation, posRect, sclRect);
        console.log(hit);
        if (!hit)
            moveBall();
        ƒ.RenderManager.update();
        viewport.draw();
    }
    function detectHit(_position, _posRect, _sclRect) {
        let rect = new ƒ.Rectangle(_posRect.x, _posRect.y, _sclRect.x, _sclRect.y, ƒ.ORIGIN2D.CENTER);
        return rect.isInside(_position.getVector2());
    }
    function moveBall() {
        ball.cmpTransform.local.translate(ballSpeed);
    }
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function createPong() {
        let pong = new ƒ.Node("Pong");
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let meshQuad = new ƒ.MeshQuad();
        ball.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleRight.addComponent(new ƒ.ComponentMesh(meshQuad));
        ball.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new ƒ.ComponentTransform());
        paddleLeft.addComponent(new ƒ.ComponentTransform());
        paddleRight.addComponent(new ƒ.ComponentTransform());
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
})(L05_PongReflection || (L05_PongReflection = {}));
//# sourceMappingURL=Main.js.map