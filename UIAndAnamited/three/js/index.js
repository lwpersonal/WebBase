;((doc, win) => {
  var stats = new Stats()
  function statsInit() {
    // 性能帧数
    stats.showPanel( 1 )
    //统计信息显示在左上角
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    //将统计对象添加到对应的<div>元素中
    doc.getElementById('Stats-output').appendChild(stats.domElement)
    stats.update()
  }

  // 场景
  const scene = new THREE.Scene()
  // 相机
  const camera = new THREE.PerspectiveCamera(45, win.innerWidth/win.innerHeight, 1, 10)
  // const camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10)
  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: doc.getElementById('canvas')
  })
  // renderer.setSize(win.innerWidth, win.innerHeight)
  // doc.body.appendChild(renderer.domElement)

  renderer.setClearColor(0x000000)

  // 定义几何体
  // 4,3
  const geometry = new THREE.CubeGeometry(1, 1, 1)
  // 定义物体材质
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  })
  const cube = new THREE.Mesh(geometry, material)
  

  // camera.poaition.set(0, 0, 5)
  // camera.position.x = 1
  // camera.position.y = 2
  camera.position.z = 5

  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera)
  

  scene.add(cube)

  renderer.render(scene, camera)

  function render() {
    // requestAnimationFrame(render)
    // stats.update()
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // renderer.render(scene, camera)
  }

  statsInit()
  render()

})(document, window);