// import {useRef} from "react";
// import 'intersection-observer';

// // const io = new IntersectionObserver(콜백함수, 옵션)

// // const 관찰대상 = document.querySelectorAll(관찰대상)

// // // IE에서 사용하기
// // Array.prototype.slice.call(관찰대상).forEach(elim => {
// //     io.observe(elim)
// //   })

// export default function useIntersectionObserver(callback) {
//   const observer = useRef(
//     new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             callback();
//           }
//         });
//       },
//       { threshold: 1 }
//     )
//   );

//   const observe = (el) => {
//     observer.current.observe(el);
//   };

//   const unobserve = (el) => {
//     observer.current.unobserve(el);
//   };

//   return [observe, unobserve];
// }
