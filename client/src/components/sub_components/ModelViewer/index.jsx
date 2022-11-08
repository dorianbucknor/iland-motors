import {
	ArcRotateCamera,
	HemisphericLight,
	SceneLoader,
	Vector3,
	Color3,
	FramingBehavior,
	Scene as SCN,
	CubeTexture,
	StandardMaterial,
} from "@babylonjs/core";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Scene from "../Scene";
import "@babylonjs/loaders";
import "./index.css";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import { blue } from "@material-ui/core/colors";

export default function ModelViewer({ pageRef, modelPath, enable }) {
	let alpha = Math.PI / 2;
	let beta = Math.PI / 4;

	const loadOverlay = useRef();
	const sceneContainerRef = useRef();
	const [loaded, setLoaded] = useState(0);
	const [toLoad, setToLoad] = useState(0);
	const [canvasRef, setCanvasRef] = useState(null);
	const [loadPercentage, setLoadPercentage] = useState(0);

	const onSceneReady = useCallback(
		/**
		 *
		 * @param {SCN} scene
		 */
		async (scene) => {
			if (enable) {
				if (scene.isDisposed === false) {
					try {
						scene.clearColor = Color3.White();

						/**Camera */
						let modelCamera = new ArcRotateCamera(
							`Model Camera`,
							alpha,
							beta,
							30,
							Vector3.Zero(),
							scene,
							true
						);

						/**Model */
						let model = await SceneLoader.ImportMeshAsync(
							"",
							`${
								process.env.PUBLIC_URL
							}/media/models/${modelPath.replace("-", " ")}/`,
							"scene.gltf",
							scene,
							(e) => {
								setLoaded(e.loaded);
								setToLoad(e.total);
							}
						);

						// const mat1 = new StandardMaterial("mat1", scene);
						// mat1.diffuseColor = Color3.Blue();
						// mat1.specularColor = Color3.Blue();
						// model.meshes[1].material = mat1;

						// const mat2 = new StandardMaterial("mat2", scene);
						// mat2.diffuseColor = Color3.Red();
						// mat2.specularColor = Color3.Red();
						// model.meshes[2].material = mat2;

						// const mat3 = new StandardMaterial("mat3", scene);
						// mat3.diffuseColor = Color3.Yellow();
						// mat3.specularColor = Color3.Yellow();
						// model.meshes[3].material = mat3;

						modelCamera.setTarget(model.meshes[1], true);
						modelCamera.useAutoRotationBehavior = true;
						modelCamera.framing =
							FramingBehavior.FitFrustumSidesMode;
						modelCamera.useFramingBehavior = true;
						modelCamera.position.y = 1;
						modelCamera.radius =
							model.meshes[1]._boundingInfo.boundingSphere
								.radiusWorld * 2;
						modelCamera.upperRadiusLimit =
							model.meshes[1]._boundingInfo.boundingSphere
								.radiusWorld * 2.5;

						/**Light */
						var sceneLight = new HemisphericLight(
							"Scene Light",
							Vector3.Up(),
							scene
						);
						sceneLight.intensity = 3;
						sceneLight.diffuse = Color3.White();
						sceneLight.specular = new Color3(0.2, 0.2, 0.2);

						for (
							var index = 0;
							index < scene.materials.length;
							index++
						) {
							scene.materials[
								index
							].usePhysicalLightFalloff = false;
						}
					} catch (error) {
						console.log(error);
					}
				}
			} else {
				scene.dispose();
			}
		},
		[alpha, beta, enable, modelPath]
	);

	const onRender = useCallback(
		/**
		 *
		 * @param {SCN} scene
		 */
		(scene) => {
			try {
				if (!scene.isLoading) {
					if (loadOverlay) {
						loadOverlay?.current?.classList?.remove("show");
						loadOverlay?.current?.classList?.add("hide");
					}

					/**Default Camera */
					let defaultCamera = new ArcRotateCamera(
						"Default Camera",
						alpha,
						beta,
						10,
						new Vector3(0, 20, 0),
						scene,
						true
					);
					console.log();

					if (scene?.activeCamera) {
						if (canvasRef) {
							canvasRef.current.addEventListener(
								"mouseenter",
								(e) => {
									scene.activeCamera?.attachControl(
										canvasRef.current,
										true
									);
								}
							);
							canvasRef.current.addEventListener(
								"mouseleave",
								(e) => {
									scene.activeCamera?.attachControl(
										canvasRef.current,
										true
									);
								}
							);
						} else {
							scene.activeCamera?.attachControl(true);
						}
					}
				} else {
					if (loadOverlay) {
						loadOverlay?.current?.classList?.remove("hide");
						loadOverlay?.current?.classList?.add("show");
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		[alpha, beta, canvasRef]
	);

	useEffect(() => {
		let percentage = Math.round((loaded / toLoad) * 100);
		if (percentage === Infinity || isNaN(percentage)) {
			setLoadPercentage(0);
		} else {
			setLoadPercentage(percentage);
		}
		return () => {
			setLoadPercentage(null);
		};
	}, [loaded, toLoad]);

	return (
		<div className="modelViewer">
			<div ref={loadOverlay} className="modelViewer__loading hide">
				Loading {loadPercentage}%
				{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 125">
					Loading {loadPercentage}%
					<defs>
						<style>
                            .cls-1{fill:#975f39;}
                        </style>
					</defs>
					<title>Asset 1</title>
					<g id="Layer_2" data-name="Layer 2">
						<g id="Layer_1-2" data-name="Layer 1">
							<path
								style={{
									fill: "#000",
								}}
								// class="cls-1"
								d="M62.5,3A59.5,59.5,0,1,1,3,62.5,59.57,59.57,0,0,1,62.5,3m0-3A62.5,62.5,0,1,0,125,62.5,62.5,62.5,0,0,0,62.5,0Z"
							/>
						</g>
					</g>
				</svg> */}
			</div>
			<div className="modelViewer__scene" ref={sceneContainerRef}>
				<Scene
					antialias
					onRender={onRender}
					onSceneReady={onSceneReady}
					id="canvas-main"
					getCanvas={setCanvasRef}
				/>
			</div>
			{/* <div className="modelVeiwer__ctrlBar"></div> */}
		</div>
	);
}
