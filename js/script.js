/**
 * MAIN PAGE JAVASCRIPT
 * ---------------------------------------------------
 * 1. Header (GNB & Scroll)
 * 2. Visual (Banner Slide & Typing)
 * 3. Section1 - Brand
 * 4. Section2 - Stadium Map
 * 5. Section3 - City
 * 6. Section4 - Archive
 * 7. Section5 - Goods
 * 8. Section6 - Review
 * 9. Top Button
 */

$(document).ready(function () {

    /* Header ----------------------------------------------------------- */
    //GNB 제어
    const currentPath = window.location.pathname;

    // 현재 페이지 활성화
    $(".gnb a").each(function () {
        const href = $(this).attr("href");
        if (currentPath.indexOf(href) !== -1 && href !== "#") {
            $(this).addClass("active");
        }
    });

    $(".gnb li a").click(function (e) {
        // active 클래스 변경
        $(".gnb li a").removeClass("active");
        $(this).addClass("active");

        // 내부 해시 링크 이동
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').stop().animate({
                scrollTop: $(hash).offset().top - 90
            }, 800);
        }
    });


    /* Visual ----------------------------------------------------------- */
    //배너 슬라이드
    let currentIndex = 0;
    const slideCount = 3;

    function moveSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        $(".banner").stop().animate({
            marginLeft: (currentIndex * -100) + "vw"
        }, 500);
    }
    setInterval(moveSlide, 4000);


    // 타이핑 효과
    const typingTxt1 = "야구가 있는 날, 도시를 걷다";
    const typingTxt2 = "Walk the City on Game Day";
    const $line1 = $(".typing1");
    const $line2 = $(".typing2");
    let typingIdx1 = 0;
    let typingIdx2 = 0;

    function typeLine1() {
        $line1.addClass("cursor");
        if (typingIdx1 < typingTxt1.length) {
            $line1.append(typingTxt1[typingIdx1++]);
            setTimeout(typeLine1, 100);
        } else {
            $line1.removeClass("cursor");
            setTimeout(typeLine2, 300);
        }
    }

    function typeLine2() {
        $line2.addClass("cursor");
        if (typingIdx2 < typingTxt2.length) {
            $line2.append(typingTxt2[typingIdx2++]);
            setTimeout(typeLine2, 100);
        } else {
            setTimeout(resetAndRestart, 3000);
        }
    }

    function resetAndRestart() {
        typingIdx1 = 0;
        typingIdx2 = 0;
        $line1.html("");
        $line2.html("");
        $line2.removeClass("cursor");
        typeLine1();
    }
    typeLine1(); // 최초 실행



    /* Section 2 - STADIUM MAP -------------------------------------------- */
    // 구장 데이터 정의
    const stadiumData = {
        "samsung": {
            name: "대구삼성라이온즈 파크",
            location: "대구 수성구 야구전설로 1 대구삼성라이온즈파크",
            parking: "전용 주차장, 대공원역 공영주차장 이용 가능",
            date: "2026.04.07(화) 18:30",
            match: "LG VS 삼성",
            tags: ["#홈런공장", "#캠핑존", "#블루존", "#주말은빠르게매진"],
            img: "./images/main/4-stadium/stadium_samsung.png",
            mapImg: "./images/main/4-stadium/map_samsung.png",
            ticketUrl: "https://www.samsunglions.com/"
        },

        "lotte": {
            name: "부산 사직 야구장",
            location: "부산 동래구 사직로 45",
            parking: "사직운동장 내 유료 주차장 이용",
            date: "2026.04.07(화) 18:30",
            match: "키움 VS 롯데",
            tags: ["#사직노래방", "#파도타기", "#응원탁자석", "#야구푸드"],
            img: "./images/main/4-stadium/stadium_lotte.png",
            mapImg: "./images/main/4-stadium/map_lotte.png",
            ticketUrl: "https://www.giantsclub.com/html/"
        },

        "lg": {
            name: "서울 잠실 야구장",
            location: "서울특별시 송파구 올림픽로 25",
            parking: "잠실종합운동장 내 주차장 이용 (경기일 매우 혼잡)",
            date: "2026.04.07(화) 18:30",
            match: "두산 VS LG",
            tags: ["#잠실더비", "#무적LG", "#최강먹산", "#잠실원정"],
            img: "./images/main/4-stadium/stadium_lg.png",
            mapImg: "./images/main/4-stadium/map_.png",
            ticketUrl: "https://www.lgtwins.com/main"
        },

        "ssg": {
            name: "인천 SSG 랜더스필드",
            location: "인천광역시 미추홀구 매소홀로 618",
            parking: "문학경기장 내 주차장 이용",
            date: "2026.04.07(화) 18:30",
            match: "한화 VS SSG",
            tags: ["#스타벅스데이", "#크림새우", "#바베큐존", "#인천야구"],
            img: "./images/main/4-stadium/stadium_ssg.png",
            mapImg: "./images/main/4-stadium/map_.png",
            ticketUrl: "https://ticket.ssg.com/ticket"
        },

        "kiwoom": {
            name: "고척 스카이돔",
            location: "서울특별시 구로구 경인로 430",
            parking: "구장 내 일반 주차 불가 (인근 유료 주차장 권장)",
            date: "2026.04.07(화) 18:30",
            match: "롯데 VS 키움",
            tags: ["#에어컨빵빵", "#돔구장", "#영웅군단", "#서울투어"],
            img: "./images/main/4-stadium/stadium_kiwoom.png",
            mapImg: "./images/main/4-stadium/map_.png",
            ticketUrl: "https://heroesbaseball.co.kr/index.do"
        },

        "kt": {
            name: "수원 KT 위즈파크",
            location: "경기도 수원시 장안구 경수대로 893",
            parking: "사전 주차 예약제 필수 운영",
            date: "2026.04.07(화) 18:30",
            match: "NC VS KT",
            tags: ["#진미통닭", "#보영만두", "#워터페스티벌", "#마법사들"],
            img: "./images/main/4-stadium/stadium_kt.png",
            mapImg: "./images/main/4-stadium/map_.png",
            ticketUrl: "https://www.ktwiz.co.kr/"
        },

        "hanwha": {
            name: "한화생명 이글스파크",
            location: "대전광역시 중구 대종로 373",
            parking: "구장 내부 및 인근 부사동 공영주차장",
            date: "2026.04.07(화) 18:30",
            match: "롯데 VS 한화",
            tags: ["#독수리군단", "#조류동맹", "#빙그레", "#직관필수"],
            img: "./images/main/4-stadium/stadium_hanwha.png",
            mapImg: "./images/main/4-stadium/map_hanwha.png",
            ticketUrl: "https://www.hanwhaeagles.co.kr/index.do"
        },

        "kia": {
            name: "광주 기아 챔피언스 필드",
            location: "광주광역시 북구 서림로 10",
            parking: "구장 내 주차장 및 임동 공영주차장",
            date: "2026.04.07(화) 18:30",
            match: "두산 VS 기아",
            tags: ["#타이거즈", "#호걸이", "#직관뷰맛집", "#광주여행"],
            img: "./images/main/4-stadium/stadium_kia.png",
            mapImg: "./images/main/4-stadium/map_kia.png",
            ticketUrl: "https://tigers.co.kr/"
        },

        "nc": {
            name: "창원 NC 파크",
            location: "경상남도 창원시 마산회원구 삼호로 63",
            parking: "구장 내 주차 빌딩 이용 가능",
            date: "2026.04.07(화) 18:30",
            match: "KT VS NC",
            tags: ["#메이저리그급", "#공룡군단", "#엔팍", "#창원산책"],
            img: "./images/main/4-stadium/stadium_nc.png",
            mapImg: "./images/main/4-stadium/map_nc.png",
            ticketUrl: "https://www.ncdinos.com/"
        }
    };

    const teamKeys = Object.keys(stadiumData);
    let currentTeam = "samsung";

    //콘텐츠 업데이트 함수
    function updateContent(team) {
        const data = stadiumData[team];
        if (!data) return;

        const $info = $(".stadiuminfo");
        $(".base-map").attr("src", data.mapImg);

        $(".contentsbox").stop().fadeOut(200, function () {
            $info.find("h2").text(data.name);
            $info.find(".location .text").text(data.location);
            $info.find(".parking .text").text(data.parking);
            $info.find(".schedule .text strong").html(data.match);
            $info.find(".imgbox img").attr("src", data.img);
            $info.find(".hashtag").html(data.tags.map(tag => `<span>${tag}</span>`).join(''));
            $(this).fadeIn(200);
        });

        $(".map-pin").removeClass("active");
        $(`.map-pin[data-team="${team}"]`).addClass("active");
        currentTeam = team;
    }

    // 지도 핀 클릭 이벤트
    $(".map-pin").click(function () {
        updateContent($(this).data("team"));
        $("#section2").addClass("is-view");
    });

    // 이동 버튼 클릭 이벤트 (Prev / Next)
    $(".nav_btn.next").click(function () {
        let idx = (teamKeys.indexOf(currentTeam) + 1) % teamKeys.length;
        updateContent(teamKeys[idx]);
    });

    $(".nav_btn.prev").click(function () {
        let idx = (teamKeys.indexOf(currentTeam) - 1 + teamKeys.length) % teamKeys.length;
        updateContent(teamKeys[idx]);
    });

    // 티켓 예매하기 버튼 클릭 이벤트
    $("#ticketBtn").click(function (e) {
        e.preventDefault();

        const url = stadiumData[currentTeam].ticketUrl;

        if (url) {
            window.open(url, "_blank"); // 새 탭에서 열기
        } else {
            alert("예매 링크 준비 중입니다.");
        }
    });

    //추천 코스보기 버튼 클릭 이벤트
    $("#courseBtn").click(function (e) {
        e.preventDefault();


    });


    /* Section 3 - CITY TRAVEL -------------------------------------------- */
    // 도시별 데이터 정의
    const cityData = {
        busan: {
            name: "부산",
            desc: "바다와 야구를 함께 <br> 즐길 수 있는 도시",
            stname: "#사직야구장",
            tmname: "#롯데자이언츠",
            bgMain: "./images/main/5-city/busan.png",
            bgFood: "./images/main/5-city/busan1-food.png",
            bgCafe: "./images/main/5-city/busan2-cafe.png",
            bgCourse: "./images/main/5-city/busan3-course.png"
        },

        gwangju: {
            name: "광주",
            desc: "전통의 강호와 맛의 향연이 <br> 펼쳐지는 도시",
            stname: "#기아챔피언스필드",
            tmname: "#기아타이거즈",
            bgMain: "./images/main/5-city/gwangju.png",
            bgFood: "./images/main/5-city/gwangju1-food.png",
            bgCafe: "./images/main/5-city/gwangju2-cafe.png",
            bgCourse: "./images/main/5-city/gwangju3-course.png"
        },

        daegu: {
            name: "대구",
            desc: "뜨거운 열정과 사자의 포효가 <br> 가득한 도시",
            stname: "#삼성라이온즈파크",
            tmname: "#삼성라이온즈",
            bgMain: "./images/main/5-city/daegu.png",
            bgFood: "./images/main/5-city/daegu1-food.png",
            bgCafe: "./images/main/5-city/daegu2-cafe.png",
            bgCourse: "./images/main/5-city/daegu3-course.png"
        },

        daejeon: {
            name: "대전",
            desc: "포근한 낭만과 보문산 아래 <br> 울림이 있는 도시",
            stname: "#한화생명볼파크",
            tmname: "#한화이글스",
            bgMain: "./images/main/5-city/daejeon.png",
            bgFood: "./images/main/5-city/daejeon1-food.png",
            bgCafe: "./images/main/5-city/daejeon2-cafe.png",
            bgCourse: "./images/main/5-city/daejeon3-course.png"
        },

        seoul: {
            name: "서울",
            desc: "야구의 심장부에서 <br> 즐기는 뜨거운 더비",
            stname: "#잠실야구장 #스카이돔",
            tmname: "#LG트윈스 #두산베어스 #키움히어로즈",
            bgMain: "./images/main/5-city/gwangju.png",
            bgFood: "./images/main/5-city/gwangju1-food.png",
            bgCafe: "./images/main/5-city/gwangju2-cafe.png",
            bgCourse: "./images/main/5-city/gwangju3-course.png"
        },

        incheon: {
            name: "인천",
            desc: "바다를 건너 <br> 랜더스의 땅으로",
            stname: "#SSG랜더스필드",
            tmname: "#SSG랜더스",
            bgMain: "./images/main/5-city/daegu.png",
            bgFood: "./images/main/5-city/daegu1-food.png",
            bgCafe: "./images/main/5-city/daegu2-cafe.png",
            bgCourse: "./images/main/5-city/daegu3-course.png"
        },

        suwon: {
            name: "수원",
            desc: "수원 화성과 <br> 마법 같은 야구의 밤",
            stname: "#KT위즈파크",
            tmname: "#KT위즈",
            bgMain: "./images/main/5-city/daejeon.png",
            bgFood: "./images/main/5-city/daejeon1-food.png",
            bgCafe: "./images/main/5-city/daejeon2-cafe.png",
            bgCourse: "./images/main/5-city/daejeon3-course.png"
        },

        changwon: {
            name: "창원",
            desc: "메이저리그급 구장에서 <br> 만나는 새로운 여정",
            stname: "#NC파크",
            tmname: "#NC다이노스",
            bgMain: "./images/main/5-city/busan.png",
            bgFood: "./images/main/5-city/busan1-food.png",
            bgCafe: "./images/main/5-city/busan2-cafe.png",
            bgCourse: "./images/main/5-city/busan3-course.png"
        }
    };

    // 콘텐츠 업데이트 함수
    function updateCity(city) {
        const data = cityData[city];
        if (!data) return;

        const $info = $(".cityinfo");
        $info.find(".maincard h2").html(data.name);
        $info.find(".maincard h3").html(data.desc);
        $info.find(".maincard .sn").html(data.stname);
        $info.find(".maincard .tn").html(data.tmname);
        $info.find(".maincard").css("background-image", `url(${data.bgMain})`);
        $info.find(".cityfood").css("background-image", `url(${data.bgFood})`);
        $info.find(".citycafe").css("background-image", `url(${data.bgCafe})`);
        $info.find(".citycourse").css("background-image", `url(${data.bgCourse})`);

        if (typeof AOS !== 'undefined') AOS.refresh();
    }

    // 도시 탭 클릭 이벤트
    $(".citytab li a").click(function (e) {
        e.preventDefault();
        $(".citytab li a").removeClass("active");
        $(this).addClass("active");

        const selectedTab = $(this).data("tab");
        $(".cityinfo").stop().fadeOut(200, function () {
            updateCity(selectedTab);
            $(this).fadeIn(300);
        });
    });

    updateCity("busan"); // 초기 실행



    /* Section 5 - Goods -------------------------------------------- */
    // 굿즈 Swiper 슬라이드
    // 1. 모든 굿즈 스와이퍼를 담을 배열 선언
    let goodsSwipers = [];

    // 2. 각 .goodsinfo 마다 개별적으로 Swiper 설정
    $('.goodsinfo').each(function (index, element) {
        const $this = $(element);

        // 개별 인스턴스를 생성하여 배열에 저장
        const swiper = new Swiper(element, {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            speed: 500,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            observer: true,
            observeParents: true,

            // 핵심: 현재 요소($this) 내부의 클래스만 찾도록 지정
            pagination: {
                el: $this.find('.swiper-pagination')[0],
                clickable: true,
            },
            navigation: {
                nextEl: $this.find('.swiper-button-next')[0],
                prevEl: $this.find('.swiper-button-prev')[0],
            },
        });

        goodsSwipers.push(swiper);
    });

    // 3. 굿즈 탭 클릭 이벤트 (기존 코드 유지 및 보완)
    $(".goodstab li a").click(function (e) {
        e.preventDefault();

        $(".goodstab li a").removeClass("active");
        $(this).addClass("active");

        const targetTab = $(this).data("tab");

        $(".goodsinfo").hide().removeClass("active");
        $("#" + targetTab).show().addClass("active");

        // 활성화된 탭의 스와이퍼만 업데이트 및 재생
        if (goodsSwipers.length > 0) {
            goodsSwipers.forEach(s => {
                if ($(s.el).is(':visible')) {
                    setTimeout(() => {
                        s.update();
                        s.slideToLoop(0, 0);
                        s.autoplay.start();
                    }, 50); // 인식 시간을 위해 조금 더 여유를 줌
                } else {
                    s.autoplay.stop();
                }
            });
        }

        AOS.refresh();
    });

    // 초기 실행
    $(".goodstab li:first-child a").trigger("click");



    /* Section 6 - Community -------------------------------------------- */
    // 후기 탭 클릭 이벤트
    $(".reviewtab li a").on('click', function (e) {
        // 1. 어떤 에러가 나더라도 일단 튕기는 것부터 막습니다.
        e.preventDefault();
        e.stopPropagation();

        $(".reviewtab li a").removeClass("active");
        $(this).addClass("active");

        const tabId = $(this).attr('data-tab');

        // 2. 섹션 전환
        $('.review-section').hide().removeClass('active');

        // 해당 탭이 있는지 확인 후 노출
        if ($('#' + tabId).length > 0) {
            $('#' + tabId).stop().fadeIn(400).addClass('active');
        }

        // 3. swiper1 에러 방지 처리 (Try-Catch 문으로 감싸기)
        try {
            if (typeof swiper1 !== 'undefined' && swiper1 !== null) {
                swiper1.update();
            }
        } catch (err) {
            console.warn("Swiper update skipped:", err);
        }

        // 4. AOS 에러 방지 처리
        try {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        } catch (err) {
            console.warn("AOS refresh skipped:", err);
        }
    });



    /* 구단 로고 flow Swiper 슬라이드 ------------------------------- */
    var swiper = new Swiper(".yaguloadslide", {
        slidesPerView: 12,
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        speed: 5000,
    });

    /* Top Button ------------------------------- */
    const $topBtn = $('#TopBtn');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $topBtn.addClass('is-visible');
        } else {
            $topBtn.removeClass('is-visible');
        }
    });

    $topBtn.click(function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 'smooth');
    });
});