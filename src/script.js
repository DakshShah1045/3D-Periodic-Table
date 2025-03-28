import * as THREE from 'three';



import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // ✅ CORRECT
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// ========== Scene and Camera ==========
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
camera.position.set(0, 300, 2500);
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/3D-Periodic-Table/static/cubeMap/')
const backgroundCubemap = cubeTextureLoader
.load(   [
   'px.png',
 'nx.png',
 'py.png',
   'ny.png',
  'pz.png',
   'nz.png'
] );

scene.background = backgroundCubemap

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ========== Lighting ==========
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(200, 300, 500);
scene.add(directionalLight);

// ========== Controls ==========
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.maxDistance = 5000;
controls.minDistance = 300;

// ========== Background ==========
//const bgTexture = new THREE.TextureLoader().load('https://cdn.pixabay.com/photo/2017/09/06/22/32/galaxy-2729341_1280.jpg');
//scene.background = bgTexture;

// ========== Color Coding ==========
const groupColors = {
    'Alkali Metal': 0xff6347,         // Red
    'Alkaline Earth Metal': 0xffa500, // Orange
    'Transition Metal': 0x4682b4,     // Blue
    'Post-Transition Metal': 0xffff00, // Yellow
    'Metalloid': 0x32cd32,            // Green
    'Non-Metal': 0xffffff,            // White
    'Halogen': 0x8a2be2,              // Purple
    'Noble Gas': 0xff69b4,            // Pinkish
    'Lanthanide': 0xffd700,           // Gold
    'Actinide': 0xcd7f32              // Bronze
};

// ========== Periodic Table Data ==========
const periodicTableData =[
  {"symbol": "H", "name": "Hydrogen", "group": "Nonmetal", "col": 1, "row": 1},
  {"symbol": "He", "name": "Helium", "group": "Noble Gas", "col": 18, "row": 1},
  {"symbol": "Li", "name": "Lithium", "group": "Alkali Metal", "col": 1, "row": 2},
  {"symbol": "Be", "name": "Beryllium", "group": "Alkaline Earth Metal", "col": 2, "row": 2},
  {"symbol": "B", "name": "Boron", "group": "Metalloid", "col": 13, "row": 2},
  {"symbol": "C", "name": "Carbon", "group": "Nonmetal", "col": 14, "row": 2},
  {"symbol": "N", "name": "Nitrogen", "group": "Nonmetal", "col": 15, "row": 2},
  {"symbol": "O", "name": "Oxygen", "group": "Nonmetal", "col": 16, "row": 2},
  {"symbol": "F", "name": "Fluorine", "group": "Halogen", "col": 17, "row": 2},
  {"symbol": "Ne", "name": "Neon", "group": "Noble Gas", "col": 18, "row": 2},
  {"symbol": "Na", "name": "Sodium", "group": "Alkali Metal", "col": 1, "row": 3},
  {"symbol": "Mg", "name": "Magnesium", "group": "Alkaline Earth Metal", "col": 2, "row": 3},
  {"symbol": "Al", "name": "Aluminum", "group": "Post-transition Metal", "col": 13, "row": 3},
  {"symbol": "Si", "name": "Silicon", "group": "Metalloid", "col": 14, "row": 3},
  {"symbol": "P", "name": "Phosphorus", "group": "Nonmetal", "col": 15, "row": 3},
  {"symbol": "S", "name": "Sulfur", "group": "Nonmetal", "col": 16, "row": 3},
  {"symbol": "Cl", "name": "Chlorine", "group": "Halogen", "col": 17, "row": 3},
  {"symbol": "Ar", "name": "Argon", "group": "Noble Gas", "col": 18, "row": 3},
  {"symbol": "K", "name": "Potassium", "group": "Alkali Metal", "col": 1, "row": 4},
  {"symbol": "Ca", "name": "Calcium", "group": "Alkaline Earth Metal", "col": 2, "row": 4},
  {"symbol": "Sc", "name": "Scandium", "group": "Transition Metal", "col": 3, "row": 4},
  {"symbol": "Ti", "name": "Titanium", "group": "Transition Metal", "col": 4, "row": 4},
  {"symbol": "V", "name": "Vanadium", "group": "Transition Metal", "col": 5, "row": 4},
  {"symbol": "Cr", "name": "Chromium", "group": "Transition Metal", "col": 6, "row": 4},
  {"symbol": "Mn", "name": "Manganese", "group": "Transition Metal", "col": 7, "row": 4},
  {"symbol": "Fe", "name": "Iron", "group": "Transition Metal", "col": 8, "row": 4},
  {"symbol": "Co", "name": "Cobalt", "group": "Transition Metal", "col": 9, "row": 4},
  {"symbol": "Ni", "name": "Nickel", "group": "Transition Metal", "col": 10, "row": 4},
  {"symbol": "Cu", "name": "Copper", "group": "Transition Metal", "col": 11, "row": 4},
  {"symbol": "Zn", "name": "Zinc", "group": "Transition Metal", "col": 12, "row": 4},
  {"symbol": "Ga", "name": "Gallium", "group": "Post-transition Metal", "col": 13, "row": 4},
  {"symbol": "Ge", "name": "Germanium", "group": "Metalloid", "col": 14, "row": 4},
  {"symbol": "As", "name": "Arsenic", "group": "Metalloid", "col": 15, "row": 4},
  {"symbol": "Se", "name": "Selenium", "group": "Nonmetal", "col": 16, "row": 4},
  {"symbol": "Br", "name": "Bromine", "group": "Halogen", "col": 17, "row": 4},
  {"symbol": "Kr", "name": "Krypton", "group": "Noble Gas", "col": 18, "row": 4},
  {"symbol": "Rb", "name": "Rubidium", "group": "Alkali Metal", "col": 1, "row": 5},
  {"symbol": "Sr", "name": "Strontium", "group": "Alkaline Earth Metal", "col": 2, "row": 5},
  {"symbol": "Y", "name": "Yttrium", "group": "Transition Metal", "col": 3, "row": 5},
  {"symbol": "Zr", "name": "Zirconium", "group": "Transition Metal", "col": 4, "row": 5},
  {"symbol": "Nb", "name": "Niobium", "group": "Transition Metal", "col": 5, "row": 5},
  {"symbol": "Mo", "name": "Molybdenum", "group": "Transition Metal", "col": 6, "row": 5},
  {"symbol": "Tc", "name": "Technetium", "group": "Transition Metal", "col": 7, "row": 5},
  {"symbol": "Ru", "name": "Ruthenium", "group": "Transition Metal", "col": 8, "row": 5},
  {"symbol": "Rh", "name": "Rhodium", "group": "Transition Metal", "col": 9, "row": 5},
  {"symbol": "Pd", "name": "Palladium", "group": "Transition Metal", "col": 10, "row": 5},
  {"symbol": "Ag", "name": "Silver", "group": "Transition Metal", "col": 11, "row": 5},
  {"symbol": "Cd", "name": "Cadmium", "group": "Transition Metal", "col": 12, "row": 5},
  {"symbol": "In", "name": "Indium", "group": "Post-transition Metal", "col": 13, "row": 5},
  {"symbol": "Sn", "name": "Tin", "group": "Post-transition Metal", "col": 14, "row": 5},
  {"symbol": "Sb", "name": "Antimony", "group": "Metalloid", "col": 15, "row": 5},
  {"symbol": "Te", "name": "Tellurium", "group": "Metalloid", "col": 16, "row": 5},
  {"symbol": "I", "name": "Iodine", "group": "Halogen", "col": 17, "row": 5},
  {"symbol": "Xe", "name": "Xenon", "group": "Noble Gas", "col": 18, "row": 5},
  {"symbol": "Cs", "name": "Cesium", "group": "Alkali Metal", "col": 1, "row": 6},
  {"symbol": "Ba", "name": "Barium", "group": "Alkaline Earth Metal", "col": 2, "row": 6},
  {"symbol": "La", "name": "Lanthanum", "group": "Lanthanide", "col": 3, "row": 6},
  {"symbol": "Ce", "name": "Cerium", "group": "Lanthanide", "col": 4, "row": 11},
 
  {"symbol": "Pr", "name": "Praseodymium", "group": "Lanthanide", "col": 5, "row": 11},
  {"symbol": "Nd", "name": "Neodymium", "group": "Lanthanide", "col": 6, "row": 11},
  {"symbol": "Pm", "name": "Promethium", "group": "Lanthanide", "col": 7, "row": 11},
  {"symbol": "Sm", "name": "Samarium", "group": "Lanthanide", "col": 8, "row": 11},
  {"symbol": "Eu", "name": "Europium", "group": "Lanthanide", "col": 9, "row": 11},
  {"symbol": "Gd", "name": "Gadolinium", "group": "Lanthanide", "col": 10, "row": 11},
  {"symbol": "Tb", "name": "Terbium", "group": "Lanthanide", "col": 11, "row": 11},
  {"symbol": "Dy", "name": "Dysprosium", "group": "Lanthanide", "col": 12, "row": 11},
  {"symbol": "Ho", "name": "Holmium", "group": "Lanthanide", "col": 13, "row": 11},
  {"symbol": "Er", "name": "Erbium", "group": "Lanthanide", "col": 14, "row": 11},
  {"symbol": "Tm", "name": "Thulium", "group": "Lanthanide", "col": 15, "row": 11},
  {"symbol": "Yb", "name": "Ytterbium", "group": "Lanthanide", "col": 16, "row": 11},
  {"symbol": "Lu", "name": "Lutetium", "group": "Lanthanide", "col": 17, "row": 11},
  {"symbol": "Hf", "name": "Hafnium", "group": "Transition Metal", "col": 4, "row": 6},
  {"symbol": "Ta", "name": "Tantalum", "group": "Transition Metal", "col": 5, "row": 6},
  {"symbol": "W", "name": "Tungsten", "group": "Transition Metal", "col": 6, "row": 6},
  {"symbol": "Re", "name": "Rhenium", "group": "Transition Metal", "col": 7, "row": 6},
  {"symbol": "Os", "name": "Osmium", "group": "Transition Metal", "col": 8, "row": 6},
  {"symbol": "Ir", "name": "Iridium", "group": "Transition Metal", "col": 9, "row": 6},
  {"symbol": "Pt", "name": "Platinum", "group": "Transition Metal", "col": 10, "row": 6},
  {"symbol": "Au", "name": "Gold", "group": "Transition Metal", "col": 11, "row": 6},
  {"symbol": "Hg", "name": "Mercury", "group": "Transition Metal", "col": 12, "row": 6},
  {"symbol": "Tl", "name": "Thallium", "group": "Post-transition Metal", "col": 13, "row": 6},
  {"symbol": "Pb", "name": "Lead", "group": "Post-transition Metal", "col": 14, "row": 6},
  {"symbol": "Bi", "name": "Bismuth", "group": "Post-transition Metal", "col": 15, "row": 6},
  {"symbol": "Po", "name": "Polonium", "group": "Post-transition Metal", "col": 16, "row": 6},
  {"symbol": "At", "name": "Astatine", "group": "Halogen", "col": 17, "row": 6},
  {"symbol": "Rn", "name": "Radon", "group": "Noble Gas", "col": 18, "row": 6},
  {"symbol": "Fr", "name": "Francium", "group": "Alkali Metal", "col": 1, "row": 7},
  {"symbol": "Ra", "name": "Radium", "group": "Alkaline Earth Metal", "col": 2, "row": 7},
  {"symbol": "Ac", "name": "Actinium", "group": "Actinide", "col": 3, "row": 7},
  {"symbol": "Th", "name": "Thorium", "group": "Actinide", "col": 4, "row": 12},
  {"symbol": "Pa", "name": "Protactinium", "group": "Actinide", "col": 5, "row": 12},
  {"symbol": "U", "name": "Uranium", "group": "Actinide", "col": 6, "row": 12},
  {"symbol": "Np", "name": "Neptunium", "group": "Actinide", "col": 7, "row": 12},
  {"symbol": "Pu", "name": "Plutonium", "group": "Actinide", "col": 8, "row": 12},
  {"symbol": "Am", "name": "Americium", "group": "Actinide", "col": 9, "row": 12},
  {"symbol": "Cm", "name": "Curium", "group": "Actinide", "col": 10, "row": 12},
  {"symbol": "Bk", "name": "Berkelium", "group": "Actinide", "col": 11, "row": 12},
  {"symbol": "Cf", "name": "Californium", "group": "Actinide", "col": 12, "row": 12},
  {"symbol": "Es", "name": "Einsteinium", "group": "Actinide", "col": 13, "row": 12},
  {"symbol": "Fm", "name": "Fermium", "group": "Actinide", "col": 14, "row": 12},
  {"symbol": "Md", "name": "Mendelevium", "group": "Actinide", "col": 15, "row": 12},
  {"symbol": "No", "name": "Nobelium", "group": "Actinide", "col": 16, "row": 12},
  {"symbol": "Lr", "name": "Lawrencium", "group": "Actinide", "col": 17, "row": 12},
  {"symbol": "Rf", "name": "Rutherfordium", "group": "Transition Metal", "col": 4, "row": 7},
  {"symbol": "Db", "name": "Dubnium", "group": "Transition Metal", "col": 5, "row": 7},
  {"symbol": "Sg", "name": "Seaborgium", "group": "Transition Metal", "col": 6, "row": 7},
  {"symbol": "Bh", "name": "Bohrium", "group": "Transition Metal", "col": 7, "row": 7},
  {"symbol": "Hs", "name": "Hassium", "group": "Transition Metal", "col": 8, "row": 7},
  {"symbol": "Mt", "name": "Meitnerium", "group": "Transition Metal", "col": 9, "row": 7},
  {"symbol": "Ds", "name": "Darmstadtium", "group": "Transition Metal", "col": 10, "row": 7},
  {"symbol": "Rg", "name": "Roentgenium", "group": "Transition Metal", "col": 11, "row": 7},
  {"symbol": "Cn", "name": "Copernicium", "group": "Transition Metal", "col": 12, "row": 7},
  {"symbol": "Nh", "name": "Nihonium", "group": "Post-transition Metal", "col": 13, "row": 7},
  {"symbol": "Fl", "name": "Flerovium", "group": "Post-transition Metal", "col": 14, "row": 7},
  {"symbol": "Mc", "name": "Moscovium", "group": "Post-transition Metal", "col": 15, "row": 7},
  {"symbol": "Lv", "name": "Livermorium", "group": "Post-transition Metal", "col": 16, "row": 7},
  {"symbol": "Ts", "name": "Tennessine", "group": "Halogen", "col": 17, "row": 7},
  {"symbol": "Og", "name": "Oganesson", "group": "Noble Gas", "col": 18, "row": 7}

  ]

   


// ========== Grid Settings ==========
const cellSize = 90;   // Bigger blocks
const spacing = 200;    // Spacing between blocks
const blocks = [];

// ========== Create Periodic Table ==========
function createPeriodicTable() {
    const fontLoader = new FontLoader();
    fontLoader.load('/3D-Periodic-Table/static/font.json', (font) => {

        periodicTableData.forEach((element) => {
            const groupColor = groupColors[element.group] || 0xffffff;

            const block = new THREE.Mesh(
                new THREE.BoxGeometry(cellSize, cellSize, cellSize),
                new THREE.MeshPhongMaterial({ color: groupColor })
            );

            // Positioning: Lanthanides and Actinides separated
            const x = (element.col - 9) * spacing;
            const y = 0;
            const z = (element.row < 8 ? element.row - 4 : element.row - 6) * spacing;

            block.position.set(x, y, z);
            block.userData = { symbol: element.symbol, name: element.name };
            scene.add(block);
            blocks.push(block);

            // Add text for element symbol
            const symbolText = createTextMesh(element.symbol, font, 30, 0x000000);
            symbolText.position.set(block.position.x - 30, block.position.y + 10, block.position.z + 50);
            scene.add(symbolText);

            // Add element name
            const nameText = createTextMesh(element.name, font, 12, 0x222222);
            nameText.position.set(block.position.x - 35, block.position.y - 10, block.position.z + 50);
            scene.add(nameText);

            block.userData.textMesh = nameText
            block.userData.symbolMesh = symbolText
        });
    });
}

// ========== Create Text Mesh ==========
function createTextMesh(text, font, size, color) {
    const textGeometry = new TextGeometry(text, {
        font: font,
        size: size,
        depth: 0.3
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color });
    return new THREE.Mesh(textGeometry, textMaterial);
}

// ========== Animation Loop ==========
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

createPeriodicTable();
animate();

document.getElementById("moveLeft").addEventListener("click", () => {
    camera.position.x -= 100
});

document.getElementById("moveRight").addEventListener("click", () => {
    camera.position.x += 100
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster from the camera through the mouse position
    raycaster.setFromCamera(mouse, camera);

    // Get all intersected objects
const intersects = raycaster.intersectObjects(scene.children);


    if (intersects.length > 0) {
        const clickedBlock = intersects[0].object;

        // 🎯 Example: Log the clicked element's name and symbol
        console.log("Clicked Element:", clickedBlock.userData);
        console.log(clickedBlock)
        clickedBlock.position.y += 200;
        clickedBlock.userData.textMesh.position.y += 200;
        // Highlight or move the clicked block
        clickedBlock.userData.textMesh.position.z += 50;
        clickedBlock.userData.symbolMesh.position.z += 50;

         //clickedBlock.userData.textMesh.scale.set(2,2,2)
        //clickedBlock.userData.symbolMesh.scale.set(2,2,2)


clickedBlock.position.z += 300;
clickedBlock.userData.textMesh.position.z += 290;
        clickedBlock.userData.symbolMesh.position.z += 290;
        //clickedBlock.userData.textMesh.scale.set(2,2,2)
        //clickedBlock.userData.symbolMesh.scale.set(2,2,2)

        clickedBlock.userData.symbolMesh.position.y += 200;
        clickedBlock.scale.set(2,2,2)
    }
}

// Add the event listener to capture mouse clicks
window.addEventListener("click", onMouseClick);

