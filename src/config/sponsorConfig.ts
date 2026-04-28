import type { SponsorConfig } from "../types/config";

export const sponsorConfig: SponsorConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 赞助用途说明
	usage:
		"Dukungan akan saya pakai buat merawat situs, menulis konten, dan ngoprek fitur blog.",

	// 是否显示赞助者列表
	showSponsorsList: true,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: true,

	// 是否在文章详情页底部显示赞助按钮
	showButtonInPost: true,

	// 赞助方式列表
	methods: [
		{
			name: "Alipay",
			icon: "fa7-brands:alipay",
			// 收款码图片路径（需要放在 public 目录下）
			qrCode: "/assets/images/sponsor/alipay.png",
			link: "",
			description: "Scan kode QR Alipay kalau ingin ikut mendukung blog ini.",
			enabled: false,
		},
		{
			name: "WeChat Pay",
			icon: "fa7-brands:weixin",
			qrCode: "/assets/images/sponsor/wechat.png",
			link: "",
			description: "Scan kode QR WeChat Pay kalau ingin ikut mendukung blog ini.",
			enabled: false,
		},
		{
			name: "ko-fi",
			icon: "simple-icons:kofi",
			qrCode: "",
			link: "",
			description: "Dukung blog lewat Ko-fi.",
			enabled: false,
		},
		{
			name: "Afdian",
			icon: "simple-icons:afdian",
			qrCode: "",
			link: "",
			description: "Dukung blog lewat Afdian.",
			enabled: false,
		},
	],

	// 赞助者列表（可选）
	sponsors: [
		// 示例：已实名赞助者
		{
			name: "Contoh Sponsor",
			amount: "Rp50.000",
			date: "2025-10-01",
		},

		// 示例：匿名赞助者
		{
			name: "Anonim",
			amount: "Rp20.000",
			date: "2025-10-01",
		},
	],
};
