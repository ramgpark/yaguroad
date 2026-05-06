// gnb 메뉴 변경 -----------------------------------------------
$(document).ready(function () {
    // 1. 현재 페이지의 URL 경로를 가져옵니다.
    var currentPath = window.location.pathname;

    // 2. GNB의 모든 링크를 확인하며 현재 경로와 일치하는 것을 찾습니다.
    $(".gnb a").each(function () {
        var href = $(this).attr("href");

        // 현재 경로에 해당 href가 포함되어 있다면 active 클래스 추가
        if (currentPath.indexOf(href) !== -1 && href !== "#") {
            $(this).addClass("active");
        }
    });
});

$(document).ready(function () {
    $(".gnb li a").click(function (e) {
        // 내부 링크(#)일 경우에만 작동
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 90 // 90은 헤더 높이만큼 덜 가기 위한 수치
            }, 800);
        }
    });
});

$(document).ready(function () {
    $(".gnb li a").click(function () {
        // 1. 모든 핀의 active 클래스 제거
        $(".gnb li a").removeClass("active");

        // 2. 클릭한 핀에만 active 클래스 추가 (색상 변경)
        $(this).addClass("active");
    });
});


//배너 슬라이드 좌우이동 --------------------------------------------
var currentIndex = 0;
var slideCount = 3;

function moveSlide() {
    currentIndex++;

    if (currentIndex >= slideCount) {
        currentIndex = 0;
    }

    // 100%씩 이동하면 배율 깨짐 없이 딱딱 맞게 이동합니다.
    $(".banner").animate({
        marginLeft: (currentIndex * -100) + "vw"
    }, 500);
}

// 4초마다 슬라이드 이동 (타이핑 시간 고려해서 넉넉하게)
setInterval(moveSlide, 4000);


//typing 제어구문---------------------------------------------------
var typingIdx1 = 0;
var typingIdx2 = 0;
var typingTxt1 = "야구가 있는 날, 도시를 걷다"; // 첫 줄
var typingTxt2 = "Walk the City on Game Day"; // 둘째 줄

// 반복을 위해 텍스트를 담는 그릇을 변수로 지정
var $line1 = $(".typing1");
var $line2 = $(".typing2");

// 첫 번째 줄 타이핑 함수
function typeLine1() {

    // 첫 줄 시작할 때 커서 추가
    $line1.addClass("cursor");

    if (typingIdx1 < typingTxt1.length) {
        $line1.append(typingTxt1[typingIdx1]);
        typingIdx1++;
        setTimeout(typeLine1, 100);
    } else {
        // 첫 줄 끝나고 커서 제거, 0.3초 뒤 둘째 줄 시작
        $line1.removeClass("cursor");
        setTimeout(typeLine2, 300);
    }
}

// 두 번째 줄 타이핑 함수
function typeLine2() {
    // 두 번째 줄 시작할 때 커서 추가
    $line2.addClass("cursor");

    if (typingIdx2 < typingTxt2.length) {
        $line2.append(typingTxt2[typingIdx2]);
        typingIdx2++;
        setTimeout(typeLine2, 100);
    } else {
        // [중요] 두 번째 줄까지 모두 끝나면 3초 쉬었다가 다시 시작
        setTimeout(resetAndRestart, 3000);
    }
}

function resetAndRestart() {
    // 1. 인덱스 초기화
    typingIdx1 = 0;
    typingIdx2 = 0;

    // 2. 화면에 써진 글자 지우기
    $line1.html("");
    $line2.html("");

    // 3. 다시 첫 번째 줄부터 시작
    // 다시 시작할 때 두 번째 줄 커서 확실히 제거
    $line2.removeClass("cursor");
    typeLine1();
}

// 최초 실행
typeLine1();


// Section 2 - STADIUM MAP

$(document).ready(function () {
    // 1. 구장 데이터 정의 
    const stadiumData = {
        "samsung": {
            name: "대구삼성라이온즈 파크",
            location: "대구 수성구 야구전설로 1 대구삼성라이온즈파크",
            parking: "전용 주차장, 대공원역 공영주차장 이용 가능",
            date: "2026.04.07(화) 18:30",
            match: "LG VS 삼성",
            tags: ["#홈런공장", "#캠핑존", "#블루존", "#주말은빠르게매진"],
            img: "./images/main/4-stadium/samsung1.png"
        },
        "lotte": {
            name: "부산 사직 야구장",
            location: "부산 동래구 사직로 45",
            parking: "사직운동장 내 유료 주차장 이용",
            date: "2026.04.07(화) 18:30",
            match: "키움 VS 롯데",
            tags: ["#사직노래방", "#파도타기", "#응원탁자석", "#야구푸드"],
            img: "./images/main/4-stadium/lotte1.png"
        },
        "lg": {
            name: "서울 잠실 야구장",
            location: "서울특별시 송파구 올림픽로 25",
            parking: "잠실종합운동장 내 주차장 이용 (경기일 매우 혼잡)",
            date: "2026.04.07(화) 18:30",
            match: "두산 VS LG",
            tags: ["#잠실더비", "#무적LG", "#최강먹산", "#잠실원정"],
            img: "./images/main/4-stadium/lg1.png"
        },
        "ssg": {
            name: "인천 SSG 랜더스필드",
            location: "인천광역시 미추홀구 매소홀로 618",
            parking: "문학경기장 내 주차장 이용",
            date: "2026.04.07(화) 18:30",
            match: "한화 VS SSG",
            tags: ["#스타벅스데이", "#크림새우", "#바베큐존", "#인천야구"],
            img: "./images/main/4-stadium/ssg1.png"
        },
        "kiwoom": {
            name: "고척 스카이돔",
            location: "서울특별시 구로구 경인로 430",
            parking: "구장 내 일반 주차 불가 (인근 유료 주차장 권장)",
            date: "2026.04.07(화) 18:30",
            match: "롯데 VS 키움",
            tags: ["#에어컨빵빵", "#돔구장", "#영웅군단", "#서울투어"],
            img: "./images/main/4-stadium/kiwoom1.png"
        },
        "kt": {
            name: "수원 KT 위즈파크",
            location: "경기도 수원시 장안구 경수대로 893",
            parking: "사전 주차 예약제 필수 운영",
            date: "2026.04.07(화) 18:30",
            match: "NC VS KT",
            tags: ["#진미통닭", "#보영만두", "#워터페스티벌", "#마법사들"],
            img: "./images/main/4-stadium/kt1.png"
        },
        "hanwha": {
            name: "한화생명 이글스파크",
            location: "대전광역시 중구 대종로 373",
            parking: "구장 내부 및 인근 부사동 공영주차장",
            date: "2026.04.07(화) 18:30",
            match: "롯데 VS 한화",
            tags: ["#보문산호랭이", "#조류동맹", "#대전의자부심", "#직관필수"],
            img: "./images/main/4-stadium/hanwha1.png"
        },
        "kia": {
            name: "광주 기아 챔피언스 필드",
            location: "광주광역시 북구 서림로 10",
            parking: "구장 내 주차장 및 임동 공영주차장",
            date: "2026.04.07(화) 18:30",
            match: "두산 VS 기아",
            tags: ["#타이거즈", "#호걸이", "#직관뷰맛집", "#광주여행"],
            img: "./images/main/4-stadium/kia1.png"
        },
        "nc": {
            name: "창원 NC 파크",
            location: "경상남도 창원시 마산회원구 삼호로 63",
            parking: "구장 내 주차 빌딩 이용 가능",
            date: "2026.04.07(화) 18:30",
            match: "KT VS NC",
            tags: ["#메이저리그급", "#공룡군단", "#엔팍", "#창원산책"],
            img: "./images/main/4-stadium/nc1.png"
        }
    };

    // 팀 키값들을 배열로 추출 (순서 제어용)
    const teamKeys = Object.keys(stadiumData);
    let currentTeam = "samsung";

    // 2. 화면 업데이트 함수
    function updateContent(team) {
        const data = stadiumData[team];
        if (!data) return;

        const $info = $(".stadiuminfo");

        // 부드러운 전환을 위해 컨텐츠박스만 살짝 fade
        $(".contentsbox").stop().fadeOut(200, function () {
            $info.find("h2").text(data.name);
            $info.find(".location .text").text(data.location);
            $info.find(".parking .text").text(data.parking);
            $info.find(".schedule .text strong").html(data.match);
            $info.find(".imgbox img").attr("src", data.img);

            // 해시태그 업데이트
            const tagsHtml = data.tags.map(tag => `<span>${tag}</span>`).join('');
            $info.find(".hashtag").html(tagsHtml);

            $(this).fadeIn(200);
        });

        // 지도 핀 상태 동기화
        $(".map-pin").removeClass("active");
        $(`.map-pin[data-team="${team}"]`).addClass("active");

        currentTeam = team;
    }

    // 3. 지도 핀 클릭 이벤트
    $(".map-pin").click(function () {
        var selectedTeam = $(this).data("team");
        updateContent(selectedTeam);
        $("#section2").addClass("is-view");
    });

    // 4. 이동 버튼 클릭 이벤트 (Prev / Next)
    $(".nav_btn.next").click(function () {
        let idx = teamKeys.indexOf(currentTeam);
        idx = (idx + 1) % teamKeys.length; // 마지막이면 처음으로
        updateContent(teamKeys[idx]);
    });

    $(".nav_btn.prev").click(function () {
        let idx = teamKeys.indexOf(currentTeam);
        idx = (idx - 1 + teamKeys.length) % teamKeys.length; // 처음이면 마지막으로
        updateContent(teamKeys[idx]);
    });
});



// Section 3 - CITY
// 도시 탭 변경 -----------------------------------------------
$(document).ready(function () {
    $(".citytab li a").click(function (e) {

        e.preventDefault(); // 클릭 시 페이지 위로 튕기는 것 방지

        // 1. 모든 버튼에서 'active' 클래스 제거
        $(".citytab li a").removeClass("active");

        // 2. 클릭한 탭에만 active 클래스 추가 (색상 변경)
        $(this).addClass("active");

        // 3. 클릭한 탭의 data-tab 정보 가져오기 (ex: fashion, record)
        var selectedtab = $(this).data("tab");

        // 4. 모든 콘텐츠 숨기고, 클릭한 ID와 일치하는 콘텐츠만 보여주기
        $(".cityinfo").hide();
        $("#" + selectedtab).fadeIn(); // 부드럽게 나타나게 하기
    });
});


// Section 5 - SHOP
// 굿즈 탭 변경 -----------------------------------------------
$(document).ready(function () {
    $(".goodstab li a").click(function (e) {

        e.preventDefault(); // 클릭 시 페이지 위로 튕기는 것 방지

        // 1. 모든 버튼에서 'active' 클래스 제거
        $(".goodstab li a").removeClass("active");

        // 2. 클릭한 탭에만 active 클래스 추가 (색상 변경)
        $(this).addClass("active");

        // 3. 클릭한 탭의 data-tab 정보 가져오기 (ex: fashion, record)
        var selectedtab = $(this).data("tab");

        // 4. 모든 콘텐츠 숨기고, 클릭한 ID와 일치하는 콘텐츠만 보여주기
        $(".goodsinfo").hide();
        $("#" + selectedtab).fadeIn(); // 부드럽게 나타나게 하기
    });
});


// Section 6 - COMMUNITY 
//리뷰 탭 변경 -----------------------------------------------
$(document).ready(function () {
    $(".tab-item").click(function (e) {

        e.preventDefault(); // 클릭 시 페이지 위로 튕기는 것 방지

        // 1. 모든 버튼에서 'active' 클래스 제거
        $(".tab-item").removeClass("active");

        // 2. 클릭한 탭에만 active 클래스 추가 (색상 변경)
        $(this).addClass("active");

        // 3. 클릭한 탭의 data-tab 값 가져오기
        var tabId = $(this).attr('data-tab');

        // 4. 오른쪽 모든 섹션 숨기고 해당하는 클래스명을 가진 섹션만 보이기
        $('.reviewcontents section').hide().removeClass('active');
        $('#' + tabId).fadeIn(400).addClass('active');

        // 탭 클릭 시 상단으로 부드럽게 스크롤 (원할 경우)
        // $('html, body').animate({
        //     scrollTop: $('#section6').offset().top
        // }, 500);
    });
});



//Section 7 - CTA 버튼



// BASEBALL ROAD - Top Button Functionality
const topBtn = document.getElementById('TopBtn');

// 1. 스크롤 감지: 일정 높이 이상 내려가면 버튼 표시
window.addEventListener('scroll', () => {
    // 300px 이상 스크롤 시 버튼 표시
    if (window.pageYOffset > 500) {
        topBtn.classList.add('is-visible');
    } else {
        topBtn.classList.remove('is-visible');
    }
});

// 2. 클릭 이벤트: 맨 위로 부드럽게 스크롤
topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤 효과
    });
});