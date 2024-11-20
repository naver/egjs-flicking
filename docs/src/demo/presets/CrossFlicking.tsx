/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useRef, useState } from "react";
import { CrossFlicking, CrossGroup } from "@egjs/react-flicking";
import "../../css/demo/crossflicking.css";

export default () => {
  const flicking = useRef<CrossFlicking>();
  const [transform, setTransform] = useState(0);
  const groups = [
    {
      name: "Microsoft",
      panels: [
        {
          title:
            "Microsoft 'Kills' HoloLens 2 Headset Amidst Growing Competition in AR/VR",
          image:
            "https://i0.wp.com/pune.news/wp-content/uploads/2024/10/HoloLens-2-headset.webp?resize=800%2C422&ssl=1",
        },
        {
          title: "ChatGPT-style tech brought to Microsoft 365",
          image:
            "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/FCA8/production/_129008646_gettyimages-1237656618.jpg",
        },
        {
          title: "Microsoft Taps Lumen to Boost AI Infrastructure Capacity",
          image:
            "https://eu-images.contentstack.com/v3/assets/blt6b0f74e5591baa03/bltc71a236adc37e574/66aa04f5b5726f3b6b85445c/News_Image_-_2024-07-31T103043.248.jpg",
        },
        {
          title: "Microsoft Copilot adds ChatGPT-like features including Voice",
          image:
            "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202410/microsoft-copilot-022838371-16x9_0.jpg?VersionId=3be3CqIpb2TtKmFbtibUf.IdLmNhkrjQ&size=690:388",
        },
      ],
    },
    {
      name: "Nvidia",
      panels: [
        {
          title: "Nvidia Teams Up With Accenture to Boost Corporate AI Use",
          image:
            "https://s.yimg.com/ny/api/res/1.2/2fEs0waxs1mERvKixJh2dw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/bloomberg_technology_68/f9e92661f8f8cf487c2551bf5ab970ed",
        },
        {
          title: "All eyes are on Nvidia’s stock, so what’s been going on?",
          image:
            "https://dims.apnews.com/dims4/default/a52d371/2147483647/strip/true/crop/3000x2000+0+0/resize/1440x960!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2Ff4%2F21%2F640ac043a2a1e61320ebefda710a%2F9a295a8b1d1049689f551b65a93ec2ef",
        },
        {
          title: "Nvidia value hits $3tn, overtaking Apple",
          image:
            "https://ichef.bbci.co.uk/news/1024/branded_news/fea4/live/415e2650-2380-11ef-bac3-438326d5ea25.jpg",
        },
        {
          title: "Nvidia becomes world's most valuable company",
          image:
            "https://live-production.wcms.abc-cdn.net.au/1b236644d77b9141c851d5cbbcaa6094",
        },
        {
          title:
            "Nvidia CEO on the next generation of semiconductors and computing",
          image:
            "https://image.cnbcfm.com/api/v1/image/107389422-17108579791710857976-33780118496-1080pnbcnews.jpg?v=1710857978",
        },
      ],
    },
    {
      name: "Google",
      panels: [
        {
          title:
            "AI News: Google Gemini Chatbot Implements Restrictions on Election-Related Queries",
          image:
            "https://coingape.com/wp-content/uploads/2023/10/Google-Pledges-to-Defend-Generative-AI-Users-From-Copyright-Disputes.jpg",
        },
        {
          title: "Google to invest another $2.3 billion into Ohio data centers",
          image:
            "https://etimg.etb2bimg.com/thumb/msid-111099060,imgsize-57490,width-1200,height=765,overlay-ettelecom/internet/google-to-invest-another-2-3-billion-into-ohio-data-centers.jpg",
        },
        {
          title: "Google to invest US$1bil in UK data centre to meet demand",
          image:
            "https://media.freemalaysiatoday.com/wp-content/uploads/2022/10/google-New.jpg",
        },
        {
          title: "Google made payments worth $20 bn to Apple in 2022",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzQEynXqehPlukfb8LDRgVdKvFR1IoJCVT6w&s",
        },
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  const onChanged = (e) => {
    setIndex(e.index);
  };

  const onMove = (e) => {
    const pos = e.currentTarget.camera._position;
    setTransform(pos / 5 - 37);
  };

  const onTabClick = (i: number) => {
    if (!flicking.current?.animating) {
      setIndex(i);
      flicking.current?.moveTo(i, 500).catch(() => void 0);
    }
  };

  useEffect(() => {
    flicking.current?.moveTo(0, 0);
  }, []);

  return (
    <div className="demo">
      <div className="labels">
        <a
          className="area selected"
          style={{transform: `translate(${transform}px)`}}
        >
        </a>
        {groups.map((item, i) => (
          <div className="tab" key={i}>
            <a
              className={"label " + (index === i ? "" : "")}
              onClick={() => onTabClick(i)}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <CrossFlicking
        className="main"
        ref={flicking}
        bounce={0}
        preventDefaultOnDrag={true}
        moveType={"strict"}
        onMove={onMove}
        onChanged={onChanged}
      >
        {groups.map((item, i) => {
          return (
            <CrossGroup key={i}>
              {item.panels.map((panel, j) => {
                return (
                  <div className="item" key={j}>
                    <img className="img scaleup" src={panel.image} />
                    <div className="info">
                      <div className="name">
                        <span className="source">
                          {item.name} News ({j + 1}/{item.panels.length})
                        </span>
                      </div>
                      <strong className="headline">{panel.title}</strong>
                    </div>
                  </div>
                );
              })}
            </CrossGroup>
          );
        })}
      </CrossFlicking>
    </div>
  );
};

// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import React from "react";
// import { CrossFlicking, CrossGroup } from "@egjs/react-flicking";
// import "../../css/demo/crossflicking.css";

// export default () => {
//   return (
//     <CrossFlicking className="flicking" preventDefaultOnDrag={true}>
//       <CrossGroup>
//         <div className="flicking-panel">
//           <img src="https://naver.github.io/egjs-infinitegrid/assets/image/11.jpg" />
//           방송 1A
//         </div>
//       </CrossGroup>
//       <CrossGroup>
//         <div className="flicking-panel">
//           <img src="https://naver.github.io/egjs-infinitegrid/assets/image/16.jpg" />
//           축구 2A
//         </div>
//       </CrossGroup>
//       <CrossGroup>
//         <div className="flicking-panel">
//           <img src="https://naver.github.io/egjs-infinitegrid/assets/image/21.jpg" />
//           패션 3A
//         </div>
//       </CrossGroup>
//     </CrossFlicking>
//   );
// };

// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <script
//     src="https://cdnjs.cloudflare.com/ajax/libs/egjs-flicking/4.11.3/flicking.pkgd.min.js"
//     crossorigin="anonymous"
//   ></script>
//   <script
//     src="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/plugins.js"
//     crossorigin="anonymous"
//   ></script>
//   <link
//     rel="stylesheet"
//     href="https://cdnjs.cloudflare.com/ajax/libs/egjs-flicking/4.11.3/flicking.css"
//     crossorigin="anonymous"
//   />
//   <link
//     rel="stylesheet"
//     href="https://naver.github.io/egjs-flicking-plugins/release/latest/dist/flicking-plugins.css"
//   />
// </head>

// <div id="content" role="main">
//   <section class="sp_shortents" style="transform: translateZ(0px)">
//     <div class="shortents_view_wrap">
//       <div class="subject_list_wrap">
//         <span
//           class="select_box"
//           style="width: 24px; left: 6px; opacity: 1; height: 36px"
//         ></span>
//         <div class="api_flicking_wrap">
//           <div class="flick_bx">
//             <a href="#" role="button" class="subject_link" aria-pressed="true"
//             >
//           </div>
//           <div class="flick_bx">
//             <a href="#" role="button" class="subject_link" aria-pressed="false"
//               >엔터</a
//             >
//           </div>
//           <div class="flick_bx">
//             <a href="#" role="button" class="subject_link" aria-pressed="false"
//               >스포츠</a
//             >
//           </div>
//           <div class="flick_bx">
//             <a href="#" role="button" class="subject_link" aria-pressed="false"
//               >연예</a
//             >
//           </div>
//           <div class="flick_bx">
//             <a href="#" role="button" class="subject_link" aria-pressed="false"
//               >방송</a
//             >
//           </div>
//         </div>
//       </div>
//       <div class="shortents_list_wrap api_flicking_wrap">
//         <div
//           class="main flicking-viewport"
//           style="
//             height: 100%;
//             user-select: none;
//             -webkit-user-drag: none;
//             touch-action: pan-y;
//           "
//         >
//           <div class="flicking-camera" style="transform: translate(0px)">
//             <div class="flick_bx flick_width" style="opacity: 1; width: 600px">
//               <div class="shortents_item_wrap vertical_flicking_wrap">
//                 <div
//                   class="flicking-viewport vertical"
//                   style="
//                     width: 100%;
//                     height: 100%;
//                     user-select: none;
//                     -webkit-user-drag: none;
//                     touch-action: pan-x;
//                   "
//                 >
//                   <div
//                     class="flicking-camera"
//                     style="transform: translate(0px, 0px)"
//                   >
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="0">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup ani_scaledown"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F311%2F2024%2F08%2F29%2F0001765546_001_20240829100106776.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">엑스포츠뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'손흥민 토트넘 9년' 감사합니다!…410경기 164골 잊지
//                             않을게요</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/311/0001765546"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="1">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F216%2F2024%2F08%2F29%2F0000132781_001_20240829064615891.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap">
//                           <div class="name_area">
//                             <span class="name">골닷컴</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >레알 마드리드 ‘충격적 계획’ 세웠다…갈락티코 ‘마지막
//                             퍼즐’로 낙점</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/216/0000132781"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="2">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F413%2F2024%2F08%2F29%2F0000182773_001_20240829052512177.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">인터풋볼</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >[EFL컵 리뷰] '황희찬 교체 출전' 울버햄튼, 게데스
//                             멀티골 속 2부 번리 2-0 격파</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/413/0000182773"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="3">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F003%2F2024%2F08%2F29%2FNISI20240829_0001429985_web_20240829051255_20240829081317469.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴시스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'즈베즈다 듀오' 황인범·설영우, UCL 무대 밟는다…PO서
//                             역전승</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/003/0012754322"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="4">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F139%2F2024%2F08%2F28%2F0002209060_001_20240828212209782.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스포탈코리아</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'거취 안갯속' 홍현석, 트라브존스포르 이적
//                             무산될까…깜짝 분데스리가行 가능성 제기 (벨기에
//                             매체)</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/139/0002209060"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="5">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjdfMjQz%2FMDAxNzI0NzUwOTY5MTYw.WWfG52gccbm2asyyKmgPIsnAyF5gm2XNOMkCM2cRlAYg.gUD9oC9n-5znlPvVxMIPykvyrql22R3BLa5GecaeLiwg.PNG%2F22.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">정꾸레</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >지로나 오사수나 축구 분석 프리뷰 (스포츠
//                             분석)</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/fcbarcelona90/223563021286"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="6">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F003%2F2024%2F08%2F28%2FNISI20240828_0001639758_web_20240828220816_20240828221028303.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴시스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >한국 U-19 대표팀, EOU컵 1차전서 태국에 4-1
//                             승리</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/003/0012754122"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="7">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F001%2F2024%2F08%2F28%2FPYH2024082819480005700_P4_20240828211525761.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">연합뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title">결승 진출하는 울산</strong>
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/001/0014899001"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="8">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F001%2F2024%2F08%2F29%2FAKR20240829091100007_03_i_P4_20240829121714208.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">연합뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >호날두의 펠레 저격? "1천골이 목표…모든 골 영상
//                             남아있어"</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/001/0014900267"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="9">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F421%2F2024%2F08%2F29%2F0007757724_001_20240829132823627.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴스1</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >KFA, 최영일의 새 전력강화위 출항</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/421/0007757724"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="0" data-v="10">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F311%2F2024%2F08%2F29%2F0001765538_001_20240829115016451.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">엑스포츠뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >백일섭, 故김자옥 향한 그리움 "아파서 촬영도 제대로
//                             못해" (아빠하고)[종합]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/311/0001765538"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>키워드</div>
//             </div>
//             <div class="flick_bx flick_width" style="opacity: 1; width: 600px">
//               <div class="shortents_item_wrap vertical_flicking_wrap">
//                 <div
//                   class="flicking-viewport vertical"
//                   style="
//                     width: 100%;
//                     height: 100%;
//                     user-select: none;
//                     -webkit-user-drag: none;
//                     touch-action: pan-x;
//                   "
//                 >
//                   <div
//                     class="flicking-camera"
//                     style="transform: translate(0px, -600px)"
//                   >
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="0">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F421%2F2024%2F08%2F29%2F0007757724_001_20240829132823627.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 0.999999">
//                           <div class="name_area">
//                             <span class="name">뉴스1</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >KFA, 최영일의 새 전력강화위 출항</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/421/0007757724"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="1">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F311%2F2024%2F08%2F29%2F0001765538_001_20240829115016451.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap">
//                           <div class="name_area">
//                             <span class="name">엑스포츠뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >백일섭, 故김자옥 향한 그리움 "아파서 촬영도 제대로
//                             못해" (아빠하고)[종합]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/311/0001765538"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="2">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F311%2F2024%2F08%2F29%2F0001765505_001_20240829114909600.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">엑스포츠뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'10월 결혼' 송지은, ♥박위 또 반한 웨딩드레스
//                             피팅…"행복했던 시간"</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/311/0001765505"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="3">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F112%2F2024%2F08%2F29%2F202408291333476317254_20240829134002_01_20240829140310198.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">헤럴드POP</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >한소희, 하이틴물 여주 비주얼..새침한데 너무
//                             예쁘네</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/112/0003717063"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="4">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F609%2F2024%2F08%2F29%2F202408291515473510_1_20240829171419686.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴스엔</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >뱀뱀 ‘어떤 패션도 완벽하게 소화하는 인간
//                             소화제’[포토엔HD]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/609/0000891250"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="5">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjdfMjAw%2FMDAxNzI0NzQzNzM4MzM2.VrdV0i4XYF7Hgi_pAT1DUqx8pFjMyxS3CGQGNFnGzLwg.yhvjxX-15DLkXHhMxwA6fcaZ-3kPFhzlLIiwWa24GYYg.JPEG%2FIMG_2911.JPG&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">썽미</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >[08.27 신곡] RESCENE / NOWADAYS / Sondia /
//                             해리빅버튼 / 비오 / UNXL / 동우석 / 케이플라워 /
//                             오드 / 소밍 / 더 브릿지</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/osm7745/223562932709"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="6">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjVfMTc0%2FMDAxNzI0NTMxMDkyNzQ0.-w0qPS_9aG5Z5BzqC7lej078OWAA0gkLmL51dQoEFCMg.IqciMYdmNmAJvMjyI2WxgWJiCUqNlOcp7BOuDzZdeiMg.JPEG%2F6.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">구르도</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >귀멸의 칼날 보는 순서 극장판 5기 6기 무한성은
//                             언제?</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/kijoon1018/223559785631"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="7">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=https%3A%2F%2Fpost-phinf.pstatic.net%2FMjAyNDA4MjdfMiAg%2FMDAxNzI0NzIwNDQ3NTky.DnuSL6_8wiukKnUbzgx8sLb6XVdW7q1qH5A_cVs5E1Mg.kqJDRtEN8YVl-2lXZ0Wbv4tyWhf7n4YGdE73kVssH-Ig.JPEG%2FIF3SRDh0R0AEMRZBQZ1PLMsdXASQ.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">엔카매거진</span
//                             ><span class="source">포스트</span>
//                           </div>
//                           <strong class="title"
//                             >어수선한 분위기 수습하러 온 스웨덴 폭군 ft.폴스타
//                             4</strong
//                           >
//                         </div>
//                         <a
//                           href="https://m.post.naver.com/viewer/postView.naver?volumeNo=38715684&amp;memberNo=8352064&amp;vType=VERTICAL"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="8">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjRfMjQx%2FMDAxNzI0NDk3NjUyODY5.MXxIaqhLDdcXB4VRWSRTmAaiA8KB60a9cetnKmdNop4g.5L9SCb9FxVDPQmu8PVLSh9ZNIZ-1BFgpPI3WiPHBFi0g.PNG%2F%ED%8E%B8%EC%A7%91_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2024-08-24_195824.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">오드리팝콘</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >CGV 반값 할인 7천원 26일부터 28일까지 컬처 위크
//                             행사</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/tjdrhdgkwk2021/223559411223"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="9">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjRfMTgz%2FMDAxNzI0NDc5NDI3ODMx.w8_luEkyxFLkzXv0gZuoI8tTzSp7a3ubOg-GcV2ewoQg.tWhjYk25W8oJ1FTxPG46SD66wBlb6sNw0Z5ED6GNhF8g.JPEG%2Fcommon-4.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">씬디</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >[한국영화] 우리 사랑이 향기로 남을 때, Love My
//                             Scent / 2023 / 감독 임성용 / 윤시윤, 설인아 출연진
//                             정보 관람평</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/imagineing/223559202053"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="10">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MTlfNjIg%2FMDAxNzI0MDE5NDUyODkz.ggIaYBzeJJ78uIQdLg5HE7OeeKgTyP3nxjV1XvI-pFYg.tP5M00LfTAs6IvesKKXVdW5gkDRVEr0E-bH7Mkmf4e4g.PNG%2F%EB%A7%B5%EA%B3%A0_%EB%9C%A8%EA%B2%81%EA%B2%8C.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">초심</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >영화 &lt;맵고 뜨겁게&gt; YOLO, 2024</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/ds1pob/223554757661"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="1" data-v="11">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F001%2F2024%2F08%2F29%2FPRU20240822099201009_P4_20240829111425277.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">연합뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >김하성, 수비·송구 훈련 착착…빅리그 복귀 시점은
//                             아직</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/001/0014899986"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>키워드</div>
//             </div>
//             <div class="flick_bx flick_width" style="opacity: 1; width: 600px">
//               <div class="shortents_item_wrap vertical_flicking_wrap">
//                 <div
//                   class="flicking-viewport vertical"
//                   style="
//                     width: 100%;
//                     height: 100%;
//                     user-select: none;
//                     -webkit-user-drag: none;
//                     touch-action: pan-x;
//                   "
//                 >
//                   <div
//                     class="flicking-camera"
//                     style="transform: translate(0px, -600px)"
//                   >
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="0">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MTlfNjIg%2FMDAxNzI0MDE5NDUyODkz.ggIaYBzeJJ78uIQdLg5HE7OeeKgTyP3nxjV1XvI-pFYg.tP5M00LfTAs6IvesKKXVdW5gkDRVEr0E-bH7Mkmf4e4g.PNG%2F%EB%A7%B5%EA%B3%A0_%EB%9C%A8%EA%B2%81%EA%B2%8C.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 0.999999">
//                           <div class="name_area">
//                             <span class="name">초심</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >영화 &lt;맵고 뜨겁게&gt; YOLO, 2024</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/ds1pob/223554757661"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="1">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F001%2F2024%2F08%2F29%2FPRU20240822099201009_P4_20240829111425277.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap">
//                           <div class="name_area">
//                             <span class="name">연합뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >김하성, 수비·송구 훈련 착착…빅리그 복귀 시점은
//                             아직</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/001/0014899986"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="2">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F076%2F2024%2F08%2F29%2F2024082801002143300287351_20240829000027137.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스포츠조선</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'아! 또...' 부상자 속출에 SSG 이숭용 한숨 푹,
//                             박성한도 허벅지 통증 "검진 예정"[광주 현장]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/076/0004186807"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="3">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F241%2F2024%2F08%2F29%2F0003376192_001_20240829153409119.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">일간스포츠</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >윤이나, KG 레이디스 오픈 기권 "골반 통증 및 피로
//                             누적"…타이틀 순위 요동치나 [IS 용인]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/241/0003376192"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="4">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F470%2F2024%2F08%2F29%2F0000017664_001_20240829074610966.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">JTBC GOLF</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >임성재-안병훈, PGA 최종전 새벽 출장</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/470/0000017664"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="5">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F398%2F2024%2F08%2F29%2F0000080856_001_20240829100413316.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">루키</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >1라운더 출신 하이 플라이어→기대 이하 성장세...
//                             디펜딩 챔피언서 반등 노린다</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/sports/general/article/398/0000080856"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="6">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjhfMjA5%2FMDAxNzI0ODAzMDQyNTE5.jvkXVewOmDsp7KBQllZxTm_yaTPB_0zcpv65qaw5K00g.upfl1OcXulHM-lnZ2rSwyWeVD9QiVvAbE-dEKJuaYuMg.PNG%2F20240828_085701.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">빠게룽</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >울버햄튼원더러스FC 공격수 황희찬(경기일정 유니폼
//                             위치 라인업)</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/baekhw1/223564214473"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="2" data-v="7">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F108%2F2024%2F08%2F29%2F0003261822_001_20240829102309444.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스타뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >전종서, 남편 지창욱과 재회..'입지 위협'
//                             [우씨왕후]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/108/0003261822"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>키워드</div>
//             </div>
//             <div class="flick_bx flick_width" style="opacity: 1; width: 600px">
//               <div class="shortents_item_wrap vertical_flicking_wrap">
//                 <div
//                   class="flicking-viewport vertical"
//                   style="
//                     width: 100%;
//                     height: 100%;
//                     user-select: none;
//                     -webkit-user-drag: none;
//                     touch-action: pan-x;
//                   "
//                 >
//                   <div
//                     class="flicking-camera"
//                     style="transform: translate(0px, -600px)"
//                   >
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="0">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjhfMjA5%2FMDAxNzI0ODAzMDQyNTE5.jvkXVewOmDsp7KBQllZxTm_yaTPB_0zcpv65qaw5K00g.upfl1OcXulHM-lnZ2rSwyWeVD9QiVvAbE-dEKJuaYuMg.PNG%2F20240828_085701.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 0.999999">
//                           <div class="name_area">
//                             <span class="name">빠게룽</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >울버햄튼원더러스FC 공격수 황희찬(경기일정 유니폼
//                             위치 라인업)</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/baekhw1/223564214473"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="1">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F108%2F2024%2F08%2F29%2F0003261822_001_20240829102309444.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap">
//                           <div class="name_area">
//                             <span class="name">스타뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >전종서, 남편 지창욱과 재회..'입지 위협'
//                             [우씨왕후]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/108/0003261822"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="2">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F214%2F2024%2F08%2F29%2Ftoday_20240829_073727_1_33_Large_20240829074317554.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">MBC</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >[문화연예 플러스] 조보아 '10월의 신부' 된다</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/214/0001370924"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="3">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F005%2F2024%2F08%2F29%2F2024082820440468226_1724845444_1724832149_20240829033209780.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">국민일보</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >치열하게 섬뜩함 완성한 고민시… “새로운 모습 담길 때
//                             희열”</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/005/0001721384"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="4">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F003%2F2024%2F08%2F29%2FNISI20240828_0001638699_web_20240828084559_20240829053316842.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴시스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >하이브 캣츠아이, 넷플릭스 조명 이후 美서 대박
//                             조짐</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/003/0012754205"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="5">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F109%2F2024%2F08%2F29%2F0005145436_001_20240829091113176.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">OSEN</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'굿파트너' 지승현, 불륜 대국민 사과 "진심으로
//                             죄송"..오늘(29일) 악플 읽는다 [Oh!쎈 이슈]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/109/0005145436"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="6">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F144%2F2024%2F08%2F29%2F0000985073_001_20240829074013773.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스포츠경향</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >데이식스 원필, 깊은 눈빛에 ‘녹아내려요’</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/144/0000985073"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="7">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=https%3A%2F%2Finfluencer-phinf.pstatic.net%2FMjAyNDA4MjhfMTcy%2FMDAxNzI0ODE0MzY2ODYw.gkkkpWvuQv1TR_KYrMj2S7MR-vuzFgVVXlUD7UMDs0Mg.RZw0z_br0iIpQtv8XLfqUsK0cIE2Vt9CObPZLGsBP7Qg.PNG%2F8ee7.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">Yotanneiroseirfgsto</span
//                             ><span class="source">인플루언서</span>
//                           </div>
//                           <strong class="title"
//                             >나는솔로 22기 정희 놀라운 이유, 에르메스 +
//                             서울대법대 + 집안 직업</strong
//                           >
//                         </div>
//                         <a
//                           href="https://in.naver.com/buucuukuu/topic/731193576555936"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="8">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F609%2F2024%2F08%2F29%2F202408291511313510_1_20240829171518965.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴스엔</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >뱀뱀 ‘흠잡을 곳 없는 완벽함’[포토엔HD]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/609/0000891247"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="9">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F047%2F2024%2F08%2F29%2F0002444361_001_20240829102008039.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">오마이뉴스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'골때녀' 탑걸, 탈락 위기 딛고 극적인 4강
//                             진출</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/047/0002444361"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="10">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F629%2F2024%2F08%2F29%2F202433991724896542_20240829110114962.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">더팩트</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >박주원, '내 여자친구는 상남자' 출연…아린과 '찐친
//                             케미'</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/629/0000317074"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="3" data-v="11">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F437%2F2024%2F08%2F29%2F0000408261_001_20240829124107909.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">JTBC</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'이혼숙려캠프' 3기 마지막 부부의 사연! 남편 망언에
//                             '사랑꾼' 진태현 경악</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/437/0000408261"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>키워드</div>
//             </div>
//             <div class="flick_bx flick_width" style="opacity: 1; width: 600px">
//               <div class="shortents_item_wrap vertical_flicking_wrap">
//                 <div
//                   class="flicking-viewport vertical"
//                   style="
//                     width: 100%;
//                     height: 100%;
//                     user-select: none;
//                     -webkit-user-drag: none;
//                     touch-action: pan-x;
//                   "
//                 >
//                   <div
//                     class="flicking-camera"
//                     style="transform: translate(0px, -600px)"
//                   >
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="0">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F629%2F2024%2F08%2F29%2F202433991724896542_20240829110114962.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 0.999999">
//                           <div class="name_area">
//                             <span class="name">더팩트</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >박주원, '내 여자친구는 상남자' 출연…아린과 '찐친
//                             케미'</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/629/0000317074"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="1">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F437%2F2024%2F08%2F29%2F0000408261_001_20240829124107909.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap">
//                           <div class="name_area">
//                             <span class="name">JTBC</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'이혼숙려캠프' 3기 마지막 부부의 사연! 남편 망언에
//                             '사랑꾼' 진태현 경악</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/437/0000408261"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="2">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjhfMTUz%2FMDAxNzI0ODI5NzcyNDcy.1-NqZNsd0QqoMKfRMm2Bo4AHFo90EqmVi71AqB9HoxEg.OOu6jLOej49XQtcIaEHVSjO4f2bASceGuztJ7nk7ETsg.PNG%2F__SBS11.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">덕빛</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >드라마 굿파트너 9회 명대사 조금만 더 힘내자</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/js2y86/223563974397"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="3">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F144%2F2024%2F08%2F29%2F0000985084_001_20240829083413385.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스포츠경향</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >‘나는 솔로’ 22기 결혼 커플 알렸다, 안방 흥분의
//                             도가니[종합]</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/144/0000985084"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="4">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F003%2F2024%2F08%2F28%2FNISI20240828_0001639058_web_20240828113021_20240828202019711.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴시스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >위안부 소설 쓴 차인표 "英 옥스퍼드 강연날 일왕
//                             부부도 방문"</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/003/0012754035"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="5">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F396%2F2024%2F08%2F29%2F0000687106_001_20240829104912317.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스포츠월드</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >피식대학, 영양군 콜라보 이어 ‘홍보대사’
//                             됐다</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/396/0000687106"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="6">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F312%2F2024%2F08%2F28%2F0000677429_003_20240828213110027.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">텐아시아</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >[종합]장영란, 천만 유튜버 '어마어마한 대저택' 감탄
//                             "한 달 수입=외제차 풀옵션"('A급 장영란')</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/312/0000677429"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="7">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F144%2F2024%2F08%2F29%2F0000985151_001_20240829110617951.png&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">스포츠경향</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >오상욱, 3년만 ‘나혼산’ 금의환향</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/144/0000985151"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="8">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjZfMTAy%2FMDAxNzI0Njg0MDY3NTQ4.5eOzstWzZxsdU3F3Fq5BlKaL00-ywcwVMFTRXzDq9MUg.KIY0U-rYRAibw9Mkn-_KachzTRONbvWQ1ruAX9YfnQ0g.JPEG%2F0.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">인하작가</span
//                             ><span class="source">블로그</span>
//                           </div>
//                           <strong class="title"
//                             >넷플릭스 아무도 없는 숲속에서 정보 출연진 줄거리
//                             감상평 후기</strong
//                           >
//                         </div>
//                         <a
//                           href="https://blog.naver.com/0purelop0/223563427230"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="9">
//                         <div class="img_wrap">
//                           <img
//                             class="img scaleup"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F003%2F2024%2F08%2F29%2FNISI20240829_0001639778_web_20240829002247_20240829060720642.jpg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">뉴시스</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'김우빈♥' 신민아, 우아한 웨딩드레스 자태</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/003/0012754244"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                     <div class="vflick_bx flick_height" style="height: 600px">
//                       <div class="shortents_item" data-h="4" data-v="10">
//                         <div class="img_wrap">
//                           <img
//                             class="img"
//                             src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F109%2F2024%2F08%2F29%2F0005145622_001_20240829142112857.jpeg&amp;type=fc710x1080"
//                             alt=""
//                             style="width: auto; height: 100%"
//                           />
//                         </div>
//                         <div class="info_wrap" style="opacity: 1">
//                           <div class="name_area">
//                             <span class="name">OSEN</span
//                             ><span class="source">네이버뉴스</span>
//                           </div>
//                           <strong class="title"
//                             >'김태호 PD 제작사' 테오, 청담동 3백억 건물
//                             매입...총 6층 신사옥 짓는다</strong
//                           >
//                         </div>
//                         <a
//                           href="https://n.news.naver.com/entertain/article/109/0005145622"
//                           class="shortents_link"
//                         ></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>키워드</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="shortents_page">
//         <span class="pg_dot on">1</span><span class="pg_dot">2</span
//         ><span class="pg_dot">3</span><span class="pg_dot">4</span
//         ><span class="pg_dot">5</span><span class="pg_dot">6</span
//         ><span class="pg_dot">7</span><span class="pg_dot">8</span
//         ><span class="pg_dot">9</span><span class="pg_dot">10</span>
//       </div>
//     </div>
//   </section>
//   <footer id="footer">
//     <div class="keyword_wrap" style="background-color: rgb(33, 61, 110)">
//       <div class="keyword_list_wrap">
//         <div class="api_flicking_wrap" style="overflow-x: hidden">
//           <div class="flicking-viewport" style="width: 100%">
//             <div class="flicking-camera" style="transform: translate(0px)">
//               <div
//                 class="flick_bx flick_width"
//                 style="opacity: 1; width: 600px"
//               >
//                 <a
//                   href="https://m.search.naver.com/search.naver?query=%ED%86%A0%ED%8A%B8%EB%84%98+%EC%86%90%ED%9D%A5%EB%AF%BC+%EC%9D%B4%EC%A0%81&amp;sm=mtb_sht.viewer&amp;where=m"
//                   class="link_keyword"
//                   ><strong class="keyword">토트넘 손흥민 이적</strong></a
//                 >
//               </div>
//               <div
//                 class="flick_bx flick_width"
//                 style="opacity: 1; width: 600px"
//               >
//                 <a
//                   href="https://m.search.naver.com/search.naver?query=%EB%B0%B1%EC%9D%BC%EC%84%AD+%EA%B9%80%EC%9E%90%EC%98%A5+%EA%B7%B8%EB%A6%AC%EC%9B%80&amp;sm=mtb_sht.viewer&amp;where=m"
//                   class="link_keyword"
//                   ><strong class="keyword">백일섭 김자옥 그리움</strong></a
//                 >
//               </div>
//               <div
//                 class="flick_bx flick_width"
//                 style="opacity: 1; width: 600px"
//               >
//                 <a
//                   href="https://m.search.naver.com/search.naver?query=%EC%88%98%EB%B9%84+%EA%B9%80%ED%95%98%EC%84%B1&amp;sm=mtb_sht.viewer&amp;where=m"
//                   class="link_keyword"
//                   ><strong class="keyword">수비 김하성</strong></a
//                 >
//               </div>
//               <div
//                 class="flick_bx flick_width"
//                 style="opacity: 1; width: 600px"
//               >
//                 <a
//                   href="https://m.search.naver.com/search.naver?query=%EC%A0%84%EC%A2%85%EC%84%9C+%EC%9A%B0%EC%94%A8%EC%99%95%ED%9B%84&amp;sm=mtb_sht.viewer&amp;where=m"
//                   class="link_keyword"
//                   ><strong class="keyword">전종서 우씨왕후</strong></a
//                 >
//               </div>
//               <div
//                 class="flick_bx flick_width"
//                 style="opacity: 1; width: 600px"
//               >
//                 <a
//                   href="https://m.search.naver.com/search.naver?query=%EC%A7%84%ED%83%9C%ED%98%84+%ED%88%AC%EA%B2%AC%EB%B6%80%EB%B6%80&amp;sm=mtb_sht.viewer&amp;where=m"
//                   class="link_keyword"
//                   ><strong class="keyword">진태현 투견부부</strong></a
//                 >
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="ico_area"><i class="spst2 ico_search"></i></div>
//     </div>
//   </footer>
// </div>
