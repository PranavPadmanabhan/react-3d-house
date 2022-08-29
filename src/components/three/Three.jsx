import { OrbitControls, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import { AxesHelper, BoxBufferGeometry, DirectionalLight, DirectionalLightHelper, Float32BufferAttribute, Group, Mesh, MeshStandardMaterial, PerspectiveCamera, PlaneBufferGeometry, Vector3 } from 'three';
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
    const windowTexture = useTexture('/window.png')
    const glassTexture = useTexture('/glass-1.png')






    // console.log(texture);

   
    const getMaterial = (color = 'white') => {
        return new MeshStandardMaterial({ color })
    }


    const ground = new Mesh(
        new PlaneBufferGeometry(20,20),
        getMaterial('green')
    )

    const house = new Group();
    house.rotation.x = -Math.PI * 0.5
    house.rotation.y = -Math.PI * 0.25

    ground.rotation.z = -Math.PI * 0.25


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
    

    const firstFloor = new Group()


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
    


    /// creating window

    const door = new Mesh(
        new PlaneBufferGeometry(1.7,1.7),
        getMaterial('orange')
    )
     door.position.set(-3,-1.05,0.7)
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

      door.position.z = 0.89  

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


    const window1 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window1.material.map = windowTexture
    window1.position.set(-4.515,-1.4,2)
    window1.rotation.y = -Math.PI * 0.5


    const window2 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window2.material.map = windowTexture
    window2.position.set(-4.515,-1.4,5.4)
    window2.rotation.y = -Math.PI * 0.5


    const window3 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window3.material.map = windowTexture
    window3.position.set(-4.515,-4.2,3.8)
    window3.rotation.y = -Math.PI * 0.5


    const window4 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window4.material.map = windowTexture
    window4.position.set(4.515,-1.35,4.8)
    window4.rotation.y = Math.PI * 0.5


    const window5 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window5.material.map = windowTexture
    window5.position.set(4.515,-1.35,1.4)
    window5.rotation.y = Math.PI * 0.5


     const window6 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window6.material.map = windowTexture
    window6.position.set(4.515,-4.25,3.2)
    window6.rotation.y = Math.PI * 0.5



    const window7 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )
     window7.rotation.y = Math.PI
     window7.material.map = windowTexture
     window7.position.set(-1,-1.15,0.7)


    const window8 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )
     window8.rotation.y = Math.PI
     window8.material.map = windowTexture
     window8.position.set(3,-1.15,0.7)

     const window9 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window9.material.map = windowTexture
    window9.position.set(2.5,-4.25,6.7)
    // window9.rotation.y = -Math.PI 

    const window10 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window10.material.map = windowTexture
    window10.position.set(-2.4,-4.25,6.7)
    // window9.rotation.y = -Math.PI 
    const window11 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )

    window11.material.map = windowTexture
    window11.position.set(-2.4,-1.25,6.92)
    // window9.rotation.y = -Math.PI 

    const window12 = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )
     window12.rotation.y = Math.PI
     window12.material.map = windowTexture
     window12.position.set(-3,-4.2,0.57)



    const backDoor = new Mesh(
        new PlaneBufferGeometry(1.7,2),
        getMaterial('orange')
    )
     backDoor.position.set(2.5,-1.10,6.92)
     backDoor.rotation.z = - Math.PI
     backDoor.material.map = doorColor
     backDoor.material.alphaMap = doorAlpha
     backDoor.material.transparent = true
     backDoor.material.normalMap = doornormal
     backDoor.material.aoMap = doorAo
     backDoor.material.roughnessMap = doorRoughness
     backDoor.material.metalnessMap = doormetalNess

     backDoor.geometry.setAttribute(
        'uv2',
        new Float32BufferAttribute(backDoor.geometry.attributes.uv.array,2)
        )

   const step = new Mesh(
    new BoxBufferGeometry(1.5,0.13,0.8),
    getMaterial('azure')
   )

   step.position.set(2.5,-0.07,6.92)

    groundFloor.add(window1,window2,window4,window5,window7,window8,window11,backDoor,step)
    firstFloor.add(window3,window6,window9,window10,window12)

    /// creating first floor


    const sitOutDoor = new Mesh(
        new PlaneBufferGeometry(1.7,1.9),
        getMaterial('orange')
    )
     sitOutDoor.position.set(-0.1,-3.6,-2.42)
     sitOutDoor.rotation.x = Math.PI 
     sitOutDoor.material.map = doorColor
     sitOutDoor.material.alphaMap = doorAlpha
     sitOutDoor.material.transparent = true
     sitOutDoor.material.normalMap = doornormal
     sitOutDoor.material.aoMap = doorAo
     sitOutDoor.material.roughnessMap = doorRoughness
     sitOutDoor.material.metalnessMap = doormetalNess

     sitOutDoor.geometry.setAttribute(
        'uv2',
        new Float32BufferAttribute(sitOutDoor.geometry.attributes.uv.array,2)
        )


    const sitOutWindow = new Mesh(
        new PlaneBufferGeometry(1.5,1.5),
        getMaterial('orange')
    )
    sitOutWindow.rotation.y = Math.PI
    sitOutWindow.material.map = windowTexture
     sitOutWindow.position.set(2.8,-3.9,-2.415)


     firstFloor.add(sitOutDoor,sitOutWindow)


     const sidewall1 = new Mesh(
        new BoxBufferGeometry(3,0.2,0.9),
        getMaterial('#454545')
    )

    sidewall1.position.set(-3.01,-2.9,0.17)

    const sidewall2 = new Mesh(
        new BoxBufferGeometry(0.2,2.48,0.9),
        getMaterial('#454545')
    )

    sidewall2.position.set(-4.41,-4.15,0.17)


    const sidewall3 = new Mesh(
        new BoxBufferGeometry(3,0.2,0.9),
        getMaterial('#454545')
    )
    sidewall3.position.set(-3.01,-5.4,0.17)


    firstFloor.add(sidewall1,sidewall2,sidewall3)

    const glass = new Mesh(
        new PlaneBufferGeometry(5.96,2.3),
        getMaterial('transparent')
    )

    glass.position.set(1.5,-4,-3.02)
    glass.material.transparent = true
    glass.material.map = glassTexture
    glass.rotation.y = Math.PI

  firstFloor.add(glass)

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


    const roof = new Group()
    const roof1 = new Mesh(
        new BoxBufferGeometry(10,0.1,6.4),
        getMaterial('#454545')
    )

    const roof1Top = new Mesh(
        new BoxBufferGeometry(10.1,0.3,6.5),
        getMaterial('azure')
    )
    
    roof1.position.set(0,-5.71,3.75)
    roof1Top.position.set(0,-5.91,3.85)

    roof.add(roof1Top)
    roof.add(roof1)

    const roof2 = new Mesh(
        new BoxBufferGeometry(7,0.1,3.8),
        getMaterial('#454545')
    )

    roof2.position.set(1.5,-5.71,-0.8)

    const roof2Top = new Mesh(
        new BoxBufferGeometry(7.1,0.3,3.9),
        getMaterial('azure')
    )
    roof2Top.position.set(1.6,-5.91,-0.9)


    roof.add(roof2)
    roof.add(roof2Top)

    firstFloor.add(roof)

    house.scale.set(0.2,0.2,0.2)
    house.rotation.x = -Math.PI
    ground.rotation.x = -Math.PI * 0.5
    ground.scale.set(0.2,0.2,0.2)

    house.add(firstFloor)
    
    scene.add(ground)
    scene.add(house)


    const directionLight = new DirectionalLight(0xffffff,1)
    directionLight.position.set(1,1,3)
    directionLight.castShadow = true
    scene.add(directionLight)

    const camera = new PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000)
    camera.position.set(0,0,-20)

    // console.log(camera);
    scene.add(camera)


    useFrame(({ mouse,clock }) => {
        const elapsedTime = clock.getElapsedTime()
    camera.lookAt(house.position)

        // if(groundRef.current){
        //     groundRef.current.rotation.z = mouse.x;
        //     house.rotation.y = -mouse.x
        // }
        // // ground.rotation.z = elapedTime
    })

  return (
    <>
       <OrbitControls />
       <ambientLight args={[0xffffff, 0.5]}/>
       {/* <mesh ref={groundRef}>
            <planeBufferGeometry args={[20,20]}/>
            <meshStandardMaterial  color={'#fab969'}/>
       </mesh> */}
       
    </>
  )
}

export default Three