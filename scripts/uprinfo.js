var upr = {
    "Грудные мышцы": {
        title: "Упражнения для грудных мышц",
        technique: "Лягте на скамью, ноги устойчиво на полу. Возьмите штангу хватом чуть шире плеч. Опустите штангу к груди, затем выжмите вверх, полностью выпрямляя руки. Локти держите под углом 45-60 градусов к корпусу.",
        muscles: "Грудные, трицепс, передняя дельта",
        ssilka: "https://vkvideo.ru/video-75256904_456239460",
        images: "../source/forframe/smaev.jpg"

    },
    "Дельты": {
        title: "Упражнения для дельтовидных мышц",
        technique: "Возьмите гантели, встаньте прямо. Разводите руки в стороны до уровня плеч, слегка сгибая локти. Медленно опускайте гантели обратно вниз.",
        muscles: "Средняя и передняя дельты, надостная мышца, трапеция",
        ssilka: "https://vkvideo.ru/video-179067307_456239495",
        images: "../source/forframe/plechi.jpg"
    },
    "Ножки": {
        title: "Упражнения для мышц ног",
        technique: "Поставьте ноги на ширине плеч. Начните опускать таз назад и вниз, удерживая спину прямой. Согните колени до угла 90 градусов или ниже, затем вернитесь в исходное положение.",
        muscles: "Квадрицепсы, ягодичные мышцы, бицепс бедра, икроножные",
        ssilka: "https://vkvideo.ru/video-87989882_456239613",
        images: "../source/forframe/nogi.jpg"
    },
    "Спина": {
        title: "Упражнения для мышц спины",
        technique: "Повисните на турнике хватом шире плеч. Сведите лопатки и подтянитесь вверх, стараясь коснуться перекладины верхом груди. Медленно опуститесь в исходное положение.",
        muscles: "Широчайшие мышцы спины, круглые мышцы, бицепс, трапеция",
        ssilka: "https://vkvideo.ru/video-90498072_456239947",
        images: "../source/forframe/spina.jpg"
    },
    "Руки": {
        title: "Упражнения для мышц рук",
        technique: "Возьмите гантели ладонями вперед. Сгибайте локти, поднимая гантели к плечам, при этом удерживая локти прижатыми к корпусу. Медленно опустите руки.",
        muscles: "Бицепс плеча, плечевая мышца (брахиалис), предплечья",
        ssilka: "https://vkvideo.ru/video-36293073_456239252",
        images: "../source/forframe/ruki.jpg"
    },
    "Кардио": {
        title: "Кардиотренировки",
        technique: "Выполняйте бег, прыжки или работу на велотренажере в целевой зоне пульса. Поддерживайте ровное дыхание и следите за осанкой.",
        muscles: "Сердечная мышца, выносливость, дыхательная система",
        ssilka: "https://vkvideo.ru/video-172999724_456242595",
        images: "../source/forframe/kardio.jpg"
    }
};



var keys = ["Грудные мышцы", "Дельты", "Ножки", "Спина", "Руки", "Кардио"];
var index = localStorage.getItem("selupr") || 0;
var data = upr[keys[index]];

var titleElem = document.querySelector(".zagazaga");
titleElem.innerText = data.title;

var paragraphElements = document.querySelectorAll(".groupm");
paragraphElements[0].innerText = data.technique;
paragraphElements[1].innerText = data.muscles;



var pleerbg = document.getElementById("pleer");
pleerbg.style.backgroundImage = `url("${data.images}")`;


