// Floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 500);

// Countdown
function updateCountdown() {
    const startDate = new Date('2023-08-27T00:00:00+02:00');
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) { const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); days += prevMonth.getDate(); months--; }
    if (months < 0) { months += 12; years--; }

    document.getElementById('years').innerText = `${years}y`;
    document.getElementById('months').innerText = `${months}m`;
    document.getElementById('weeks').innerText = `${Math.floor(days / 7)}w`;
    document.getElementById('days').innerText = `${days % 7}d`;
    document.getElementById('hours').innerText = `${hours}h`;
    document.getElementById('minutes').innerText = `${minutes}m`;
    document.getElementById('seconds').innerText = `${seconds}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Puzzle
const puzzleContainer = document.getElementById('puzzleContainer');
const rows = 2, cols = 3, pieces = [], correctOrder = [];
const img = new Image();
img.src = 'photoofus.jpg'; // make sure the file name matches exactly
img.onload = () => {
    const pieceWidth = 140, pieceHeight = 140;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const canvas = document.createElement('canvas');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, (c * img.width) / cols, (r * img.height) / rows, img.width / cols, img.height / rows, 0, 0, pieceWidth, pieceHeight);
            const pieceImg = document.createElement('img');
            pieceImg.src = canvas.toDataURL();
            pieceImg.classList.add('puzzle-piece');
            pieceImg.draggable = true;
            puzzleContainer.appendChild(pieceImg);
            pieces.push(pieceImg);
            correctOrder.push(pieceImg.src);
        }
    }
    shufflePieces();
    initDragAndDrop();
};

function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        puzzleContainer.insertBefore(pieces[j], pieces[i]);
    }
}

function initDragAndDrop() {
    let dragged = null;
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', () => { dragged = piece; setTimeout(() => piece.classList.add('dragging'), 0); });
        piece.addEventListener('dragend', () => { piece.classList.remove('dragging'); dragged = null; checkPuzzleComplete(); });
        piece.addEventListener('dragover', e => e.preventDefault());
        piece.addEventListener('drop', e => {
            e.preventDefault();
            if (dragged && dragged !== piece) {
                const nodes = Array.from(puzzleContainer.children);
                const draggedIndex = nodes.indexOf(dragged);
                const targetIndex = nodes.indexOf(piece);
                if (draggedIndex < targetIndex) { puzzleContainer.insertBefore(dragged, piece.nextSibling); }
                else { puzzleContainer.insertBefore(dragged, piece); }
            }
        });
    });
}

function checkPuzzleComplete() {
    const currentOrder = Array.from(puzzleContainer.children).map(p => p.src);
    let complete = true;
    for (let i = 0; i < correctOrder.length; i++) {
        if (currentOrder[i] !== correctOrder[i]) { complete = false; break; }
    }
    if (complete) {
        const success = document.getElementById('successMessage');
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 5000);
    }
}

// Last Page Typewriter
function showLastPageMessage() {
    const messageEl = document.getElementById('loveMessage');
    if (!messageEl) return;
    const message = "I love you so much (shayad 🙄)";
    let index = 0;
    function typeWriter() {
        if (index < message.length) { messageEl.innerHTML += message[index]; index++; setTimeout(typeWriter, 100); }
    }
    typeWriter();
}

// Run last page text immediately on page load
window.addEventListener('load', showLastPageMessage);
