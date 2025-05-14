// Script pour gérer les interactions avec model-viewer
document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si model-viewer est supporté
  if (customElements.get("model-viewer") === undefined) {
    console.warn("model-viewer n'est pas supporté par ce navigateur")
    document.querySelector(".fallback-message")?.classList.add("visible")
  }

  const modelViewer = document.querySelector("model-viewer")

  if (!modelViewer) {
    console.error("Élément model-viewer non trouvé")
    return
  }

  // Gérer la barre de progression
  const progressBar = document.querySelector(".progress-bar")
  const updateBar = document.querySelector(".update-bar")

  if (progressBar && updateBar) {
    modelViewer.addEventListener("progress", (event) => {
      const progress = event.detail.totalProgress * 100
      updateBar.style.width = `${progress}%`

      if (progress === 100) {
        progressBar.classList.add("hide")
      } else {
        progressBar.classList.remove("hide")
      }
    })
  }

  // Gérer les erreurs de chargement
  modelViewer.addEventListener("error", (error) => {
    console.error("Erreur de chargement du modèle 3D:", error)
    document.querySelector(".fallback-message")?.classList.add("visible")
  })

  // Ajouter des contrôles personnalisés
  modelViewer.addEventListener("load", () => {
    console.log("Modèle 3D chargé avec succès")
    document.querySelector(".fallback-message")?.classList.remove("visible")

    // Définir les paramètres de caméra une fois le modèle chargé
    modelViewer.setAttribute("camera-orbit", "45deg 60deg 2m")
    modelViewer.setAttribute("camera-target", "0 0 0")
    modelViewer.setAttribute("field-of-view", "30deg")

    // Ajouter des points d'intérêt
    addHotspots()
  })

  // Fonction pour ajouter des points d'intérêt
  const addHotspots = () => {
    // Créer des points d'intérêt pour mettre en valeur les détails
    const hotspots = [
      { position: "0 0.15 0", name: "Logo Bénévola", description: "Logo gravé sur le dessus" },
      { position: "-0.2 0 0.2", name: "Texture de bois", description: "Bois de chêne finement texturé" },
      { position: "0.2 -0.1 0", name: "Fente pour pièces", description: "Pour insérer vos dons" },
    ]

    // Supprimer les points d'intérêt existants
    document.querySelectorAll(".hotspot").forEach((spot) => spot.remove())

    // Ajouter les points d'intérêt au modèle
    hotspots.forEach((hotspot, index) => {
      const annotation = document.createElement("button")
      annotation.slot = `hotspot-${index}`
      annotation.dataset.position = hotspot.position
      annotation.dataset.normal = "0 1 0"
      annotation.classList.add("hotspot")
      annotation.title = hotspot.description

      const annotationText = document.createElement("div")
      annotationText.textContent = hotspot.name
      annotationText.classList.add("hotspot-label")
      annotation.appendChild(annotationText)

      modelViewer.appendChild(annotation)
    })
  }

  // Ajouter le style pour les points d'intérêt et les messages d'erreur
  const customStyles = document.createElement("style")
  customStyles.textContent = `
    .hotspot {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: none;
      background-color: #4eaae0;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      position: relative;
      transition: all 0.3s ease;
    }
    
    .hotspot:hover {
      background-color: #f5a623;
      transform: scale(1.2);
    }
    
    .hotspot-label {
      position: absolute;
      background-color: #fff;
      border-radius: 4px;
      color: #333;
      white-space: nowrap;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 500;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      pointer-events: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      transition: opacity 0.3s ease;
    }
    
    .hotspot:hover .hotspot-label {
      opacity: 1;
    }

    .fallback-message {
      display: none;
      padding: 20px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
      margin-top: 20px;
    }

    .fallback-message.visible {
      display: block;
    }

    model-viewer {
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      --poster-color: #f5f5f5;
    }
  `
  document.head.appendChild(customStyles)

  // Ajouter un message pour indiquer comment interagir
  const container = document.querySelector(".model-container")
  if (container) {
    const interactionTip = document.createElement("div")
    interactionTip.className = "interaction-tip"
    interactionTip.textContent = "Cliquez et faites glisser pour faire pivoter le modèle"
    interactionTip.style.position = "absolute"
    interactionTip.style.bottom = "16px"
    interactionTip.style.left = "16px"
    interactionTip.style.backgroundColor = "rgba(0,0,0,0.7)"
    interactionTip.style.color = "white"
    interactionTip.style.padding = "8px 12px"
    interactionTip.style.borderRadius = "4px"
    interactionTip.style.fontSize = "14px"
    interactionTip.style.zIndex = "10"
    container.appendChild(interactionTip)

    // Cacher le message après interaction
    modelViewer.addEventListener("camera-change", () => {
      interactionTip.style.display = "none"
    })
  }
})
