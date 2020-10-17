//Some reusable functions as Modules:
//This module is to work without needing for a server. i.e import/export is not used.
/*To import this you can either add this script directly to the DOM using <script>
OR you can make a calling <script> tag directly insdie DOM to call as many files as you
Need using formula:

var scriptTag = document.getElementsByTagName('script')[0];
var myModule = document.createElement('script');
myModule.src = 'Script/PATH/file.js';
myModule.type = 'text/javascript';
document.head.appendChild(myModule);
*
*/


// Absolute,Relative positioned elements centering.
function positionedElementCentering(item) {
    /*
    Arguments: 
    Item must be defined as a document element -> e.g documnet.querySelector('');
    */
    //Getting item dimentions:
    let itemShape = item.getBoundingClientRect();
    let itemHeight = itemShape.height;
    let itemWidth = itemShape.width;

    //Setting top, left css properties to 50%;
    let itemTop = (window.innerHeight) / 2;
    let itemLeft = (window.innerWidth) / 2;

    //Finally, centering element:
    item.style.top = itemTop - (itemHeight / 2) + "px";
    item.style.left = itemLeft - (itemWidth / 2) + "px";

}

function textCenteringInsideDiv(item) {
    let itemShape = item.getBoundingClientRect();
    let itemHeight = itemShape.height;
    item.style.textAlign = 'center';
    item.style.verticalAlign = 'middle';
    item.style.lineHeight = (itemHeight - 40) + 'px';
    console.log("Hieht is: " + itemHeight)
}

function XOtextColor() {
    for (let item of gridItemsArray) {
        if (item.innerHTML == 'X') {
            item.style.color = 'cornflowerblue';
        } else if (item.innerHTML == 'O') {
            // item.style.color = 'indianred';
            item.style.color = 'rebeccapurple';


        }
    }
}