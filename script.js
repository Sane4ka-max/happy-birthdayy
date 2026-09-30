// =====================================================
// НАСТРОЙКИ: меняй только эти два массива
// =====================================================
const photos = [
  {file:"photo1.jpg.jpg",caption:"",r:"-3deg"},
  {file:"photo2.jpg.jpg",caption:"",r:"2deg"},
  {file:"photo3.jpg.jpg",caption:"",r:"-1deg"},
  {file:"photo4.jpg.jpg",caption:"",r:"3deg"},
  {file:"photo5.jpg.jpg",caption:"",r:"-2deg"},
  {file:"photo6.jpg.jpg",caption:"",r:"1deg"}
];

const friends = [
  {name:"Женя",text:`Дорогая сестра, хотел бы я тебя послать нахуй но увы сегодня у тебя праздник(к сожелению) так что поздравляю с днём рождения, желаю тебе счастья здоровья. Скучно да ? Ладно
Желаю тебе всего самого наилучшего, удачи найти настоящую любовь с которой проживёшь самую лучшую жизнь, желаю найти наилучших друзей.хапхахах ладно шучу тебе не надо их искать они уже есть я кстати 1 из них (надеюсь🤗) ну а так чтоб жила долго ну ты знаешь чтоб дольше страдать, поменьше денег хотя ты так совсем бомжом станешь, фу крч я устал давай это самое дальше сама как то придумаешь что тебе больше надо, бб чао какао👽👽👽🤡🤡🤡😼😼😼`},

  {name:"Ника",text:`кися, с днём рождения тебя, моя маленькая!!
с твоим 18-летием!!
будь счастлива, живи по кайфу, люби себя и нас.
цвети, улыбайся, радуйся мелочам, не загоняйся, живи в радость себе.
пусть это начало в твоей жизни приносит только хорошие впечатления, забудь о старом, живи счастливым настоящим.
я очень люблю тебя, я очень рада, что прошлой осенью мы начали общаться, что в моей жизни появилась ты. сколько бы времени ни прошло, я всё ещё не понимаю, как мы так нашли общий язык. когда я нахожусь с тобой, мне становится легко на душе, комфортно, спокойно, будто я там, где должна быть.
и всегда помни и знай, что я с тобой в любой момент, в любую секунду, готова прийти на помощь, выслушать и поговорить.
я очень рада, что 1 октября 2008 года родилась такая чудесная девочка, прекрасная, красивая, милая, самая лучшая. ты лучик солнца, который приносит мне искреннее счастье.
пусть тебя окружают верные люди, в которых ты будешь уверена на все 100%. ты достойна всего самого лучшего!
с любовью, твоя Ника 💋`},

  {name:"Олег",text:`Ксюша, поздравляю тебя с твоим днём варенья, желаю много варенья, чтобы всё, что ты хотела, у тебя всегда было, и оно обязательно будет, потому что нихуя себе, уже 18 лет как-никак, а всё остальное потихоньку придёт и всё будет опупенно`}
];

// =====================================================
// НИЖЕ КОД ИНТЕРАКТИВА
// =====================================================

const countdown=document.getElementById("countdownScreen");
const gift=document.getElementById("giftScreen");
const main=document.getElementById("mainScreen");
const secondsEl=document.getElementById("seconds");
const countStatus=document.getElementById("countStatus");
const startBtn=document.getElementById("startBtn");

let virtualRemaining = 86400;
let countFinished = false;

const daysEl=document.getElementById("days");
const hoursEl=document.getElementById("hours");
const minutesEl=document.getElementById("minutes");
const progressEl=document.getElementById("countProgress");

function paintCountdown(total){
  const d=Math.floor(total/86400);
  const h=Math.floor((total%86400)/3600);
  const m=Math.floor((total%3600)/60);
  const sec=total%60;

  [[daysEl,d],[hoursEl,h],[minutesEl,m],[secondsEl,sec]].forEach(([el,val])=>{
    const next=String(val).padStart(2,"0");

    if(el.textContent!==next){
      el.animate(
        [
          {opacity:.25,transform:"translateY(7px) scale(.82)"},
          {opacity:1,transform:"none"}
        ],
        {
          duration:180,
          easing:"cubic-bezier(.2,.8,.2,1)"
        }
      );

      el.textContent=next;
    }
  });

  progressEl.style.width=((86400-total)/86400*100)+"%";
}

paintCountdown(virtualRemaining);

// Весь однодневный отсчёт сжимается примерно в 4.8 секунды.
const countTimer=setInterval(()=>{
  virtualRemaining=Math.max(0,virtualRemaining-1800);
  paintCountdown(virtualRemaining);

  if(virtualRemaining===0 && !countFinished){
    countFinished=true;
    clearInterval(countTimer);

    countStatus.textContent="всё начинается сейчас ♡";
    startBtn.classList.remove("hidden");

    startBtn.animate(
      [
        {opacity:0,transform:"translateY(18px) scale(.9)"},
        {opacity:1,transform:"none"}
      ],
      {
        duration:700,
        easing:"cubic-bezier(.16,.84,.25,1)"
      }
    );

    const screen=document.getElementById("countdownScreen");

    screen.classList.add("countdown-zero");

    setTimeout(()=>{
      screen.classList.remove("countdown-zero");
    },900);
  }
},100);


// =====================================================
// ПЕРЕХОД ОТ ТАЙМЕРА К ПОДАРКУ
// =====================================================

startBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  e.stopPropagation();

  switchScreen(countdown,gift);
});


// =====================================================
// ПОДАРОК
// =====================================================

const giftButton=document.getElementById("giftButton");

giftButton.addEventListener("click",(e)=>{
  e.preventDefault();
  e.stopPropagation();

  giftButton.classList.add("opening");

  document.getElementById("giftScreen").classList.add("gift-exploding");

  // После развязывания — переход на первую страницу.
  setTimeout(()=>{
    switchScreen(gift,main);
    showPage(0,true);
  },1100);
});


function switchScreen(from,to){
  from.classList.add("leaving");

  setTimeout(()=>{
    from.classList.remove("active","leaving");
    to.classList.add("active");
  },650);
}


// =====================================================
// ОСНОВНЫЕ СТРАНИЦЫ
// =====================================================

const pages=[...document.querySelectorAll(".page")];

let current=0;
let busy=false;


function showPage(index,instant=false){

  if(index<0 || index>=pages.length || busy){
    return;
  }

  busy=true;

  pages.forEach((p,i)=>{
    p.classList.remove("active","exit");

    if(i===index){
      p.classList.add("active");
    }
  });

  current=index;

  const progressBar=document.getElementById("progressBar");

  if(progressBar){
    progressBar.style.width=
      ((index+1)/pages.length*100)+"%";
  }

  animatePage(pages[index]);

  setTimeout(()=>{
    busy=false;
  },instant ? 50 : 700);
}


// =====================================================
// ИСПРАВЛЕННАЯ НАВИГАЦИЯ "ДАЛЬШЕ"
// =====================================================

function goNext(e){

  // Не даём браузеру выполнять стандартное действие кнопки.
  if(e){
    e.preventDefault();
    e.stopPropagation();
  }

  // Если предыдущий переход ещё идёт — ничего не делаем.
  if(busy){
    return;
  }

  const nextIndex=
    current+1<pages.length
      ? current+1
      : 0;

  showPage(nextIndex);
}


// Все кнопки "Далее"
document.querySelectorAll("[data-next]").forEach(button=>{

  // Очень важно для мобильных браузеров:
  // кнопка не должна работать как submit.
  button.type="button";

  button.addEventListener("click",goNext);

});


// =====================================================
// ИСПРАВЛЕННАЯ НАВИГАЦИЯ МЕНЮ
// =====================================================

document.querySelectorAll("nav button").forEach(button=>{

  button.type="button";

  button.addEventListener("click",(e)=>{

    e.preventDefault();
    e.stopPropagation();

    showPage(Number(button.dataset.go));

  });

});


// =====================================================
// МОБИЛЬНОЕ МЕНЮ
// =====================================================

document.getElementById("menuBtn").addEventListener("click",(e)=>{

  e.preventDefault();
  e.stopPropagation();

  const btn=document.getElementById("menuBtn");
  const nav=document.getElementById("nav");

  btn.classList.toggle("open");
  nav.classList.toggle("open");

});


document.querySelectorAll("#nav button").forEach(button=>{

  button.addEventListener("click",(e)=>{

    e.preventDefault();
    e.stopPropagation();

    document.getElementById("menuBtn").classList.remove("open");
    document.getElementById("nav").classList.remove("open");

  });

});


// =====================================================
// ЗАЩИТА ОТ СЛУЧАЙНОЙ ПЕРЕЗАГРУЗКИ ЧЕРЕЗ FORM
// =====================================================

document.addEventListener("submit",(e)=>{
  e.preventDefault();
});


// Навигация между страницами — только кнопками.
// Скролл внутри активной страницы разрешён,
// чтобы длинный текст читался на телефоне.

document.addEventListener("keydown",e=>{
  // Не превращаем стрелки/пробел в навигацию между страницами.
});


// =====================================================
// ПЕЧАТЬ ТЕКСТА
// =====================================================

function typeText(el,text,speed=30){

  return new Promise(resolve=>{

    el.textContent="";
    el.classList.add("typing");

    let i=0;

    const timer=setInterval(()=>{

      el.textContent+=text[i++];

      if(i>=text.length){

        clearInterval(timer);
        el.classList.remove("typing");

        resolve();
      }

    },speed);

  });
}


async function animatePage(page){

  // Все тексты на странице появляются и печатаются.
  const items=[
    ...page.querySelectorAll(
      ".typing-title,.typed-paragraph,.typing-signature"
    )
  ];

  for(const el of items){

    if(el.dataset.done==="1"){
      continue;
    }

    el.dataset.done="1";

    await typeText(
      el,
      el.dataset.text,
      el.classList.contains("typing-title")
        ? 48
        : 16
    );

    await new Promise(r=>setTimeout(r,120));
  }


  page.querySelectorAll(".polaroid").forEach((p,i)=>{
    p.style.animationDelay=(i*.08)+"s";
  });


  // На странице поздравлений карточки появляются по очереди.
  if(page.classList.contains("scene-friends")){
    revealFriendMessages(page);
  }

}


// =====================================================
// ЖИВОЙ КОСМИЧЕСКИЙ ФОН
// =====================================================

function initAmbientParticles(){

  document.querySelectorAll(".screen").forEach(screen=>{

    if(screen.querySelector(".particle-field")){
      return;
    }

    const field=document.createElement("div");

    field.className="particle-field";

    for(let i=0;i<46;i++){

      const dot=document.createElement("i");

      dot.style.setProperty(
        "--x",
        Math.random()*100+"%"
      );

      dot.style.setProperty(
        "--y",
        Math.random()*100+"%"
      );

      dot.style.setProperty(
        "--s",
        (Math.random()*2.2+.5)+"px"
      );

      dot.style.setProperty(
        "--o",
        (Math.random()*.48+.12).toFixed(2)
      );

      dot.style.setProperty(
        "--d",
        (Math.random()*14+8).toFixed(2)+"s"
      );

      dot.style.setProperty(
        "--delay",
        (-Math.random()*18).toFixed(2)+"s"
      );

      dot.style.setProperty(
        "--dx",
        ((Math.random()-.5)*90).toFixed(0)+"px"
      );

      dot.style.setProperty(
        "--dy",
        ((Math.random()-.5)*120).toFixed(0)+"px"
      );

      field.appendChild(dot);
    }

    screen.appendChild(field);

  });

}


function spawnShootingStar(){

  if(
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ){
    return;
  }

  const active=document.querySelector(".screen.active");

  if(!active){
    return;
  }

  const star=document.createElement("i");

  star.className="shooting-star";

  star.style.left=
    (Math.random()*82+8)+"%";

  star.style.top=
    (Math.random()*38+8)+"%";

  star.style.setProperty(
    "--travel",
    (Math.random()*180+120)+"px"
  );

  star.style.setProperty(
    "--duration",
    (Math.random()*900+700)+"ms"
  );

  active.appendChild(star);

  setTimeout(()=>{
    star.remove();
  },1800);
}


initAmbientParticles();

setInterval(spawnShootingStar,5200);

setTimeout(spawnShootingStar,2400);


// =====================================================
// ВОСПОМИНАНИЯ
// =====================================================

const photoRoot=document.getElementById("photos");

photos.forEach((p,i)=>{

  const fig=document.createElement("figure");

  fig.className="memory-card";

  fig.style.setProperty("--r",p.r);
  fig.style.setProperty("--i",i);

  fig.innerHTML=`
    <div class="memory-frame">
      <div class="memory-corner memory-corner-tl"></div>
      <div class="memory-corner memory-corner-tr"></div>

      <img
        src="assets/photos/${p.file}"
        alt="${p.caption}"
        loading="eager"
      >

      <div class="memory-flash"></div>

      <div class="memory-stamp">
        0${i+1}
      </div>
    </div>

    <figcaption>
      <span>${String(i+1).padStart(2,"0")}</span>
      <strong>${p.caption}</strong>
      <small>moment / 2026</small>
    </figcaption>
  `;


  const img=fig.querySelector("img");


  img.addEventListener("error",()=>{

    img.src=
      "data:image/svg+xml;charset=UTF-8,"+
      encodeURIComponent(`
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 650"
        >
          <rect
            width="800"
            height="650"
            fill="#211522"
          />

          <text
            x="400"
            y="310"
            text-anchor="middle"
            font-family="Arial"
            font-size="28"
            fill="#eadbea"
          >
            Добавь ${p.file}
          </text>

          <text
            x="400"
            y="355"
            text-anchor="middle"
            font-family="Arial"
            font-size="18"
            fill="#a995a8"
          >
            в assets/photos
          </text>
        </svg>
      `);

  });


  fig.addEventListener("click",()=>{
    openMemoryLightbox(p,i);
  });


  photoRoot.appendChild(fig);

});


function openMemoryLightbox(p,i){

  let box=document.getElementById(
    "memoryLightbox"
  );


  if(!box){

    box=document.createElement("div");

    box.id="memoryLightbox";

    box.className="memory-lightbox";

    box.innerHTML=`
      <button
        class="memory-lightbox-close"
        aria-label="Закрыть"
        type="button"
      >
        ×
      </button>

      <div class="memory-lightbox-inner">

        <div class="memory-lightbox-number"></div>

        <img>

        <div class="memory-lightbox-caption"></div>

      </div>
    `;

    document.body.appendChild(box);


    box.addEventListener("click",e=>{

      if(
        e.target===box ||
        e.target.classList.contains(
          "memory-lightbox-close"
        )
      ){
        box.classList.remove("show");
      }

    });

  }


  box.querySelector("img").src=
    `assets/photos/${p.file}`;

  box.querySelector(
    ".memory-lightbox-number"
  ).textContent=
    `0${i+1} / 06`;

  box.querySelector(
    ".memory-lightbox-caption"
  ).textContent=
    p.caption;


  requestAnimationFrame(()=>{
    box.classList.add("show");
  });

}


// =====================================================
// ДРУЗЬЯ
// =====================================================

let friendRevealRun=0;
let friendConfettiTimer=null;


function revealFriendMessages(page){

  const cards=[
    ...page.querySelectorAll(
      ".friend-message"
    )
  ];

  const run=++friendRevealRun;


  cards.forEach(card=>{

    card.classList.remove(
      "friend-live-in"
    );

    card.style.removeProperty(
      "animation-delay"
    );

    card.style.opacity="0";

  });


  if(friendConfettiTimer){
    clearTimeout(friendConfettiTimer);
  }


  cards.forEach((card,i)=>{

    setTimeout(()=>{

      if(
        run!==friendRevealRun ||
        !page.classList.contains("active")
      ){
        return;
      }

      card.classList.add(
        "friend-live-in"
      );

      burstConfetti(card,18);

    },650+i*1150);

  });


  friendConfettiTimer=setTimeout(()=>{

    if(
      run===friendRevealRun &&
      page.classList.contains("active")
    ){

      burstConfetti(
        page,
        70,
        true
      );

    }

  },650+cards.length*1150-180);

}


function burstConfetti(
  anchor,
  count=28,
  wide=false
){

  if(
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ){
    return;
  }


  const rect=
    anchor.getBoundingClientRect();


  const cx=
    wide
      ? window.innerWidth*.5
      : rect.left+rect.width*.5;


  const cy=
    wide
      ? window.innerHeight*.32
      : rect.top+Math.min(
          rect.height*.3,
          130
        );


  const layer=
    document.createElement("div");

  layer.className=
    "friend-confetti-layer";

  document.body.appendChild(layer);


  const glyphs=[
    "✦",
    "✧",
    "•",
    "◆",
    "♡"
  ];


  for(let i=0;i<count;i++){

    const piece=
      document.createElement("i");

    piece.className=
      "friend-confetti-piece";

    piece.textContent=
      glyphs[i%glyphs.length];

    piece.style.left=
      cx+"px";

    piece.style.top=
      cy+"px";


    piece.style.setProperty(
      "--x",
      ((Math.random()-.5)*
        (wide?520:260))+"px"
    );


    piece.style.setProperty(
      "--y",
      (Math.random()*220+70)+"px"
    );


    piece.style.setProperty(
      "--r",
      ((Math.random()-.5)*720)+"deg"
    );


    piece.style.setProperty(
      "--d",
      (Math.random()*.55+.8)+"s"
    );


    piece.style.setProperty(
      "--s",
      (Math.random()*.65+.65).toFixed(2)
    );


    piece.style.setProperty(
      "--delay",
      (Math.random()*.12)+"s"
    );


    layer.appendChild(piece);

  }


  setTimeout(()=>{
    layer.remove();
  },1700);

}


// =====================================================
// СОЗДАНИЕ КАРТОЧЕК ДРУЗЕЙ
// =====================================================

const friendRoot=
  document.getElementById("friends");


friends.forEach((f,i)=>{

  const card=
    document.createElement("article");

  card.className=
    "friend friend-message";

  card.style.setProperty(
    "--friend-delay",
    `${i*220}ms`
  );


  const initials=
    f.name
      .slice(0,1)
      .toUpperCase();


  card.innerHTML=`
    <div class="friend-number">
      0${i+1}
    </div>

    <div class="friend-shine"></div>

    <div class="friend-avatar">
      ${initials}
    </div>

    <div class="friend-copy">

      <div class="friend-kicker">
        личное сообщение · для Ксюши
      </div>

      <div class="friend-name">
        ${f.name}
      </div>

      <div class="friend-text">
        “${f.text}”
      </div>

      <div class="friend-meta">
        ${f.meta || ""}
      </div>

    </div>

    <div class="friend-tail">
      <span>✦</span>
      <span>с любовью</span>
      <span>♡</span>
    </div>
  `;


  friendRoot.appendChild(card);

});


// =====================================================
// МУЗЫКА
// =====================================================

const music=
  document.getElementById(
    "backgroundMusic"
  );

const musicToggle=
  document.getElementById(
    "musicToggle"
  );

let musicStarted=false;


async function startMusic(){

  if(!music){
    return;
  }

  try{

    await music.play();

    musicStarted=true;

    updateMusicButton();

  }catch(err){

    // Браузер может разрешить звук
    // только после явного действия пользователя.

  }

}


function updateMusicButton(){

  if(!musicToggle || !music){
    return;
  }

  const on=!music.paused;

  musicToggle.textContent=
    on ? "♪" : "♫";

  musicToggle.setAttribute(
    "aria-label",
    on
      ? "Выключить музыку"
      : "Включить музыку"
  );

  musicToggle.setAttribute(
    "aria-pressed",
    String(on)
  );

  musicToggle.classList.toggle(
    "is-playing",
    on
  );

}


if(musicToggle){

  musicToggle.addEventListener(
    "click",
    async (e)=>{

      e.preventDefault();
      e.stopPropagation();

      if(music.paused){

        await startMusic();

      }else{

        music.pause();
        updateMusicButton();

      }

    }
  );

}


startBtn.addEventListener(
  "click",
  startMusic
);


giftButton.addEventListener(
  "click",
  startMusic
);


// =====================================================
// ФИНАЛЬНЫЙ WOW-ЭФФЕКТ
// =====================================================

let finalRun=0;


function launchFinalEffect(page){

  const run=++finalRun;

  const box=
    document.getElementById(
      "finalFireworks"
    );


  if(!box){
    return;
  }


  box.innerHTML="";


  if(
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ){
    return;
  }


  const points=[
    [18,24],
    [82,19],
    [13,72],
    [88,70],
    [50,15],
    [50,84]
  ];


  setTimeout(()=>{

    if(
      run!==finalRun ||
      !page.classList.contains("active")
    ){
      return;
    }


    points.forEach((pt,index)=>{

      setTimeout(()=>{

        if(
          run!==finalRun ||
          !page.classList.contains("active")
        ){
          return;
        }


        const burst=
          document.createElement("div");

        burst.className=
          "final-burst";

        burst.style.left=
          pt[0]+"%";

        burst.style.top=
          pt[1]+"%";


        for(let i=0;i<16;i++){

          const p=
            document.createElement("i");

          p.textContent=
            i%3===0
              ? "✦"
              : i%3===1
                ? "·"
                : "♡";


          p.style.setProperty(
            "--a",
            (i*22.5)+"deg"
          );


          p.style.setProperty(
            "--r",
            (55+Math.random()*70)+"px"
          );


          p.style.setProperty(
            "--delay",
            (Math.random()*.12)+"s"
          );


          burst.appendChild(p);

        }


        box.appendChild(burst);


        setTimeout(()=>{
          burst.remove();
        },1800);

      },index*420);

    });

  },700);

}


// =====================================================
// ФИНАЛЬНАЯ СТРАНИЦА
// =====================================================

const originalAnimatePage=
  animatePage;


animatePage=async function(page){

  await originalAnimatePage(page);

  if(
    page.classList.contains(
      "final-page"
    )
  ){

    launchFinalEffect(page);

  }

};


// =====================================================
// RESTART
// =====================================================

// Исправлено:
// раньше здесь использовалась несуществующая переменная `seconds`.
// Теперь просто возвращаем страницу к началу и перезагружаем сайт.

const restartBtn=
  document.getElementById(
    "restartBtn"
  );


if(restartBtn){

  restartBtn.addEventListener(
    "click",
    (e)=>{

      e.preventDefault();
      e.stopPropagation();

      main.classList.remove(
        "active"
      );

      countdown.classList.add(
        "active"
      );

      location.reload();

    }
  );

}


// Первый экран основной части
// готовится только после открытия подарка.


// =====================================================
// WOW V3 — ИНТЕРАКТИВНОЕ ПОЛЕ ЧАСТИЦ
// =====================================================

(function initWowEngine(){

  const canvas=
    document.getElementById(
      "wowCanvas"
    );


  if(
    !canvas ||
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ){
    return;
  }


  const ctx=
    canvas.getContext("2d");


  if(!ctx){
    return;
  }


  let W=0;
  let H=0;
  let dpr=1;
  let finalMode=false;


  let mouse={
    x:-9999,
    y:-9999,
    active:false
  };


  let pulse=0;

  const particles=[];

  const COUNT=
    window.innerWidth<800
      ? 75
      : 150;


  function resize(){

    dpr=
      Math.min(
        window.devicePixelRatio||1,
        2
      );


    W=window.innerWidth;
    H=window.innerHeight;


    canvas.width=
      W*dpr;

    canvas.height=
      H*dpr;


    canvas.style.width=
      W+"px";

    canvas.style.height=
      H+"px";


    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

  }


  resize();


  window.addEventListener(
    "resize",
    resize,
    {
      passive:true
    }
  );


  function finalOrbitPoint(
    t,
    seed
  ){

    const a=
      t*Math.PI*2;


    const ring=
      .55+
      (seed%1)*.45;


    const rx=
      Math.min(W,H)*
      .28*
      ring;


    const ry=
      Math.min(W,H)*
      .19*
      ring;


    return {
      x:Math.cos(a)*rx,
      y:Math.sin(a)*ry
    };

  }


  for(let i=0;i<COUNT;i++){

    const angle=
      Math.random()*Math.PI*2;


    const radius=
      Math.random()*
      Math.max(W,H)*
      .65;


    const p={

      x:
        W/2+
        Math.cos(angle)*radius,

      y:
        H/2+
        Math.sin(angle)*radius,

      vx:
        (Math.random()-.5)*.18,

      vy:
        (Math.random()-.5)*.18,

      size:
        Math.random()*1.7+.35,

      alpha:
        Math.random()*.55+.1,

      seed:
        Math.random(),

      targetX:0,
      targetY:0

    };


    particles.push(p);

  }


  function draw(){

    ctx.clearRect(
      0,
      0,
      W,
      H
    );


    const activeFinal=
      document.querySelector(
        ".final-page.active"
      );


    finalMode=
      !!activeFinal;


    const time=
      performance.now()*.001;


    particles.forEach((p,i)=>{

      if(finalMode){

        const op=
          finalOrbitPoint(
            (i/COUNT+
              time*.006)%1,
            p.seed
          );


        p.targetX=
          W/2+
          op.x+
          Math.sin(
            time*1.4+
            p.seed*9
          )*6;


        p.targetY=
          H*.49+
          op.y+
          Math.cos(
            time*1.15+
            p.seed*8
          )*5;


        p.vx+=
          (p.targetX-p.x)*
          .0028;


        p.vy+=
          (p.targetY-p.y)*
          .0028;

      }else{

        p.vx+=
          Math.sin(
            time*.4+
            p.seed*8
          )*.002;


        p.vy+=
          Math.cos(
            time*.35+
            p.seed*7
          )*.002;

      }


      if(mouse.active){

        const dx=
          p.x-mouse.x;

        const dy=
          p.y-mouse.y;

        const d2=
          dx*dx+
          dy*dy;


        if(d2<18000){

          const d=
            Math.sqrt(d2)||1;


          const force=
            (1-d/135)*.035;


          p.vx+=
            (dx/d)*force;


          p.vy+=
            (dy/d)*force;

        }

      }


      p.vx*=.992;
      p.vy*=.992;

      p.x+=p.vx;
      p.y+=p.vy;


      if(
        !finalMode &&
        (
          p.x<-80 ||
          p.x>W+80 ||
          p.y<-80 ||
          p.y>H+80
        )
      ){

        p.x=
          Math.random()*W;

        p.y=
          Math.random()*H;

      }


      const glow=
        finalMode
          ? 1.8
          : 1;


      ctx.beginPath();


      ctx.arc(
        p.x,
        p.y,
        p.size*glow,
        0,
        Math.PI*2
      );


      ctx.fillStyle=
        `rgba(
          255,
          210,
          236,
          ${p.alpha*
            (finalMode?.9:.65)}
        )`;


      ctx.shadowBlur=
        finalMode
          ? 10
          : 6;


      ctx.shadowColor=
        "rgba(255,100,194,.75)";


      ctx.fill();

    });


    if(
      finalMode &&
      Math.random()<.06
    ){

      pulse=
        Math.min(
          1,
          pulse+.22
        );

    }


    if(pulse>0){

      pulse*=.965;


      ctx.beginPath();


      ctx.arc(
        W/2,
        H*.49,
        (1-pulse)*
          Math.min(W,H)*
          .34,
        pulse*.7,
        Math.PI*2-pulse*.7
      );


      ctx.strokeStyle=
        `rgba(
          255,
          194,
          225,
          ${pulse*.11}
        )`;


      ctx.lineWidth=1;

      ctx.stroke();

    }


    requestAnimationFrame(draw);

  }


  draw();


  window.addEventListener(
    "pointermove",
    e=>{

      mouse.x=e.clientX;
      mouse.y=e.clientY;
      mouse.active=true;


      document.body.classList.add(
        "has-pointer"
      );


      const glow=
        document.getElementById(
          "cursorGlow"
        );


      if(glow){

        glow.style.left=
          e.clientX+"px";

        glow.style.top=
          e.clientY+"px";

      }

    },
    {
      passive:true
    }
  );


  window.addEventListener(
    "pointerleave",
    ()=>{

      mouse.active=false;

      document.body.classList.remove(
        "has-pointer"
      );

    }
  );


  // Click = mini shockwave.
  window.addEventListener(
    "click",
    e=>{

      if(
        e.target.closest(
          "button,a"
        )
      ){
        return;
      }


      const ring=
        document.createElement(
          "div"
        );


      ring.className=
        "wow-click-ring";


      ring.style.left=
        e.clientX+"px";

      ring.style.top=
        e.clientY+"px";


      document.body.appendChild(
        ring
      );


      setTimeout(()=>{
        ring.remove();
      },850);

    }
  );

})();


// =====================================================
// 3D TILT ДЛЯ КАРТОЧЕК
// =====================================================

(function initCardTilt(){

  if(
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches ||
    window.innerWidth<801
  ){
    return;
  }


  document.addEventListener(
    "pointermove",
    e=>{

      const card=
        e.target.closest(
          ".memory-card,.friend"
        );


      if(!card){
        return;
      }


      const r=
        card.getBoundingClientRect();


      const x=
        (e.clientX-r.left)/
        r.width-
        .5;


      const y=
        (e.clientY-r.top)/
        r.height-
        .5;


      card.style.transform=
        `perspective(900px)
         rotateX(${(-y*5).toFixed(2)}deg)
         rotateY(${(x*7).toFixed(2)}deg)
         translateY(-4px)`;

    },
    {
      passive:true
    }
  );


  document.addEventListener(
    "pointerout",
    e=>{

      const card=
        e.target.closest?.(
          ".memory-card,.friend"
        );


      if(
        card &&
        !card.contains(
          e.relatedTarget
        )
      ){

        card.style.transform="";

      }

    }
  );

})();