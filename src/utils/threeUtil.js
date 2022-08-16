export function clearScene(scene) {
  scene.traverse(child => {
    clearGroup(child);
  });
}

export function clearGroup(group) {
  const clearCache = (mesh) => {
    if (mesh.geometry) {
      mesh.geometry.dispose(); // 删除几何体
    }
    if (mesh.material && mesh.material.dispose) {
      mesh.material.dispose(); // 删除材质
    }
    if (mesh.material.texture && mesh.material.texture.dispose) {
      mesh.material.texture.dispose();
    }
  };
  const removeObj = (item) => {
    let array = item.children.filter((x) => x);
    array.forEach(v => {
      if (v.children.length) {
        removeObj(v);
      } else {
        if (v.isMesh) {
          clearCache(v);
        }
      }
    });
    array = null;
  };
  removeObj(group);
}
