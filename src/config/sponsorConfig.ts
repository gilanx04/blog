import type { SponsorConfig } from "../types/config";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "Dukung lewat Saweria",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description:
		"Kalau tulisan di blog ini terasa berguna, kamu bisa traktir saya lewat Saweria.",

	// 赞助用途说明
	usage:
		"Dukungan akan saya pakai buat merawat situs, menulis konten, dan ngoprek fitur blog.",

	// 是否显示赞助者列表
	showSponsorsList: false,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否在文章详情页底部显示赞助按钮
	showButtonInPost: true,

	// 赞助方式列表
	methods: [
		{
			name: "Saweria",
			icon: "material-symbols:volunteer-activism",
			qrCode: "",
			link: "https://saweria.co/glng16",
			description:
				"Traktir lewat Saweria kalau kamu ingin ikut bantu blog ini tetap jalan.",
			enabled: true,
		},
	],

	// 赞助者列表（可选）
	sponsors: [],
};
