import {
	ArcRotateCamera,
	MeshBuilder,
	SceneLoader,
	Vector3,
	Color3,
	SpotLight,
	FramingBehavior,
	Scene as SCN,
	StandardMaterial,
	Light,
	HemisphericLight,
} from "@babylonjs/core";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Scene from "../Scene";
import "@babylonjs/loaders";
import "./index.css";
import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";
import {
	NotInterested,
	ControlCamera,
	ChevronLeft,
	ChevronRight,
	Visibility,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export default function MultiModelViewer() {
	let alpha = Math.PI / 2;
	let beta = Math.PI / 4;

	const NUM_MODELS = 8;
	const [modelIndex, setModelIndex] = useState(0);
	const [interact, setInteract] = useState(false);
	const loading = useRef();
	const sceneContainerRef = useRef();
	const [loaded, setLoaded] = useState(0);
	const [toLoad, setToLoad] = useState(0);
	const [loadPercentage, setLoadPercentage] = useState(0);

	const models = ["Old School"];

	const setSceneEnv = (scene) => {
		// /** */
		// scene.createDefaultEnvironment({
		// 	environmentTexture: `${process.env.PUBLIC_URL}/media/HDR/autoshop.env`,
		// });
	};

	const onSceneReady = useCallback(
		/**
		 *
		 * @param {SCN} scene
		 */
		async (scene) => {
			if (scene.isDisposed === false) {
				try {
					scene.clearColor = new Color3(0.12, 0.12, 0.12); //new Color3(0.1, 0.1, 0.1);
					scene.ambientColor = new Color3(0.2, 0.2, 0.2);

					// /**Light */
					// var light = new HemisphericLight(
					// 	"scene_light",
					// 	Vector3.Up(),
					// 	scene
					// );
					// light.intensity = 1;

					let modelCamera = new ArcRotateCamera(
						"Model Camera",
						alpha,
						beta,
						30,
						Vector3.Zero(),
						scene,
						true
					);

					/**Models */
					let model = await SceneLoader.ImportMeshAsync(
						"",
						`${process.env.PUBLIC_URL}/media/models/${models[modelIndex]}/`,
						"scene.gltf",
						scene,
						(e) => {
							setLoaded(e.loaded);
							setToLoad(e.total);
						}
					);

					modelCamera.setTarget(model.meshes[1], true);
					modelCamera.useAutoRotationBehavior = true;
					modelCamera.framing = FramingBehavior.FitFrustumSidesMode;
					modelCamera.useFramingBehavior = true;
					modelCamera.position.y = 21;
					modelCamera.radius =
						model.meshes[1]._boundingInfo.boundingSphere
							.radiusWorld * 2;
					modelCamera.upperRadiusLimit =
						model.meshes[1]._boundingInfo.boundingSphere
							.radiusWorld * 2.5;

					var viewLight = new SpotLight(
						"View Light",
						new Vector3(
							0,
							model.meshes[1]._boundingInfo.boundingSphere
								.radiusWorld * 1,
							-100
						),
						new Vector3(0, -1, 2.4),
						Math.PI / 1,
						10,
						scene
					);
					viewLight.intensityMode =
						Light.INTENSITYMODE_LUMINOUSINTENSITY;
					viewLight.intensity = 7;
					viewLight.specular = Color3.Black(); //new Color3(0.12, 0.12, 0.12);

					var modelLight = new SpotLight(
						"Model Light",
						new Vector3(
							0,
							model.meshes[1]._boundingInfo.boundingSphere
								.radiusWorld * 1.5,
							0
						),
						new Vector3(
							0,
							-1,
							model.meshes[1]._boundingInfo.boundingSphere
								.radiusWorld || 40
						),
						Math.PI / 0.4,
						9,
						scene
					);

					modelLight.intensityMode =
						Light.INTENSITYMODE_LUMINOUSINTENSITY;
					modelLight.intensity = 10;
					modelLight.specular = Color3.Black(); //new Color3(0.12, 0.12, 0.12);
					modelLight.setDirectionToTarget(model.meshes[1].position);
					// modelLight.diffuse = Color3.Black();
					modelLight.radius =
						model.meshes[1]._boundingInfo.boundingSphere.radiusWorld;

					/**Ground*/
					var ground = MeshBuilder.CreateGround(
						"ground",
						{
							width:
								model.meshes[1]._boundingInfo.boundingSphere
									.radiusWorld * 4,
							height:
								model.meshes[1]._boundingInfo.boundingSphere
									.radiusWorld * 4,
						},
						scene
					);

					let groundMaterial = new StandardMaterial(
						"ground material",
						scene
					);
					// groundMaterial.alpha = 1;
					groundMaterial.specularColor = new Color3(0.12, 0.12, 0.12);
					// groundMaterial.ambientColor = new Color3(0.12, 0.12, 0.12);
					groundMaterial.diffuseColor = new Color3(0.12, 0.12, 0.12); //new Color3(0.12, 0.12, 0.12);
					ground.material = groundMaterial;

					// var sceneLight = new HemisphericLight(
					// 	"Scene Light",
					// 	Vector3.Up(),
					// 	scene
					// );
					// sceneLight.intensity = 10;
					// sceneLight.diffuse = new Color3(0.4, 0.4, 0.4);
					// sceneLight.specular = new Color3(0.2, 0.2, 0.2);
					// sceneLight.setEnabled(false);

					for (
						var index = 0;
						index < scene.materials.length;
						index++
					) {
						scene.materials[index].usePhysicalLightFalloff = false;
					}
				} catch (error) {
					console.log(error);
				}
			}
		},
		[alpha, beta, modelIndex]
	);

	const onRender = useCallback(
		/**
		 *
		 * @param {SCN} scene
		 */
		(scene) => {
			if (!scene.isLoading) {
				if (loading) {
					loading.current?.classList?.remove("show");
					loading.current?.classList?.add("hide");
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

				if (scene.getCameraByName("Model Camera")) {
					defaultCamera.detachControl();
					scene.removeCamera(defaultCamera);
					scene.getLightByName("View Light").parent =
						scene.getCameraByName("Model Camera");
				}

				scene.activeCamera.attachControl(true);
			} else {
				if (loading) {
					loading.current?.classList?.remove("hide");
					loading.current?.classList?.add("show");
				}
			}
		},
		[alpha, beta]
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
		<div className="multiModelVeiwer">
			<div ref={loading} className="multiModelVeiwer__loading hide">
				Loading {loadPercentage}%
			</div>
			<div className="multiModelVeiwer__scene" ref={sceneContainerRef}>
				<Scene
					antialias
					onRender={onRender}
					onSceneReady={onSceneReady}
					setSceneEnv={setSceneEnv}
					id="canvas-main"
				/>
				<div
					className={
						interact
							? "scene__no-interact-cover interact"
							: "scene__no-interact-cover no-interact"
					}
				/>
			</div>

			<div className="multiModelVeiwer__ctrlBar">
				<IconButton
					onClick={(e) => {
						if (document.body.classList.contains("no-scroll")) {
							document.body.classList.remove("no-scroll");
							setInteract(false);
						} else {
							document.body.classList.add("no-scroll");
							setInteract(true);
						}
					}}
					id="multiModelViewer__interact"
					title={interact ? "Exit" : "Interact"}
				>
					{interact ? (
						<>
							<NotInterested id="no-interact-icon" />
							<ControlCamera id="interact-icon" />
						</>
					) : (
						<ControlCamera id="interact-icon" />
					)}
				</IconButton>
				<div className="multiModelVeiwer__btns-title">
					<IconButton
						type="button"
						onClick={() => {
							setModelIndex((curr_Index) =>
								curr_Index === 0
									? models.length - 1
									: curr_Index - 1
							);
						}}
						id="ctrlBar__prev"
						title="Previous Vehicle"
					>
						<ChevronLeft fontSize="inherit" />
					</IconButton>
					<h1 className="multiModelVeiwer__modelTitle">
						{models[modelIndex]}
					</h1>
					<IconButton
						type="button"
						onClick={() => {
							setModelIndex((curr_Index) =>
								curr_Index === models.length - 1
									? 0
									: curr_Index + 1
							);
						}}
						title="Next Vehicle"
					>
						<ChevronRight id="ctrlBar__next" />
					</IconButton>
				</div>
				<IconButton
					title="View"
					href="/model" /** href={`/${vehicleLink}`} */
				>
					<Visibility id="ctrlBar__view" />
				</IconButton>
			</div>
		</div>
	);
}
