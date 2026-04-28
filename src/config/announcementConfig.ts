import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
	// 公告标题
	title: "Pengumuman",

	// 公告内容
	content: "Selamat datang. Di sini saya nyimpan catatan, eksperimen, dan tulisan ringan soal hal yang lagi dipelajari.",

	// 是否允许用户关闭公告
	closable: true,

	link: {
		// 启用链接
		enable: true,
		// 链接文本
		text: "Baca lagi",
		// 链接 URL
		url: "/about/",
		// 内部链接
		external: false,
	},
};
