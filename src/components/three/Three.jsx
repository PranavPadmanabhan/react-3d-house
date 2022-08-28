import { OrbitControls, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import { AxesHelper, BoxBufferGeometry, DirectionalLight, DirectionalLightHelper, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, PlaneBufferGeometry } from 'three';
import * as THREE from  'three'

const Three = () => {

    const groundRef = useRef()
    

    const { scene } = useThree();
    const texture = useTexture('/textures/grass/color.jpg')
    const roughnesstexture = useTexture('/textures/grass/color.jpg')
    const normalTexture = useTexture('/textures/grass/color.jpg')
    const ao_texture = useTexture('/textures/grass/ambientOcclusion.jpg')
    const window_door = useTexture('/4037.jpg')
    const doorColor = useTexture('/textures/door/color.jpg')
    const doorAlpha = useTexture('/textures/door/alpha.jpg')
    const doorAo = useTexture('/textures/door/ambientOcclusion.jpg')
    const doornormal = useTexture('/textures/door/normal.jpg')
    const doormetalNess = useTexture('/textures/door/metalness.jpg')
    const doorRoughness = useTexture('/textures/door/roughness.jpg')
    const height = useTexture('/textures/door/height.jpg')




    // console.log(texture);

   
    const getMaterial = (color = 'white') => {
        return new MeshStandardMaterial({ color })
    }

    const house = new Group();
    house.rotation.x = -Math.PI * 0.5
    
    const ground = new Mesh(
        new PlaneBufferGeometry(20,20),
        getMaterial('green')
    )


    ground.geometry.setAttribute(
        'uv2',
        new Float32BufferAttribute(ground.geometry.attributes.uv.array,2)
        )

    ground.material.map = texture;
    ground.material.aoMap = ao_texture;
    ground.material.roughnessMap = roughnesstexture
    ground.material.normalMap = normalTexture

    texture.repeat.set(8,8)
    ao_texture.repeat.set(8,8)
    normalTexture.repeat.set(8,8)
    roughnesstexture.repeat.set(8,8)

    texture.wrapS = THREE.RepeatWrapping
    ao_texture.wrapS = THREE.RepeatWrapping
    normalTexture.wrapS = THREE.RepeatWrapping
    roughnesstexture.wrapS = THREE.RepeatWrapping

    texture.wrapT = THREE.RepeatWrapping
    ao_texture.wrapT = THREE.RepeatWrapping
    normalTexture.wrapT = THREE.RepeatWrapping
    roughnesstexture.wrapT = THREE.RepeatWrapping

    
    const foundationMaterial = new MeshStandardMaterial({ color:'white' })

    const foundation1 = new Mesh(
        new BoxBufferGeometry(10,0.3,8),
        getMaterial('azure')
    )

    foundation1.position.y = -0.16;
    foundation1.position.z = 3


    const foundation2 = new Mesh(
        new BoxBufferGeometry(6,0.3,3),
        getMaterial('azure')
    )
     foundation2.position.z = -2
     foundation2.position.x = 2
     foundation2.position.y = -0.16

    
/// creating foundation

    const foundation = new Group();
    foundation.add(foundation1)
    foundation.add(foundation2)
    foundation.castShadow = true
    foundation.receiveShadow = true

    const groundFloor = new Group();
    groundFloor.castShadow = true
    groundFloor.receiveShadow = true
    

    ///creating wall
    const walls = new Mesh(
        new BoxBufferGeometry( 9, 2.5, 6 ),
        getMaterial('azure')
    )
    walls.position.y = -1.40;
    walls.position.z = 3.9
    walls.castShadow = true,
    walls.receiveShadow = true
    groundFloor.add(walls)
    
    // house.rotation.y = -Math.PI * 0.25


    /// creating window

    const door = new Mesh(
        new PlaneBufferGeometry(1.7,1.7),
        getMaterial('white')
    )
     door.position.set(-3,-1,0.8)
     door.rotation.x = Math.PI 
     door.material.map = doorColor
     door.material.alphaMap = doorAlpha
     door.material.transparent = true
     door.material.normalMap = doornormal
     door.material.aoMap = doorAo
     door.material.roughnessMap = doorRoughness
     door.material.metalnessMap = doormetalNess

     door.geometry.setAttribute(
        'uv2',
        new Float32BufferAttribute(door.geometry.attributes.uv.array,2)
        )

     groundFloor.add(door)
    /// creating the side wall

    const sideWall = new Mesh(
      new BoxBufferGeometry(4.3,2.5,0.5),
      getMaterial('white')
    )

    sideWall.position.z = -1.25;
    sideWall.position.x = 4.25
    sideWall.position.y = -1.4
    sideWall.castShadow = true
    sideWall.rotation.y = Math.PI * 0.5

    groundFloor.add(sideWall)
 /// creating a pillar

    const pillar = new Mesh(
        new BoxBufferGeometry(1.5,2.6,0.5),
        getMaterial('#454545')
    )

    pillar.position.z = -1.75;
    pillar.position.x = -1.26
    pillar.position.y = -1.24
    pillar.castShadow = true


    foundation.add(pillar)
    house.add(foundation)
    house.add(groundFloor)

    pillar.rotation.y = Math.PI * 0.5


    /// creating first floor

    const firstFloor = new Group()

    const floor = new Mesh(
        new BoxBufferGeometry(10,0.3,8),
        getMaterial('azure')
    )

    floor.position.y = -2.7;
    floor.position.z = 3
    floor.position.x = 0
    firstFloor.add(floor)

    const front = new Mesh(
        new BoxBufferGeometry(6.5,0.3,2.5),
        getMaterial('azure')
    )
     front.position.z = -2.2
     front.position.x = 1.7
     front.position.y = -2.698


     const firstFloorWalls = new Mesh(
        new BoxBufferGeometry( 9, 3.5, 6 ),
        getMaterial('azure')
    )
    firstFloorWalls.position.y = -4;
    firstFloorWalls.position.z = 3.6
    firstFloorWalls.castShadow = true,
    firstFloorWalls.receiveShadow = true

    const sitOut = new Mesh(
        new BoxBufferGeometry( 6, 3.5, 3 ),
        getMaterial('azure')
    )
    sitOut.position.x = 1.5;
    sitOut.position.y = -4;
    sitOut.position.z = -0.9


    const customSunShade = new Group();

    const customPillar = new Mesh(
        new BoxBufferGeometry(0.5,2.5,0.5),
        getMaterial('#454545')
    )

    customPillar.position.set(-5,-1.28,0.7)

    customSunShade.add(customPillar)


    const customBeam = new Mesh(
        new BoxBufferGeometry(3,0.5,0.5),
        getMaterial('#454545')
    )

    customBeam.position.set(-5,-2.75,1.95)
    customBeam.rotation.y = Math.PI * 0.5

    customSunShade.add(customBeam)


    const sitOutDesign = new Group()

    const side1 = new Mesh(
        new BoxBufferGeometry(5.66,0.2,0.9),
        getMaterial('#454545')
    )
    const side2 = new Mesh(
        new BoxBufferGeometry(0.2,2.48,0.9),
        getMaterial('#454545')
    )
    const side3 = new Mesh(
        new BoxBufferGeometry(5.66,0.2,0.9),
        getMaterial('#454545')
    )
    const side4 = new Mesh(
        new BoxBufferGeometry(0.2,2.48,0.9),
        getMaterial('#454545')
    )

    side1.position.y = -5.04
    side1.position.x = 1.56
    side1.position.z = -2.55


    side2.position.y = -3.9
    side2.position.x = 4.37
    side2.position.z = -2.55


    side3.position.y = -2.9
    side3.position.x = 1.56
    side3.position.z = -2.55

    side4.position.y = -3.9
    side4.position.x = -1.37
    side4.position.z = -2.55


    sitOutDesign.add(side1,side2,side3,side4);


    firstFloor.add(sitOutDesign)
    firstFloor.add(sitOut)
    firstFloor.add(firstFloorWalls)
    firstFloor.add(front)
    groundFloor.add(customSunShade)


    house.add(firstFloor)
    scene.add(ground)
    scene.add(house)


    const directionLight = new DirectionalLight(0xffffff,1)
    directionLight.position.set(1,1,3)
    directionLight.castShadow = true
    scene.add(directionLight)


    useFrame(({ mouse,clock }) => {
        const elapsedTime = clock.getElapsedTime()
        // if(groundRef.current){
        //     groundRef.current.rotation.z = mouse.x;
        //     house.rotation.y = -mouse.x
        // }
        // // ground.rotation.z = elapedTime
    })

  return (
    <>
       <OrbitControls />
       <perspectiveCamera args={[50, window.innerWidth/window.innerHeight]}/>
       <ambientLight args={[0xffffff, 0.5]}/>
       {/* <mesh ref={groundRef}>
            <planeBufferGeometry args={[20,20]}/>
            <meshStandardMaterial  color={'#fab969'}/>
       </mesh> */}
       
    </>
  )
}

export default Three