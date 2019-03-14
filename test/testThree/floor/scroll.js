
// function scroll() {
//     if (window.pageYOffset != null) {  // ie9+ 高版本浏览器
//         // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
//         return {
//             left: window.pageXOffset,
//             top: window.pageYOffset
//         }
//     }
//     else if (document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
//         return {
//             left: document.documentElement.scrollLeft,
//             top: document.documentElement.scrollTop
//         }
//     }
//     return {   // 未声明 DTD
//         left: document.body.scrollLeft,
//         top: document.body.scrollTop
//     }
// }
//兼容問題
function scrollTop() {
    if ((document.body.scrollTop || document.documentElement.scrollTop) != 0) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}