import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyCMkox3cb2cAFu8t-KHOLuCAHOKA3oGXYw",
    authDomain: "commentboard-d8cf5.firebaseapp.com",
    databaseURL: "https://commentboard-d8cf5-default-rtdb.firebaseio.com",
    projectId: "commentboard-d8cf5",
    storageBucket: "commentboard-d8cf5.firebasestorage.app",
    messagingSenderId: "743676069708",
    appId: "1:743676069708:web:ad25bf53440caf43c171e9",
    measurementId: "G-CKKJ9QSG72"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("message-form");
    const nicknameInput = document.getElementById("nickname-input");
    const messageInput = document.getElementById("message-input");
    const messageList = document.getElementById("message-list");
    const messagesRef = ref(database, "messages"); // Firebase 資料庫路徑

    // 提交留言
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // 防止頁面刷新

        const nickname = nicknameInput.value.trim();
        const message = messageInput.value.trim();

        if (nickname && message) {
            // 獲取當前時間戳
            const timestamp = new Date().toISOString();

            // 將留言與暱稱和時間推送到 Firebase
            push(messagesRef, { nickname, text: message, time: timestamp });
            messageInput.value = ""; // 清空留言輸入框
        }
    });

    // 即時加載留言
    onValue(messagesRef, (snapshot) => {
        messageList.innerHTML = ""; // 清空現有留言
        snapshot.forEach((childSnapshot) => {
            const messageData = childSnapshot.val();
            const li = document.createElement("li");

            // 格式化時間
            const date = new Date(messageData.time);
            const formattedTime = date.toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            // 暱稱部分
            const nicknameSpan = document.createElement("span");
            nicknameSpan.classList.add("nickname");
            nicknameSpan.textContent = `${messageData.nickname}：`; // 使用全形分隔符號

            // 留言內容部分
            const messageText = document.createTextNode(`${messageData.text} `);

            // 時間部分
            const timeSpan = document.createElement("span");
            timeSpan.classList.add("timestamp");
            timeSpan.textContent = `(${formattedTime})`;

            li.appendChild(nicknameSpan);
            li.appendChild(messageText);
            li.appendChild(timeSpan);
            messageList.appendChild(li);
        });
    });
});