// 定义 UserBox 插件，用于动态生成用户框并加载 CSS 样式
document.addEventListener("DOMContentLoaded", () => {
    // 动态加载 userbox.css
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "userbox.css"; // 确保 userbox.css 在同目录下
    document.head.appendChild(link);

    // 查找所有需要初始化的 UserBox
    document.querySelectorAll("[data-userbox]").forEach(box => {
        const iconSrc = box.getAttribute("data-icon"); // 获取图标路径
        const description = box.getAttribute("data-description"); // 获取描述文字

        // 创建 Userbox 元素
        const table = document.createElement("table");
        table.className = "userbox";

        const tr = document.createElement("tr");

        // 创建左侧图标部分
        const th = document.createElement("th");
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = iconSrc; // 支持外部图床 URL
        img.alt = "Icon";
        div.appendChild(img);
        th.appendChild(div);

        // 创建右侧描述部分
        const td = document.createElement("td");
        td.textContent = description;

        // 将左侧和右侧添加到行中
        tr.appendChild(th);
        tr.appendChild(td);

        // 将行添加到表中
        table.appendChild(tr);

        // 用生成的 Userbox 替换原始占位标记
        box.replaceWith(table);
    });
});