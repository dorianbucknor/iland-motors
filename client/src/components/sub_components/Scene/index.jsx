import { Engine, Scene as BabylonScene } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default function Scene({
	antialias,
	engineOptions,
	adaptToDeviceRatio,
	sceneOptions,
	onRender,
	onSceneReady,
	setSceneEnv,
	getCanvas,
	onMouseEnter,
	onMouseLeave,
	...rest
}) {
	const canvasRef = useRef(null);

	const styles = {
		maxSize: {
			width: "100%",
			height: "100%",
			outline: "none",
		},
	};

	useEffect(() => {
		if (canvasRef.current) {
			const engine = new Engine(
				canvasRef.current,
				antialias,
				engineOptions,
				adaptToDeviceRatio
			);
			const scene = new BabylonScene(engine, sceneOptions);

			if (typeof getCanvas === "function") {
				getCanvas(canvasRef);
			}

			if (scene.isReady()) {
				onSceneReady(scene);
			} else {
				scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
			}

			engine.runRenderLoop(() => {
				if (typeof onRender === "function") {
					onRender(scene);
				}
				scene.render();
			});
			const resize = () => {
				scene.getEngine().resize();
			};
			if (window) {
				window.addEventListener("resize", resize);
			}
			return () => {
				scene.getEngine().dispose();
				if (window) {
					window.removeEventListener("resize", resize);
				}
			};
		}
	}, [
		adaptToDeviceRatio,
		antialias,
		engineOptions,
		onRender,
		onSceneReady,
		canvasRef,
		sceneOptions,
		getCanvas,
	]);
	return (
		<canvas
			onMouseLeave={onMouseLeave}
			onMouseEnter={onMouseEnter}
			style={styles.maxSize}
			ref={canvasRef}
			{...rest}
		/>
	);
}
